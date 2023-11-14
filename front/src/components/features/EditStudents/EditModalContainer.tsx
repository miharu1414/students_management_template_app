import { FC, useEffect, useState } from "react";
import EditModal from "./EditModal";
import { json } from "react-router-dom";

type EditModalContainerProps = {
    studentId: string,
    GetStudentInfo: () => void,
}

export type studentInfo = {
    studentId: string,
    name: string,
    kana: string,
    class_name: string,
    class_id: string,
    course_name: string,
    course_id: string,
    address: string,
    subDay: number,
    memo: string,
    update: string,
    address_owner: string,
    address_sub: string,
    address_sub_owner: string,
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
            class_id: "",
            course_name: "",
            course_id: "",
            address: "",
            subDay: 0,
            memo: '',
            update: '',
            address_owner: "",
            address_sub:"",
            address_sub_owner:""
        },
    );

    const [loading, setLoading] = useState<boolean>(false)
    const [error1, setError1] = useState<boolean>(false)
    const [error2, setError2] = useState<boolean>(false)
    const [error3, setError3] = useState<boolean>(false)
    const [classes, setClasses] = useState<Array<classInfo>>([])
    const [courses, setCourses] = useState<Array<courseInfo>>([])
    
    const GetStudentInfo = async () => {
      setLoading(true)
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
            setStudentInfo({studentId: rest.studentId, name: jsonData.name, kana: jsonData.kana, class_name: jsonData.class_name, class_id: jsonData.class_id, course_name: jsonData.course_name, course_id: jsonData.course_id, address: jsonData.address, subDay: jsonData.substitute_day, memo: jsonData.memo, update: jsonData.last_update, address_owner:jsonData.address_owner,address_sub:jsonData.address_sub,address_sub_owner:jsonData.address_sub_owner})
            
            setError1(false)
          } catch (error) {
            // エラーハンドリング
            setError1(true)
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
            
            setError2(false)
          } catch (error) {
            // エラーハンドリング
            setError2(true)
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

            setCourses(newCourses)
           
            setError3(false)
          } catch (error) {
            // エラーハンドリング
            setError3(true)
            console.error('POSTリクエストエラー:', error);
          }
          setLoading(false)
    }

    const updateClass = (newClass: string)=> {
        const newValue = studentInfo
        newValue.class_id = newClass
        setStudentInfo(newValue)
    } 

    const updateCourse = (newCourse: string)=> {
        const newValue = studentInfo
        newValue.course_id = newCourse
        setStudentInfo(newValue)
    } 

    const updateSubday = (newSubday: number)=> {
      const newValue = studentInfo
      newValue.subDay = newSubday
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
    const updateAddressOwner = (newAddressOwner: string)=> {
      setStudentInfo((prevValue)=>({
          ...prevValue,
          address_owner: newAddressOwner,
      }))
  } 
    const updateAddressSub = (newAddressSub: string)=> {
      setStudentInfo((prevValue)=>({
          ...prevValue,
          address_sub: newAddressSub,
      }))
    }
      const updateAddressSubOwner = (newAddressSubOwner: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            address_sub_owner: newAddressSubOwner,
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
                class_id: studentInfo.class_id,
                course_id: studentInfo.course_id,
                address: studentInfo.address,
                substitute_day: studentInfo.subDay,
                memo: studentInfo.memo,
                address_owner: studentInfo.address_owner,
                address_sub: studentInfo.address_sub,
                address_sub_owner: studentInfo.address_sub_owner
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
         

        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
  } 

  const handleOnClick = async () => {
    
    await GetStudentInfo()
    await GetClasses()
    await GetCourses()
 
    
  }



    return (
        <EditModal
           studentInfo={studentInfo}
           classes={classes}
           courses={courses}
           loading={loading}
           error1={error1}
           error2={error2}
           error3={error3}
           onClickUpdateStudentInfo={handleUpdateStudentInfo}
           onClickDeleteStudentInfo={handleDeleteStudentInfo}
           updateClass={updateClass}
           updateCourse={updateCourse}
           updateAddress={updateAddress}
           updateMemo={updateMemo}
           updateSubday={updateSubday}
           updateAddressOwner={updateAddressOwner}
           updateAddressSub={updateAddressSub}
           updateAddressSubOwner={updateAddressSubOwner}
           onClick={handleOnClick}

           GetStudentInfo={rest.GetStudentInfo}
        />
    )
}

export default EditModalContainer;