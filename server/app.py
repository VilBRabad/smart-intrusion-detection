from flask import Flask, jsonify, request, session, Response
import os
from flask_cors import CORS
from supabase import create_client
from utils import *
# from flask_socketio import SocketIO, emit
# import logging
import cv2
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app)
# socketio = SocketIO(app, cors_allowed_origins="*")

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)


@app.route("/")
def home():
    # print("******VILAS**********")
    return "Vilas"

@app.route('/upload', methods=['POST'])
def upload_image():
    image_data = request.json['imageData']
    print("VILAS*****************")
    # Process image_data as needed (e.g., save to disk, perform operations)
    return 'Image received and processed successfully!'


#********************** User Auth ************************
@app.route("/sign-up", methods=['POST'])
def register():
    req = request.json
    print(req)
    try:
        if req:
            email = req.get("email")
            password = req.get("password")
            if email == "" or password == "":
                return jsonify({"status": 401, "error": "Email or password can not empty"})
            
            checkUser = supabase.table("users").select("*").eq("email", email).execute()
            if len(checkUser.data) != 0:
                return jsonify({"status": 401, "error": "Email id already exists!"})
            
            hashed = hashedPassword(password)
            # print(hashed)

            db_res = supabase.table("users").insert({"email": email, "password": hashed}).execute()
            if db_res:
                return jsonify({"status": 201, "message": "register successfully"})
            else:
                return jsonify({"status": 400, "error": "unable to register"}) 

    except Exception as err:
        return jsonify({"status": 500, "error": "Server Error!"})


@app.route("/sign-in", methods=['POST'])
def login():
    try:
        req = request.json
        if req:
            email = req.get("email")
            password = req.get("password")
            if email == "" or password == "":
                return jsonify({"status": 401, "error": "Email or password can not empty"})
            
            db_res = supabase.table("users").select("*").eq("email", email).execute()
            data = db_res.data
            if len(data) == 0:
                return jsonify({"status": 401, "error": "Wrong Credentials"})
            
            # print("Vilas", data[0]['password'])
            hased = data[0]['password']
            if CheckPassword(password, hased):
                print("VIlas", email)
                session['user'] = email
                return jsonify({"status": 201, "message": "login successfully", "user": email})
            else:
                return jsonify({"status": 400, "error": "Wrong Credentials"})
            
    except Exception as err:
        return jsonify({"status": 500, "error": "Server Error!"})

@app.route("/logout", methods=['POST'])
def logout():
    session.pop("user", None)
    return jsonify({"status": 201, "message": "Logout Successfully"})

@app.route("/is-login", methods=['POST'])
def isLogin():
    if "user" in session:
        user = session["user"]
        return jsonify({"status":200, "message": "user loged in", "user":user})
    return jsonify({"status":401, "error": "please login...."})


if __name__ == '__main__':
    # socketio.run(app, debug=True, port=5000)
    app.run(debug=True)

