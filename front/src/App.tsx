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

import EditStudents from "./pages/EditStudents";
import EditClassCourse from "./pages/EditClassCourse";
import Home from "src/pages/Home"
import Login from "src/pages/Login"
import LoginFunction from "src/components/functions/LoginFunction";
import Logout from "src/components/functions/Logout";
import LoginCheck from "src/components/functions/LoginCheck";

import Detail from "src/pages/Detail"
import PresentControl from "./pages/PresentControl";



import {userContext ,useUserInfo} from 'src/hooks/UserInfo'






export const App = () => (

  < userContext.Provider value={useUserInfo()} >


    
      <ChakraProvider theme={theme}>

        <Box fontSize="xl">
        <VStack spacing={0}>
          

          <BrowserRouter>
            <LoginCheck/>
            <Header/>
            <Routes>

              <Route path={`/`}  element={<Home/>}/>

              <Route path={`/register/`}  />

              <Route path={`/login/`} element={<Login/>} />

              <Route path={`/doLogin/`} >
                <Route path={`:id/:name`} element={<LoginFunction/>}/>
              </Route>

              <Route path={`/logout/`} element={<Logout/>} />


              <Route path={`/edit/`}  element={<EditStudents/>}/>
              <Route path={`/editClassCourse/`}  element={<EditClassCourse/>}/>              
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
  
  </userContext.Provider>
)
