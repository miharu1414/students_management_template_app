import { FC, useState } from "react";
import { Box, Button, Flex, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, VStack,
} from "@chakra-ui/react";
import { classInfo } from "./ClassDataContainer";
import ClassData from "./ClassData";

type ClassDatasListProps = {
    children?: React.ReactNode;
    classInfo: classInfo[],
}

const ClassDatasList: FC<ClassDatasListProps> = (props) => {
    const { children, ...rest } = props;

    return (
        <Box width={"85%"} >
            <Heading size={"lg"} textAlign={"center"} marginBottom={2}>クラス管理</Heading>
            <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>

            <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>クラス名</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {rest.classInfo.map((classData, index)=> {
                return (
                    <ClassData
                        index={index}
                        classInfo={classData}
                        key={index}
                    />
                )
            })}
                        </Tbody>
            </Table>
        </Box>
        
    );
}

export default ClassDatasList;
