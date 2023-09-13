import { FC, useContext } from "react";
import { userContext } from "src/hooks/UserInfo";
import { Spinner } from "@chakra-ui/react";

type LoadingProps = {
  children?: React.ReactNode;
  loading: boolean;
}

const Loading: FC<LoadingProps> = (props) => {
  const { children, ...rest } = props;
  const ctx = useContext(userContext);
  
  return (
    <>
      {rest.loading ? (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default Loading;
