import { FC } from "react";
import { Box, theme, IconButton , 
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Tooltip,
    Spacer,
    Text,
    HStack
} from "@chakra-ui/react"
import { EditIcon, HamburgerIcon, AtSignIcon, AddIcon,ExternalLinkIcon, RepeatClockIcon,RepeatIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "src/ColorModeSwitcher"
import { Link, useNavigate } from "react-router-dom";

type HeaderProps = {
    children?: React.ReactNode;
}

const Header: FC<HeaderProps> = (props) => {
    const { children, ...rest } = props;

    const navigate = useNavigate()
 
    return (
        <Box 
            width="100%" 
            display="flex" 
            justifyContent="flex-start" 
            height={"50px"}
            
        > {/* justifyContentを追加 */}
            
            <Tooltip placement={"top"} label="ホームヘ">
                <HStack onClick={() => navigate('/')} spacing="0">
                    <IconButton
                        size="md"
                        fontSize="lg"
                        variant="ghost"
                        colorScheme="blue"
                        marginLeft="2"
                        icon={<InfoOutlineIcon />}
                        aria-label={`editing`}>    
                    </IconButton>
                    <Text as="b" fontSize="12px" color="blue.700">ホームヘ</Text>
                </HStack>
            </Tooltip>

            <Spacer></Spacer>
            
            <Tooltip
              placement={"top"}
              label='クラス・コースの編集'
            >
                <HStack onClick={() => navigate('/editClassCourse/')} spacing="0">
                    <IconButton
                        size="md"
                        fontSize="lg"
                        variant="ghost"
                        colorScheme="blue"
                        marginLeft="2"
                        icon={<EditIcon />}
                        aria-label={`editing`}
                    />
                    <Text as="b" fontSize="12px" color="blue.700">クラス
                    コース</Text>
                </HStack>
            </Tooltip>
            <Box></Box>
            <Tooltip
              placement={"top"}
              label='学生情報の編集'
            >
                <HStack onClick={() => navigate('/edit/')} spacing="0">
                    <IconButton
                        size="md"
                        fontSize="lg"
                        variant="ghost"
                        colorScheme="blue"
                        marginLeft="2"
                        icon={<EditIcon />}
                        aria-label={`editing`}
                    />
                    <Text as="b" fontSize="12px" color="blue.700">生徒情報</Text>
                </HStack>
            </Tooltip>
            <Box width="3%"></Box>
            <Box mt="6px" mr="6px">
                <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='outline'
                    colorScheme="blue"
                />
                <MenuList>
                    <MenuItem icon={<AtSignIcon />} onClick={()=>navigate("/logout")}>
                    ログアウト
                    </MenuItem>
                </MenuList>
                </Menu>
            </Box>
            
            {/* <ColorModeSwitcher /> */}
        </Box>
    )
}

export default Header;
