import { FC, useEffect, useState } from "react";
import CourseDatasList from "./CourseDataList";

type CourseDataContainerProps = {
    children? : Node;
}

export type courseInfo = {
    courseId: string,
    courseName: string,
}

const CourseDataContainer: FC<CourseDataContainerProps> = (props) => {
    const {children} = props;

    const [coursesInfo, setCoursesInfo] = useState<Array<courseInfo>>([
    ]);



    const GetCoursesInfo = async () => {
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
            console.log(jsonData)
            // 任意の追加処理をここで行う

            const newCourses: courseInfo[] = [];
            jsonData.course_info.map((course:courseInfo) => {
                const CourseData: courseInfo = {courseId: course.courseId, courseName: course.courseName}
                newCourses.push(CourseData)
            })
            setCoursesInfo(newCourses)
          } catch (error) {
            // エラーハンドリング
            console.error('POSTリクエストエラー:', error);
          }
    }

    useEffect(() => {
        setTimeout(GetCoursesInfo,200)
      
    }, [])

    return (
        <CourseDatasList
           courseInfo={coursesInfo}
        />
    )
}

export default CourseDataContainer;