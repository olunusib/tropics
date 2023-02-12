from flask import Flask

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Best",
        "about" :"Auburn Hacks"
    }

    return response_body