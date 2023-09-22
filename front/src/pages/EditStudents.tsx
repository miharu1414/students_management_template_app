import { VStack, Box, HStack, } from "@chakra-ui/react";
import { FC } from "react";
import {  useParams, Link } from 'react-router-dom';
import StudentDataContainer from "src/components/features/EditStudents/StudentDataContainer";
import NewStudentModalContainer from "src/components/features/EditStudents/NewStudentModalContainer";

type NameProps = {
    children? : Node;
}

const Name: FC<NameProps> = (props) => {
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
            <StudentDataContainer/>
        </>        
    )
}

export default Name;