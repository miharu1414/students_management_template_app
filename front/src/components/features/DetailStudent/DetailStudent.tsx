import { FC } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box , Heading, Divider} from "@chakra-ui/react";
import { Present, attendData, studentInfoDetail } from "src/components/features/DetailStudent/DetailStudentContainer";
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'
type DetailStudentProps = {
    children? : React.ReactNode;
    
    studentInfo?: studentInfoDetail
    attendData? : attendData[];

}

const DetailStudent: FC<DetailStudentProps> = (props) => {
    const { children, ...rest } = props;
    
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
            <Box onClick={()=>{
              console.log("詳細画面モーダル")
            }}>


            
              <Heading size={"lg"} textAlign={"center"} marginBottom={2}>{rest.studentInfo?.name}さん</Heading>
              <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>
            

              <StatGroup >
                  <Stat>
                  <StatLabel><StatArrow type='increase' />出席数</StatLabel>
                  <StatNumber>{rest.attendData ? countPresent(rest.attendData) : ""}</StatNumber>

              </Stat>

              <Stat>
              <StatLabel><StatArrow type='decrease' />残り振替</StatLabel>
                  <StatNumber>{rest.attendData ? countSubstituteNum(rest.attendData) : ""}</StatNumber>
              </Stat>
              </StatGroup>
            </Box>

            <Table variant="simple">
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
                                </Tr>
                            ))}
                        </Tbody>
            </Table>
        </Box>

    );
}

export default DetailStudent;
