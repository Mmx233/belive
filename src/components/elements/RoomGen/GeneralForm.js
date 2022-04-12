import react from "react";
import {Grid} from "@mui/material";

import Switch from "../switch";

export default class GeneralForm extends react.Component {
    handleSwitchChange(index,value){
        this.props.handleChange("switches",index,value);
    }
    render(){
        return <Grid
            container
            rowSpacing={2}
            flexShrink={1}
        >
            {this.props.data.switches.map((s,i)=>{
                return <Grid key={s.label} item xs={12} sm={6} md={4}>
                    <Switch
                        label={s.label}
                        checked={s.value}
                        onChange={(e,v)=>this.handleSwitchChange(i,v)}
                    />
                </Grid>
            })}
        </Grid>
    }
}
