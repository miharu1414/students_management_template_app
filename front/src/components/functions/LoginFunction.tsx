import { FC, useEffect, useContext } from "react";
import {  useParams, useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie"
import { userContext } from "src/hooks/UserInfo";

type LoginFunctionProps = {
    children? : Node;
}

const LoginFunction: FC<LoginFunctionProps> = (props) => {
    const {children, ...rest} = props;
    const [cookies, setCookie, removeCookie] = useCookies(["user_name","user_id"])
    const ctx = useContext(userContext);
    const navigate = useNavigate()
    const param = useParams<{id: string, name:string}>();
    useEffect(()=>{
        setCookie("user_id", param.id,{ maxAge : 2592000 })
        setCookie("user_name", param.name, { maxAge : 2592000 })
        ctx.setUpdateId(param.id as string)
        ctx.setUpdateName(param.name as string)
        navigate("/")
        
    },[])

    
    return (
        <></>
    )
}

export default LoginFunction;