import { FC, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { studentInfo } from "./PresentListContainer";
import { Link } from "react-router-dom";

type PresentListItemProps = {
    children?: React.ReactNode;
    index: number;
    studentInfo: studentInfo,
    onClickUpdateStudentInfo: (id: string, value: boolean) => void
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


            <Link to={"/detail/1"}>
                <Box fontSize={"4xs"} width={"150px"} >
                    {truncateText(rest.studentInfo.name, 9)}
                </Box>
            </Link>
            {/* 左寄せ */}


            <Box>
                <Button
                    colorScheme={rest.studentInfo.present ? "blue" : "blackAlpha"}
                    onClick={() => rest.onClickUpdateStudentInfo(rest.studentInfo.id, true)}>
                    出席
                </Button>
            </Box>
            <Box>
                <Button colorScheme={rest.studentInfo.present ? "blackAlpha" : "red"}
                    onClick={() => rest.onClickUpdateStudentInfo(rest.studentInfo.id, false)}>
                    欠席
                </Button>
            </Box>

        </Flex>


    );
}

export default PresentListItem;
