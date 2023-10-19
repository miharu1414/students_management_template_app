import { FC, useEffect, useState } from "react";
import { Box, VStack, theme, Stack, Divider, Button } from "@chakra-ui/react"
import {  useParams, Link } from 'react-router-dom';
import DateSelector from "src/components/common/DateSelector";
import PresentListContainer from "src/components/features/SubmitStudents/PresentListContainer";
import SubmitModal from "src/components/features/SubmitStudents/SubmitModal";
type PresentControlProps = {
    children? : Node;

}

const PresentControl: FC<PresentControlProps> = (props) => {
    const {children, ...rest} = props;
    const params = useParams<{id:string,name:string}>();
    const [classId,setClassId] = useState<string | undefined>(params.id)
    const [className,setClassName] = useState<string|undefined>(params.name);

    const DownloadClassName = async () => {
       
        const formData = {class_id: classId};
        console.log(formData);
        try {
          const URL = process.env.REACT_APP_UTIL_API + '/getClass';
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
          setClassName(jsonData.class_name)
          
    
          // 任意の追加処理をここで行う
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
    };

    useEffect(()=>{
        DownloadClassName()
    },[classId])

    

    
    return (


            <PresentListContainer classId={classId} className={className as string}/>

    )
}

export default PresentControl;