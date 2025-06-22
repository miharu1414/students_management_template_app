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

def GetAttends(option="None"):
    sql1 = "SELECT ATTEND_ID,ATTEND FROM ATTEND_INFO"
    cur.execute(sql1, )
    data = cur.fetchall()

    if option != "open":
        conn.commit()
        cur.close()
        conn.close()
    attendsData = []
    for i in range(len(data)):
        attendData = {
            "attend_id" : str(data[i][0]), 
            "attend_name" : data[i][1]}
        attendsData.append(attendData)
    return { "attendsData" : attendsData }


if __name__ == "__main__":
    print(GetAttends())
