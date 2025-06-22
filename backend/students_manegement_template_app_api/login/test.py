#!/usr/local/bin/python
# coding: utf-8
import mysql.connector as mydb
import requests
import os
import json
from collections import defaultdict
import sys
from flask import Flask, current_app
from datetime import datetime, timedelta

import os
from decouple import config

# 環境変数の情報

DB_HOST = config("DB_HOST")
DB_USER = config("DB_USER")
DB_PASSWORD = config("DB_PASSWORD")
DB = config("DB")





def GetPassword(user_name):
    print(DB_PASSWORD)
    return "ok"


if __name__ == "__main__":
    print(GetPassword("admin"))
