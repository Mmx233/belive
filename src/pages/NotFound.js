import react from "react";
import {Container,Typography} from "@mui/material";

export default class NotFound extends react.Component {
  render() {
      return <Container
        sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "2rem",
            boxSizing: "border-box",
        }}
      >
          <Typography
              variant={"h1"}
              color={"#80808047"}
          >404</Typography>
      </Container>
  }
}
