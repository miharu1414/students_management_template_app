import { FC, useEffect, useState } from "react";
import { Box, Button, Flex, useDisclosure, Modal, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, HStack, Text,
    ModalOverlay, 
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    VStack,
} from "@chakra-ui/react";
import { studentInfo } from "./StudentDataContainer";
import EditModalContainer from "./EditModalContainer";
import { Link } from "react-router-dom";

type StudentDataProps = {
    children?: React.ReactNode;
    index: number;
    studentInfo: studentInfo,
}

const StudentData: FC<StudentDataProps> = (props) => {
    const { children, ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(()=>{
        console.log(rest.studentInfo)
    },[])
    function truncateText(text: string, maxLength: number) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength - 3) + "...";
    }


    return (
      <>
        <Tr>
            <Td>{rest.studentInfo.name}</Td>
            <Td>{rest.studentInfo.class_name}</Td>
            <Td>{rest.studentInfo.course_name}</Td>
            <Td>{rest.studentInfo.address}</Td>
            <Td>{rest.studentInfo.memo}</Td>
            <EditModalContainer studentId={rest.studentInfo.id}></EditModalContainer>
        </Tr>
      </>
    );
}

export default StudentData;
