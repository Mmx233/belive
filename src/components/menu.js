import react from 'react';
import {Box,Typography,List,ListItem} from "@mui/material";

import './menu.css';

export default class Menu extends react.Component {
    render(){
        return <Box
            id="menu"
            sx={{
                backgroundColor: '#304156',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '100%',
                overflow: 'auto',
            }}
            className={this.props.className}
        >
            {this.props.children}
            <Typography
                variant="h3"
                fontFamily="fantasy"
                textAlign="center"
                padding="1.5rem 0"
                backgroundColor="#2b2f3a"
            >Belive</Typography>

            <List>
                {this.props.els.map(e=>{
                    return <ListItem>{e.icon}{e.name}</ListItem>
                })}
            </List>
        </Box>
    }
}
