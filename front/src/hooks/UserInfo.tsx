import { createContext, useCallback, useState } from 'react';

// set context type
type UserContext = {
  name: string;
  setUpdateName: (name: string) => void;
  id: string;
  setUpdateId: (id: string) => void;
  selectedDate: Date;
  setUpdateDate: (day:Date) => void;
};

// context default value
const defaultContext: UserContext = {
  name: "",
  setUpdateName: () => {},
  id: "",
  setUpdateId: () => {},
  selectedDate: new Date(),
  setUpdateDate: () => {},
};

// context object
export const userContext = createContext<UserContext>(defaultContext);

// custom Hook
export const useUserInfo = (): UserContext => {
  // state名はUserContext typeのプロパティに合わせる。

  const [name,setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  // 関数名はUserContext typeのプロパティに合わせる。
  const setUpdateName = useCallback((name: string): void => {
    setName(name);
  }, []);
  const setUpdateDate = useCallback((day: Date): void => {
    setSelectedDate(day);
  }, [])
  const setUpdateId = useCallback((id: string): void => {
    setId(id);
  }, []);
  return {
    name,
    id,
    selectedDate,
    setUpdateName,
    setUpdateId,
    setUpdateDate
  };
};
