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
import Loading from "src/components/common/Loading";
import { Link } from "react-router-dom";

type EditModalProps = {
    studentInfo: studentInfo,
    classes: classInfo[],
    courses: courseInfo[],
    loading: boolean,
    error1: boolean,
    error2: boolean,
    error3: boolean,

    onClickUpdateStudentInfo: () => void,
    onClickDeleteStudentInfo: () => void,
    updateClass: (newClass:string) => void,
    updateCourse: (newCourse:string) => void,
    updateAddress: (newAddress:string) => void,
    updateMemo: (newMemo:string) => void,
    updateSubday: (newSubday:number) => void,

    GetStudentInfo: () => void,
    onClick:()=>void;
}

const EditModal: FC<EditModalProps> = (props) => {
    const { ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    const subDate = [0,1,2,3,4,5,6,7,8,9,10,11,12]

    return (
      <>
        <Button
                onClick={() => {
                  onOpen()
                  rest.onClick()
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
        <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
            <Text>{rest.studentInfo.name}の編集</Text>
            <Spacer></Spacer>
            <Button colorScheme='red' mr={3} onClick={() => {
              rest.onClickDeleteStudentInfo()
              onClose()
              setTimeout(rest.GetStudentInfo, 1000)
            }}>
              削除
            </Button>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <VStack>
            <Loading loading={rest.loading}>
            {(rest.error1 || rest.error2 || rest.error3) ? 
              <Button onClick={() => {
                rest.onClick()
              }}>リロード</Button>
              :
        <>
                <HStack>
                    <Text>クラス：</Text>
                    <Box>
                      <Select placeholder={rest.studentInfo.class_name} onChange={(e)=>rest.updateClass(e.target.value)}>
                        {rest.classes.map((classData) => {
                          return (
                            <option value={classData.classId} >{classData.className}</option>
                          )
                        })}
                      </Select>
                    </Box>
                </HStack>
                <HStack>
                    <Text>コース：</Text>
                    <Box>
                      <Select placeholder={rest.studentInfo.course_name} onChange={(e)=>rest.updateCourse(e.target.value)}>
                        {rest.courses.map((courseData) => {
                          return (
                            <option value={courseData.courseId} >{courseData.courseName}</option>
                          )
                        })}
                      </Select>
                    </Box>
                </HStack>
                <HStack>
                    <Text>振替日数：</Text>
                    <Box>
                      <Select placeholder={String(rest.studentInfo.subDay)} onChange={(e)=>rest.updateSubday(Number(e.target.value))}>
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
               </>
            }
             </Loading>
                <Button colorScheme='blue' mr={3} onClick={() => {
                  rest.onClickUpdateStudentInfo()
                  setTimeout(rest.GetStudentInfo, 1000)
                  onClose()
                }}>
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
