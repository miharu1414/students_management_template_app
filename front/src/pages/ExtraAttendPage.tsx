import { FC,useContext } from "react";
import { userContext } from "src/hooks/UserInfo";
import ExtraAttendContainer from "src/components/features/ExtraSubmit/ExtraAttendContainer";
type ExtraAttendPageProps = {
    children? : Node;
}

const ExtraAttendPage: FC<ExtraAttendPageProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);
    return (
        <ExtraAttendContainer/>
    )
}

export default ExtraAttendPage;