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
            {Object.keys(this.props.data).map(key=>{
                let el=this.props.data[key]
                return <Grid key={key} item xs={12} sm={6} md={4}>
                    <Switch
                        {...el}
                        checked={el.value}
                        onChange={(e,v)=>this.props.handleChange(key,v)}
                    />
                </Grid>
            })}
        </Grid>
    }
}
