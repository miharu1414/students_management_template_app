import { FC, useEffect, useState } from "react";
import { Box,  HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import StudentDatasList from "./StudentDatasList";
import NewStudentModalContainer from "./NewStudentModalContainer";
import { useDebounce } from "src/components/common/useDebounce";

type StudentDataContainerProps = {
    children? : Node;
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

const StudentDataContainer: FC<StudentDataContainerProps> = (props) => {
    const {children, ...rest} = props;

    const [studentsInfo, setStudentsInfo] = useState<Array<studentInfo>>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [error,setError] = useState<boolean>(false);
    const [searchStr,setSearchStr] = useState<string>("");
    const [displayStudents,setDisplayStudents] = useState<Array<studentInfo>>([]);

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

    const matchStudents = (searchStr:string, course_id: string): studentInfo[] => {
      return studentsInfo.filter((student)=>((student.kana.indexOf(searchStr)>-1) || (student.name.indexOf(searchStr)>-1)) )
    }

    useEffect(() => {
      GetStudentInfo()

    }, [])

      const debouncedInputText = useDebounce(searchStr,500)

    useEffect(()=>{
      const newStudents: studentInfo[] = matchStudents(debouncedInputText,"");
      setDisplayStudents(newStudents)
      console.log(debouncedInputText)
    },[debouncedInputText])

    return (
      <>   

        <Box padding={3} border={2} 
          borderColor={"whiteAlpha.200"}
          width={"120px"}
          borderRadius={10}
          backgroundColor={"blue.300"}
          textAlign={"center"}
          textColor={"white"}
          marginBottom={3}

          >
          <Link to={"/"}>
          ホームヘ
          </Link>
        </Box> 
        <Box >
            
          <Box padding={2} border={2} 
                borderColor={"whiteAlpha.200"}
                width={"120px"}
                borderRadius={10}
                backgroundColor={""}
                textAlign={"center"}
                textColor={"white"}
                marginBottom={3}

                >
                  <NewStudentModalContainer
                    GetStudentInfo={GetStudentInfo}
                  />
              </Box>
      </Box>





        <StudentDatasList
           studentInfo={displayStudents}
           searchStr={debouncedInputText}
           loading={loading}
           error={error}
           GetStudentInfo={GetStudentInfo}
           onChangeSearchStr={setSearchStr}
        />

      </>
    )
}

export default StudentDataContainer;