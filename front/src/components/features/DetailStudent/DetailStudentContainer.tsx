import { FC, useEffect, useState } from "react";
import DetailStudent from "./DetailStudent";
import { json } from "react-router-dom";
import Loading from "src/components/common/Loading";

type DetailStudentContainerProps = {
    children? : Node;
    id: string;

}

export type DetailStudentInfo = {

}

export type Present = "出席" | "欠席" | "振替";

export type studentInfoDetail = {
    "id" : string,
    "name" : string,
    "kana": string,
    "class_id": string,
    "class_name": string,
    "course_id": string,
    "course_name": string,
    "address": string, 
    "substitute_day": string, 
    "memo": string, 
    "last_update": string, 
    "delete_flag":string,
}
export type attendData =  {
    date: string;
    status: Present;
    fiscalYear:string;
}

const DetailStudentContainer: FC<DetailStudentContainerProps> = (props) => {
    const {children, ...rest} = props;
    const [loading,setLoading] = useState<boolean>(true)
    const [studentInfo,setStudentInfo] = useState<studentInfoDetail>()
    const [attendData,setAttendDate] = useState<attendData[]>([])

    const FetchStudentAttendDetail = async () => {
        setLoading(true)
        const formData = {"student_id":rest.id};
        console.log(formData);
        try {
          const URL = process.env.REACT_APP_UTIL_API + 'getStudentAttendDetail';
          const response = await fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              // 必要な場合、他のヘッダーも追加できます
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          // リクエストが成功した場合の処理
          console.log(response);
    
          // JSONデータを取得
          const jsonData = await response.json();
          console.log('受け取ったJSONデータ:', jsonData);
          setStudentInfo(jsonData.studentsData);
          setAttendDate(jsonData.attendData);
          setLoading(false)
    
          // 任意の追加処理をここで行う
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
      };

      useEffect(()=>{
        FetchStudentAttendDetail();
      },[])

    return (
        <Loading loading={loading}>
            <DetailStudent studentInfo={studentInfo}
                attendData={attendData}
            />

        </Loading>

    )
}

export default DetailStudentContainer;