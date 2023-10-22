import { FC,useContext } from "react";
import { userContext } from "src/hooks/UserInfo";
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

import {  Link } from 'react-router-dom';
import { studentInfo } from "./ClassCourseStudentsContainer";
type DetailModalProps = {
    children? : Node;
    students: studentInfo[];
    isOpen: boolean;
    groupName:string;
    onClose: ()=> void;
}

const DetailModal: FC<DetailModalProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);


    return (
        <>
        
    
        <Modal isOpen={rest.isOpen} onClose={rest.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{rest.groupName}詳細</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <VStack alignItems={"flex-start"} paddingLeft={4} spacing={2}>
                {rest.students.map((student,index)=>{
                    return (
                        <HStack fontSize={"lg"}>
                            <Text>{index+1}.</Text>
                            <Link to={"/detail/" + student.id}>
                                <Text>{student.name}</Text>
                            </Link>
                        </HStack>
                    )
                })}

                

     
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
    );
}
export default DetailModal;