import { FC, useEffect, useState } from "react";
import { Box, Button, Flex, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, HStack, Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import DetailStudent from "src/components/features/EditStudents/DetailStudent"

type DeleteStudentModalProps = {
    children?: React.ReactNode;
    index: string;
    DeleteStudent: (index:string) => void,
}

const DeleteStudentModal: FC<DeleteStudentModalProps> = (props) => {
    const { children, ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <IconButton backgroundColor="white" size={"sm"} onClick={onOpen} aria-label='Search database' icon={<DeleteIcon />}></IconButton>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>出席情報を削除します</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box display='flex' justifyContent='center' mb={"12px"}>
                    本当によろしいですか？
                </Box>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={onClose}>
                Close
                </Button>
                <Button colorScheme="blue" onClick={() => {
                    rest.DeleteStudent(rest.index)
                    onClose()
                }}>消去</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
      </>
    );
}

export default DeleteStudentModal;
