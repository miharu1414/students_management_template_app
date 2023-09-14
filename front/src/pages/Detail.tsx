import { VStack, Box, } from "@chakra-ui/react";
import { FC, useState } from "react";
import {  useParams, Link } from 'react-router-dom';
import DetailStudentContainer from "src/components/features/DetailStudent/DetailStudentContainer";

type NameProps = {
    children? : Node;
}

const Name: FC<NameProps> = (props) => {
    const {children, ...rest} = props;
    const params = useParams<{id:string}>();
    const [id,setId] = useState<string|undefined>(params.id)

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
            <DetailStudentContainer id={id as string}/>
        
        </>

     
          
        
    )
}

export default Name;