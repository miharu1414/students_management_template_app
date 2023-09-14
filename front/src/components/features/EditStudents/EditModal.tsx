import { FC, useState } from "react";
import { Box, Button, Flex, useDisclosure, Modal, HStack, Text, Textarea,
    ModalOverlay, 
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    VStack,
    Select,
    Spacer,
} from "@chakra-ui/react";
import { studentInfo, classInfo, courseInfo } from "./EditModalContainer";
import { Link } from "react-router-dom";

type EditModalProps = {
    studentInfo: studentInfo,
    classes: classInfo[],
    courses: courseInfo[],
    onClickUpdateStudentInfo: () => void,
    onClickDeleteStudentInfo: () => void,
    updateClass: (newClass:string) => void,
    updateCourse: (newCourse:string) => void,
    updateAddress: (newAddress:string) => void,
    updateMemo: (newMemo:string) => void,
    onGetStudent: () => void,
    onGetClasses: () => void,
    onGetCourses: () => void,
}

const EditModal: FC<EditModalProps> = (props) => {
    const { ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <Button
                onClick={() => {
                  onOpen()
                  rest.onGetStudent()
                  setTimeout(rest.onGetClasses, 150)
                  setTimeout(rest.onGetCourses, 300)
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
            <HStack>
            <Text>{rest.studentInfo.name}の編集</Text>
            <Spacer></Spacer>
            <Button colorScheme='red' mr={3} onClick={() => rest.onClickDeleteStudentInfo()}>
              削除
            </Button>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <VStack>
                <HStack>
                    <Text>クラス：</Text>
                    <Box>
                      <Select placeholder='クラスを選んでください' onChange={(e)=>rest.updateClass(e.target.value)}>
                        {rest.classes.map((classData) => {
                          return (
                            <option value={classData.classId} label={classData.className}/>
                          )
                        })}
                      </Select>
                    </Box>
                </HStack>
                <HStack>
                    <Text>コース：</Text>
                    <Box>
                      <Select placeholder='コースを選んでください' onChange={(e)=>rest.updateCourse(e.target.value)}>
                        {rest.courses.map((courseData) => {
                          return (
                            <option value={courseData.courseId} label={courseData.courseName}/>
                          )
                        })}
                      </Select>
                    </Box>
                </HStack>
                <HStack>
                    <Text>緊急連絡先：</Text>
                    <Box><Input value={rest.studentInfo.address} onChange={(e)=>rest.updateAddress(e.target.value)}></Input></Box>
                </HStack>
                <HStack>
                    <Text>メモ：</Text>
                    <Box><Textarea value={rest.studentInfo.memo} onChange={(e)=>rest.updateMemo(e.target.value)}></Textarea></Box>
                </HStack>
                <Button colorScheme='blue' mr={3} onClick={() => rest.onClickUpdateStudentInfo()}>
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
