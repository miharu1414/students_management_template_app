import { FC, useContext } from "react";
import { userContext } from "src/hooks/UserInfo";
import { Spinner,Box } from "@chakra-ui/react";

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
        <Box 
          zIndex={"100"}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
        </Box>

      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default Loading;
