from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime
# from flask_cors import CORS

app = Flask(__name__)
# CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///site.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


if __name__ == '__main__' :
    app.run(debug=True)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)

    def __init__(self, username, email):
        self.playlist = username
        self.email = email

class Playlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    playlist = db.Column(db.String(200), unique=True, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    likes = db.Column(db.Integer, nullable = False)

    def __init__(self, playlist, likes,name):
        self.playlist = playlist 
        self.likes = likes
        self.name = name



class PlaylistSchema(ma.Schema):
    class Meta:
        fields = ('id','playlist','date_posted', 'likes', 'name')



playlist_schema = PlaylistSchema()
playlists_schema = PlaylistSchema(many=True)



@app.route('/get', methods=['GET'])
def get_playlists():
    all_playlists = Playlist.query.all()
    results = playlists_schema.dump(all_playlists)
    return jsonify(results)



@app.route('/add', methods = ['POST'])
def add_playlist():
    playlist = request.json['playlist']
    name  = request.json['name']
    playlists = Playlist(playlist,0, name)

    db.session.add(playlists)
    db.session.commit()

    return playlist_schema.jsonify(playlists)

