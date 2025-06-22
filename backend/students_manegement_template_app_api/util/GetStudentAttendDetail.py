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
from GetAttends import GetAttends
from GetStudent import GetStudent
from DateToFiscalYear import DateToFiscalYear

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


def GetStudentAttendDetail(student_id, option="None"):

    studentData = GetStudent(student_id,"open")

    sql1 = "SELECT ATTEND_ID, DATE, STUDENT_ATTEND_ID FROM STUDENT_ATTEND_INFO WHERE STUDENT_ID = %s;"
    cur.execute(sql1,(student_id,))
    data = cur.fetchall()
    attendInfo = GetAttends()["attendsData"]
    attendId2Name = {}
    for attend in attendInfo:
        attendId2Name[str(attend["attend_id"])] = attend["attend_name"]
    attendData = []

    for i in range(len(data)):
        oneData = {"status": attendId2Name[str(data[i][0])],"date":data[i][1].strftime("%Y-%m-%d"),"studentAttendId":data[i][2],"fiscalYear":DateToFiscalYear(data[i][1].strftime("%Y-%m-%d"))}
        attendData.append(oneData)


    if option != "open":
        conn.commit()
        cur.close()
        conn.close()
    
    data = {"id":student_id, "studentsData":studentData, "attendData":attendData}
    return data


if __name__ == "__main__":
    print(GetStudentAttendDetail("8"))
