import { FC, useEffect, useState } from "react";
import NewStudentModal from "./NewStudentModal";


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

const NewStudentModalContainer: FC = () => {

    const [studentInfo, setStudentInfo] = useState<studentInfo>(
        {
            studentId: "",
            name: "",
            class: "",
            course: "",
            address: "",
            subDay: 0,
            memo: '',
            update: '',
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
        <NewStudentModal
           studentInfo={studentInfo}
           onClickUpdateStudentInfo={handleUpdateStudentInfo}
           updateClass={updateClass}
           updateCourse={updateCourse}
           updateAddress={updateAddress}
           updateMemo={updateMemo}
        />
    )
}

export default NewStudentModalContainer;