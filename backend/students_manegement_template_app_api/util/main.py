#!/usr/local/bin/python
import os
from flask import Flask, render_template, request, jsonify, current_app
import json
from flask_cors import CORS

from decouple import config

# APIはこれ以下
from GetClass import GetClass
from GetCourse import GetCourse
from GetStudent import GetStudent
from GetClasses import GetClasses
from GetClassesNoneUpdate import GetClassesNoneUpdate
from GetCourses import GetCourses
from GetStudents import GetStudents
from GetStudentsForSubmit import GetStudentsForSubmit
from GetStudentAttendDetail import GetStudentAttendDetail
from GetExtraData import GetExtraData
from InsertClass import InsertClass
from InsertCourse import InsertCourse
from InsertStudent import InsertStudent
from InsertStudentsAttendance import InsertStudentsAttendance
from InsertStudentAttendance import InsertStudentAttendance
from InsertExtraStudentsAttendance import InsertExtraStudentsAttendance
from EditCourse import EditCourse
from EditClass import EditClass
from EditStudent import EditStudent
from DeleteStudent import DeleteStudent
from DeleteAttendDatas import DeleteAttendDatas
from DeleteExtraAttendDatas import DeleteExtraAttendDatas
from DeleteStudentAttendance import DeleteStudentAttendance

app = Flask(__name__)

# .env ファイルから COMMENT 変数を読み込む


CORS(app)


@app.route('/')
def route():
    return '<h1>やほう</h1>'


@app.route('/login', methods=["GET", "POST"])
def signin():
    req = request.args
    user_name = req.get("user_name")
    password = req.get("password")

    return '<h1>Hello World</h1>'


@app.route('/getClass', methods=["GET", "POST"])
def getClass():
    request_data = request.json
    class_id = request_data.get('class_id')
    data = GetClass(class_id)
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getClasses', methods=["GET", "POST"])
def getClasses():
    data = GetClasses()
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getClassesNoneUpdate', methods=["GET", "POST"])
def getClassesNoneUpdate():
    data = GetClassesNoneUpdate()
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/insertClass', methods=["GET", "POST"])
def insertClass():
    request_data = request.json
    new_class_name = request_data.get('new_class_name')
    message = InsertClass(new_class_name)
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/editClass', methods=["GET", "POST"])
def editClass():
    request_data = request.json
    edited_class_name = request_data.get('edited_class_name')
    class_id = request_data.get('class_id')
    area_color = request_data.get('area_color')
    border_color = request_data.get('border_color')
    message = EditClass(edited_class_name, class_id, area_color, border_color)
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getCourse', methods=["GET", "POST"])
def getCourse():
    request_data = request.json
    course_id = request_data.get('course_id')
    data = GetCourse(course_id)
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getCourses', methods=["GET", "POST"])
def getCourses():
    data = GetCourses()
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/insertCourse', methods=["GET", "POST"])
def insertCourse():
    request_data = request.json
    new_course_name = request_data.get('new_course_name')
    message = InsertCourse(new_course_name)
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/editCourse', methods=["GET", "POST"])
def editCourse():
    request_data = request.json
    edited_course_name = request_data.get('edited_course_name')
    course_id = request_data.get('course_id')
    message = EditCourse(edited_course_name, course_id)
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getStudent', methods=["GET", "POST"])
def getStudent():
    request_data = request.json
    student_id = request_data.get('student_id')
    data = GetStudent(student_id)
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getStudents', methods=["GET", "POST"])
def getStudents():
    data = GetStudents()
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/insertStudent', methods=["GET", "POST"])
def insertStudent():
    request_data = request.json
    data = dict()
    data["name"] = request_data.get('name')
    data["kana"] = request_data.get('kana')
    data["class_id"] = request_data.get('class_id')
    data["course_id"] = request_data.get('course_id')
    data["address"] = request_data.get('address')
    data["substitute_day"] = request_data.get('substitute_day')
    data["memo"] = request_data.get('memo')
    data["address_owner"] = request_data.get('address_owner')
    data["address_sub"] = request_data.get('address_sub')
    data["address_sub_owner"] = request_data.get('address_sub_owner')
    result = InsertStudent(data)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/editStudent', methods=["GET", "POST"])
def editStudent():
    request_data = request.json
    data = dict()
    student_id = request_data.get('student_id')
    data["name"] = request_data.get('name')
    data["kana"] = request_data.get('kana')
    data["class_id"] = request_data.get('class_id')
    data["course_id"] = request_data.get('course_id')
    data["address"] = request_data.get('address')
    data["substitute_day"] = request_data.get('substitute_day')
    data["memo"] = request_data.get('memo')
    data["address_owner"] = request_data.get('address_owner')
    data["address_sub"] = request_data.get('address_sub')
    data["address_sub_owner"] = request_data.get('address_sub_owner')
    message = EditStudent(data, student_id)
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteStudentAttendance', methods=["GET", "POST"])
def deleteStudentAttendance():
    request_data = request.json
    student_attendance_id = request_data.get('student_attendance_id')
    message = DeleteStudentAttendance(student_attendance_id)
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getStudentsForSubmit', methods=["GET", "POST"])
def getStudentsForSubmit():
    request_data = request.json
    classId = request_data.get('class_id')
    date = request_data.get("date")
    result = GetStudentsForSubmit(classId, date)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/insertStudentsAttendance', methods=["GET", "POST"])
def insertStudentsAttendance():
    request_data = request.json
    classId = request_data.get('class_id')
    date = request_data.get("date")
    studentsInfo = request_data.get("studentsInfo")
    result = InsertStudentsAttendance(classId, date, studentsInfo)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertStudentAttendance', methods=["GET", "POST"])
def insertStudentAttendance():
    request_data = request.json
    classId = request_data.get('class_id')
    date = request_data.get("date")
    studentInfo = request_data.get("studentInfo")
    result = InsertStudentAttendance(classId, date, studentInfo)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertExtraStudentsAttendance', methods=["GET", "POST"])
def insertExtraStudentsAttendance():
    request_data = request.json
    classId = request_data.get('class_id')
    date = request_data.get("date")
    studentsInfo = request_data.get("studentsInfo")
    result = InsertExtraStudentsAttendance(classId, date, studentsInfo)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteStudent', methods=["GET", "POST"])
def deleteStudent():
    request_data = request.json
    student_id = request_data.get('student_id')
    message = DeleteStudent(student_id)
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getStudentAttendDetail', methods=["GET", "POST"])
def getStudentAttendDetail():
    request_data = request.json
    student_id = request_data.get('student_id')
    message = GetStudentAttendDetail(student_id)
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getExtraData', methods=["GET", "POST"])
def getExtraData():
    request_data = request.json
    class_id = request_data.get('class_id')
    date = request_data.get('date')
    message = GetExtraData(class_id,date)
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/deleteAttendDatas', methods=["GET", "POST"])
def deleteAttendDatas():
    request_data = request.json
    class_id = request_data.get('class_id')
    date = request_data.get('date')
    message = DeleteAttendDatas(class_id,date)
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteExtraAttendDatas', methods=["GET", "POST"])
def deleteExtraAttendDatas():
    request_data = request.json
    class_id = request_data.get('class_id')
    date = request_data.get('date')
    message = DeleteExtraAttendDatas(class_id,date)
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/test', methods=["GET", "POST"])
def test():
    request_data = request.json
    classId = request_data.get('class_id')
    date = request_data.get("date")
    result = {"message": "test"}
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run(debug=True)
