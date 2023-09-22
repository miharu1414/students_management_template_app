import React, { FC } from "react";
import { Box,Card, CardBody, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Loading from "src/components/common/Loading";
import { Class } from "./ClassListContainer";
import ClassListItem from "./ClassListItem";

type ClassListProps = {
  children?: React.ReactNode;
  classList: Class[];
  isLoading: boolean;
};

const ClassList: FC<ClassListProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <>
      <Loading loading={rest.isLoading}>




        {rest.classList.map((classItem, index) => (
          <Box margin={1} key={index}>
              <ClassListItem  key={index} class={classItem}  />
          </Box>
          
        ))}
        <Link to={"/extraAttend"}>
          <Card align='center' border={"1px"} minW={"300px"}
          borderColor={"yellow.500"}
          backgroundColor={"yellow.100"}
        >

            <CardBody padding={2}>
                <Heading as={"h3"} size={"lg"}>
                    振替
                </Heading>
            </CardBody>
            </Card>
        </Link>
      </Loading>
    </>
  );
};

export default ClassList;
