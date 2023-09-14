import { FC, useEffect, useState } from "react";
import NewClassModal from "./NewClassModal";


export type classInfo = {
    classId: string,
    className: string,
}

const NewClassModalContainer: FC = () => {

    const [classInfo, setClassInfo] = useState<classInfo>(
        {
            classId: "",
            className: "",
        },
    );

    const [classs, setClasss] = useState<Array<classInfo>>([])


    const updateClass = (newClass: string)=> {
        setClassInfo((prevValue)=>({
            ...prevValue,
            className:  newClass,
        }))
    } 

    const handleInsertClassInfo = async () => {
        try {
            console.log(classInfo.className)
            const URL = process.env.REACT_APP_UTIL_API + 'insertClass';
            const response = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 必要な場合、他のヘッダーも追加できます
              },
              body: JSON.stringify({
                new_class_name: classInfo.className,
              }),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            // リクエストが成功した場合の処理
            console.log(response);
      
            // JSONデータを取得
            // 任意の追加処理をここで行う
            console.log('unnko')

          } catch (error) {
            // エラーハンドリング
            console.error('POSTリクエストエラー:', error);
          }
    } 

    useEffect(() => {
        console.log(classInfo)
    },[classInfo])


    return (
        <NewClassModal
           classInfo={classInfo}
           classs={classs}
           onClickInsertClassInfo={handleInsertClassInfo}
           updateClass={updateClass}
        />
    )
}

export default NewClassModalContainer;