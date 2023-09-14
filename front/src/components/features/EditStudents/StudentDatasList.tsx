import { FC, useState } from "react";
import { Box, Button, Flex, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, VStack,
} from "@chakra-ui/react";
import { studentInfo } from "./StudentDataContainer";
import StudentData from "./StudentData";
import { Link } from "react-router-dom";

type StudentDatasListProps = {
    children?: React.ReactNode;
    studentInfo: studentInfo[],
}

const StudentDatasList: FC<StudentDatasListProps> = (props) => {
    const { children, ...rest } = props;

    return (

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
                    />
                )
            })}
                        </Tbody>
            </Table>
        </Box>
        
    );
}

export default StudentDatasList;
