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
    studentAttendId:string;
}

type presentInfo = {
  id: string;
  name: string;
  attendId: string;
  classId?: string | undefined;
  courseId?: string | undefined;
}

const DetailStudentContainer: FC<DetailStudentContainerProps> = (props) => {
    const {children, ...rest} = props;
    const [loading,setLoading] = useState<boolean>(true)
    const [studentInfo,setStudentInfo] = useState<studentInfoDetail>()
    const [attendData,setAttendData] = useState<attendData[]>([])
    const [displayAttendData,setDisplayAttendData] = useState<attendData[]>([])
    const [selectedFiscalYear,setSelectedFiscalYear] = useState<string>("")
    const [fiscalYears, setFiscalYears] = useState<string[]>([])
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [presentInfo, setPresentInfo] = useState<presentInfo>({id: studentInfo?.id === undefined ? "1" : studentInfo.id, name: studentInfo?.name === undefined ? "" : studentInfo.name, attendId: "", classId: studentInfo?.class_id, courseId: studentInfo?.course_id})

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

      function formatDateToYYYYMMDD(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      }

      const InsertStudentAttendance = async () => {
        const formData = {class_id: presentInfo.classId, date: formatDateToYYYYMMDD(selectedDate), studentInfo: {id: presentInfo.id, attendId: presentInfo.attendId, courseId: presentInfo.courseId}}
        try {
          const URL = process.env.REACT_APP_UTIL_API + 'insertStudentAttendance';
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
          // 任意の追加処理をここで行う
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
      }

      const DeleteStudentAttendance = async (index:string) => {
        const formData = {student_attendance_id: index}
        try {
          const URL = process.env.REACT_APP_UTIL_API + 'deleteStudentAttendance';
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
          // 任意の追加処理をここで行う
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
      }

      const handleSelectFiscalYear = ():void => {
        const fiscalYears = new Set<string>()
        attendData.map((attend)=>{
          fiscalYears.add(attend.fiscalYear)
        })
        const listFiscalYears: string[] = [...fiscalYears]
        setFiscalYears(listFiscalYears)
      }

      const handleInsertStudent =  ():void => {
        InsertStudentAttendance()
      }

      const handleDeleteStudent = (index:string) => {
        DeleteStudentAttendance(index)
      } 

      const handleDisplayAttendData = (): void => {
        // fiscalYearがselectedFiscalYearに合致するデータをフィルタリングして取得
        const filteredAttendData = attendData.filter((data) => {
          return data.fiscalYear === selectedFiscalYear;
        });
        const sortedFilteredAttendData = filteredAttendData.sort((x, y) => {
          if(x.date > y.date) return 1;
          else if(x.date < y.date) return -1;
          return 1
        })
        // filteredAttendDataをdisplayAttendDataに格納
        setDisplayAttendData(sortedFilteredAttendData);
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

      const handleUpdateStudentType = (id: string, value: string):void => {
        setPresentInfo((prev)=> {
            const updatedStudentsInfo = {
                        ...prev,
                        attendId: value,
                }
                return updatedStudentsInfo
            });
    } 

     const handleDateChange = (date: Date) => {
      setSelectedDate(date)
     }

     const handleInsert = async() => {
      await InsertStudentAttendance()
      FetchStudentAttendDetail()
     }

      const handleDelete = async(index:string) => {
        await DeleteStudentAttendance(index)
        FetchStudentAttendDetail()
      }

      useEffect(()=>{
        setSelectedFiscalYear(calculateFiscalYear())
        FetchStudentAttendDetail();
      },[])

      useEffect(()=>{
        handleSelectFiscalYear()
        handleDisplayAttendData()
      },[attendData])

      useEffect(()=>{
        handleDisplayAttendData()
      },[selectedFiscalYear])

      useEffect(() => {
        setPresentInfo({id: studentInfo?.id === undefined ? "1" : studentInfo.id, name: studentInfo?.name === undefined ? "" : studentInfo.name, attendId: "", classId: studentInfo?.class_id, courseId: studentInfo?.course_id})
      }, [studentInfo])

    return (
        <Loading loading={loading}>
            <DetailStudent 
              selectedFiscalYear={selectedFiscalYear}
              onChangeSelectedFiscalYear={setSelectedFiscalYear}
              onChangeSelectedDate={handleDateChange}
              onChangePresentInfo={handleUpdateStudentType}
              onChangeFetchStudent={FetchStudentAttendDetail}
              presentInfo={presentInfo}
              clickInsertStudentAttendance={handleInsertStudent}
              clickDeleteStudentAttendance={handleDeleteStudent}
              InsertStudent={handleInsert}
              DeleteStudent={handleDelete}
              fiscalYears={fiscalYears}
              studentInfo={studentInfo}
              attendData={displayAttendData}
              selectedDate={selectedDate}
            />

        </Loading>

    )
}

export default DetailStudentContainer;