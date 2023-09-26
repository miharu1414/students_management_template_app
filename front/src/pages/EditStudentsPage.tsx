import { VStack, Box, HStack, } from "@chakra-ui/react";
import { FC } from "react";
import {  useParams, Link } from 'react-router-dom';

import EditStudents from "src/components/features/EditStudents/EditStudents";
type EditStudentsPageProps = {
    children? : Node;
}

const EditStudentsPage: FC<EditStudentsPageProps> = (props) => {
    const {children, ...rest} = props;
    const params = useParams();

    return (
        

        <EditStudents/>        
    )
}

export default EditStudentsPage;