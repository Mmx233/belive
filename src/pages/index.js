import react from "react";
import {Container,Box,Button} from "@mui/material";
import {Menu as MenuIcon,Close} from "@mui/icons-material";

import './index.css';
import Menu from "../components/menu";

class MenuButton extends react.Component {
  render(){
    return <Box
      className="menu-button"
      sx={{
        display: 'none',
        marginBottom: '1.5em',
      }}
    ><Button
        variant={'outlined'}
        onClick={this.props.onClick}
        color={this.props.color}
    >{this.props.children}</Button></Box>
  }
}

export default class Index extends react.Component {
  constructor(props) {
    super(props);
    this.state={
      showMenu: false
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
          className={this.state.showMenu?"show":null}
      >
        <MenuButton
            onClick={this.handleMenuButtonClick}
            color={'white'}
        >
          <Close/>
        </MenuButton>
      </Menu>
      <Container
        id="content"
      >
        <MenuButton onClick={this.handleMenuButtonClick}><MenuIcon/></MenuButton>
        {this.props.children}
      </Container>
    </Box>
  }
}
