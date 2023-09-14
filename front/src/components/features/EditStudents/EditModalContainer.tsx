import { FC, useEffect, useState } from "react";
import EditModal from "./EditModal";

type EditModalContainerProps = {
    studentId: string,
}

export type studentInfo = {
    studentId: string,
    name: string,
    kana: string,
    class_name: string,
    course_name: string,
    address: string,
    subDay: number,
    memo: string,
    update: string,
}

export type classInfo = {
    classId: string,
    className: string,
}

export type courseInfo = {
    courseId: string,
    courseName: string,
}

const EditModalContainer: FC<EditModalContainerProps> =  (props) => {
    const {...rest} = props;

    const [studentInfo, setStudentInfo] = useState<studentInfo>(
        {
            studentId: "",
            name: "",
            kana: "",
            class_name: "",
            course_name: "",
            address: "",
            subDay: 0,
            memo: '',
            update: '',
        },
    );
    const [classes, setClasses] = useState<Array<classInfo>>([])
    const [courses, setCourses] = useState<Array<courseInfo>>([])
    
    const GetStudentInfo = async () => {
        try {
            console.log(rest.studentId)
            const URL = process.env.REACT_APP_UTIL_API + 'getStudent';
            const response = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 必要な場合、他のヘッダーも追加できます
              },
              body: JSON.stringify({student_id: rest.studentId}),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            // リクエストが成功した場合の処理
            console.log(response);
      
            // JSONデータを取得
            const jsonData = await response.json();
            // 任意の追加処理をここで行う
            setStudentInfo({studentId: rest.studentId, name: jsonData.name, kana: jsonData.kana, class_name: jsonData.class_name, course_name: jsonData.course_name, address: jsonData.address, subDay: jsonData.substitute_day, memo: jsonData.memo, update: jsonData.last_update})
          } catch (error) {
            // エラーハンドリング
            console.error('POSTリクエストエラー:', error);
          }
    }

    const GetClasses = async () => {
        try {
            const URL = process.env.REACT_APP_UTIL_API + 'getClasses';
            const response = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 必要な場合、他のヘッダーも追加できます
              },
              body: JSON.stringify({}),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            // リクエストが成功した場合の処理
            console.log(response);
      
            // JSONデータを取得
            const jsonData = await response.json();
            // 任意の追加処理をここで行う

            const newClasses: classInfo[] = [];
            jsonData.class_info.map((classData:classInfo) => {
                console.log(classData)
                newClasses.push(classData)
            })
            setClasses(newClasses)
          } catch (error) {
            // エラーハンドリング
            console.error('POSTリクエストエラー:', error);
          }
    }

    const GetCourses = async () => {
        try {
            const URL = process.env.REACT_APP_UTIL_API + 'getCourses';
            const response = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 必要な場合、他のヘッダーも追加できます
              },
              body: JSON.stringify({}),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            // リクエストが成功した場合の処理
            console.log(response);
      
            // JSONデータを取得
            const jsonData = await response.json();
            // 任意の追加処理をここで行う

            const newCourses: courseInfo[] = [];
            jsonData.course_info.map((courseData:courseInfo) => {
                newCourses.push(courseData)
            })
            console.log(newCourses)
            setCourses(newCourses)
          } catch (error) {
            // エラーハンドリング
            console.error('POSTリクエストエラー:', error);
          }
    }

    const updateClass = (newClass: string)=> {
        const newValue = studentInfo
        newValue.class_name = newClass
        setStudentInfo(newValue)
    } 

    const updateCourse = (newCourse: string)=> {
        const newValue = studentInfo
        newValue.course_name = newCourse
        setStudentInfo(newValue)
    } 

    const updateAddress = (newAddress: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            address: newAddress,
        }))
    } 

    const updateMemo = (newMemo: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            memo: newMemo,
        }))
    } 

    const handleUpdateStudentInfo = async () => {
        try {
            console.log(studentInfo.course_name)
            const URL = process.env.REACT_APP_UTIL_API + 'editStudent';
            const response = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 必要な場合、他のヘッダーも追加できます
              },
              body: JSON.stringify({
                student_id: studentInfo.studentId,
                name: studentInfo.name,
                kana: studentInfo.kana,
                class_id: studentInfo.class_name,
                course_id: studentInfo.course_name,
                address: studentInfo.address,
                substitute_day: studentInfo.subDay,
                memo: studentInfo.memo,
              }),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            // リクエストが成功した場合の処理
            console.log(response);
      
            // JSONデータを取得
            console.log(studentInfo.kana)
            const jsonData = await response.json();
            // 任意の追加処理をここで行う
            console.log('unnko')

          } catch (error) {
            // エラーハンドリング
            console.error('POSTリクエストエラー:', error);
          }
    } 

    const handleDeleteStudentInfo = async () => {
      try {
          const URL = process.env.REACT_APP_UTIL_API + 'deleteStudent';
          const response = await fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              // 必要な場合、他のヘッダーも追加できます
            },
            body: JSON.stringify({
              student_id: studentInfo.studentId,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          // リクエストが成功した場合の処理
          console.log(response);
    
          // JSONデータを取得
          // 任意の追加処理をここで行う
          console.log('unnko')

        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
  } 

    useEffect(() => {
        console.log(studentInfo)
    },[studentInfo])


    return (
        <EditModal
           studentInfo={studentInfo}
           classes={classes}
           courses={courses}
           onClickUpdateStudentInfo={handleUpdateStudentInfo}
           onClickDeleteStudentInfo={handleDeleteStudentInfo}
           updateClass={updateClass}
           updateCourse={updateCourse}
           updateAddress={updateAddress}
           updateMemo={updateMemo}
           onGetStudent={GetStudentInfo}
           onGetClasses={GetClasses}
           onGetCourses={GetCourses}
        />
    )
}

export default EditModalContainer;