import { FC, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { presentInfo } from "./PresentListContainer";
import { Link } from "react-router-dom";

type PresentListItemProps = {
    children?: React.ReactNode;
    index: number;
    studentInfo: presentInfo,
    onClickUpdateStudentInfo: (id: string, value: string) => void
}

const PresentListItem: FC<PresentListItemProps> = (props) => {
    const { children, ...rest } = props;


    function truncateText(text: string, maxLength: number) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength - 3) + "...";
    }






    return (

        <Flex
            width="330px"
            border="1px"
            height="70px"
            padding={2}
            paddingLeft={4}

            borderColor="gray.200"
            borderRadius={"10"}
            alignItems="center" // 縦方向中央寄せ
            justify="space-between" // 子要素を均等に配置
            backgroundColor={rest.index % 2 === 0 ? 'white' : "gray.100"}
        >


        <Link to={"/detail/" + rest.studentInfo.id}>
                <Box fontSize={"4xs"} width={"150px"} >
                    {truncateText(rest.studentInfo.name, 9)}
                </Box>
            </Link>
            {/* 左寄せ */}


            <Box>
                <Button
                    width={"55px"}
                    colorScheme={rest.studentInfo.attendId == "1" ?  "blue":"blackAlpha"  }
                    onClick={() => rest.onClickUpdateStudentInfo(rest.studentInfo.id, "1")}>
                    出席
                </Button>
            </Box>
            <Box>
                <Button 
                    width={"55px"}
                    colorScheme={rest.studentInfo.attendId == "2" ?  "red": "blackAlpha"}
                    onClick={() => rest.onClickUpdateStudentInfo(rest.studentInfo.id, "2")}>
                    欠席
                </Button>
            </Box>
            <Box>
                <Button 
                    width={"20px"}
                    colorScheme={rest.studentInfo.attendId == "4" ?  "yellow" :"blackAlpha"}
                    onClick={() => rest.onClickUpdateStudentInfo(rest.studentInfo.id, "4")}>
                    他
                </Button>
            </Box>

        </Flex>


    );
}

export default PresentListItem;
