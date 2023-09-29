import { FC,useContext } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    HStack,
    Text,
    Box,
  } from '@chakra-ui/react'
import { userContext } from "src/hooks/UserInfo";
import { studentInfo } from "src/components/features/EditStudents/StudentDataContainer";

type DetailStudentProps = {
    children? : Node;
    student: studentInfo;
    isOpen: boolean;
    onClose: ()=> void;

}

const DetailStudent: FC<DetailStudentProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);
        
    return (
        <>
        
    
        <Modal isOpen={rest.isOpen} onClose={rest.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>生徒詳細</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <VStack alignItems={"flex-start"} paddingLeft={4} spacing={2}>
                <HStack fontSize={"lg"}>
                    <Text>名前：</Text>
                    <Box>{rest.student.name}</Box>
                </HStack>
                <HStack fontSize={"lg"}>
                    <Text>ふりがな：</Text>
                    <Box>{rest.student.kana}</Box>
                </HStack>
                <HStack fontSize={"lg"}>
                    <Text>クラス：</Text>
                    <Box>{rest.student.class_name}</Box>
                </HStack>
                <HStack fontSize={"lg"}>
                    <Text>コース：</Text>
                    <Box>{rest.student.course_name}</Box>
                </HStack>
                <HStack fontSize={"lg"}>
                    <Text>緊急連絡先：</Text>
                    <Box>{rest.student.address}</Box>
                </HStack>
                <HStack fontSize={"lg"}>
                    <Text>振替調整日：</Text>
                    <Box>{rest.student.subDay}</Box>
                </HStack>
                <HStack fontSize={"lg"}>
                    <Text>メモ：</Text>
                    <Box>{rest.student.memo}</Box>
                </HStack>
     
            </VStack>
            </ModalBody>
    
            <ModalFooter>
                <Button colorScheme='blue' onClick={rest.onClose}>
                    閉じる
                </Button>
            
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
          
    
}

export default DetailStudent;