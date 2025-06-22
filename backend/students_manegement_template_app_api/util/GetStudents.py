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


def GetStudents(option="None"):
    sql1 = "SELECT STUDENT_ID, NAME, KANA, CLASS_ID, COURSE_ID, ADDRESS, SUBSTITUTE_DAY, MEMO, LAST_UPDATE, DELETE_FLAG,ADDRESS_OWNER,ADDRESS_SUB,ADDRESS_SUB_OWNER FROM STUDENT WHERE DELETE_FLAG = 0;"

    cur.execute(sql1)
    data = cur.fetchall()

    studentsData = []

    for i in range(len(data)):
        class_name = GetClass(data[i][3], 'open')
        course_name = GetCourse(data[i][4], 'open')
        name = ascii_to_string(data[i][1])
        kana = ascii_to_string(data[i][2])
        studentData = {
            "id": str(data[i][0]),
            "name": name,
            "kana": kana,
            "class_id": str(data[i][3]),
            "class_name": class_name['class_name'],
            "course_id": str(data[i][4]),
            "course_name": course_name['course_name'],
            "address": data[i][5],
            "subDay": str(data[i][6]),
            "memo": data[i][7],
            "update": data[i][8].strftime("%Y-%m-%d"),
            "delete_flag": str(data[i][9]),
            "address_owner": data[i][10],
            "address_sub": data[i][11],
            "address_sub_owner": data[i][12]
        }
        studentsData.append(studentData)

    if option != "open":
        conn.commit()
        cur.close()
        conn.close()
    datas = {"studentsData": studentsData}
    return datas


if __name__ == "__main__":
    print(GetStudents())
