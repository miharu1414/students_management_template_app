import { FC, useContext, useState, useEffect } from "react";
import { userContext } from "src/hooks/UserInfo";
import ExtraAttend from "./ExtraAttend";
import StudentData from "../EditStudents/StudentData";
type ExtraAttendContainerProps = {
    children? : Node;
}

export type presentInfo = {
    id: string,
    name: string,
    kana:string,
    attendId: string,
    classId?: string,
    courseId?: string,
}

export type classInfo = {
    classId: string,
    className: string,
}

const ExtraAttendContainer: FC<ExtraAttendContainerProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);
  
    const [classId, setClassId] = useState<string>()
    const [classInfo,setClassInfo] = useState<classInfo[]>([])
    const [studentsInfo, setStudentsInfo] = useState<Array<presentInfo>>([]);
    const [willAddStudentsInfo, setWillAddStudentsInfo] = useState<Array<presentInfo>>([]);
    const [loading,setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [error, setError] = useState<boolean>(false);
    const [searchStr,setSearchStr] = useState<string>("")

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };



    function formatDateToYYYYMMDD(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      }


    const GetExtraInfo = async () => {
        setSearchStr("")
        setLoading(true)
        const formData = {class_id: classId, date: formatDateToYYYYMMDD(selectedDate)};
        console.log(formData);
        try {
          const URL = process.env.REACT_APP_UTIL_API + 'getExtraData';
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
          await setStudentsInfo(jsonData.studentsData);
          const ids:string[] = []
          jsonData.alreadyStudents.map((student:presentInfo)=> {
            ids.push(student.id);
          })
          console.log(ids)
          handleAddStudents(ids, jsonData.studentsData)
          setClassInfo(jsonData.class_info)
          setLoading(false)
          setError(false)
    
          // 任意の追加処理をここで行う
        } catch (error) {
          // エラーハンドリング
          setError(true)
          console.error('POSTリクエストエラー:', error);
        }
      };

      const UploadStudents = async () => {
        setLoading(true)
        const formData = {class_id: classId, date: formatDateToYYYYMMDD(selectedDate), studentsInfo: willAddStudentsInfo};
        console.log(formData);
        try {
          const URL = process.env.REACT_APP_UTIL_API + 'insertExtraStudentsAttendance';
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

       
          setLoading(false)
    
          // 任意の追加処理をここで行う
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
      };

      const DeleteAttendInfos = async () => {
        setLoading(true)
        const formData = {class_id: classId, date: formatDateToYYYYMMDD(selectedDate)};
        console.log(formData);
        try {
          const URL = process.env.REACT_APP_UTIL_API + 'deleteExtraAttendDatas';
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
          

          setLoading(false)
    
          // 任意の追加処理をここで行う
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
      };

      const handleClickReload = ():void =>{
        GetExtraInfo();
      }
      const handleAddStudent = (value: string): void => {
        // studentsInfoからidがvalueと一致する要素を検索
        const matchingStudent = studentsInfo.find((studentInfo) => studentInfo.id === value);
      
        // matchingStudentが見つかった場合、studentsInfoから削除
        if (matchingStudent) {
          const updatedStudentsInfo = studentsInfo.filter(student => student.id !== value);
          setStudentsInfo(updatedStudentsInfo); // studentsInfoを更新
          setWillAddStudentsInfo((prevStudents) => [...prevStudents, matchingStudent]);
        }
      };
      const handleAddStudents = (values: string[], studentsInfo1:presentInfo[]): void => {
        // valuesに含まれない学生データだけを抽出
        console.log(studentsInfo1)
        const studentsToAdd = studentsInfo1.filter((student) => !values.includes(student.id));
      
        // valuesに含まれる学生データを削除
        const updatedStudentsInfo = studentsInfo1.filter((student) => !studentsToAdd.includes(student));
      
        // studentsInfoを更新
        setStudentsInfo(studentsToAdd);
      
        // 抽出した学生データをwillAddStudentsInfoに追加
        setWillAddStudentsInfo(updatedStudentsInfo);
      };
      
      
      const handleDeleteStudent = (value: string): void => {
        // willAddStudentsInfoからidがvalueと一致する要素を検索
        const matchingStudent = willAddStudentsInfo.find((studentInfo) => studentInfo.id === value);
      
        // matchingStudentが見つかった場合、willAddStudentsInfoから削除
        if (matchingStudent) {
          const updatedWillAddStudents = willAddStudentsInfo.filter(student => student.id !== value);
          setWillAddStudentsInfo(updatedWillAddStudents); // willAddStudentsInfoを更新
          setStudentsInfo((prevStudents) => [...prevStudents, matchingStudent]); // studentsInfoに追加
        }
      };


      
      const handleClickUpload = async ()=> {
        await UploadStudents();
        GetExtraInfo();

      }

      const handleClickDelete = async ()=> {
        await DeleteAttendInfos();
        GetExtraInfo();

      }
    



      useEffect(()=>{
        
        setTimeout(GetExtraInfo,500)
      },[selectedDate, classId])





    return (

            <ExtraAttend
                loading={loading}
                classList={classInfo}
                selectedDate={selectedDate}
                studentsInfo={studentsInfo}
                error={error}
                searchStr={searchStr}
                willAddStudentsInfo={willAddStudentsInfo}
                onChangeSearchStr={setSearchStr}
                handleDateChange={handleDateChange}
                onClickUpdate={handleClickUpload}
                onClickReload={handleClickReload}
                onClickDelete={handleClickDelete}
                onUpdateClass={setClassId}
                onClickDeleteStudent={handleDeleteStudent}
                onClickAddStudent={handleAddStudent}
            />

    )
}

export default ExtraAttendContainer;