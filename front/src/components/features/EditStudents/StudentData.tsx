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
    GetStudentsInfo: () => void,
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
            <Td flexShrink={"0"} whiteSpace={"nowrap"} paddingRight={2}>{rest.studentInfo.name}</Td>
            <Td flexShrink={"0"} whiteSpace={"nowrap"} paddingRight={0}>{rest.studentInfo.class_name}</Td>
            <Td flexShrink={"0"}>{rest.studentInfo.subDay}</Td>
            <Td style={{ flexShrink: 0 }}>
                <a href={`tel:${rest.studentInfo.address}`}>
                    {rest.studentInfo.address}</a>
            </Td>
            <Td style={{ flexShrink: 0 }}>
                <a href={`tel:${rest.studentInfo.address_sub}`}>
                    {rest.studentInfo.address_sub}</a>
            </Td>
            <Td>{rest.studentInfo.memo}</Td>
            <EditModalContainer 
              studentId={rest.studentInfo.id}
              GetStudentsInfo={rest.GetStudentsInfo}
            />
        </Tr>
      </>
    );
}

export default StudentData;
