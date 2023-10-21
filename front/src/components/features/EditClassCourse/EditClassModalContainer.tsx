import { FC, useEffect, useState } from "react";
import EditClassModal from "./EditClassModal";

type EditClassModalContainerProps = {
    classId: string,
    GetClassesInfo: ()=> void,
}

export type classInfo = {
    classId: string,
    className: string,
    areaColor: string,
    borderColor: string,
}

const EditClassModalContainer: FC<EditClassModalContainerProps> =  (props) => {
    const {...rest} = props;
    const [loading, setLoading] = useState<boolean>(true);

    const [classInfo, setClassInfo] = useState<classInfo>(
        {
            classId: "",
            className: "",
            borderColor: "",
            areaColor: "",
        },
    );

    const handleChangeAreaColor = (value: string) => {
      setClassInfo((prev) => ({
        ...prev,
        areaColor: value // areaColorのみを更新
      }));
    }

    const GetClassInfo = async () => {
      try {
          console.log(rest.classId)
          setLoading(true)
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
          setClassInfo({classId: rest.classId, className: jsonData.class_name, areaColor: jsonData.areaColor, borderColor: jsonData.borderColor})
          setLoading(false)
        } catch (error) {
          // エラーハンドリング
          console.error('POSTリクエストエラー:', error);
          setLoading(false)
        }
  }
    
    const updateClass = (newClass: string)=> {
        const newValue = classInfo
        newValue.className = newClass
        setClassInfo({className: newValue.className, classId: newValue.classId,  areaColor: "", borderColor: ""})
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
           loading={loading}
           onChangeAreaColor={handleChangeAreaColor}
           onClickUpdateClassInfo={handleUpdateClassInfo}
           updateClass={updateClass}
           getClassInfo={GetClassInfo}
           GetClassesInfo={rest.GetClassesInfo}
        />
    )
}

export default EditClassModalContainer;