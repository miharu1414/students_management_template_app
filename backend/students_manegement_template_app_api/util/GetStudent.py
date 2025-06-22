#!/usr/local/bin/python
# coding: utf-8
import mysql.connector as mydb
import requests
import os
import json
from collections import defaultdict
import sys
from decode import ascii_to_string

from datetime import datetime, timedelta

import os
from decouple import config

# 環境変数の情報
from GetClass import GetClass
from GetCourse import GetCourse

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


def GetStudent(student_id, option="None"):
    sql1 = "SELECT STUDENT_ID,NAME,KANA,CLASS_ID,COURSE_ID,ADDRESS,SUBSTITUTE_DAY,MEMO,LAST_UPDATE,DELETE_FLAG,ADDRESS_OWNER,ADDRESS_SUB,ADDRESS_SUB_OWNER FROM STUDENT WHERE STUDENT_ID = %s;"
    cur.execute(sql1, (student_id,))
    data = cur.fetchall()

    class_name = GetClass(data[0][3], "open")
    course_name = GetCourse(data[0][4], "open")
    name = ascii_to_string(data[0][1])
    kana = ascii_to_string(data[0][2])
    studentData = {
        "id": str(data[0][0]),
        "name": name,
        "kana": kana,
        "class_id": str(data[0][3]),
        "class_name": class_name['class_name'],
        "course_id": str(data[0][4]),
        "course_name": course_name['course_name'],
        "address": data[0][5],
        "substitute_day": data[0][6],
        "memo": data[0][7],
        "last_update": data[0][8].strftime("%Y-%m-%d"),
        "delete_flag": str(data[0][9]),
        "address_owner": data[0][10],
        "address_sub": data[0][11],
        "address_sub_owner": data[0][12]
    }
    
    
    
    if option != "open":
        conn.commit()
        cur.close()
        conn.close()

    return studentData


if __name__ == "__main__":
    print(GetStudent(1))
