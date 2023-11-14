import { FC, useEffect, useState } from "react";
import NewStudentModal from "./NewStudentModal";


export type studentInfo = {
    id: string,
    name: string,
    kana: string,
    class_name: string,
    course_name: string,
    address: string,
    subDay: number,
    memo: string,
    update: string,
    address_owner: string,
    address_sub: string,
    address_sub_owner: string,
}

type NewStudentModalContainerProps = {
  GetStudentInfo: () => void,
}

export type classInfo = {
    classId: string,
    className: string,
}

export type courseInfo = {
    courseId: string,
    courseName: string,
}


const NewStudentModalContainer: FC<NewStudentModalContainerProps> = (props) => {
    const { ...rest } = props;

    const [studentInfo, setStudentInfo] = useState<studentInfo>(
        {
            id: "",
            name: "",
            kana: "",
            class_name: "",
            course_name: "",
            address: "",
            subDay: 0,
            memo: '',
            update: '',
            address_owner: "",
            address_sub:"",
            address_sub_owner:""
        },
    );

    const [classes, setClasses] = useState<Array<classInfo>>([])
    const [courses, setCourses] = useState<Array<courseInfo>>([])

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

    const updateName = (newName: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            name:  newName,
        }))
    } 

    const updateKana = (newKana: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            kana:  newKana,
        }))
    } 

    const updateClass = (newClass: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            class_name:  newClass,
        }))
    } 

    const updateCourse = (newCourse: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            course_name:  newCourse,
        }))
    } 

    const updateAddress = (newAddress: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            address:  newAddress,
        }))
    } 

    const updateMemo = (newMemo: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            memo:  newMemo,
        }))
    } 

    const updateSubday = (newSubday: number)=> {
      setStudentInfo((prevValue)=>({
          ...prevValue,
          subDay:  newSubday,
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

    const handleInsertStudentInfo = async () => {
        try {
            console.log(studentInfo.course_name)
            const URL = process.env.REACT_APP_UTIL_API + 'insertStudent';
            const response = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 必要な場合、他のヘッダーも追加できます
              },
              body: JSON.stringify({
                name: studentInfo.name,
                kana: studentInfo.kana,
                class_id: studentInfo.class_name,
                course_id: studentInfo.course_name,
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
            // 任意の追加処理をここで行う
            console.log('unnko')
            setStudentInfo({
              id: "",
              name: "",
              kana: "",
              class_name: "",
              course_name: "",
              address: "",
              subDay: 0,
              memo: '',
              update: '',
              address_owner: "",
              address_sub:"",
              address_sub_owner:""
          },)

          } catch (error) {
            // エラーハンドリング
            console.error('POSTリクエストエラー:', error);
          }
    } 

    useEffect(() => {
        console.log(studentInfo)
    },[studentInfo])


    return (
        <NewStudentModal
           studentInfo={studentInfo}
           classes={classes}
           courses={courses}
           onClickInsertStudentInfo={handleInsertStudentInfo}
           updateName={updateName}
           updateKana={updateKana}
           updateClass={updateClass}
           updateCourse={updateCourse}
           updateAddress={updateAddress}
           updateMemo={updateMemo}
           updateSubday={updateSubday}
           updateAddressOwner={updateAddressOwner}
           updateAddressSub={updateAddressSub}
           updateAddressSubOwner={updateAddressSubOwner}
           onGetClasses={GetClasses}
           onGetCourses={GetCourses}
           GetStudentInfo={rest.GetStudentInfo}
        />
    )
}

export default NewStudentModalContainer;