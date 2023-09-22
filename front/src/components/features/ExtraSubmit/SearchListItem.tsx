import { FC,useContext } from "react";
import { Box, Checkbox, HStack, Flex } from "@chakra-ui/react";
import { userContext } from "src/hooks/UserInfo";
import { presentInfo } from "src/components/features/ExtraSubmit/ExtraAttendContainer";

type SearchListItemProps = {
    children? : Node;
    student: presentInfo;
    onClickStudent: (value:string) => void;
}

const SearchListItem: FC<SearchListItemProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);
    return (
        <Flex
            width="100%"
            
            height="40px"
            padding={2}
            paddingLeft={4}
            bgColor="gray.50"
            borderColor="gray.200"
            
            alignItems="center" // 縦方向中央寄せ
            onClick={()=>{
                rest.onClickStudent(rest.student.id)
            }}
        > 
            <Checkbox isDisabled marginRight={"10px"}/>
            {rest.student.name}
        </Flex>
    )
}

export default SearchListItem;