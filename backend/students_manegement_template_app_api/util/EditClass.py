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


def EditClass(edited_class_name, class_id, area_color, border_color):
    error = 0
    try:
        sql1 = "UPDATE CLASS_INFO SET CLASS = %s, AREA_COLOR = %s, BORDER_COLOR = %s WHERE CLASS_ID = %s;"
        cur.execute(sql1, (edited_class_name, area_color, border_color, class_id))
        conn.commit()
    except:
        print("errorが出てます")
        error = 1
    
    cur.close()
    conn.close()

    return error


if __name__ == "__main__":
    print(EditClass('木曜クラス', 1))
