import { FC, useState } from "react";
import StudentDatasList from "./StudentDatasList";

type StudentDataContainerProps = {
    children? : Node;
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

const StudentDataContainer: FC<StudentDataContainerProps> = (props) => {
    const {children, ...rest} = props;

    const [studentsInfo, setStudentsInfo] = useState<Array<studentInfo>>([
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
        {
            studentId: "2",
            name: "クレファス 太郎",
            class: "1",
            course: "1",
            address: "07089441293",
            subDay: 1,
            memo: 'この子はチンパンジーです',
            update: '2023/05/12',
        },
        {
            studentId: "3",
            name: "クレファス 太郎",
            class: "1",
            course: "1",
            address: "07089441293",
            subDay: 1,
            memo: 'この子はチンパンジーです',
            update: '2023/05/12',
        },
]);

    const handleUpdateStudentInfo = (index:string, value: boolean):void => {
        setStudentsInfo((prev)=> {
            const updatedStudentsInfo = prev.map((student,idx)=>{
                if (student.studentId === index) {
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
        <StudentDatasList
           studentInfo={studentsInfo}
           onClickUpdateStudentInfo={handleUpdateStudentInfo}
        />
    )
}

export default StudentDataContainer;