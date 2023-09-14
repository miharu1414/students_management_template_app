import { FC, useEffect, useState } from "react";
import ClassDatasList from "./ClassDataList";

type ClassDataContainerProps = {
    children? : Node;
}

export type classInfo = {
    classId: string,
    className: string,
}

const ClassDataContainer: FC<ClassDataContainerProps> = (props) => {
    const {children} = props;

    const [classesInfo, setClassesInfo] = useState<Array<classInfo>>([
    ]);

    const GetClassesInfo = async () => {
        try {
            const URL = process.env.REACT_APP_UTIL_API + 'getClassesNoneUpdate';
            const response = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 必要な場合、他のヘッダーも追加できます
              },
              body: JSON.stringify({}),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            // リクエストが成功した場合の処理
            console.log(response);
      
            // JSONデータを取得
            const jsonData = await response.json();
            console.log(jsonData)
            // 任意の追加処理をここで行う

            const newClasses: classInfo[] = [];
            jsonData.class_info.map((classData:classInfo) => {
                const ClassData: classInfo = {classId: classData.classId, className: classData.className}
                newClasses.push(ClassData)
            })
            setClassesInfo(newClasses)
          } catch (error) {
            // エラーハンドリング
            console.error('POSTリクエストエラー:', error);
          }
    }

    useEffect(() => {
        GetClassesInfo()
    }, [])

    return (
        <ClassDatasList
           classInfo={classesInfo}
        />
    )
}

export default ClassDataContainer;