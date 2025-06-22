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


def DeleteStudentAttendance(student_attend_id):
    error = 0
    try:
        sql1 = "DELETE FROM STUDENT_ATTEND_INFO WHERE STUDENT_ATTEND_ID = %s;"
        cur.execute(sql1, (student_attend_id, ))
        conn.commit()
    except:
        error = 1
    
    cur.close()
    conn.close()

    return error


if __name__ == "__main__":
    print(DeleteStudentAttendance(32))
