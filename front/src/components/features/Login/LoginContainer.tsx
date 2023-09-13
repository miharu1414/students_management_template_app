import { FC, useState, useContext } from "react";
import md5 from 'md5';
import { userContext } from "src/hooks/UserInfo";
import Login from "src/components/features/Login/Login";
import { Link, useNavigate } from "react-router-dom";

type LoginContainerProps = {
  children?: Node;
}

export const LoginContainer: FC<LoginContainerProps> = (props) => {
  const { children, ...rest } = props;
  const ctx = useContext(userContext);
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const LoginCheck = async (name: string, password: string) => {
    const hashedPassword = md5(password);
    const formData = { user_name: name, password: hashedPassword };
    console.log(formData);
    try {
      const URL = process.env.REACT_APP_LOGIN_API + 'login';
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
      console.log('POSTリクエストが成功しました。');
      console.log(response);

      // JSONデータを取得
      const jsonData = await response.json();
      console.log('受け取ったJSONデータ:', jsonData);
      if (jsonData.status === "success") {
        navigate(`/doLogin/${jsonData.user_id}/${jsonData.user_name}`);
      }

      // 任意の追加処理をここで行う
    } catch (error) {
      // エラーハンドリング
      console.error('POSTリクエストエラー:', error);
    }
  };

  return (
    <Login
      name={name}
      password={password}
      error={error}
      onNameChanged={setName}
      onPasswordChanged={setPassword}
      onClickLogin={() => LoginCheck(name, password)} // Pass name and password to LoginCheck
    />
  );
};

export default LoginContainer;
