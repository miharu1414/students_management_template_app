#!/usr/local/bin/python
# coding: utf-8
import mysql.connector as mydb
import requests
import os
import json
from collections import defaultdict
import sys
from datetime import datetime, timedelta, date

import os
from decouple import config

# 環境変数の情報
from GetStudentsByClassId import GetStudentsByClassId
from GetStudent import GetStudent
from GetStudents import GetStudents
from GetClasses import GetClasses

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


def GetExtraData(classId, DATE, option="None"):
    sql1 = "SELECT STUDENT_ID, ATTEND_ID, DATE, CLASS_ID, COURSE_ID FROM STUDENT_ATTEND_INFO WHERE CLASS_ID = %s AND DATE = %s AND ATTEND_ID = 3;"
    cur.execute(sql1, (classId,DATE, ))
    data = cur.fetchall()

    alreadyStudents = []

 

    for i in range(len(data)):
        name = GetStudent(data[i][0],"open")["name"]
        alreadyStudent = {
            "id": str(data[i][0]),
            "name": name,
            "attendId": str(data[i][1]),
            "classId":str(data[i][3]),
            "courseId":str(data[i][4]),

        }
        alreadyStudents.append(alreadyStudent)

    studentsData = GetStudents("open")["studentsData"]
    classesData = GetClasses("open")["class_info"]


    if option != "open":
        conn.commit()
        cur.close()
        conn.close()
    
    data = {"studentsData":studentsData, "alreadyStudents": alreadyStudents, "class_info":classesData, "date": DATE}
    return data


if __name__ == "__main__":
    print(GetExtraData("2","2023-09-14"))
