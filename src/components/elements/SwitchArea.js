import react from 'react';
import {Grid} from "@mui/material";
import Switch from "./switch";

export default class SwitchArea extends react.Component {
    render(){
        return <Grid
            container
            rowSpacing={2}
            flexShrink={1}
            sx={this.props.sx}
        >
            {this.props.data.map((s,i)=>{
                return <Grid key={s.label} item xs={12} sm={6} md={4}>
                    <Switch
                        {...s}
                        checked={s.value}
                        onChange={(e,v)=>this.props.handleChange(i,v)}
                    />
                </Grid>
            })}
        </Grid>
    }
}
