import { FC, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box , Heading, Divider, Select, IconButton, Button} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Present, attendData, studentInfoDetail } from "src/components/features/DetailStudent/DetailStudentContainer";
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
import DetailStudentModal from "./DetailStudentModal";
import DateSelector from "src/components/common/DateSelector";
import DeleteStudentModal from "./DeleteStudentModal";

type presentInfo = {
    id: string;
    name: string;
    attendId: string;
    classId?: string | undefined;
    courseId?: string | undefined;
}

type DetailStudentProps = {
    children? : React.ReactNode;
    selectedFiscalYear: string;
    fiscalYears: string[];
    studentInfo?: studentInfoDetail
    attendData? : attendData[];
    presentInfo : presentInfo;
    selectedDate: Date;
    onChangeSelectedFiscalYear: (value:string)=>void;
    onChangeSelectedDate: (value:Date)=>void;
    onChangePresentInfo: (id:string, value:string)=>void;
    onChangeFetchStudent: () => void;
    clickInsertStudentAttendance: ()=>void;
    clickDeleteStudentAttendance: (index:string)=>void;
    InsertStudent: () => void;
    DeleteStudent: (index:string) => void;
}

const DetailStudent: FC<DetailStudentProps> = (props) => {
    const { children, ...rest } = props;

    const modal1 = useDisclosure()
    
    const bgColorFunc = (value:string) => {
        if (value === "欠席") return "red.200";
        else if(value === "振替") return "green.100";
        else if(value === "その他") return "yellow.100";
        return "";
    }

    const countPresent = (values:attendData[]) => {
        return values.filter((entry) => entry.status === "出席").length;
      };
    
      const countSubstituteNum = (values:attendData[]) => {
        return values.filter((entry) => entry.status === "欠席").length - values.filter((entry) => entry.status === "振替").length + parseIntOrZero(rest.studentInfo?.substitute_day ? rest.studentInfo?.substitute_day : "");
      };
      
    const formatDate = (inputDate:string): string => {
        const dateParts = inputDate.split("-");
        const month = parseInt(dateParts[1], 10);
        const day = parseInt(dateParts[2], 10);
    
        return month + "/" + day;
    }
    
    const parseIntOrZero = (str:string):number => {
      const parsedInt = parseInt(str, 10);
      return isNaN(parsedInt) ? 0 : parsedInt;
    }    

    return (
        <Box width={"85%"} >
            <Box width={"100px"} marginBottom={2}>
                <Select placeholder={rest.selectedFiscalYear} onChange={(e)=>rest.onChangeSelectedFiscalYear(e.target.value)}>
                {rest.fiscalYears.map((fiscalYear) => {
                    // placeholderと同じ値の場合、何も表示しない
                    if (fiscalYear === rest.selectedFiscalYear) {
                        return null;
                    }
                    return (
                    <option value={fiscalYear} >{fiscalYear}</option>
                    )
                })}
                </Select>
            </Box>

            <Box onClick={()=>{
              console.log("詳細画面モーダル")
            }}>


            
              <Heading size={"lg"} textAlign={"center"} marginBottom={2}>{rest.studentInfo?.name}さん</Heading>
              <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>
            

              <StatGroup >
                {/* <Stat>
                    <StatLabel><StatArrow type='increase' />出席数</StatLabel>
                    <StatNumber>{rest.attendData ? countPresent(rest.attendData) : ""}</StatNumber>
                </Stat> */}

                <Stat>
                    <StatLabel><StatArrow type='decrease' />残り振替</StatLabel>
                    <StatNumber>{rest.attendData ? countSubstituteNum(rest.attendData) : ""}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>振替調整日</StatLabel>
                    <StatNumber>{rest.attendData ? countSubstituteNum(rest.attendData) : ""}</StatNumber>
                </Stat>
              </StatGroup>
              
            </Box>

            <Table variant="simple" >
                        <Thead>
                            <Tr>
                                <Th>回数</Th>
                                <Th>日付</Th>
                                <Th>ステータス</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rest.attendData?.map((entry, index) => (
                                <Tr key={index}>
                                    <Td>{index+1}</Td>
                                    <Td>{formatDate(entry.date)}</Td>
                                    <Td 
                                    backgroundColor={bgColorFunc(entry.status)}>{entry.status}</Td>
                                    <DeleteStudentModal index={entry.studentAttendId} DeleteStudent={rest.DeleteStudent} />
                                </Tr>
                            ))}
                        </Tbody>
            </Table>
            <Box mt="8px" display='flex' justifyContent='center'>
                <Button onClick={modal1.onOpen}>出席情報追加</Button>
            </Box>

            <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>出席情報を追加します</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box display='flex' justifyContent='center' mb={"12px"}>
                        <DateSelector selectedDate={rest.selectedDate} handleDateChange={rest.onChangeSelectedDate}/>
                    </Box>
                    <DetailStudentModal index={1} studentInfo={rest.presentInfo} onClickUpdateStudentInfo={rest.onChangePresentInfo}/>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={modal1.onClose}>
                    Close
                    </Button>
                    <Button colorScheme="blue" onClick={()=>{
                        rest.InsertStudent()
                        modal1.onClose()
                    }}>登録</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>

    );
}

export default DetailStudent;
