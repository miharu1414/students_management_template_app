import { FC } from "react";

type NameProps = {
    children? : Node;
}

const Name: FC<NameProps> = (props) => {
    const {children, ...rest} = props;
    return (
        <></>
    )
}

export default Name;