import { FC, useEffect, useState } from "react";
import { Box,  Button,  HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import StudentDatasList from "./StudentDatasList";
import NewStudentModalContainer from "./NewStudentModalContainer";
import { useDebounce } from "src/components/common/useDebounce";

type StudentDataContainerProps = {
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
    address_owner: string,
    address_sub: string,
    address_sub_owner: string,
}

const StudentDataContainer: FC<StudentDataContainerProps> = (props) => {
    const {children, ...rest} = props;

    const [studentsInfo, setStudentsInfo] = useState<Array<studentInfo>>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [error,setError] = useState<boolean>(false);
    const [searchStr,setSearchStr] = useState<string>("");
    const [displayStudents,setDisplayStudents] = useState<Array<studentInfo>>([]);
    const [courses, setCourses] = useState<Array<courseInfo>>([])
    const [selectedCourse, setSelectedCourse] = useState<string>("");
    const [checkSort, setCheckSort] = useState<boolean>(false)

    const GetStudentsInfo = async () => {
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
                const studentData: studentInfo = {
                  id: student.id, 
                  name: student.name, 
                  kana: student.kana, 
                  class_name: student.class_name, 
                  class_id: student.class_id,
                  course_name: student.course_name,
                  course_id: student.course_id,
                  address: student.address, 
                  subDay: student.subDay, 
                  memo: student.memo, 
                  update: student.update,
                  address_owner: student.address_owner,
                  address_sub: student.address_sub,
                  address_sub_owner: student.address_sub_owner
                }
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
          setError(false)

        } catch (error) {
          // エラーハンドリング
          setError(true)
          console.error('POSTリクエストエラー:', error);
        }
        setLoading(false)
  }

    const matchStudents = (searchStr:string, course_id: string): studentInfo[] => {
      console.log(course_id)
      if (course_id ==="" || typeof(course_id) == "undefined"){
        return studentsInfo.filter((student)=>((student.kana.indexOf(searchStr)>-1) || (student.name.indexOf(searchStr)>-1)) )
      }
      else{
        return studentsInfo.filter((student)=>(((student.kana.indexOf(searchStr)>-1) || (student.name.indexOf(searchStr)>-1))&& (student.course_id === course_id)) )
      }
    }

    const handleOnOpenPage = async ()=> {
      await GetStudentsInfo();
      await GetCourses();
    }



    const sortName = () => {
      const newData = [...displayStudents]; // 新しい配列を作成
      newData.sort((a, b) => {
        if (a.kana < b.kana) return -1;
        else if (a.kana > b.kana) return 1;
        return 0;
      });
      setDisplayStudents(newData); // 新しい配列をセット
      setCheckSort(!checkSort)
    }

    const sortNameReverse = () => {
      const newData = [...displayStudents]; // 新しい配列を作成
      newData.sort((a, b) => {
        if (a.kana < b.kana) return 1;
        else if (a.kana > b.kana) return -1;
        return 0;
      });
      setDisplayStudents(newData); // 新しい配列をセット
      setCheckSort(!checkSort)
    }

    useEffect(() => {
      console.log(displayStudents)

   }, [displayStudents])

    useEffect(() => {
       handleOnOpenPage();
    }, [])

      const debouncedInputText = useDebounce(searchStr,500)

    useEffect(()=>{
      const newStudents: studentInfo[] = matchStudents(debouncedInputText,selectedCourse);
      setDisplayStudents(newStudents)
      console.log(debouncedInputText)
    },[debouncedInputText,selectedCourse])

    return (
      <> 
        <Box mt="50px">
          <StudentDatasList
            studentInfo={displayStudents}
            searchStr={debouncedInputText}
            loading={loading}
            error={error}
            courses={courses}
            onChangeSelectedCourse={setSelectedCourse}
            GetStudentsInfo={GetStudentsInfo}
            onChangeSearchStr={setSearchStr}
            checkSort={checkSort}
            sortName={sortName}
            sortNameReverse={sortNameReverse}
          />
        </Box>

      </>
    )
}

export default StudentDataContainer;