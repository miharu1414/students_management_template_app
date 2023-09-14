import { FC, useState } from "react";
import { Box, Button, Flex, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, VStack,
} from "@chakra-ui/react";
import { courseInfo } from "./CourseDataContainer";
import CourseData from "./CourseData";

type CourseDatasListProps = {
    children?: React.ReactNode;
    courseInfo: courseInfo[],
}

const CourseDatasList: FC<CourseDatasListProps> = (props) => {
    const { children, ...rest } = props;

    return (

        <Box width={"85%"} >
            <Heading size={"lg"} textAlign={"center"} marginBottom={2}>コース管理</Heading>
            <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>

            <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>コース名</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {rest.courseInfo.map((course, index)=> {
                return (
                    <CourseData
                        index={index}
                        courseInfo={course}
                        key={index}
                    />
                )
            })}
                        </Tbody>
            </Table>
        </Box>
        
    );
}

export default CourseDatasList;
