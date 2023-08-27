import { FC } from "react";
import { Box, theme } from "@chakra-ui/react"
import { ColorModeSwitcher } from "src/ColorModeSwitcher"

type HeaderProps = {
    children?: React.ReactNode;
}

const Header: FC<HeaderProps> = (props) => {
    const { children, ...rest } = props;
    return (
        <Box width="100%" display="flex" justifyContent="flex-end" height={"50px"}> {/* justifyContentを追加 */}
            <ColorModeSwitcher />
        </Box>
    )
}

export default Header;
