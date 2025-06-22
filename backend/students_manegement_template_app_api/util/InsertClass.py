#!/usr/local/bin/python
# coding: utf-8
import mysql.connector as mydb
import requests
import os
import json
from collections import defaultdict
import sys

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

def InsertClass(new_class_name):
    error = 0
    today = datetime.now().strftime('%Y-%m-%d')  # 1. ここで修正
    try:
        sql1 = "INSERT INTO CLASS_INFO (CLASS, LAST_UPDATE) VALUES (%s, %s);"
        cur.execute(sql1, (new_class_name, today,))
        conn.commit()
    except Exception as e:
        print("エラーが発生しました:", e)
        error = 1
    
    # 2. cur.close() と conn.close() をここに移動
    cur.close()
    conn.close()

    return error

if __name__ == "__main__":
    print(InsertClass('木曜クラス'))
