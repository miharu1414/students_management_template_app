import { FC } from "react";
import { VStack, Heading } from "@chakra-ui/react";
import ClassList from "src/components/features/Class/ClassList";
import ClassListContainer from "src/components/features/Class/ClassListContainer";

type HomeProps = {
    children? : Node;
}

const Home: FC<HomeProps> = (props) => {
    const {children, ...rest} = props;
    return (
    <>
        <VStack>
            <Heading >
                クラス一覧
            </Heading>
            <ClassListContainer/>    
        </VStack>
    </>
    )
}

export default Home;