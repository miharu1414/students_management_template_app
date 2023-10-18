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
    Link,
  } from '@chakra-ui/react'
import { studentInfo } from "./ClassCourseStudentsContainer";
type DetailCourseModalProps = {
    children? : Node;
    students: studentInfo[];
    isOpen: boolean;
    courseName:string;
    onClose: ()=> void;
}

const DetailCourseModal: FC<DetailCourseModalProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);


    return (
        <>
        
    
        <Modal isOpen={rest.isOpen} onClose={rest.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{rest.courseName}詳細</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <VStack alignItems={"flex-start"} paddingLeft={4} spacing={2}>
                {rest.students.map((student,index)=>{
                    return (
                        <HStack fontSize={"lg"}>
                            <Text>{index+1}.</Text>
                            <Box>{student.name}</Box>
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
export default DetailCourseModal;