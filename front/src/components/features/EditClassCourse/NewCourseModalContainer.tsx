import { FC, useEffect, useState } from "react";
import NewCourseModal from "./NewCourseModal";


export type courseInfo = {
    courseId: string,
    courseName: string,
}

type NewCourseModalContainerProps = {
  GetCoursesInfo: () => void,
}

const NewCourseModalContainer: FC<NewCourseModalContainerProps> = (props) => {
    const { ...rest } = props;

    const [courseInfo, setCourseInfo] = useState<courseInfo>(
        {
            courseId: "",
            courseName: "",
        },
    );

    const [courses, setCourses] = useState<Array<courseInfo>>([])


    const updateCourse = (newCourse: string)=> {
        setCourseInfo((prevValue)=>({
            ...prevValue,
            courseName:  newCourse,
        }))
    } 

    const handleInsertCourseInfo = async () => {
        try {
            console.log(courseInfo.courseName)
            const URL = process.env.REACT_APP_UTIL_API + 'insertCourse';
            const response = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 必要な場合、他のヘッダーも追加できます
              },
              body: JSON.stringify({
                new_course_name: courseInfo.courseName,
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
            setCourseInfo({
              courseId: "",
              courseName: "",
          },)

          } catch (error) {
            // エラーハンドリング
            console.error('POSTリクエストエラー:', error);
          }
    } 

    useEffect(() => {
        console.log(courseInfo)
    },[courseInfo])


    return (
        <NewCourseModal
           courseInfo={courseInfo}
           courses={courses}
           onClickInsertCourseInfo={handleInsertCourseInfo}
           updateCourse={updateCourse}
           GetCoursesInfo={rest.GetCoursesInfo}
        />
    )
}

export default NewCourseModalContainer;