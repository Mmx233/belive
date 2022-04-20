import react from "react";
import {Box,CircularProgress,Fade} from "@mui/material";

export default class Suspense extends react.Component {
    render(){
        return <react.Suspense fallback={<Box
            sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                width:'100%',
                height:'100%',
            }}
        ><Fade in><CircularProgress/></Fade></Box>}>
            {this.props.el}
        </react.Suspense>
    }
}
