import { FC, useEffect } from "react";
import { useDisclosure, Tr, Td} from "@chakra-ui/react";
import { classInfo } from "./ClassDataContainer";
import EditClassModalContainer from "./EditClassModalContainer";

type ClassDataProps = {
    children?: React.ReactNode;
    index: number;
    classInfo: classInfo,
}

const ClassData: FC<ClassDataProps> = (props) => {
    const { children, ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(()=>{
        console.log(rest.classInfo)
    },[])

    return (
      <>
        <Tr>
            <Td>{rest.classInfo.className}</Td>
            <EditClassModalContainer classId={rest.classInfo.classId}></EditClassModalContainer>
        </Tr>
      </>
    );
}

export default ClassData;
