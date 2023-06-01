"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.models import db, User, Books
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from werkzeug.security import generate_password_hash, check_password_hash

#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config["JWT_SECRET_KEY"] = "secret-password" 
jwt = JWTManager(app)    

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response
#REGISTRO--------------------------------------------------------------------

@app.route('/api/registro', methods=['POST'])
def register():

    user = User()
    user.email = request.json.get("email")
    user.password = generate_password_hash(request.json.get("password")).encode("utf-8")
    
    
    if not user.email:
        return jsonify({ "msg": "Necesitamos tu email"}), 422

    if not user.password:
        return jsonify({ "msg": "Necesitamos que ingreses una contraseña"}), 422

    user_filter = User.query.filter_by(email=user.email).first()

    if user_filter:
        return jsonify({ "msg": "El usuario ya existe"}), 400

    user.new_user()
    
    return jsonify({"msg":"register created", "user": user.serialize()}), 201    
    
#LOGIN CON TOKEN--------------------------------------------------------------------

@app.route("/api/login", methods=["POST"])
def login_token():
    email = request.json.get("email")
    password = request.json.get("password")
    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = User.query.filter_by(email=email).first()
    if user is None:
          # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Email/Contraseña son incorrectos"}), 401
    
    # crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })  
 

@app.route('/api/users', methods=['GET'])
def get_all_users():#trae todos los registros que tengo en mi base de datos
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))#por cada usuario que encuentre llame a serialize que me permite convertirlo en un objeto serializado para ser reconocido por python

    return jsonify(users), 200  

#BOOKS-------------------------------------------------------------------------------           

@app.route('/api/libros', methods=['POST'])
def add_book():
    data = request.get_json()

    book = Books()
    book.title = data["title"]
    book.year = data["year"]
    book.image_url = data["image_url"]
    book.new_book()  

    return jsonify({"msg":"book created"}), 201

@app.route('/api/libros', methods=['GET'])
@jwt_required()
def get_all_books():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({ "msg": "Necesitamos tu registro/acceso"}), 422

    else:    
    
        books = Books.query.all()
        books = list(map(lambda book: book.serialize(), books))

        return jsonify(books), 200      


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
