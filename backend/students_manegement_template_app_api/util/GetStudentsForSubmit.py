#!/usr/local/bin/python
# coding: utf-8
import mysql.connector as mydb
import requests
import os
import json
from collections import defaultdict
import sys
from datetime import datetime, timedelta, date
from decode import ascii_to_string
import os
from decouple import config

# 環境変数の情報
from GetStudentsByClassId import GetStudentsByClassId
from GetStudent import GetStudent

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


def GetStudentsForSubmit(classId, DATE, option="None"):
    sql1 = "SELECT STUDENT_ID, ATTEND_ID, DATE, CLASS_ID, COURSE_ID FROM STUDENT_ATTEND_INFO WHERE CLASS_ID = %s AND DATE = %s AND ATTEND_ID != 3;"
    cur.execute(sql1, (classId, DATE, ))
    data = cur.fetchall()

    studentsData = []

    if len(data) == 0:
        # 過去に登録していないならば。

        students = GetStudentsByClassId(classId, "open")["studentsData"]

        for i in range(len(students)):
            studentData = {
                "id": str(students[i]["id"]),
                "name": (students[i]["name"]),
                "attendId": "",
                "classId": classId,
                "courseId": str(students[i]["course_id"]),

            }
            studentsData.append(studentData)

    else:
        for i in range(len(data)):
            name = GetStudent(data[i][0], "open")["name"]
            studentData = {
                "id": str(data[i][0]),
                "name": name,
                "attendId": str(data[i][1]),
                "classId": str(data[i][3]),
                "courseId": str(data[i][4]),

            }
            studentsData.append(studentData)

    if option != "open":
        conn.commit()
        cur.close()
        conn.close()

    data = {"studentsData": studentsData, "date": DATE}
    return data


if __name__ == "__main__":
    print(GetStudentsForSubmit("3", "2023-09-22"))
