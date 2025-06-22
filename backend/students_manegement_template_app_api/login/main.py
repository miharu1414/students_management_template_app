#!/usr/local/bin/python
import os
from flask import Flask, render_template, request, jsonify, current_app
import json
from flask_cors import CORS

from decouple import config

# APIはこれ以下
from LoginCheck import LoginCheck


app = Flask(__name__)

# .env ファイルから COMMENT 変数を読み込む


CORS(app)


@app.route('/')
def route():
    return '<h1>やほう</h1>'

@app.route('/login',methods=["GET", "POST"])
def signin():
    # JSONデータを取得
    request_data = request.json

    # JSONデータから"user_name"と"password"を取得
    user_name = request_data.get("user_name")
    password = request_data.get("password")
    result = LoginCheck(user_name,password)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




@app.route('/goodbye')
def bye():
    return '<h1>Good bye!</h1>'

# @app.route('/test')
# def test():
#     response = LoginCheck("admin","111")
#     response = jsonify(response)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response


if __name__ == '__main__':
    app.run(debug=True)
