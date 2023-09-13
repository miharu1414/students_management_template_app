import { FC, useEffect, useState } from "react";
import EditModal from "./EditModal";

type EditModalContainerProps = {
    studentId: string,
}

export type studentInfo = {
    studentId: string,
    name: string,
    class: string,
    course: string,
    address: string,
    subDay: number,
    memo: string,
    update: string,
}

const EditModalContainer: FC<EditModalContainerProps> = (props) => {
    const {...rest} = props;

    const [studentInfo, setStudentInfo] = useState<studentInfo>(
        {
            studentId: "1",
            name: "クレファス 太郎",
            class: "1",
            course: "1",
            address: "07089441293",
            subDay: 1,
            memo: 'この子はチンパンジーです',
            update: '2023/05/12',
        },
);

    const updateClass = (newClass: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            class:  newClass,
        }))
    } 

    const updateCourse = (newCourse: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            course:  newCourse,
        }))
    } 

    const updateAddress = (newAddress: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            address:  newAddress,
        }))
    } 

    const updateMemo = (newMemo: string)=> {
        setStudentInfo((prevValue)=>({
            ...prevValue,
            memo:  newMemo,
        }))
    } 

    const handleUpdateStudentInfo = ()=> {
        
    } 

    useEffect(() => {
        console.log(studentInfo)
    },[studentInfo])


    return (
        <EditModal
           studentInfo={studentInfo}
           onClickUpdateStudentInfo={handleUpdateStudentInfo}
           updateClass={updateClass}
           updateCourse={updateCourse}
           updateAddress={updateAddress}
           updateMemo={updateMemo}
        />
    )
}

export default EditModalContainer;