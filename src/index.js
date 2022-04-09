import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Routes,Route,useNavigate,useLocation,useSearchParams } from "react-router-dom";
import {useCookies} from 'react-cookie';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {GlobalContext} from "./global/context";

import './index.css';
import Index from './pages/index';

function NavApp() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const { enqueueSnackbar } = useSnackbar();
    let [searchParams, setSearchParams] = useSearchParams();
    return <ThemeProvider
        theme={createTheme({

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
        <Index>
            <Routes>

            </Routes>
        </Index>
    </GlobalContext.Provider>
    </ThemeProvider>
}

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <SnackbarProvider maxSnack={3}>
              <NavApp/>
          </SnackbarProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
