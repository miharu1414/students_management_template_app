import { FC, useState } from "react";
import { Box, Button, Flex, useDisclosure, Modal, Table, Thead, Tbody, Tr, Th, Td , Select, Divider, HStack, Text, Textarea,
    ModalOverlay, 
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { classInfo } from "./NewClassModalContainer"; 

type NewStudentModalProps = {
    classInfo: classInfo,
    classs: classInfo[],
    updateClass: (newClass:string) => void,
    onClickInsertClassInfo: () => void,
    GetClassesInfo: () => void,
}

const NewStudentModal: FC<NewStudentModalProps> = (props) => {
    const { ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <Button 
                onClick={() => {
                  onOpen()
                }}
                padding={3} 
                border={2} 
                borderColor={"whiteAlpha.200"}
                width={"100px"}
                borderRadius={10}
                backgroundColor={"blue.300"}
                textAlign={"center"}
                textColor={"white"}>新規追加
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規クラスの登録</ModalHeader>
          <ModalBody>
            <VStack>
                <HStack>
                    <Text>クラス名：</Text>
                    <Box><Input value={rest.classInfo.className} onChange={(e)=>rest.updateClass(e.target.value)}></Input></Box>
                </HStack>
                <Button colorScheme='blue' mr={3} onClick={() => {
                  rest.onClickInsertClassInfo()
                  setTimeout(rest.GetClassesInfo, 1000)
                  onClose()
                }}>
                    追加
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

export default NewStudentModal;
