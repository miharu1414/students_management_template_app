import { FC, useState } from "react";
import { Box, Button, useDisclosure, Modal, HStack, Text, Textarea,
    ModalOverlay, 
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    VStack,
} from "@chakra-ui/react";
import { classInfo } from "./EditClassModalContainer";

type EditClassModalProps = {
    classInfo: classInfo,
    onClickUpdateClassInfo: () => void,
    updateClass: (newClass:string) => void,
    getClassInfo: () => void,
}

const EditClassModal: FC<EditClassModalProps> = (props) => {
    const { ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <Button
                onClick={() => {
                  onOpen()
                  setTimeout(rest.getClassInfo, 150)
                }}
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
          <ModalHeader>
            <Text>クラスの編集</Text>
          </ModalHeader>
          <ModalBody>
            <VStack>
                <HStack>
                    <Text>クラスの名前：</Text>
                    <Box><Input value={rest.classInfo.className} onChange={(e)=> rest.updateClass(e.target.value) }></Input></Box>
                </HStack>
                <Button colorScheme='blue' mr={3} onClick={() => rest.onClickUpdateClassInfo()}>
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

export default EditClassModal;
