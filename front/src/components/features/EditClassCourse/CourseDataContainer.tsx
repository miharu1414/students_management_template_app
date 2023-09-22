import { FC, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import CourseDatasList from "./CourseDataList";
import NewCourseModalContainer from "./NewCourseModalContainer";

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
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false)

    const GetCoursesInfo = async () => {
        setLoading(true)
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
            setLoading(false)
            setError(false)
          } catch (error) {
            // エラーハンドリング
            setError(true)
            console.error('POSTリクエストエラー:', error);
          }
    }

    useEffect(() => {
        setTimeout(GetCoursesInfo,1000)
      
    }, [])

    return (
        <>
          <CourseDatasList
            courseInfo={coursesInfo}
            GetCoursesInfo={GetCoursesInfo}
            loading={loading}
            error={error}
          />
          <Box padding={3} border={2} borderColor={"whiteAlpha.200"}
                  width={"120px"}
                  borderRadius={10}
                  backgroundColor={"blue.300"}
                  textAlign={"center"}
                  textColor={"white"}
                  marginTop={8}
                  marginBottom={8}
                  >
                  <NewCourseModalContainer
                    GetCoursesInfo={GetCoursesInfo}
                  />
          </Box>
        </>    
    )
}

export default CourseDataContainer;