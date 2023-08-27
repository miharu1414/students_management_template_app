import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import Header from "./components/common/Header";

import Home from "src/pages/Home"
import Detail from "src/pages/Detail"
import PresentControl from "./pages/PresentControl";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="xl">
      <VStack spacing={0}>
        <Header/>

        <BrowserRouter>
      <Routes>
        <Route path={`/`}  element={<Home/>}/>
        <Route path={`/register/`}  />
        <Route path={`/login/`}  />
        <Route path={`/control/`} >
          <Route path={`:id`} element={<PresentControl/>}/>
        </Route>
        <Route path={`/detail/`} >
          <Route path={`:id`} element={<Detail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

      </VStack>

      
    </Box>
  </ChakraProvider>
)
