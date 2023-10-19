import { FC, useEffect } from "react";
import { useDisclosure, Tr, Td} from "@chakra-ui/react";
import { classInfo, studentInfo } from "./ClassCourseStudentsContainer";
import EditClassModalContainer from "./EditClassModalContainer";
import DetailModal from "./DetailModal";

type ClassDataProps = {
    children?: React.ReactNode;
    index: number;
    classInfo: classInfo,
    students: studentInfo[];
    GetClassesInfo: () => void,
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
        <Td onClick={onOpen} paddingRight={1}>
              {rest.classInfo.className}
              <DetailModal isOpen={isOpen} onClose={onClose} groupName={rest.classInfo.className} students={rest.students}/>
            </Td>
            <Td paddingX={2}>({rest.students.length}人)</Td>
            <EditClassModalContainer 
              classId={rest.classInfo.classId}
              GetClassesInfo={rest.GetClassesInfo}
            />
        </Tr>
      </>
    );
}

export default ClassData;
