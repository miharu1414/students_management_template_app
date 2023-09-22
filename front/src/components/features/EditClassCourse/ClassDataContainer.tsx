import { FC, useEffect, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import ClassDatasList from "./ClassDataList";
import NewClassModalContainer from "./NewClassModalContainer";

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
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false)

    const GetClassesInfo = async () => {
        setLoading(true)
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
            setLoading(false)
            setError(false)
          } catch (error) {
            // エラーハンドリング
            setError(true)
            console.error('POSTリクエストエラー:', error);
          }
    }

    useEffect(() => {
        GetClassesInfo()
    }, [])

    return (
      <>
      <VStack>
        <ClassDatasList
           classInfo={classesInfo}
           GetClassesInfo={GetClassesInfo}
           loading={loading}
           error={error}
        />
        <Box padding={3} border={2} borderColor={"whiteAlpha.200"}
                width={"120px"}
                borderRadius={10}
                backgroundColor={"blue.300"}
                textAlign={"center"}
                textColor={"white"}
                marginTop={8}
                marginBottom={8}
                >
                <NewClassModalContainer
                  GetClassesInfo={GetClassesInfo}
                />
        </Box>
        </VStack>
      </>
    )
}

export default ClassDataContainer;