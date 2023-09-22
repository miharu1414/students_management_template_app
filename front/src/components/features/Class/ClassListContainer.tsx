import { FC, useEffect, useState } from "react";
import ClassList from "./ClassList";

type ClassListContainerProps = {
  children?: React.ReactNode;
};

export type Class = {
  classId: string;
  className: string;
  lastUpdate: string;
};

const ClassListContainer: FC<ClassListContainerProps> = (props) => {
  const { children, ...rest } = props;
  const [loading,setLoading] = useState<boolean>(false);



  const [classList, setClassList] = useState<Array<Class>>([]);

    // ランダムな日付と時間を生成する関数
    const getRandomDateTime = (): Date => {
      const start = new Date(2022, 0, 1); // 開始日（例：2022年1月1日）
      const end = new Date(); // 今の日付
      const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
      return new Date(randomTime);
    };
  const DownloadClasses = async () => {
    setLoading(true)
    const formData = {};

    try {
      const URL = process.env.REACT_APP_UTIL_API + 'getClasses';
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
      setClassList(jsonData.class_info)
      setLoading(false)

      // 任意の追加処理をここで行う
    } catch (error) {
      // エラーハンドリング
      console.error('POSTリクエストエラー:', error);
    }
  };

  useEffect(()=>{
    DownloadClasses();
  },[])

  return <ClassList classList={classList} isLoading={loading}/>;
};

export default ClassListContainer;
