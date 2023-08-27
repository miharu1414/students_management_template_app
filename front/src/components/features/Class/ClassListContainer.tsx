import { FC, useState } from "react";
import ClassList from "./ClassList";

type ClassListContainerProps = {
  children?: React.ReactNode;
};

export type Class = {
  id: string;
  name: string;
  lastPosted: string;
};

const ClassListContainer: FC<ClassListContainerProps> = (props) => {
  const { children, ...rest } = props;

  // ランダムな日付と時間を生成する関数
  const getRandomDateTime = (): Date => {
    const start = new Date(2022, 0, 1); // 開始日（例：2022年1月1日）
    const end = new Date(); // 今の日付
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime);
  };

  const [classList, setClassList] = useState<Array<Class>>([
    {
      id: "1",
      name: "金曜日",
      lastPosted: "2023/8/23", // ランダムな日付と時間を取得して形式に変換して入れる
    },
    {
      id: "2",
      name: "土曜日 13時",
      lastPosted: "2023/8/23",
    },
    {
      id: "3",
      name: "土曜日 15時",
      lastPosted: "2023/8/23",
    },
    {
      id: "4",
      name: "土曜日 17時",
      lastPosted: "2023/8/23",
    },
  ]);



  return <ClassList classList={classList}  />;
};

export default ClassListContainer;
