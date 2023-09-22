import { FC, useState } from "react";
import { Box, Button, Flex, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, VStack,
} from "@chakra-ui/react";
import { courseInfo } from "./CourseDataContainer";
import CourseData from "./CourseData";
import Loading from "src/components/common/Loading";

type CourseDatasListProps = {
    children?: React.ReactNode;
    courseInfo: courseInfo[],
    GetCoursesInfo: () => void,
    loading: boolean,
    error: boolean,
}

const CourseDatasList: FC<CourseDatasListProps> = (props) => {
    const { children, ...rest } = props;

    return (

        <Box  >
            <Heading size={"lg"} textAlign={"center"} marginBottom={2}>コース管理</Heading>
            <Divider border={"2px"} color={"gray.400"} marginBottom={3}/>

            {rest.error ?
              <Button onClick={() => rest.GetCoursesInfo()}>リロード</Button>
              :
              <Loading loading={rest.loading}>
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
                            GetCoursesInfo={rest.GetCoursesInfo}
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

export default CourseDatasList;
