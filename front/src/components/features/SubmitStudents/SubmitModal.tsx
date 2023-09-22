import { FC, useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Alert,
    AlertIcon,
    CloseButton,
} from '@chakra-ui/react';
import { Button, useDisclosure } from '@chakra-ui/react';

type SubmitModalProps = {
    children? : React.ReactNode;
    title? : string,
    color? : string,
    onUpload: ()=>void;
}

const SubmitModal: FC<SubmitModalProps> = (props) => {
    const {children, ...rest} = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showAlert, setShowAlert] = useState(false);

    const doSubmit = () => {
        onClose(); // モーダルを閉じる
        rest.onUpload();
    }

    return (
        <>
            <Button onClick={onOpen}  colorScheme={rest.color ? rest.color : 'teal'} >{rest.title ?? "更新"}</Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent width={"95%"}>
                    <ModalHeader>確認！</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        曜日とクラスは合っていますか？
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='solid' mr={1} onClick={onClose}>キャンセル</Button>
                        <Button colorScheme='blue' mr={3} onClick={doSubmit}>
                            更新
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {showAlert && (
                <Alert status="success" position="fixed" top="0" width="100%" zIndex="1000">
                    <AlertIcon />
                    更新できました
                    <CloseButton position="absolute" right="8px" top="50%" transform="translateY(-50%)" />
                </Alert>
            )}
        </>
    );
};

export default SubmitModal;
