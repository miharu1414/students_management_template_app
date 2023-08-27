import { FC, useState } from "react";

import PresentListItem from "./PresentListItem"
import { studentInfo } from "./PresentListContainer";
import { VStack } from "@chakra-ui/react";

type PresentListProps = {
    children? : Node,
    studentsInfo: studentInfo[],
    onClickUpdateStudentInfo: (id: string, value: boolean) => void

}

const PresentList: FC<PresentListProps> = (props) => {
    const {children, ...rest} = props;


    return (
        <VStack spacing={0} overflowY={"scroll"}>
            {rest.studentsInfo.map((studentInfo, index)=> {
                return (
                    <PresentListItem 
                    index={index}
                    studentInfo={studentInfo}
                    onClickUpdateStudentInfo={rest.onClickUpdateStudentInfo}    
                    key={index}
                />
                )

            })}


        </VStack>

        
    )
}

export default PresentList;