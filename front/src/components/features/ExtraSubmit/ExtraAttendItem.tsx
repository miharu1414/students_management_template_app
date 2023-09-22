import { FC,useContext } from "react";
import { Box, Flex, Checkbox } from "@chakra-ui/react";
import { userContext } from "src/hooks/UserInfo";
import { presentInfo } from "./ExtraAttendContainer";

type ExtraAttendItemProps = {
    children? : Node;
    student: presentInfo
    onClick:(value:string) => void;
}

const ExtraAttendItem: FC<ExtraAttendItemProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);
    return (
        <Flex
            width="100%"
            
            height="40px"
            padding={2}
            paddingLeft={4}
            border={"1px"}
            bgColor="gray.50"
            borderColor="gray.200"
            
            alignItems="center" // 縦方向中央寄せ
            onClick={()=>{
                rest.onClick(rest.student.id)
            }}
        > 
            <Checkbox isChecked marginRight={"10px"}/>
            {rest.student.name}
        </Flex>
    )
}

export default ExtraAttendItem;