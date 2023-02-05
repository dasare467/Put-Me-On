from flask import Flask,jsonify,request,session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time
from pprint import pprint
import spotipy.util as util
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.oauth2 import SpotifyOAuth
import tekore as tk
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from hmac import compare_digest
from flask_jwt_extended import get_jwt
import redis
import json
from datetime import timedelta
from datetime import timezone
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies
from flask_cors import CORS, cross_origin




client_id = 'INSERT CLIENT ID'
client_secret = 'INSERT CLIENT SECRET'
ACCESS_EXPIRES = timedelta(hours=1)


app_token = tk.request_client_token(client_id, client_secret)

spotify = tk.Spotify(app_token)

# from flask_cors import CORS

app = Flask(__name__)
app.secret_key = "DwayneSpotify"
app.config['SESSION_COOKIE_NAME'] = 'Dwaynes Cookie'
app.config["JWT_SECRET_KEY"] = "DWAYNETHEBOSSMADETHIS"  # Change this!
jwt = JWTManager(app)

TOKEN_INFO = "token_info"
CORS(app, supports_credentials=True)
# app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///site.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_COOKIE_DOMAIN"] = "127.0.0.1"

db = SQLAlchemy(app)
ma = Marshmallow(app)


jwt_redis_blocklist = redis.StrictRedis(
    host="localhost", port=5000, db=0, decode_responses=True
)



@app.route('/')
def something():
    # sp_oauth = create_spotify_oauth()
    # auth_url = sp_oauth.get_authorize_url()
    # return redirect(auth_url)
    return "hi"

@app.route('/getToken', methods = ['POST'])
def token():
    token = request.json['token']
    print(token)

    return token

@app.route('/createUserToken', methods = ['POST'])
def create_usertoken():
    username = request.json.get("username", None)
    password = request.json.get("password", None)






# @app.route('/redirect')
# def redirectPage():
#     sp_oauth = create_spotify_oauth()
#     session.clear()
#     code = request.args.get('code')
#     token_info = sp_oauth.get_access_token(code)
#     session[TOKEN_INFO] = token_info
#     return redirect(url_for('getTracks', _external=True))



@app.route('/getTracks')
def getTracks():
    track = spotify.track("2s8G3qj3sGDZq8hwt8COnQ?si=9dbeddf05df94afa")
    print(track.name)
    return jsonify(track.name)

# def get_token():
#     token_info = session.get(TOKEN_INFO)
#     if not token_info:
#         raise "exception"
#     now = int(time.time())

#     is_expired = token_info['expires_at'] - now < 60
#     if (is_expired):
#         sp_oauth = create_spotify_oauth()
#         token_info = sp_oauth.refresh_access_token(token_info['refresh-token'])
#     return token_info

# def create_spotify_oauth():
#     return SpotifyOAuth(
#         client_id= "bbdba9d33a94452d99c8ad6265848131",
#         client_secret= "45481fed0ca64752b897bc8b05fd9519",
#         redirect_uri= url_for('redirectPage', _external=True),
#         scope="user-library-read")








class User(db.Model, SerializerMixin):
    serialize_only = ('id','username','password','playlists')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    playlists = db.relationship('Playlist', backref='author', lazy=True)

    def __init__(self, username, password, image_file):
        self.username = username
        self.password = password
        self.image_file = image_file

    def check_password(self, password):
        return compare_digest(password, self.password)

class Playlist(db.Model, SerializerMixin):
    serialize_only = ('id','name','playlist','likes','date_posted', 'user_id', 'author')
    # serialize_rules = ()
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    playlist = db.Column(db.String(200), unique=True, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    likes = db.Column(db.Integer, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    username = db.Column(db.String(200), unique=False, nullable=False)



    def __init__(self, playlist, likes,name, user_id, username):
        self.playlist = playlist 
        self.likes = likes
        self.name = name
        self.user_id = user_id
        self.username = username




class PlaylistSchema(ma.Schema):
    class Meta:
        fields = ('id','playlist','date_posted', 'likes', 'name', 'user_id', 'username')

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','username','password', 'image', 'playlists')



@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(seconds=10))
        print("target")
        print(target_timestamp)
        print("exp")
        print(exp_timestamp)
        if target_timestamp > exp_timestamp:
            id = get_jwt_identity()
            user = User.query.get(id)
            access_token = create_access_token(identity=user)
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()

@app.route("/login", methods=["POST"])
@cross_origin(methods=['POST'], supports_credentials=True, headers=['Content-Type', 'Authorization'], origin='http://127.0.0.1:3000')
def login():
    username = request.json['username']
    password = request.json['password']

    user = User.query.filter_by(username=username).one_or_none()
    if not user or not user.check_password(password):
        return jsonify("Wrong username or password" + user.username), 401

    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user)
    response = jsonify({
        "msg": "login successful",
        'access_token': access_token
        })
    set_access_cookies(response, access_token)
    return response

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route("/createAccount", methods=["POST"])
@cross_origin(methods=['POST'], supports_credentials=True, headers=['Content-Type', 'Authorization'], origin='http://127.0.0.1:3000')
def create_account():
    username = request.json['username']
    password = request.json['password']
    image = request.json['image']

    check_username = User.query.filter_by(username=username).one_or_none()

    if check_username:
        return jsonify("Username exists!"), 401


    new_user = User(username = username, password = password, image_file = image)

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user)
    response = jsonify({
        "msg": "Account creation successful",
        'access_token': access_token
        })
    set_access_cookies(response, access_token)
    return response





@app.route("/who_am_i", methods=["GET"])
@jwt_required(locations='cookies')
def protected():
    # We can now access our sqlalchemy User object via `current_user`.
    return jsonify(
        id=current_user.id,
        username=current_user.username,
    )

# @app.route("/getUserfromPlaylist", methods=["GET"])
# @jwt_required()
# def protected():
#     # We can now access our sqlalchemy User object via `current_user`.
#     return jsonify(
#         id=current_user.id,
#         username=current_user.username,
#     )





playlist_schema = PlaylistSchema()
playlists_schema = PlaylistSchema(many=True)



@app.route('/get', methods=['GET'])
def get_playlists():
    all_playlists = Playlist.query.all()
    results = playlists_schema.dump(all_playlists)
    return jsonify(results)


@app.route('/getImage/<id>', methods=['GET'])
def get_Image(id):
    # sp = spotipy.Spotify(auth=token)
    # pl_id = 'spotify:playlist:2glOoKv4sZJtCAHqriiEkh'
    offset = 0
    playlist = Playlist.query.get(id).playlist
    playlist_final = playlist[34:56]
    
    print(playlist_final)

    Image = spotify.playlist_cover_image(playlist_final)
    print(Image[0].url)
    return jsonify(Image[0].url)



@app.route('/getOriginalName/<id>')
def get_original_name(id):
    playlist = Playlist.query.get(id)

    playlist = Playlist.query.get(id).playlist
    playlist_final = playlist[34:56]

    name = spotify.playlist(playlist_final,
                                    fields=None,
                                    market = None,
                                    as_tracks = False,
                                    )

    print(name.name)

    result = name.name

    
    return jsonify(result)

@app.route('/getURL/<id>')
@jwt_required(locations='cookies')
def get_url(id):
    name = Playlist.query.get(id).name
    date = Playlist.query.get(id).date_posted.strftime("%m/%d/%Y, %H:%M")
    playlist = Playlist.query.get(id).playlist

    return jsonify({
        "name": name,
        "date": date,
        "playlist": playlist
    })


@app.route('/myAccount/posts')
@jwt_required(locations='cookies')
def view_posts():

    print(User.query.get(1).posts)


@app.route('/playlist/<id>')
def get_playlist(id):
    playlist_object = Playlist.query.get(id)
    arr = []
    test = []

    playlist = Playlist.query.get(id).playlist
    playlist_final = playlist[34:56]

    playlist = spotify.playlist_items(playlist_final,
                                    fields="items.track.name,items.track.artists.name",
                                    market = None,
                                    as_tracks = False,
                                    limit = 100,
                                    offset = 0)

    
    
                                    
    # for i in range(len(playlist['items'])):
    #     print(playlist['items'][i]['track']['name'])


    for i in range(len(playlist['items'])):
        print(playlist['items'][i]['track']['artists'])
        arr.append(playlist['items'][i]['track']['artists'])

    # for i in range(len(arr)):
    #     for j in range(len(arr[i])):
    #         test.append(arr[i][j]['name'])
        

        print(arr)

    
    result = playlist['items']

    return jsonify(songs= result)


@app.route('/delete/<id>', methods = ['POST'])
def delete_playlist(id):
    playlist = Playlist.query.get(id)

    db.session.delete(playlist)
    db.session.commit()

    all_playlists = Playlist.query.all()
    results = playlists_schema.dump(all_playlists)
    return jsonify(results)


@app.route('/add', methods = ['POST'])
@jwt_required(locations='cookies')
def add_playlist():
    playlist = request.json['playlist']
    name  = request.json['name']
    id=current_user.id
    playlists = Playlist(playlist,0,name,current_user.id, current_user.username) #add current user id

    results = playlist_schema.dump(playlists)


    db.session.add(playlists)
    db.session.commit()

    # return jsonify ( {
    #     "name": playlists.name,
    #     "likes": playlists.likes,
    #     "playlist": playlists.playlist,
    #     "author": current_user.username
    # }
    # )

    return jsonify(results)

@app.route('/getPlaylistsFromUser', methods=['GET'])
@jwt_required(locations='cookies')
def get_user_playlists():
    id = current_user.id
    all_playlists = User.query.get(id).playlists
    results = playlists_schema.dump(all_playlists)
    return jsonify(results)


@app.before_first_request
def create_tables():
    db.drop_all()
    db.create_all()
    db.session.add(User(username="test", password="test", image_file="default.jpg"))
    db.session.add(User(username="dwayne", password="test", image_file="default.jpg"))
    db.session.commit()

    
if __name__ == '__main__' :
    app.run(debug=True)

