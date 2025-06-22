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

def DeleteAttendDatas(class_id, date, option="None"):
    try:
        sql1 = "DELETE FROM STUDENT_ATTEND_INFO WHERE CLASS_ID = %s AND DATE = %s AND ATTEND_ID != 3;"
        cur.execute(sql1, (str(class_id),date, ))

        if option != "open":
            conn.commit()
            cur.close()
            conn.close()

        result = {
            "status": "success"
            }
        return result
    except:
        result = {
            "status": "failed"
            }
        return result
        


if __name__ == "__main__":
    print(DeleteAttendDatas("1","2023-09-15"))
