import { FC, useEffect } from "react";
import {  useParams, useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie"

type LoginCheckProps = {
    children? : Node;
}

const LoginCheck: FC<LoginCheckProps> = (props) => {
    const {children, ...rest} = props;
    const [cookies, setCookie, removeCookie] = useCookies(["user_name","user_id"])
    const navigate = useNavigate()
    const param = useParams<{id: string, name:string}>();
    useEffect(()=>{
        if(cookies.user_id===undefined || cookies.user_id === ""){
            navigate("/login")
        }

        
    },[])

    
    return (
        <></>
    )
}

export default LoginCheck;