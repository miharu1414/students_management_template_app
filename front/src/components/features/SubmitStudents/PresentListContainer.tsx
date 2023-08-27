import { FC, useState } from "react";

import PresentList from "./PresentList"

type PresentListContainerProps = {
    children? : Node;
}

export type studentInfo = {
    id: string,
    name: string,
    present: boolean,
    type: string,
}

const PresentListContainer: FC<PresentListContainerProps> = (props) => {
    const {children, ...rest} = props;

    const [studentsInfo, setStudentsInfo] = useState<Array<studentInfo>>([
        {
            id: "1",
            name: "クレファス 太郎",
            present: true,
            type: "normal",
        },
        {
            id: "2",
            name: "クレファス 太郎",
            present: true,
            type: "normal",
        },
        {
            id: "3",
            name: "青空 太郎",
            present: true,
            type: "normal",
        },
        {
            id: "4",
            name: "あおぞら 四郎",
            present: true,
            type: "normal",
        },
        {
            id: "5",
            name: "並木 海大",
            present: true,
            type: "normal",
        },

        {
            id: "6",
            name: "安倍 晋三",
            present: true,
            type: "normal",
        },
        {
            id: "7",
            name: "麻生 太郎",
            present: true,
            type: "normal",
        },
        {
            id: "8",
            name: "ビックモーター",
            present: true,
            type: "normal",
        },


]);

    const handleUpdateStudentInfo = (index:string, value: boolean):void => {
        setStudentsInfo((prev)=> {
            const updatedStudentsInfo = prev.map((student,idx)=>{
                if (student.id === index) {
                    return {
                        ...student,
                        present: value,
                    }
                }
                return student
            });
            return updatedStudentsInfo; 
        })

    } 

    return (
        <PresentList 
            studentsInfo={studentsInfo}
            onClickUpdateStudentInfo={handleUpdateStudentInfo}
        />
    )
}

export default PresentListContainer;