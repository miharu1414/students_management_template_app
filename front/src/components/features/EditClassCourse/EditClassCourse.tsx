import { VStack, Box, HStack, Spacer, } from "@chakra-ui/react";
import { FC } from "react";
import {  useParams, Link } from 'react-router-dom';
import CourseDataContainer from "src/components/features/EditClassCourse/CourseDataContainer";
import ClassDataContainer from "src/components/features/EditClassCourse/ClassDataContainer";
import { mediaQuery, useMediaQuery } from "src/hooks/Response";

type EditClassCourseProps = {
    children? : Node;
}

const EditClassCourse: FC<EditClassCourseProps> = (props) => {
    const {children, ...rest} = props;
    const params = useParams();
    const isSp = useMediaQuery(mediaQuery.sp)
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
            
            {isSp ? 
                <Box>
                    <CourseDataContainer/>
                    <ClassDataContainer/>
                </Box>
                :
                <HStack spacing={"100"} alignItems={"baseline"}>
                    <CourseDataContainer/>
                    <ClassDataContainer/>
                </HStack>
            }
        </VStack>
        </>        
    )
}

export default EditClassCourse;