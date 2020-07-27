from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/pattern')
def say_hello():
    return f"Hello From Flask"
