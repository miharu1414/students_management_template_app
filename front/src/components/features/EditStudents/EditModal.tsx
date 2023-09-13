import { FC, useState } from "react";
import { Box, Button, Flex, useDisclosure, Modal, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, HStack, Text, Textarea,
    ModalOverlay, 
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    VStack,
} from "@chakra-ui/react";
import { studentInfo } from "./EditModalContainer";
import { Link } from "react-router-dom";

type EditModalProps = {
    studentInfo: studentInfo,
    onClickUpdateStudentInfo: () => void
    updateClass: (newClass:string) => void,
    updateCourse: (newCourse:string) => void,
    updateAddress: (newAddress:string) => void,
    updateMemo: (newMemo:string) => void,
}

const EditModal: FC<EditModalProps> = (props) => {
    const { ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <Button 
                onClick={onOpen}
                padding={3} 
                border={2} 
                borderColor={"whiteAlpha.200"}
                width={"100px"}
                borderRadius={10}
                backgroundColor={"blue.300"}
                textAlign={"center"}
                textColor={"white"}>編集
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{rest.studentInfo.name}の編集</ModalHeader>
          <ModalBody>
            <VStack>
                <HStack>
                    <Text>クラス：</Text>
                    <Box><Input value={rest.studentInfo.class} defaultValue={rest.studentInfo.class} onChange={(e)=>rest.updateClass(e.target.value)}></Input></Box>
                </HStack>
                <HStack>
                    <Text>コース：</Text>
                    <Box><Input value={rest.studentInfo.course} defaultValue={rest.studentInfo.course} onChange={(e)=>rest.updateCourse(e.target.value)}></Input></Box>
                </HStack>
                <HStack>
                    <Text>緊急連絡先：</Text>
                    <Box><Input value={rest.studentInfo.address} defaultValue={rest.studentInfo.address} onChange={(e)=>rest.updateAddress(e.target.value)}></Input></Box>
                </HStack>
                <HStack>
                    <Text>メモ：</Text>
                    <Box><Textarea value={rest.studentInfo.memo} defaultValue={rest.studentInfo.memo} onChange={(e)=>rest.updateMemo(e.target.value)}></Textarea></Box>
                </HStack>
                <Button colorScheme='blue' mr={3} onClick={rest.onClickUpdateStudentInfo}>
                    更新
                </Button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    );
}

export default EditModal;
