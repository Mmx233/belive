import react from "react";
import {Container,Box} from "@mui/material";

import './index.css';
import Menu from "../components/menu";

export default class Index extends react.Component {
  render() {
    return <Box
        id="container"
    >
      <Menu/>
      <Container
        id="content"
      >
        {this.props.children}
      </Container>
    </Box>
  }
}
