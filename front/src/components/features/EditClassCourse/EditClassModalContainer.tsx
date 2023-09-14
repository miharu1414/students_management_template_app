import { FC, useEffect, useState } from "react";
import EditClassModal from "./EditClassModal";

type EditClassModalContainerProps = {
    classId: string,
}

export type classInfo = {
    classId: string,
    className: string,
}

const EditClassModalContainer: FC<EditClassModalContainerProps> =  (props) => {
    const {...rest} = props;

    const [classInfo, setClassInfo] = useState<classInfo>(
        {
            classId: "",
            className: "",
        },
    );

    const GetClassInfo = async () => {
      try {
          console.log(rest.classId)
          const URL = process.env.REACT_APP_UTIL_API + 'getClass';
          const response = await fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              // 必要な場合、他のヘッダーも追加できます
            },
            body: JSON.stringify({class_id: rest.classId}),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          // リクエストが成功した場合の処理
          console.log(response);
    
          // JSONデータを取得
          const jsonData = await response.json();
          // 任意の追加処理をここで行う
          setClassInfo({classId: rest.classId, className: jsonData.class_name})
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
        }
  }
    
    const updateClass = (newClass: string)=> {
        const newValue = classInfo
        newValue.className = newClass
        setClassInfo({className: newValue.className, classId: newValue.classId})
    } 

    const handleUpdateClassInfo = async () => {
        try {
            console.log(classInfo.className)
            const URL = process.env.REACT_APP_UTIL_API + 'editClass';
            const response = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 必要な場合、他のヘッダーも追加できます
              },
              body: JSON.stringify({
                edited_class_name: classInfo.className,
                class_id: classInfo.classId,
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
        <EditClassModal
           classInfo={classInfo}
           onClickUpdateClassInfo={handleUpdateClassInfo}
           updateClass={updateClass}
           getClassInfo={GetClassInfo}
        />
    )
}

export default EditClassModalContainer;