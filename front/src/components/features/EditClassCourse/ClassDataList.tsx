import { FC, useState } from "react";
import { Box, Button, Flex, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, VStack,
} from "@chakra-ui/react";
import { classInfo } from "./ClassDataContainer";
import ClassData from "./ClassData";
import Loading from "src/components/common/Loading";

type ClassDatasListProps = {
    children?: React.ReactNode;
    classInfo: classInfo[],
    GetClassesInfo: () => void,
    loading: boolean,
    error: boolean,
}

const ClassDatasList: FC<ClassDatasListProps> = (props) => {
    const { children, ...rest } = props;

    return (
        <Box>
            <Heading size={"lg"} textAlign={"center"} marginBottom={2}>クラス管理</Heading>
            <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>

            {rest.error ?
              <Button onClick={() => rest.GetClassesInfo()}>リロード</Button>
              :
              <Loading loading={rest.loading}>
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
                            GetClassesInfo={rest.GetClassesInfo}
                        />
                    )
                })}
                            </Tbody>
                </Table>
              </Loading>
            }
        </Box>
        
    );
}

export default ClassDatasList;
