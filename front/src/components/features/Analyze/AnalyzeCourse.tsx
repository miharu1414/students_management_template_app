import { FC,useContext, useState } from "react";
import { Button } from "@chakra-ui/react";
import { userContext } from "src/hooks/UserInfo";
import Loading from "src/components/common/Loading";

type AnalyzeCourseProps = {
    children? : Node;
    loading: boolean;
    onClickAnalyze: ()=>void;
}

const AnalyzeCourse: FC<AnalyzeCourseProps> = (props) => {
    const {children, ...rest} = props;
    const [isShowStats, setIsShowStats] = useState<boolean>(false); 
    const ctx = useContext(userContext);
    return (
        <>
            <Button onClick={()=>rest.onClickAnalyze()}></Button>
            <Loading loading={rest.loading}>

            </Loading>
        </>

    )
}

export default AnalyzeCourse;