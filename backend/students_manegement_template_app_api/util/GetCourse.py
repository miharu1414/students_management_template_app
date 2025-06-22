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


def GetCourse(course_id, option="None"):
    cur = conn.cursor()
    sql1 = "SELECT * FROM COURSE_INFO WHERE COURSE_ID = %s;"
    cur.execute(sql1, (course_id, ))
    data = cur.fetchall()

    if option != "open": 
        conn.commit()
        cur.close()
        conn.close()

    classData = {
        "course_id" : str(data[0][0]),
        "course_name" : data[0][1]
    }
    return classData


if __name__ == "__main__":
    print(GetCourse(1))
