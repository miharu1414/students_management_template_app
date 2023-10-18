import { FC,useContext, useState } from "react";
import { userContext } from "src/hooks/UserInfo";
import AnalyzeCourse from "./AnalyzeCourse";

type AnalyzeCourseContainerProps = {
    children? : Node;
}
export type courseInfo = {
    courseId: string,
    courseName: string,
  }
  
export type studentInfo = {
    id: string,
    name: string,
    kana: string
    class_name: string,
    course_name: string,
    class_id?: string,
    course_id?: string,
    address: string,
    subDay: number,
    memo: string,
    update: string,
}


const AnalyzeCourseContainer: FC<AnalyzeCourseContainerProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);
    const [studentsInfo, setStudentsInfo] = useState<Array<studentInfo>>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [error,setError] = useState<boolean>(false);
    const [searchStr,setSearchStr] = useState<string>("");
    const [displayStudents,setDisplayStudents] = useState<Array<studentInfo>>([]);
    const [courses, setCourses] = useState<Array<courseInfo>>([])
    const [selectedCourse, setSelectedCourse] = useState<string>("");

    const GetStudentInfo = async () => {
        try {
            setLoading(true)
            const URL = process.env.REACT_APP_UTIL_API + 'getStudents';
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

            const newStudents: studentInfo[] = [];
            jsonData.studentsData.map((student:studentInfo) => {
                const studentData: studentInfo = {id: student.id, name: student.name, kana: student.kana, class_name: student.class_name, 
                  class_id: student.class_id,
                  course_name: student.course_name,
                  course_id: student.course_id,
                  address: student.address, subDay: student.subDay, memo: student.memo, update: student.update}
                newStudents.push(studentData)
            })
            setStudentsInfo(newStudents)
            setDisplayStudents(newStudents)
            setLoading(false)
            setError(false)
          } catch (error) {
            // エラーハンドリング
            setLoading(false)
            setError(true)
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
          console.log(newCourses)
          setError(false)

        } catch (error) {
          // エラーハンドリング
          setError(true)
          console.error('POSTリクエストエラー:', error);
        }
        setLoading(false)
  }

    const GetInformation = async () => {
        await GetStudentInfo();
        await GetCourses();
    }


    return (
        <AnalyzeCourse loading={loading} onClickAnalyze={GetInformation}/>
    )
}

export default AnalyzeCourseContainer;