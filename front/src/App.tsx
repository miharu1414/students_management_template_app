import * as React from "react"
import { HashRouter, BrowserRouter, Routes, Route} from "react-router-dom";
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

import EditStudentsPage from "./pages/EditStudentsPage";
import EditClassCoursePage from "src/pages/EditClassCoursePage"
import Home from "src/pages/Home"
import Login from "src/pages/Login"
import LoginFunction from "src/components/functions/LoginFunction";
import Logout from "src/components/functions/Logout";
import LoginCheck from "src/components/functions/LoginCheck";

import Detail from "src/pages/Detail"
import PresentControl from "./pages/PresentControl";



import {userContext ,useUserInfo} from 'src/hooks/UserInfo'
import ExtraAttendPage from "src/pages/ExtraAttendPage";






export const App = () => (

  < userContext.Provider value={useUserInfo()} >


    
      <ChakraProvider theme={theme}>

        <Box fontSize="xl">
        <VStack spacing={0}>
          

          <HashRouter basename="/build">
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


                <Route path={`/edit/`}  element={<EditStudentsPage/>}/>
                <Route path={`/editClassCourse/`}  element={<EditClassCoursePage />}/>              
                <Route path={`/control/`} >
                  <Route path={`:id/:name`} element={<PresentControl/>}/>
                </Route>
                <Route path={`/detail/`} >
                  <Route path={`:id`} element={<Detail/>}/>
                </Route>

              <Route path={`/extraAttend/`}  element={<ExtraAttendPage/>}/>
            </Routes>
          </HashRouter>
        </VStack>
      </Box>





      </ChakraProvider>
  
  </userContext.Provider>
)
