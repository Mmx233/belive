import react from "react";
import {MainContext,GlobalContext} from "../global/context";
import {Routes,Route,useNavigate} from "react-router-dom";
import {SnackbarProvider,useSnackbar} from 'notistack';
import {useCookies} from 'react-cookie';
import {Container, Box, Button, IconButton} from "@mui/material";
import {Menu as MenuIcon, Close, Home, ImagesearchRoller, LocalAtm} from "@mui/icons-material";

import './main.css';
import Suspense from "../components/elements/Suspense";
import Menu from "../components/menu";

const NotFound = react.lazy(()=>import('./NotFound'))
const RoomGen = react.lazy(()=>import('./room-gen'))

export default function Main(props){
  const noticeStackRef = react.createRef();
  const onClickDismiss = key => () => {
    noticeStackRef.current.closeSnackbar(key);
  }
  return <SnackbarProvider
      ref={noticeStackRef}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      action={(key) => (
          <IconButton onClick={onClickDismiss(key)}>
            <Close sx={{color:'white'}} fontSize={"small"}/>
          </IconButton>
      )}
  >
    <MainWithContext {...props}/>
  </SnackbarProvider>
}

function MainWithContext(props) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const MC = {
    Alert:useSnackbar().enqueueSnackbar,
    Nav: useNavigate(),
    cookies,
    setCookie,
    removeCookie,
  }
  return <GlobalContext.Consumer>
    {(context)=><MainContext.Provider value={Object.assign(context,MC)}>
      <MainApp {...props}/>
    </MainContext.Provider>}
  </GlobalContext.Consumer>
}

class MenuButton extends react.Component {
  render(){
    return <Box
      className="menu-button"
      sx={{
        display: 'none',
        marginBottom: '1.5em',
        position: this.props.position,
      }}
    ><Button
        variant={'outlined'}
        onClick={this.props.onClick}
        color={this.props.color}
    >{this.props.children}</Button></Box>
  }
}

class MainApp extends react.Component {
  constructor(props) {
    super(props);
    this.state={
      showMenu: false,
      menu: [
        {name:'首页',path:'/',icon:<Home/>,element:<RoomGen/>},
        {name:"样式生成器",path:"/style-generator",icon:<ImagesearchRoller/>,element:null},
        {name:"打赏记录",path:"https://link.bilibili.com/ctool/vtuber/",icon:<LocalAtm/>,element:null},
      ]
    }

    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
  }
  handleMenuButtonClick = () => {
    this.setState({showMenu: !this.state.showMenu})
  }
  render() {
    return <Box
        id="container"
    >
      <Menu
          els={this.state.menu}
          unShow={()=>{this.setState({showMenu: false})}}
          className={this.state.showMenu?"show":null}
      >
        <MenuButton
            onClick={this.handleMenuButtonClick}
            color={'white'}
            position={'absolute'}
        >
          <Close/>
        </MenuButton>
      </Menu>
      <Container
        id="content"
      >
        <MenuButton onClick={this.handleMenuButtonClick}><MenuIcon/></MenuButton>
        <Routes>
          {this.state.menu.map(e=>{
            if(e.path.indexOf('/')!==0)return null;
            return <Route key={e.name} path={e.path} element={<Suspense el={e.element}/>}/>
          })}
          <Route path="*" element={<Suspense el={<NotFound/>}/>} />
        </Routes>
      </Container>
    </Box>
  }
}
