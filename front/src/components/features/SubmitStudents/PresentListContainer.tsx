import { FC, useEffect, useState } from "react";
import { Box, VStack, theme, Stack, Divider, Button } from "@chakra-ui/react"

import {  useParams, Link } from 'react-router-dom';
import PresentList from "./PresentList"

type PresentListContainerProps = {
    children? : Node;
    classId?: string;
    className: string;
}

export type presentInfo = {
    id: string,
    name: string,
    attendId: string,
    classId?: string,
    courseId?: string,
}

const PresentListContainer: FC<PresentListContainerProps> = (props) => {
    const {children, ...rest} = props;

    const [studentsInfo, setStudentsInfo] = useState<Array<presentInfo>>([]);
    const [loading,setLoading] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [error, setError] = useState<boolean>(false);
    const [isDisable,setIsDisable] = useState<boolean>(false);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const handleUpdateStudentType = (index:string, value: string):void => {
        setStudentsInfo((prev)=> {
            const updatedStudentsInfo = prev.map((student,idx)=>{
                if (student.id === index) {
                    return {
                        ...student,
                        attendId: value,
                    }
                }
                return student
            });
            return updatedStudentsInfo; 
        })
    } 

    function formatDateToYYYYMMDD(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      }


    const GetStudents = async () => {
        setLoading(true)
        const formData = {class_id: rest.classId, date: formatDateToYYYYMMDD(selectedDate)};
        console.log(formData);
        try {
          const URL = process.env.REACT_APP_UTIL_API + 'getStudentsForSubmit';
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
          setStudentsInfo(jsonData.studentsData)
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
        const formData = {class_id: rest.classId, date: formatDateToYYYYMMDD(selectedDate), studentsInfo: studentsInfo};
        console.log(formData);
        try {
          const URL = process.env.REACT_APP_UTIL_API + '/insertStudentsAttendance';
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
          setStudentsInfo(jsonData.studentsData)
          setTimeout(()=>GetStudents(),500);
          setLoading(false)
    
          // 任意の追加処理をここで行う
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
      };

      const DeleteAttendInfos = async () => {
        setLoading(true)
        const formData = {class_id: rest.classId, date: formatDateToYYYYMMDD(selectedDate)};
        console.log(formData);
        try {
          const URL = process.env.REACT_APP_UTIL_API + '/deleteAttendDatas';
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
          
          setTimeout(()=>GetStudents(),500);
          setLoading(false)
    
          // 任意の追加処理をここで行う
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
      };

      const handleClickReload = ():void =>{
        GetStudents();
      }

      const validate = (): void => {
        // studentsInfoの各要素に対して、attendIdが空文字かどうかを判定
        const isValid = studentsInfo?.every((student) => student.attendId !== ''); // 条件を逆にする
      
        console.log(isValid);
        setIsDisable(!isValid); // 条件を逆にして setIsDisable を設定
      };
      



      useEffect(()=>{
        setTimeout(GetStudents,300)
      },[selectedDate])

      useEffect(()=>{
        validate()
      },[studentsInfo])
    
      useEffect(()=>{
        validate()
      },[])




    return (

            <PresentList 
                title={rest.className}
                loading={loading}
                selectedDate={selectedDate}
                studentsInfo={studentsInfo}
                error={error}
                isDisable={isDisable}
                handleDateChange={handleDateChange}
                onClickUpdateStudentType={handleUpdateStudentType}
                onClickUpdate={UploadStudents}
                onClickReload={handleClickReload}
                onClickDelete={DeleteAttendInfos}
            />

    )
}

export default PresentListContainer;