
import { FC, useContext, useState, useRef} from "react"
import { Box, Button, Flex, HStack, Icon, Select, Input, VStack, Text } from "@chakra-ui/react";
import { userContext } from "src/hooks/UserInfo";
import { courseInfo } from "src/components/features/EditStudents/StudentDataContainer";

import { AiOutlineSearch } from "react-icons/ai";


type StudentSearchBoxProps = {
    children? : Node;
    searchStr: string;
    width: string;
    courses:courseInfo[]
    onChangeSelectedCourse: (value: string) => void;
    onChangeSearchStr: (value:string)=>void;
}

export const StudentSearchBox: FC<StudentSearchBoxProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);

    // 現在 IME ON（変換中）かどうかのフラグ
    const isImeOn = useRef(false)

    // 以前の入力テキスト（ブラウザごとの onChange の振る舞いの差異への対策）
    const [prevText, setPrevText] = useState('')

    // 入力テキストを処理する
    const handleChange = (text: string) => {
        if (rest.searchStr === text) return
        if (text === '') {
        // Chrome ではテキストクリア時に onCompositionEnd が呼ばれないことがある
        isImeOn.current = false
        } else if (isImeOn.current) {
        return // IME 変換中は何もしない
        }
        rest.onChangeSearchStr(text)

        // ここで最新の入力値にもとづいて検索処理などを行う
        console.log(text)
    }
  return (

        <VStack spacing={0}  borderRadius={"5px"}>
            <HStack bgColor="gray.50" borderRadius="10px" border={"1px"} borderColor={"gray.200"}  boxShadow={"sm"} >
                <Icon
                  as={AiOutlineSearch}
                  fontSize="27px"
                  color="teal.500"
                  ml="8px"
                  w="50px"
                />
                <Input
                
                  border="none"
                  outline="transparent solid 2px"
                  placeholder="生徒名を入れて検索"
                  value={prevText}
                  onChange={(e) => {
                    setPrevText(e.target.value)
                    handleChange(e.target.value)}
                  }
                  onCompositionStart={() => {
                    isImeOn.current = true // IME 入力中フラグを ON
                  }}
                  onCompositionEnd={(e) => {
                    isImeOn.current = false // IME 入力中フラグを OFF
                    handleChange((e.target as HTMLInputElement).value) // 入力確定したとき
                  }}

                  w={rest.width}
                  h="50px"
                />


              </HStack>
              <HStack marginTop={2} width={"95%"}>
                    <Text>コース：</Text>
                    <Box width={"60%"}>
                      <Select placeholder="指定なし" onChange={(e)=>rest.onChangeSelectedCourse(e.target.value)}>
                        {rest.courses.map((courseData) => {
                          return (
                            <option value={courseData.courseId} >{courseData.courseName}</option>
                          )
                        })}
                      </Select>
                    </Box>
                </HStack>
        </VStack>
            
  );
};

