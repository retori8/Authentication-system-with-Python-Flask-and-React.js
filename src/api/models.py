from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(500), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }

    def new_user(self):
        db.session.add(self)
        db.session.commit()

    def update_user(self):
        db.session.commit()

    def delete_user(self):
        db.session.delete(self)
        db.session.commit()           


class Books(db.Model):
    __tablename__ = 'books'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(400), nullable=False)
    

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "year": self.year,
            "image_url": self.image_url,
        }

    def new_book(self):
        db.session.add(self)
        db.session.commit()

    def update_book(self):
        db.session.commit()

    def delete_book(self):
        db.session.delete(self)
        db.session.commit()         