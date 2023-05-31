"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# @api.route('/api/registro', methods=['POST'])
# def register():
#     data = request.get_json()

#     user = User()
#     user.email = data["email"]
#     user.password = generate_password_hash(data["password"])
    
#     if not user.email:
#         return jsonify({ "msg": "Necesitamos tu email"}), 422

#     if not user.password:
#         return jsonify({ "msg": "Necesitamos que ingreses una contraseña"}), 422

#     user_filter = User.query.filter_by(email=user.email).first()

#     if user_filter:
#         return jsonify({ "msg": "El usuario ya existe"}), 400

#     user.new_user()
    
#     return jsonify({"msg":"register created", "user": user.serialize()}), 201  

# @api.route('/api/users', methods=['GET'])
# def get_all_users():#trae todos los registros que tengo en mi base de datos
#     users = User.query.all()
#     users = list(map(lambda user: user.serialize(), users))#por cada usuario que encuentre llame a serialize que me permite convertirlo en un objeto serializado para ser reconocido por python

#     return jsonify(users), 200     