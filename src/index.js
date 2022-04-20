import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter,Routes,Route,useSearchParams } from "react-router-dom";
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {Home,ImagesearchRoller,LocalAtm} from "@mui/icons-material";
import {GlobalContext} from "./global/context";

import './index.css';
import Suspense from "./components/elements/Suspense";

const Main = React.lazy(()=>import('./pages/main'))
const RoomGen = React.lazy(()=>import('./pages/room-gen'))
const Room = React.lazy(()=>import('./pages/room'))
const NotFound = React.lazy(()=>import('./pages/NotFound'))

function NavApp() {
    const els = [
        {name:'首页',path:'/',icon:<Home/>,element:<RoomGen/>},
        {name:"样式生成器",path:"/style-generator",icon:<ImagesearchRoller/>,element:null},
        {name:"打赏记录",path:"https://link.bilibili.com/ctool/vtuber/",icon:<LocalAtm/>,element:null},
    ]
    let [searchParams] = useSearchParams();
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
        searchParams,
    }}>
        <Routes>
            <Route path="/room" element={<Suspense el={<Room/>}/>}/>
            <Route path="*" element={<Suspense
                el={
                    <Main menu={els}>
                        <Routes>
                            {els.map(e=>{
                                if(e.path.indexOf('/')!==0)return null;
                                return <Route key={e.name} path={e.path} element={<Suspense el={e.element}/>}/>
                            })}
                            <Route path="*" element={<Suspense el={<NotFound/>}/>} />
                        </Routes>
                    </Main>
                }
            />}/>
        </Routes>
    </GlobalContext.Provider>
    </ThemeProvider>
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <NavApp/>
      </BrowserRouter>
  </React.StrictMode>
);

console.log(atob('ICAgX19fX18gICAgICAgICAgICAgICAgICAKICAvICAgICBcICAgX19fX18gX19fICBfX18KIC8gIFwgLyAgXCAvICAgICBcXCAgXC8gIC8KLyAgICBZICAgIFwgIFkgWSAgXD4gICAgPCAKXF9fX198X18gIC9fX3xffCAgL19fL1xfIFwKICAgICAgICBcLyAgICAgIFwvICAgICAgXC8='))
