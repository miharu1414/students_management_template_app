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
import Loading from "src/components/common/Loading";

type EditClassModalProps = {
    classInfo: classInfo;
    loading: boolean;
    onClickUpdateClassInfo: () => void,
    updateClass: (newClass:string) => void,
    getClassInfo: () => void,
    GetClassesInfo: () => void,
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
              <Loading loading={rest.loading}>
                <HStack>
                        <Text>クラスの名前：</Text>
                        <Box><Input value={rest.classInfo.className} onChange={(e)=> rest.updateClass(e.target.value) }></Input></Box>
                    </HStack>
                    <Button colorScheme='blue' mr={3} onClick={() => {
                      rest.onClickUpdateClassInfo()
                      setTimeout(rest.GetClassesInfo, 500)
                      onClose()
                    }}>
                        更新
                  </Button>
              </Loading>
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
