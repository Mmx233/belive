import react from 'react';
import {Box,Typography,List,ListItemButton,ListItemIcon,ListItemText} from "@mui/material";
import './menu.css';

import {GlobalContext} from "../global/context";

export default class Menu extends react.Component {
    handleNavClick(target) {
        if(target.indexOf('/') === 0) {
            this.context.Nav(target);
        }else {
            window.open(target, '_blank');
        }
    }
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

            <List
                sx={{
                    padding: '0',
                }}
            >
                {this.props.els.map(e=>{
                    return <ListItemButton
                        key={e.name}
                        className={document.location.pathname=== e.path ? 'active' : ''}
                        onClick={()=>this.handleNavClick(e.path)}
                        sx={{
                            padding:'1em 2.5em'
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: '2.5em',
                            }}
                        >{e.icon}</ListItemIcon>
                        <ListItemText primary={e.name} />
                    </ListItemButton>
                })}
            </List>
        </Box>
    }
}

Menu.contextType = GlobalContext
