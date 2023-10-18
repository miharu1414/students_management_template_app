import { FC, useEffect, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import CourseDatasList from "./CourseDataList";
import NewCourseModalContainer from "./NewCourseModalContainer";

import { courseInfo, studentInfo } from "./ClassCourseStudentsContainer";

type CourseDataContainerProps = {
    children? : Node;
    loading: boolean;
    coursesInfo: courseInfo[],
    studentsInfo: studentInfo[];
    error: boolean;
    GetCoursesInfo: () => void,
    onClickReloadCourse: ()=> void;
}



const CourseDataContainer: FC<CourseDataContainerProps> = (props) => {
  const { children, ...rest } = props;



    
    return (
        <>
        <VStack>
          <CourseDatasList
            courseInfo={rest.coursesInfo}
            students={rest.studentsInfo}
            GetCoursesInfo={rest.onClickReloadCourse}
            loading={rest.loading}
            error={rest.error}
          />
          <Box padding={3} border={2} borderColor={"whiteAlpha.200"}
                  width={"120px"}
                  borderRadius={10}
                  backgroundColor={"blue.300"}
                  textAlign={"center"}
                  textColor={"white"}
                  marginTop={8}
                  marginBottom={8}
                  >
                  <NewCourseModalContainer
                    GetCoursesInfo={rest.GetCoursesInfo}
                  />
          </Box>
        </VStack>
          
        </>    
    )
}

export default CourseDataContainer;