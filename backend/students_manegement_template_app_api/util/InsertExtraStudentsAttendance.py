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


def InsertExtraStudentsAttendance(class_id, date, studentsInfo, option="None"):
    try:
        sql1 = "DELETE FROM STUDENT_ATTEND_INFO WHERE CLASS_ID = %s AND DATE = %s AND ATTEND_ID = 3;"
        cur.execute(sql1, (class_id, date,))
        
        for i in range(len(studentsInfo)):
            studentInfo = studentsInfo[i]
            sql2 = "INSERT INTO STUDENT_ATTEND_INFO (STUDENT_ID, ATTEND_ID, DATE, CLASS_ID, COURSE_ID) VALUES (%s, %s, %s, %s, %s);"
            cur.execute(sql2, (studentInfo["id"], "3", date, class_id, studentInfo["course_id"],))
        conn.commit()

        if option != "open":
            cur.close()
            conn.close()

        return {"status":"success"}
    except:
        return {"status":"failed"}



if __name__ == "__main__":
    print(InsertExtraStudentsAttendance("1","2023-09-14",[{"id":"1", "attendId":"1", "course_id":"1"},]))
