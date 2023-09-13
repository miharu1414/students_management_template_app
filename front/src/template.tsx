import { FC,useContext } from "react";
import { userContext } from "src/hooks/UserInfo";

type NameProps = {
    children? : Node;
}

const Name: FC<NameProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);
    return (
        <></>
    )
}

export default Name;