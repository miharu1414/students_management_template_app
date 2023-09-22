import { FC, useEffect, useState } from "react";
import { useDisclosure, Tr, Td} from "@chakra-ui/react";
import { courseInfo } from "./CourseDataContainer";
import EditCourseModalContainer from "./EditCourseModalContainer";

type CourseDataProps = {
    children?: React.ReactNode;
    index: number;
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
            <Td>{rest.courseInfo.courseName}</Td>
            <EditCourseModalContainer 
              courseId={rest.courseInfo.courseId}
              GetCoursesInfo={rest.GetCoursesInfo}
            />
        </Tr>
      </>
    );
}

export default CourseData;
