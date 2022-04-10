import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter,Routes,Route,useNavigate,useLocation,useSearchParams } from "react-router-dom";
import {useCookies} from 'react-cookie';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {Home,ImagesearchRoller,LocalAtm} from "@mui/icons-material";
import {GlobalContext} from "./global/context";

import './index.css';
import Main from './pages/main';

function NavApp() {
    const els = [
        {name:'首页',path:'/',icon:<Home/>,element:null},
        {name:"样式生成器",path:"/style-generator",icon:<ImagesearchRoller/>,element:null},
        {name:"打赏记录",path:"https://link.bilibili.com/ctool/vtuber/",icon:<LocalAtm/>,element:null},
    ]
    const [cookies, setCookie, removeCookie] = useCookies();
    const { enqueueSnackbar } = useSnackbar();
    let [searchParams, setSearchParams] = useSearchParams();
    return <ThemeProvider
        theme={createTheme({
            palette: {
                white: {
                    main: '#fff',
                    contrastText: '#fff',
                },
            },
        })}
    ><GlobalContext.Provider value={{
        Nav: useNavigate(),
        Location: useLocation(),
        Params:useSearchParams(),
        Alert:enqueueSnackbar,
        cookies,
        setCookie,
        removeCookie,
        searchParams,
        setSearchParams,
    }}>
        <Main menu={els}>
            <Routes>
                {els.map(e=>{
                    if(e.path.indexOf('/')!==0)return null;
                    return <Route key={e.name} path={e.path} element={e.element}/>
                })}
            </Routes>
        </Main>
    </GlobalContext.Provider>
    </ThemeProvider>
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <SnackbarProvider maxSnack={3}>
              <NavApp/>
          </SnackbarProvider>
      </BrowserRouter>
  </React.StrictMode>
);
