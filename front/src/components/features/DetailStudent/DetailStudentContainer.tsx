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
    const [attendData,setAttendData] = useState<attendData[]>([])
    const [displayAttendData,setDisplayAttendData] = useState<attendData[]>([])
    const [selectedFiscalYear,setSelectedFiscalYear] = useState<string>("")
    const [fiscalYears, setFiscalYears] = useState<string[]>([])

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
          setAttendData(jsonData.attendData);
          setLoading(false)
    
          // 任意の追加処理をここで行う
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
      };

      const handleSelectFiscalYear = ():void => {
        const fiscalYears = new Set<string>()
        attendData.map((attend)=>{
          fiscalYears.add(attend.fiscalYear)
        })
        const listFiscalYears: string[] = [...fiscalYears]
        setFiscalYears(listFiscalYears)
        
      }

      const handleDisplayAttendData = (): void => {
        // fiscalYearがselectedFiscalYearに合致するデータをフィルタリングして取得
        const filteredAttendData = attendData.filter((data) => {
          return data.fiscalYear === selectedFiscalYear;
        });
      
        // filteredAttendDataをdisplayAttendDataに格納
        setDisplayAttendData(filteredAttendData);
      };
      const calculateFiscalYear = ():string => {
        const today = new Date();
        const year: number = today.getFullYear();
        const month = today.getMonth() + 1; // 月は0から始まるため+1する
      
        // 年度の開始月を設定します（通常は4月）
        const fiscalYearStartMonth = 4;
      
        // 今日の月が年度の開始月よりも前の場合、前の年が年度となります
        if (month < fiscalYearStartMonth) {
          const fiscalYear: number = year - 1
          return String(fiscalYear)
        } else {
          return String(year);
        }
      }
      

      useEffect(()=>{
        setSelectedFiscalYear(calculateFiscalYear())
        FetchStudentAttendDetail();
      },[])

      useEffect(()=>{
        handleSelectFiscalYear()
      },[attendData])

      useEffect(()=>{
        handleDisplayAttendData()
      },[selectedFiscalYear])

    return (
        <Loading loading={loading}>
            <DetailStudent 
              selectedFiscalYear={selectedFiscalYear}
              onChangeSelectedFiscalYear={setSelectedFiscalYear}
              fiscalYears={fiscalYears}
              studentInfo={studentInfo}
              attendData={displayAttendData}
            />

        </Loading>

    )
}

export default DetailStudentContainer;