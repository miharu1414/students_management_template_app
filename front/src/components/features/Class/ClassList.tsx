import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { Class } from "./ClassListContainer";
import ClassListItem from "./ClassListItem";

type ClassListProps = {
  children?: React.ReactNode;
  classList: Class[];
};

const ClassList: FC<ClassListProps> = (props) => {
  const { classList } = props;

  return (
    <>
      {classList.map((classItem, index) => (
        <Box margin={1} key={index}>
            <ClassListItem  key={index} class={classItem}  />
        </Box>
        
      ))}
    </>
  );
};

export default ClassList;
