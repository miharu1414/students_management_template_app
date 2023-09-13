import { FC } from "react";
import { Button, Flex, Heading, Input, useColorMode, useColorModeValue } from "@chakra-ui/react";


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
    const formBackGround = useColorModeValue("gray.100", "gray.700");
  
    return (
        <Flex height="80vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackGround} p={12} rounded={6}>
        <Heading mb={6}>ログイン画面</Heading>
        {process.env.REACT_APP_MODE}

        <Input placeholder="ユーザーID" variant="filled" mb={3} 
        type="text" border={"1px"} borderColor={"gray.400"}
        value={rest.name} onChange={(e)=>rest.onNameChanged(e.target.value)}/>
        <Input placeholder="********" variant="filled" mb={6} 
        type="text" border={"1px"} borderColor={"gray.400"}
        value={rest.password} onChange={(e)=>rest.onPasswordChanged(e.target.value)}/>
        <Button mb={6} colorScheme="teal" onClick={()=>rest.onClickLogin(rest.name,rest.password)}>Log in</Button>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </Flex>
    </Flex>
    )
}

export default Login;