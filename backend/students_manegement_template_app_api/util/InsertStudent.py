#!/usr/local/bin/python
# coding: utf-8
import mysql.connector as mydb
import requests
import os
import json
from collections import defaultdict
import sys
from datetime import datetime, timedelta
from encode import string_to_ascii

import os
from decouple import config

# 環境変数の情報

DB_HOST = config("DB_HOST")
DB_USER = config("DB_USER")
DB_PASSWORD = config("DB_PASSWORD")
DB = config("DB")


conn = mydb.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    db=DB,
    charset='utf8',
    ssl_disabled=True)
cur = conn.cursor()


def InsertStudent(data):
    error = 0
    # try:
    data["name"] = string_to_ascii(data["name"])
    data["kana"] = string_to_ascii(data["kana"])
    sql1 = "INSERT INTO STUDENT (NAME, KANA, CLASS_ID, COURSE_ID, ADDRESS, SUBSTITUTE_DAY, MEMO,ADDRESS_OWNER,ADDRESS_SUB,ADDRESS_SUB_OWNER) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s,%s);"
    cur.execute(sql1, (data["name"], data["kana"], data["class_id"], data["course_id"], data["address"], data["substitute_day"], data["memo"],data["address_owner"],data["address_sub"],data["address_sub_owner"],))
    conn.commit()
    # except:
    #     print("errorが出てます")
    #     error = 1
    
    cur.close()
    conn.close()

    return error


if __name__ == "__main__":
    print(InsertStudent({'name': 'いがいが', 'kana': 'いがいが', 'class_id': 1, 'course_id': 1, 'address': '07089441675', 'substitute_day': 1, 'memo': 'ラーメン', "address_owner": "000", "address_sub": "000", "address_sub_owner": "000"}))
