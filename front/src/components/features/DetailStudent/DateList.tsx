import { FC } from "react";

type DetailListProps = {
    children? : Node;
}

const DetailList: FC<DetailListProps> = (props) => {
    const {children, ...rest} = props;
    return (
        <></>
    )
}

export default DetailList;