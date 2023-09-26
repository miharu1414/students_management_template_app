import { VStack, Box, HStack, } from "@chakra-ui/react";
import { FC } from "react";
import {  useParams, Link } from 'react-router-dom';
import StudentDataContainer from "src/components/features/EditStudents/StudentDataContainer";
import NewStudentModalContainer from "src/components/features/EditStudents/NewStudentModalContainer";

type EditStudentsProps = {
    children? : Node;
}

const EditStudents: FC<EditStudentsProps> = (props) => {
    const {children, ...rest} = props;
    const params = useParams();
    console.log(params);
    return (
        <>

            <StudentDataContainer/>
        </>        
    )
}

export default EditStudents;