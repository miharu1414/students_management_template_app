import { FC, useEffect, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import ClassDatasList from "./ClassDataList";
import NewClassModalContainer from "./NewClassModalContainer";
import { classInfo, studentInfo } from "./ClassCourseStudentsContainer";

type ClassDataContainerProps = {
    children? : Node;
    classesInfo: classInfo[],
    studentsInfo: studentInfo[]
    loading:boolean;
    error:boolean;
    GetClassesInfo: () => void,
    onClickReloadClass: ()=>void,
    
}


const ClassDataContainer: FC<ClassDataContainerProps> = (props) => {
  const { children, ...rest } = props;

   

    return (
      <>
      <VStack>
        <ClassDatasList
           classInfo={rest.classesInfo}
           GetClassesInfo={rest.onClickReloadClass}
           students={rest.studentsInfo}
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
                <NewClassModalContainer
                  GetClassesInfo={rest.GetClassesInfo}
                />
        </Box>
        </VStack>
      </>
    )
}

export default ClassDataContainer;