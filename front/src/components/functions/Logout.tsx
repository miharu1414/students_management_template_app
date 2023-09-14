import { FC, useEffect, useContext } from "react";
import {  useParams, useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie"
import { userContext } from "src/hooks/UserInfo";

type LogoutProps = {
    children? : Node;
}

const Logout: FC<LogoutProps> = (props) => {
    const {children, ...rest} = props;
    const [cookies, setCookie, removeCookie] = useCookies(["user_name","user_id"])
    const ctx = useContext(userContext);
    // const [cookies, setCookie, removeCookie] = useCookies(["監視したいクッキー名"])
    const navigate = useNavigate()
    useEffect(()=>{
        removeCookie("user_id")
        removeCookie("user_name")
        ctx.setUpdateId("")
        ctx.setUpdateName("")
        navigate("/login")
    },[])

    
    return (
        <></>
    )
}

export default Logout;