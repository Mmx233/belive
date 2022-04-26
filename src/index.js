import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter,Routes,Route,useSearchParams } from "react-router-dom";
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {GlobalContext} from "./global/context";

import './index.css';
import Suspense from "./components/elements/Suspense";

const Main = React.lazy(()=>import('./pages/main'))
const Room = React.lazy(()=>import('./pages/room'))

function NavApp() {
    let [searchParams,setSearchParams] = useSearchParams();
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
        setSearchParams
    }}>
        <Routes>
            <Route path="/room" element={<Suspense el={<Room/>}/>}/>
            <Route path="*" element={<Suspense el={<Main/>}/>}/>
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
