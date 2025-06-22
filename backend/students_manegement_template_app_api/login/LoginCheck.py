#!/usr/local/bin/python
# coding: utf-8
import mysql.connector as mydb
import requests
import os
import json
from collections import defaultdict
import sys
from flask import Flask, current_app
from datetime import datetime, timedelta

import os
from decouple import config

# 環境変数の情報

DB_HOST = config("DB_HOST")
# DB_USER = config("DB_USER")
# DB_PASSWORD = config("DB_PASSWORD")
# DB = config("DB")


# conn = mydb.connect(
#     host=DB_HOST,
#     user=DB_USER,
#     password=DB_PASSWORD,
#     db=DB,
#     charset='utf8',
#     ssl_disabled=True)
# cur = conn.cursor()


# def LoginCheck(user_name,password):
#     sql1 = "SELECT PASSWORD, USER_ID FROM USER WHERE USER_NAME=%s;"
#     cur.execute(sql1,(user_name,))
#     data = cur.fetchall()

#     conn.commit()
#     cur.close()
#     conn.close()
#     if len(data) == 1 and data[0][0] == password:
#         response = {"status" : "success", "user_name" : user_name, "user_id": data[0][1]}

#     else:
#         response = {"status" : "failed"}
#     return response

def LoginCheck(user_name,password):
    if user_name =="admin":
        response = {"status" : "success", "user_name" : user_name, "user_id": "1"}
    else:
        response = {"status" : "failed"}
    return response

if __name__ == "__main__":
    print(LoginCheck("admin","b59c67bf196a4758191e42f76670ceba"))
