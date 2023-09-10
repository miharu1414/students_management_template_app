
import os
from flask import Flask, render_template, request, jsonify, current_app
import json
from flask_cors import CORS
from flask_mail import Message, Mail

app = Flask(__name__)

CORS(app)
app.config.from_object(Config)
mail = Mail(app)

@app.route('/')
@app.route('/hello')
def hello():
    return '<h1>Hello World</h1>'

@app.route('/goodbye')
def bye():
    return '<h1>Good bye!</h1>'

if __name__ == '__main__':
    app.run(debug=True)