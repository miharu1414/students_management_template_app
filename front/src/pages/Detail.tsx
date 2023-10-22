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
            <DetailStudentContainer id={id as string}/>
        
        </>

     
          
        
    )
}

export default Name;