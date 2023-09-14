import { FC, useEffect, useState } from "react";
import EditCourseModal from "./EditCourseModal";

type EditCourseModalContainerProps = {
    courseId: string,
}

export type courseInfo = {
    courseId: string,
    courseName: string,
}

const EditCourseModalContainer: FC<EditCourseModalContainerProps> =  (props) => {
    const {...rest} = props;

    const [courseInfo, setCourseInfo] = useState<courseInfo>(
        {
            courseId: "",
            courseName: "",
        },
    );

    const GetCourseInfo = async () => {
      try {
          console.log(rest.courseId)
          const URL = process.env.REACT_APP_UTIL_API + 'getCourse';
          const response = await fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              // 必要な場合、他のヘッダーも追加できます
            },
            body: JSON.stringify({course_id: rest.courseId}),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          // リクエストが成功した場合の処理
          console.log(response);
    
          // JSONデータを取得
          const jsonData = await response.json();
          // 任意の追加処理をここで行う
          setCourseInfo({courseId: rest.courseId, courseName: jsonData.course_name})
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
  }
    
    const updateCourse = (newCourse: string)=> {
        console.log(courseInfo)
        console.log(newCourse)
        const newValue = courseInfo
        console.log(newValue)
        newValue.courseName = newCourse
        console.log(newValue)
        setCourseInfo({courseName: newValue.courseName, courseId: newValue.courseId})
    } 

    const handleUpdateCourseInfo = async () => {
        try {
            console.log(courseInfo.courseName)
            const URL = process.env.REACT_APP_UTIL_API + 'editCourse';
            const response = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 必要な場合、他のヘッダーも追加できます
              },
              body: JSON.stringify({
                edited_course_name: courseInfo.courseName,
                course_id: courseInfo.courseId,
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
        console.log(courseInfo)
    },[courseInfo])


    return (
        <EditCourseModal
           courseInfo={courseInfo}
           onClickUpdateCourseInfo={handleUpdateCourseInfo}
           updateCourse={updateCourse}
           getCourseInfo={GetCourseInfo}
        />
    )
}

export default EditCourseModalContainer;