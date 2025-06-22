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


def GetClasses(option="None"):
    sql1 = "SELECT CLASS_ID,CLASS, LAST_UPDATE, AREA_COLOR, BORDER_COLOR FROM CLASS_INFO;"
    cur.execute(sql1)
    data = cur.fetchall()

    if option != "open":
        conn.commit()
        cur.close()
        conn.close()
    datas = []
    for i in range(len(data)):
        data[i] = list(data[i])
        data[i][0] = str(data[i][0])
        datas.append({"classId":data[i][0], "className": data[i][1], "lastUpdate": data[i][2].strftime("%Y-%m-%d"), "areaColor":data[i][3], "borderColor":data[i][4]})
        
    classData = {"class_info" : datas}
    return classData


if __name__ == "__main__":
    print(GetClasses())
