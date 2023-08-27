import { FC } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box , Heading, Divider} from "@chakra-ui/react";
import { Present } from "./DetailStudentContainer";
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
    name:string,
    attendanceData?: {
        date: string;
        status: Present;
    }[];
}

const DetailStudent: FC<DetailStudentProps> = (props) => {
    const { children, ...rest } = props;
    const sampleData: {
        date: string;
        status: Present;
      }[] = [
        {
          date: "8/23",
          status: "出席",
        },
        {
          date: "8/30", // 1週間後
          status: "欠席",
        },
        {
          date: "9/6", // 1週間後
          status: "出席",
        },
        {
          date: "9/13", // 1週間後
          status: "振替",
        },
        {
          date: "9/20", // 1週間後
          status: "出席",
        },
        {
          date: "9/27", // 1週間後
          status: "出席",
        },
        {
          date: "10/4", // 1週間後
          status: "欠席",
        },
      ];

    const bgColorFunc = (value : Present) => {
        if (value === "欠席") return "red.200";
        else if(value === "振替") return "green.100";
        return "";
    }

    const countPresent = (values: {
        date: string;
        status: Present;
      }[]) => {
        return values.filter((entry) => entry.status === "出席").length;
      };
    
      const countAbsent = (values: {
        date: string;
        status: Present;
      }[]) => {
        return values.filter((entry) => entry.status === "欠席").length - values.filter((entry) => entry.status === "振替").length;
      };
    
      const presentCount = countPresent(sampleData);
      const absentCount = countAbsent(sampleData);
    

    return (
        <Box width={"85%"} >
            <Heading size={"lg"} textAlign={"center"} marginBottom={2}>{rest.name}さん</Heading>
            <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>


            <StatGroup >
                <Stat>
                <StatLabel><StatArrow type='increase' />出席数</StatLabel>
                <StatNumber>{presentCount}</StatNumber>

            </Stat>

            <Stat>
            <StatLabel><StatArrow type='decrease' />残り振替</StatLabel>
                <StatNumber>{absentCount}</StatNumber>
            </Stat>
            </StatGroup>

            <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>回数</Th>
                                <Th>日付</Th>
                                <Th>ステータス</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {sampleData?.map((entry, index) => (
                                <Tr key={index}>
                                    <Td>{index+1}</Td>
                                    <Td>{entry.date}</Td>
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
