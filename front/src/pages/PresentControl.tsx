import { FC, useState } from "react";
import { Box, VStack, theme, Stack, Divider, Button } from "@chakra-ui/react"
import {  useParams, Link } from 'react-router-dom';
import DateSelector from "src/components/common/DataSelector";
import PresentListContainer from "src/components/features/SubmitStudents/PresentListContainer";
import SubmitModal from "src/components/common/SubmitModal";
type PresentControlProps = {
    children? : Node;

}

const PresentControl: FC<PresentControlProps> = (props) => {
    const {children, ...rest} = props;
    const params = useParams<{id:string}>();
    console.log(params);
    const [classId,setClassId] = useState<string | undefined>(params.id)
    
    return (


            <PresentListContainer classId={classId}/>

    )
}

export default PresentControl;