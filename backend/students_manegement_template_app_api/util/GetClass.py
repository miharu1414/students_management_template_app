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

def GetClass(class_id, option="None"):
    sql1 = "SELECT CLASS_ID, CLASS, AREA_COLOR, BORDER_COLOR FROM CLASS_INFO WHERE CLASS_ID = %s;"
    cur.execute(sql1, (class_id, ))
    data = cur.fetchall()

    if option != "open":
        conn.commit()
        cur.close()
        conn.close()

    classData = {
        "class_id" : str(data[0][0]), 
        "class_name" : data[0][1],
        "area_color" : data[0][2],
        "border_color" : data[0][3],
    }
    return classData


if __name__ == "__main__":
    print(GetClass(1))
