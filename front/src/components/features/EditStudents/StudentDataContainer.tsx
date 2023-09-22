import { FC, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import StudentDatasList from "./StudentDatasList";
import NewStudentModalContainer from "./NewStudentModalContainer";

type StudentDataContainerProps = {
    children? : Node;
}

export type studentInfo = {
    id: string,
    name: string,
    kana: string
    class_name: string,
    course_name: string,
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
                const studentData: studentInfo = {id: student.id, name: student.name, kana: student.kana, class_name: student.class_name, course_name: student.course_name, address: student.address, subDay: student.subDay, memo: student.memo, update: student.update}
                newStudents.push(studentData)
            })
            setStudentsInfo(newStudents)
            setLoading(false)
            setError(false)
          } catch (error) {
            // エラーハンドリング
            setLoading(false)
            setError(true)
            console.error('POSTリクエストエラー:', error);
          }
    }

    useEffect(() => {
        GetStudentInfo()
    }, [])

    return (
      <>
        <StudentDatasList
           studentInfo={studentsInfo}
           GetStudentInfo={GetStudentInfo}
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
                >
                <NewStudentModalContainer
                  GetStudentInfo={GetStudentInfo}
                />
        </Box>
      </>
    )
}

export default StudentDataContainer;