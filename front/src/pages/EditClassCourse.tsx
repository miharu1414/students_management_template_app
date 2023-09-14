import { VStack, Box, HStack, } from "@chakra-ui/react";
import { FC } from "react";
import {  useParams, Link } from 'react-router-dom';
import CourseDataContainer from "src/components/features/EditClassCourse/CourseDataContainer";
import NewCourseModalContainer from "src/components/features/EditClassCourse/NewCourseModalContainer";
import ClassDataContainer from "src/components/features/EditClassCourse/ClassDataContainer";
import NewClassModalContainer from "src/components/features/EditClassCourse/NewClassModalContainer";


type EditClassCourseProps = {
    children? : Node;
}

const EditClassCourse: FC<EditClassCourseProps> = (props) => {
    const {children, ...rest} = props;
    const params = useParams();
    console.log(params);
    return (
        <>
            <Box padding={3} border={2} borderColor={"whiteAlpha.200"}
                    width={"120px"}
                    borderRadius={10}
                    backgroundColor={"blue.300"}
                    textAlign={"center"}
                    textColor={"white"}
                    marginBottom={8}
                    >
                    <Link to={"/"}>
                    ホームヘ
                    </Link>
            </Box>
            <CourseDataContainer/>
            <Box padding={3} border={2} borderColor={"whiteAlpha.200"}
                width={"120px"}
                borderRadius={10}
                backgroundColor={"blue.300"}
                textAlign={"center"}
                textColor={"white"}
                marginTop={8}
                marginBottom={8}
                >
                <NewCourseModalContainer/>
            </Box>

            <ClassDataContainer/>
            <Box padding={3} border={2} borderColor={"whiteAlpha.200"}
                width={"120px"}
                borderRadius={10}
                backgroundColor={"blue.300"}
                textAlign={"center"}
                textColor={"white"}
                marginTop={8}
                marginBottom={8}
                >
                <NewClassModalContainer/>
            </Box>
        </>        
    )
}

export default EditClassCourse;