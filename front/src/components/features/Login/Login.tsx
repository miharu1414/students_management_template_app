import { FC } from "react";
import { Button, VStack, Flex, Heading, Input, useColorMode, useColorModeValue, Box } from "@chakra-ui/react";


type LoginProps = {
    children? : Node;
    name: string;
    password: string;
    error: boolean;
    onNameChanged: (value:string) => void;
    onPasswordChanged: (value:string) => void;
    onClickLogin: (name: string, password:string) => void;
}

export const Login: FC<LoginProps> = (props) => {
    const {children, ...rest} = props;
    const { toggleColorMode } = useColorMode();

    return (
      <VStack width={"100vh"} height={"100vh"}
        alignItems={"center"}
      >
          <Box width={"80vh"} height={"20vh"}
        backgroundImage="https://crefus.jp/crfs/assets/img/crefuslogo.png"
        backgroundSize="cover" // 背景画像のサイズを調整（例えば、'cover', 'contain'など）
        backgroundPosition="center" 
        ></Box>
      <Box width={"100%"} height={"80vh"}
      //  backgroundImage="https://crefus.jp/crfs/assets/img/mockup/imac2.png"
      //  backgroundSize="cover" // 背景画像のサイズを調整（例えば、'cover', 'contain'など）
      //  backgroundPosition="center" 
       >

        <Flex height="60vh" alignItems="center" justifyContent="center">

        <Flex direction="column" background={"blue.50"} p={12} rounded={6} opacity={"0.98"} border={"ridge 1px"}  boxShadow={"xl"} >
          <Heading mb={6}>ログイン画面</Heading>


          <Input placeholder="ユーザーID" variant="filled" mb={3} 
          type="text" border={"1px"} borderColor={"gray.400"}
          value={rest.name} onChange={(e)=>rest.onNameChanged(e.target.value)}/>
          <Input placeholder="********" variant="filled" mb={6} 
          type="text" border={"1px"} borderColor={"gray.400"}
          value={rest.password} onChange={(e)=>rest.onPasswordChanged(e.target.value)}/>
          <Button mb={6} colorScheme="teal" onClick={()=>rest.onClickLogin(rest.name,rest.password)}>Log in</Button>
          {/* <Button onClick={toggleColorMode}>Toggle Color Mode</Button> */}
        </Flex>
        </Flex>
      </Box>
      </VStack>

    )
}

export default Login;