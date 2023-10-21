import { FC,useContext, useState, useEffect } from "react";
import { userContext } from "src/hooks/UserInfo";
import { VStack, Box, HStack, Spacer, } from "@chakra-ui/react";
import {  useParams, Link } from 'react-router-dom';
import { mediaQuery, useMediaQuery } from "src/hooks/Response";
import ClassDataContainer from "./ClassDataContainer";
import CourseDataContainer from "./CourseDataContainer";
import { setDefaultLocale } from "react-datepicker";

type ClassCourseStudentsContainerProps = {
    children? : Node;
}
export type classInfo = {
    classId: string,
    className: string,
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

const ClassCourseStudentsContainer: FC<ClassCourseStudentsContainerProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);
    const params = useParams();
    const isSp = useMediaQuery(mediaQuery.sp)
    console.log(params);

    const [classesInfo, setClassesInfo] = useState<Array<classInfo>>([
    ]);
    const [loadingClass, setLoadingClass] = useState<boolean>(false);
    const [loadingCourse, setLoadingCourse] = useState<boolean>(false);
    const [errorCourse, setErrorCourse] = useState<boolean>(false)
    const [errorClass, setErrorClass] = useState<boolean>(false)

    const GetClassesInfo = async () => {
        try {
            
            const URL = process.env.REACT_APP_UTIL_API + 'getClassesNoneUpdate';
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

            const newClasses: classInfo[] = [];
            jsonData.class_info.map((classData:classInfo) => {
                const ClassData: classInfo = {classId: classData.classId, className: classData.className}
                newClasses.push(ClassData)
            })
            setClassesInfo(newClasses)
            setLoadingClass(false)
            setErrorClass(false)
          } catch (error) {
            // エラーハンドリング
            setLoadingClass(false)
            setErrorClass(true)
            console.error('POSTリクエストエラー:', error);
          }
    }
    const [coursesInfo, setCoursesInfo] = useState<Array<courseInfo>>([
    ]);
    const [studentsInfo, setStudentsInfo] = useState<Array<studentInfo>>([]);
    const GetStudentInfo = async (handleLoading:(value:boolean)=>void, handleError:(value:boolean)=>void) => {
      try {
          handleLoading(true)
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
          handleError(false)
          handleLoading(false)
        } catch (error) {
          // エラーハンドリング
          handleLoading(false)
          handleError(true)
          console.error('POSTリクエストエラー:', error);
        }
  }
    const GetCoursesInfo = async () => {
        setLoadingCourse(true)
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
            setLoadingCourse(false)
            setErrorCourse(false)
          } catch (error) {
            // エラーハンドリング
            setErrorCourse(true)
            console.error('POSTリクエストエラー:', error);
          }
    }
    const GetInformationCourse = async (studentsInfoLoad:boolean = true) => {
        setLoadingCourse(true)
        await GetCoursesInfo();
        if (studentsInfoLoad && !errorCourse){
            await GetStudentInfo(setLoadingCourse,setErrorCourse);
        }
    }
    const GetInformationClass = async (studentsInfoLoad:boolean = true) => {
        setLoadingClass(true)
        await GetClassesInfo();
        if (studentsInfoLoad && !errorClass){
            await GetStudentInfo(setLoadingClass,setErrorClass);
        }
    }

    const InitialFetch = async() => {
        setLoadingClass(true)
        setLoadingCourse(true)
        await GetInformationCourse();
        GetInformationClass(false);

    }





    const handleReloadClass = async()=>{
        GetInformationClass()
    }
    const handleReloadCourse = async() =>{
        GetInformationCourse()
    }

    useEffect(() => {
        InitialFetch()
    }, [])    




    
    return (
        <>
        <VStack maxWidth={'800px'} mt="50px"> 
            
            {isSp ? 
                <Box>
                    <CourseDataContainer 
                        loading={loadingCourse}
                        error={errorCourse}
                        coursesInfo={coursesInfo}
                        studentsInfo={studentsInfo}
                        GetCoursesInfo={GetCoursesInfo}
                        onClickReloadCourse={handleReloadCourse}
                     />
                    <ClassDataContainer 
                        loading={loadingClass}
                        error={errorClass}
                        classesInfo={classesInfo}
                        studentsInfo={studentsInfo}
                        GetClassesInfo={GetClassesInfo}
                        onClickReloadClass={handleReloadClass}
                    />
                </Box>
                :
                <HStack spacing={"100"} alignItems={"baseline"}>
                    <CourseDataContainer 
                        loading={loadingCourse}
                        error={errorCourse}
                        coursesInfo={coursesInfo}
                        studentsInfo={studentsInfo}
                        GetCoursesInfo={GetInformationCourse}
                        onClickReloadCourse={handleReloadCourse}
                     />
                    <ClassDataContainer 
                        loading={loadingClass}
                        error={errorClass}
                        classesInfo={classesInfo}
                        studentsInfo={studentsInfo}
                        GetClassesInfo={GetInformationClass}
                        onClickReloadClass={handleReloadClass}
                    />
                </HStack>
            }
        </VStack>
        </>        
    )
}


export default ClassCourseStudentsContainer;