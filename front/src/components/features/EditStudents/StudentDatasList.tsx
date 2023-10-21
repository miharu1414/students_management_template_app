import { FC, useEffect, useState, } from "react";

import { Box, Button, Flex, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, VStack,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { studentInfo } from "./StudentDataContainer";
import StudentData from "./StudentData";
import StudentDataMobile from "./StudentDataMobile";
import NewStudentModalContainer from "./NewStudentModalContainer"
import Loading from "src/components/common/Loading";
import { mediaQuery, useMediaQuery } from "src/hooks/Response";
import { Link } from "react-router-dom";
import { StudentSearchBox } from "./StudentSearchBox";
import { courseInfo } from "src/components/features/EditStudents/StudentDataContainer";

type StudentDatasListProps = {
    children?: React.ReactNode;
    studentInfo: studentInfo[],
    searchStr: string;
    courses: courseInfo[];
    loading: boolean,
    error: boolean;
    onChangeSearchStr: (value: string)=> void;
    onChangeSelectedCourse: (value:string) => void;
    GetStudentInfo: () => void,
    checkSort: boolean;
    sortName: () => void;
    sortNameReverse: () => void;
}

const StudentDatasList: FC<StudentDatasListProps> = (props) => {
    const { children, ...rest } = props;
    const userDevice = navigator.userAgent;

    const isSp = useMediaQuery(mediaQuery.sp)
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <>
            {isSp ? 
                <VStack display={"flex"} alignItems={"center"}>
                    <Box>
                    <Heading size={"lg"} textAlign={"center"} marginBottom={2}>生徒管理</Heading>
                    <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>
                    <Loading loading={rest.loading}>
                        <StudentSearchBox width="200px" searchStr={rest.searchStr} courses={rest.courses} onChangeSelectedCourse={rest.onChangeSelectedCourse} onChangeSearchStr={rest.onChangeSearchStr} />
                    <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>名前 {rest.checkSort ? <IconButton aria-label='sort data' size={"sm"} onClick={rest.sortName} icon={<ChevronUpIcon/>}/> : <IconButton aria-label='sort data' size={"sm"} onClick={rest.sortNameReverse} icon={<ChevronDownIcon/>}/>}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                {rest.error && <Button onClick={()=>rest.GetStudentInfo()}>リロード</Button>}
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
                    </Loading>
                    </Box>
                </VStack>
                :
                <VStack>
                    <VStack width={"100%"} >
                    <Heading size={"lg"} textAlign={"center"} marginBottom={2}>生徒管理</Heading>
                    <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>
                    <Loading loading={rest.loading}>
                    <StudentSearchBox width="400px" searchStr={rest.searchStr} courses={rest.courses} onChangeSelectedCourse={rest.onChangeSelectedCourse} onChangeSearchStr={rest.onChangeSearchStr} />
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
                                    GetStudentInfo={rest.GetStudentInfo}
                                />
                        </Box>
                    </Box>
                    <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th flexShrink={"0"}>名前 {rest.checkSort ? <IconButton aria-label='sort data' size={"sm"} onClick={rest.sortName} icon={<ChevronUpIcon/>}/> : <IconButton aria-label='sort data' size={"sm"} onClick={rest.sortNameReverse} icon={<ChevronDownIcon/>}/>}</Th>
                                        <Th flexShrink={"0"}>クラス</Th>
                                        <Th flexShrink={"0"}>振替日数</Th>
                                        <Th flexShrink={"0"}>緊急連絡先</Th>
                                        <Th >メモ</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                {rest.error && <Button onClick={()=>rest.GetStudentInfo()}>リロード</Button>}
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
                    </Loading>
                    </VStack>
                </VStack>
            }
        </>        
    );
}

export default StudentDatasList;
