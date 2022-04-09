import react from 'react';
import {Box} from "@mui/material";

export default class Menu extends react.Component {
    render(){
        return <Box
            id="menu"
            sx={{
                backgroundColor: '#304156',
                display: 'flex',
                flexDirection: 'column',
            }}
            {...this.props}
        >
            {this.props.children}
        </Box>
    }
}
