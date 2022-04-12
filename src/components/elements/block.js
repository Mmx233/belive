import react from "react";
import {Container} from "@mui/material";

export default class Block extends react.Component {
    render(){
        return <Container
            sx={{
                width: "100%",
                boxSizing: "border-box",
                marginBottom: "1rem",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
                backgroundColor: "white!important",
            }}
        >
            {this.props.children}
        </Container>
    }
}
