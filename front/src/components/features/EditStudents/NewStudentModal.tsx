import { FC, useEffect, useState } from "react";
import { Box, Button, Flex, useDisclosure, Modal, Table, Thead, Tbody, Tr, Th, Td , Select, Divider, HStack, Text, Textarea,
    ModalOverlay, 
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    VStack,
} from "@chakra-ui/react";
import { studentInfo } from "./StudentDataContainer";
import { Link } from "react-router-dom";
import { classInfo, courseInfo } from "./NewStudentModalContainer";

type NewStudentModalProps = {
    studentInfo: studentInfo,
    classes: classInfo[],
    courses: courseInfo[],
    updateName: (newName:string) => void,
    updateKana: (newKana:string) => void,
    updateClass: (newClass:string) => void,
    updateCourse: (newCourse:string) => void,
    updateAddress: (newAddress:string) => void,
    updateMemo: (newMemo:string) => void,
    updateSubday: (newSubday:number) => void,
    onClickInsertStudentInfo: () => void,
    onGetClasses: () => void,
    onGetCourses: () => void,
    GetStudentInfo: () => void,
}

const NewStudentModal: FC<NewStudentModalProps> = (props) => {
    const { ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sendDisable, setSendDisable] = useState<boolean>(true)

    const subDate = [0,1,2,3,4,5,6,7,8,9,10,11,12]

    useEffect(() => {
      if ( rest.studentInfo.name==="" || rest.studentInfo.kana===""  || rest.studentInfo.class_name==="" || rest.studentInfo.course_name===""){
        setSendDisable(true)
      }
      else {
        setSendDisable(false)
      }
    }, [
      rest.studentInfo.address,
      rest.studentInfo.class_name,
      rest.studentInfo.course_name,
      rest.studentInfo.kana,
      rest.studentInfo.memo,
      rest.studentInfo.name,
    ])
    return (
      <>
        <Button 
          onClick={() => {
            onOpen()
            rest.onGetClasses()
            setTimeout(rest.onGetCourses, 1000)
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
          <ModalHeader>新規生徒の登録</ModalHeader>
          <ModalBody>
            <VStack>
                <HStack>
                    <Text>名前：</Text>
                    <Box><Input value={rest.studentInfo.name} onChange={(e)=>rest.updateName(e.target.value)}></Input></Box>
                </HStack>
                <HStack>
                    <Text>ふりがな：</Text>
                    <Box><Input value={rest.studentInfo.kana} onChange={(e)=>rest.updateKana(e.target.value)}></Input></Box>
                </HStack>
                <HStack>
                    <Text>クラス：</Text>
                    <Box>
                      <Select placeholder='クラスを選んでください' onChange={(e)=>rest.updateClass(e.target.value)}>
                        {rest.classes.map((classData) => {
                          return (
                            <option value={classData.classId}>{classData.className}</option>
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
                            <option value={courseData.courseId}>{courseData.courseName}</option>
                          )
                        })}
                      </Select>
                    </Box>
                </HStack>
                <HStack>
                    <Text>振替日数：</Text>
                    <Box>
                      <Select value={rest.studentInfo.subDay} onChange={(e)=>rest.updateSubday(Number(e.target.value))}>
                          {subDate.map((Data) => {
                            return (
                              <option value={Data} >{Data}</option>
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
                <Button colorScheme='blue' mr={3} isDisabled={sendDisable} onClick={() => {
                  rest.onClickInsertStudentInfo()
                  setTimeout(rest.GetStudentInfo, 1000)
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
