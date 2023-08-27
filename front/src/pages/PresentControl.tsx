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
    const params = useParams();
    console.log(params);
    const [title,setTitle] = useState("土曜日 13時クラス")
    
    return (
        <VStack>  
            <Box display="flex" justifyContent="space-between" width="100%">
                <Box padding={3} border={2} borderColor={"whiteAlpha.200"}
                    width={"120px"}
                    borderRadius={10}
                    backgroundColor={"blue.300"}
                    textAlign={"center"}
                    textColor={"white"}
                    >
                    <Link to={"/"}>登校管理
                    </Link>
                </Box>
                <Box>
                    <DateSelector/>
                </Box>
            </Box>
            <Box marginTop={3}
                fontSize={"2xl"}
            >
                {title}
            </Box>
            <Divider/>

            <PresentListContainer/>
            <Box marginBottom={5}>
                <SubmitModal title="出席を更新"/>
            </Box>
 
        

        
        </VStack>
    )
}

export default PresentControl;