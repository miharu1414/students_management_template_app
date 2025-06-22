#!/usr/local/bin/python
# coding: utf-8
import mysql.connector as mydb
import requests
import os
import json
from collections import defaultdict
import sys
from encode import string_to_ascii

from datetime import datetime, timedelta

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


def EditStudent(data, student_id):
    error = 0
    try:
        data["name"] = string_to_ascii(data["name"])
        data["kana"] = string_to_ascii(data["kana"])
        sql1 = "UPDATE STUDENT SET NAME = %s, KANA = %s, CLASS_ID = %s, COURSE_ID = %s, ADDRESS = %s, SUBSTITUTE_DAY = %s, MEMO =%s, ADDRESS_OWNER = %s, ADDRESS_SUB = %s, ADDRESS_SUB_OWNER = %s WHERE STUDENT_ID = %s;"
        cur.execute(sql1, (data["name"], data["kana"], data["class_id"], data["course_id"], data["address"], data["substitute_day"], data["memo"],data["address_owner"],data["address_sub"],data["address_sub_owner"], student_id,))
        conn.commit()
    except:
        print("errorが出てます")
        error = 1
    
    cur.close()
    conn.close()

    return error


if __name__ == "__main__":
    print(EditStudent({'name': '青空 太郎', 'kana': 'あおぞら たろう', 'class_id': 8, 'course_id': 10, 'address': '07089441675', 'substitute_day': 1, 'memo': 'ラーメン',"address_owner":"父親","address_sub":"","address_sub_owner":""}, 16))
