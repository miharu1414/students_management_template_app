import { FC, useState, useEffect } from "react";
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
import { courseInfo } from "./NewCourseModalContainer"; 

type NewStudentModalProps = {
    courseInfo: courseInfo,
    courses: courseInfo[],
    updateCourse: (newCourse:string) => void,
    onClickInsertCourseInfo: () => void,
    GetCoursesInfo: () => void,
}

const NewStudentModal: FC<NewStudentModalProps> = (props) => {
    const { ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [disable, setDisable] = useState<boolean>(true)

    useEffect(() => {
      if (rest.courseInfo.courseName === ""){
        setDisable(true)
      }
      else {
        setDisable(false)
      }
    }, [rest.courseInfo.courseName])

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
          <ModalHeader>新規コースの登録</ModalHeader>
          <ModalBody>
            <VStack>
                <HStack>
                    <Text>コース名：</Text>
                    <Box><Input value={rest.courseInfo.courseName} onChange={(e)=>rest.updateCourse(e.target.value)}></Input></Box>
                </HStack>
                <Button colorScheme='blue' mr={3} isDisabled={disable} onClick={() => {
                  rest.onClickInsertCourseInfo()
                  setTimeout(rest.GetCoursesInfo, 1000)
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
