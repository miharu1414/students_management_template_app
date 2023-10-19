import { FC, useEffect, useState } from "react";
import { useDisclosure, Tr, Td} from "@chakra-ui/react";
import { courseInfo, studentInfo } from "./ClassCourseStudentsContainer";
import EditCourseModalContainer from "./EditCourseModalContainer";
import DetailModal from "./DetailModal";

type CourseDataProps = {
    children?: React.ReactNode;
    index: number;
    students: studentInfo[]
    courseInfo: courseInfo,
    GetCoursesInfo: () => void,
}

const CourseData: FC<CourseDataProps> = (props) => {
    const { children, ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(()=>{
        console.log(rest.courseInfo)
    },[])

    return (
      <>
        <Tr>
            <Td onClick={onOpen} paddingRight={1}>
              {rest.courseInfo.courseName}
              <DetailModal isOpen={isOpen} onClose={onClose} groupName={rest.courseInfo.courseName} students={rest.students}/>
            </Td>
            <Td paddingX={2}>({rest.students.length}人)</Td>
            <EditCourseModalContainer 
              courseId={rest.courseInfo.courseId}
              GetCoursesInfo={rest.GetCoursesInfo}
            />
        </Tr>
      </>
    );
}

export default CourseData;
