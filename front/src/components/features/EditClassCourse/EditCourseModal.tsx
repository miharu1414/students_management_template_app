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
import Loading from "src/components/common/Loading";
import { courseInfo } from "./EditCourseModalContainer";

type EditCourseModalProps = {
    courseInfo: courseInfo,
    loading:boolean,
    onClickUpdateCourseInfo: () => void,
    updateCourse: (newCourse:string) => void,
    getCourseInfo: () => void,
    GetCoursesInfo: () => void,
}

const EditCourseModal: FC<EditCourseModalProps> = (props) => {
    const { ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <Button
                onClick={() => {
                  onOpen()
                  setTimeout(rest.getCourseInfo, 150)
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
            <Text>コースの編集</Text>
          </ModalHeader>
          <ModalBody>
            <VStack>
              <Loading loading={rest.loading}>
                <HStack>
                      <Text>コースの名前：</Text>
                      <Box><Input value={rest.courseInfo.courseName} onChange={(e)=> rest.updateCourse(e.target.value) }></Input></Box>
                  </HStack>
                  <Button colorScheme='blue' mr={3} onClick={() => {
                    rest.onClickUpdateCourseInfo()
                    setTimeout(rest.GetCoursesInfo, 1000)
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

export default EditCourseModal;
