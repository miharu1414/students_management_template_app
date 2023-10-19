import { FC,useContext } from "react";
import { PhoneIcon } from '@chakra-ui/icons'

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
    Spacer,
  } from '@chakra-ui/react'
import { userContext } from "src/hooks/UserInfo";
import { studentInfo } from "src/components/features/EditStudents/StudentDataContainer";
import {  Link } from 'react-router-dom';

type DetailStudentProps = {
    children? : Node;
    student: studentInfo;
    isOpen: boolean;
    onClose: ()=> void;

}

const DetailStudent: FC<DetailStudentProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);
    const attendData = "/detail/" + rest.student.id
        
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
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <a href={`tel:${rest.student.address}`}>
                            {rest.student.address}　<PhoneIcon />
                        </a>
                    </Box>

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

                    <Box padding={2} border={2} 
                        borderColor={"whiteAlpha.200"}
                        width={"120px"}
                        borderRadius={10}
                        backgroundColor={"blue.300"}
                        textAlign={"center"}
                        textColor={"white"}
                        marginBottom={3}
                        >
                          <Link to={attendData} >
                            出席簿へ
                          </Link>  
                    </Box>
                
                <Spacer></Spacer>
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