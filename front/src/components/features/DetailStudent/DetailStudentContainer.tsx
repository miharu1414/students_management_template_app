import { FC } from "react";
import DetailStudent from "./DetailStudent";

type DetailStudentContainerProps = {
    children? : Node;

}

export type DetailStudentInfo = {

}

export type Present = "出席" | "欠席" | "振替";


const DetailStudentContainer: FC<DetailStudentContainerProps> = (props) => {
    const {children, ...rest} = props;

    return (
        <DetailStudent name="麻生太郎"/>
    )
}

export default DetailStudentContainer;