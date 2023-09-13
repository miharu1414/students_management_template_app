import { FC } from "react";
import { Box, theme, IconButton } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "src/ColorModeSwitcher"
import { Link, useNavigate } from "react-router-dom";

type HeaderProps = {
    children?: React.ReactNode;
}

const Header: FC<HeaderProps> = (props) => {
    const { children, ...rest } = props;

    const navigate = useNavigate()
 
    return (
        <Box width="100%" display="flex" justifyContent="flex-end" height={"50px"}> {/* justifyContentを追加 */}
            <IconButton
                onClick={() => navigate('/edit/')}
                size="md"
                fontSize="lg"
                variant="ghost"
                color="current"
                marginLeft="2"
                icon={<EditIcon />}
                aria-label={`editing`}
            />
            <ColorModeSwitcher />
        </Box>
    )
}

export default Header;
