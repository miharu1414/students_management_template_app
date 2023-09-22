import { FC, useEffect, useState } from "react";
import { Box, Button, Flex, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, VStack,
} from "@chakra-ui/react";
import { studentInfo } from "./StudentDataContainer";
import StudentData from "./StudentData";
import StudentDataMobile from "./StudentDataMobile";
import { mediaQuery, useMediaQuery } from "src/hooks/Response";
import { Link } from "react-router-dom";

type StudentDatasListProps = {
    children?: React.ReactNode;
    studentInfo: studentInfo[],
    GetStudentInfo: () => void,
}

const StudentDatasList: FC<StudentDatasListProps> = (props) => {
    const { children, ...rest } = props;
    const userDevice = navigator.userAgent;

    const isSp = useMediaQuery(mediaQuery.sp)


    return (
        <>
            {isSp ? 
                <Box>
                <Heading size={"lg"} textAlign={"center"} marginBottom={2}>生徒管理</Heading>
                <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>

                <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>名前</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            {rest.studentInfo.map((student, index)=> {
                    return (
                        <StudentDataMobile
                            index={index}
                            studentInfo={student}
                            key={index}
                            GetStudentInfo={rest.GetStudentInfo}
                        />
                    )
                })}
                            </Tbody>
                </Table>
                </Box>
                :
                <Box width={"85%"} >
                <Heading size={"lg"} textAlign={"center"} marginBottom={2}>生徒管理</Heading>
                <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>

                <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>名前</Th>
                                    <Th>クラス</Th>
                                    <Th>コース</Th>
                                    <Th>緊急連絡先</Th>
                                    <Th>メモ</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            {rest.studentInfo.map((student, index)=> {
                    return (
                        <StudentData
                            index={index}
                            studentInfo={student}
                            key={index}
                            GetStudentInfo={rest.GetStudentInfo}
                        />
                    )
                })}
                            </Tbody>
                </Table>
                </Box>
            }
        </>        
    );
}

export default StudentDatasList;
