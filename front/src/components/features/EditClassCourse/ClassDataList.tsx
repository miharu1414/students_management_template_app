import { FC, useState, useEffect } from "react";
import { Box, Button, Flex, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, VStack,
} from "@chakra-ui/react";
import { classInfo, studentInfo } from "./ClassCourseStudentsContainer";
import ClassData from "./ClassData";
import Loading from "src/components/common/Loading";

type ClassDatasListProps = {
    children?: Node;
    classInfo: classInfo[],
    students: studentInfo[],
    GetClassesInfo: () => void,
    loading: boolean,
    error: boolean,
}

const ClassDatasList: FC<ClassDatasListProps> = (props) => {
    const { children, ...rest } = props;

    const [studentsByClass, setStudentsByClass] = useState<Array<studentInfo[]>>([]);
    // class_idごとにstudentsを整理
    const organizeStudentsByClass = () => {
        const organizedData: Array<studentInfo[]> = [];
      
        rest.classInfo.forEach((classData) => {
          const studentsForClass = rest.students.filter((student) => student.class_id === classData.classId);
          organizedData.push(studentsForClass);
        });
      
        setStudentsByClass(organizedData);
      };
      
      useEffect(() => {
        organizeStudentsByClass();
      }, [rest.students, rest.classInfo]);
    return (
        <Box>
            <Heading size={"lg"} textAlign={"center"} marginBottom={2}>クラス管理</Heading>
            <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>

            {rest.error ?
              <Button onClick={() => rest.GetClassesInfo()}>リロード</Button>
              :
              <Loading loading={rest.loading}>
                <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>クラス名</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            {rest.classInfo.map((classData, index)=> {
                    return (
                        <ClassData
                            index={index}
                            classInfo={classData}
                            key={index}
                            students={studentsByClass[index] ? studentsByClass[index] : []}
                            GetClassesInfo={rest.GetClassesInfo}
                        />
                    )
                })}
                            </Tbody>
                </Table>
              </Loading>
            }
        </Box>
        
    );
}

export default ClassDatasList;
