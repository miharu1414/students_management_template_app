import { FC, useEffect, useState } from "react";
import { Box, Button, Flex, useDisclosure, Modal, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, HStack, Text,} from "@chakra-ui/react";
import { studentInfo } from "./StudentDataContainer";
import EditModalContainer from "./EditModalContainer";
import { Link } from "react-router-dom";
import DetailStudent from "src/components/features/EditStudents/DetailStudent"

type StudentDataMobileProps = {
    children?: React.ReactNode;
    index: number;
    studentInfo: studentInfo,
    GetStudentInfo: () => void,
}

const StudentDataMobile: FC<StudentDataMobileProps> = (props) => {
    const { children, ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(()=>{
        console.log(rest.studentInfo)
    },[])

    return (
      <>
        <Tr alignItems={"center"}>
            <Td onClick={onOpen}>{rest.studentInfo.name}
              <DetailStudent student={rest.studentInfo} isOpen={isOpen} onClose={onClose}/>
            </Td>

            <EditModalContainer 
              studentId={rest.studentInfo.id}
              GetStudentInfo={rest.GetStudentInfo}
            />
        </Tr>

      </>
    );
}

export default StudentDataMobile;
