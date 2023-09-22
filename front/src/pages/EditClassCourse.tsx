import { VStack, Box, HStack, } from "@chakra-ui/react";
import { FC } from "react";
import {  useParams, Link } from 'react-router-dom';
import CourseDataContainer from "src/components/features/EditClassCourse/CourseDataContainer";
import ClassDataContainer from "src/components/features/EditClassCourse/ClassDataContainer";


type EditClassCourseProps = {
    children? : Node;
}

const EditClassCourse: FC<EditClassCourseProps> = (props) => {
    const {children, ...rest} = props;
    const params = useParams();
    console.log(params);
    return (
        <>
        <VStack maxWidth={'800px'}>
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
            <ClassDataContainer/>
        </VStack>
        </>        
    )
}

export default EditClassCourse;