import { createContext, useCallback, useState } from 'react';

// set context type
type UserContext = {
  name: string;
  setUpdateName: (name: string) => void;
  id: string;
  setUpdateId: (id: string) => void;

};

// context default value
const defaultContext: UserContext = {
  name: "",
  setUpdateName: () => {},
  id: "",
  setUpdateId: () => {},
};

// context object
export const userContext = createContext<UserContext>(defaultContext);

// custom Hook
export const useUserInfo = (): UserContext => {
  // state名はUserContext typeのプロパティに合わせる。

  const [name,setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  // 関数名はUserContext typeのプロパティに合わせる。
  const setUpdateName = useCallback((name: string): void => {
    setName(name);
  }, []);
  const setUpdateId = useCallback((id: string): void => {
    setId(id);
  }, []);
  return {
    name,
    id,
    setUpdateName,
    setUpdateId,
  };
};
