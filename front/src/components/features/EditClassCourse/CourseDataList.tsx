import { FC, useEffect, useState } from "react";
import { Box, Button, Flex, Table, Thead, Tbody, Tr, Th, Td , Heading, Divider, VStack,
} from "@chakra-ui/react";
import { courseInfo, studentInfo } from "./ClassCourseStudentsContainer";
import CourseData from "./CourseData";
import Loading from "src/components/common/Loading";

type CourseDatasListProps = {
    children?: React.ReactNode;
    courseInfo: courseInfo[],
    students: studentInfo[]
    loading: boolean,
    error: boolean,
    GetCoursesInfo: () => void,
}

const CourseDatasList: FC<CourseDatasListProps> = (props) => {
    const { children, ...rest } = props;
    const [studentsByCourse, setStudentsByCourse] = useState<Array<studentInfo[]>>([]);
  // courseIdごとにstudentsを整理
  const organizeStudentsByCourse = () => {
    const organizedData:Array<studentInfo[]> = [];

    rest.courseInfo.forEach((course) => {
      organizedData.push(rest.students.filter((student) => student.course_id === course.courseId))
    });

    setStudentsByCourse(organizedData);
  };

  useEffect(()=>{
    organizeStudentsByCourse()
  },[rest.students, rest.courseInfo])
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
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            {rest.courseInfo.map((course, index)=> {
                    return (
                        <CourseData
                            index={index}
                            courseInfo={course}
                            students={studentsByCourse[index] ? studentsByCourse[index] : []}
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
