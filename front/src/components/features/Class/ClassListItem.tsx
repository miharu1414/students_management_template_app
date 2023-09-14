import { FC } from "react";
import { Link } from "react-router-dom";
import { Box, Heading,Button , Text} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Class } from "./ClassListContainer";

type ClassListItemProps = {
  children?: React.ReactNode;
  class: Class;
};

const ClassListItem: FC<ClassListItemProps> = (props) => {
  const {children,...rest} = props;
  const link = () => {
    return "/control/" + rest.class.classId+"/"+rest.class.className
  }

  return (
    <Link to={link()}>
        <Card align='center' border={"1px"} minW={"300px"}
        borderColor={"blue.500"}
        backgroundColor={"blue.50"}
    >

        <CardBody padding={2}>
            

            <Heading as={"h3"} size={"lg"}>
                {rest.class.className}
            </Heading>


        

        </CardBody>
        <CardFooter padding={2}>
            <Text fontSize={"sm"}>最終更新日: {rest.class.lastUpdate}</Text>
        </CardFooter>
        </Card>
    </Link>

  );
};

export default ClassListItem;
