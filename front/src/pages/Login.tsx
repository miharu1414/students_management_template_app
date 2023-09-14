import { FC } from "react";
import LoginContainer from "src/components/features/Login/LoginContainer";

type LoginProps = {
    children? : Node;
}

const Login: FC<LoginProps> = (props) => {
    const {children, ...rest} = props;
    return (
        <LoginContainer/>
    )
}

export default Login;