
import { FC, useContext, useState, useRef} from "react"
import { Box, Button, Flex, HStack, Icon, Select, Input, VStack } from "@chakra-ui/react";
import { userContext } from "src/hooks/UserInfo";


import { AiOutlineSearch } from "react-icons/ai";


type StudentSearchBoxProps = {
    children? : Node;
    searchStr: string;
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

        <VStack spacing={0} border={"1px"} borderColor={"gray.200"} borderRadius={"5px"} boxShadow={"sm"}>
            <HStack bgColor="gray.50" borderRadius="10px">
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

                  w="200px"
                  h="50px"
                />


              </HStack>

        </VStack>
            
  );
};

