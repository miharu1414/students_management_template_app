import { VStack, Box, HStack, Spacer, } from "@chakra-ui/react";
import { FC } from "react";
import {  useParams, Link } from 'react-router-dom';
import CourseDataContainer from "src/components/features/EditClassCourse/CourseDataContainer";
import ClassDataContainer from "src/components/features/EditClassCourse/ClassDataContainer";
import { mediaQuery, useMediaQuery } from "src/hooks/Response";
import ClassCourseStudentsContainer from "src/components/features/EditClassCourse/ClassCourseStudentsContainer";
type EditClassCoursePageProps = {
    children? : Node;
}

const EditClassCoursePage: FC<EditClassCoursePageProps> = (props) => {
    const {children, ...rest} = props;
    const params = useParams();
    const isSp = useMediaQuery(mediaQuery.sp)
    return (
        <ClassCourseStudentsContainer/>        
    )
}

export default EditClassCoursePage;