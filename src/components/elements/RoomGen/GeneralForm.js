import react from "react";
import {Grid,TextField} from "@mui/material";

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
            <Grid item xs={12}>
                <TextField
                    {...this.props.data.main[0]}
                    onChange={(e)=>{
                        if(!(e.target.value*1>0)){
                            return
                        }
                        this.props.handleChange("main",0,e.target.value*1)
                    }}
                    fullWidth
                />
            </Grid>
            {this.props.data.switches.map((s,i)=>{
                return <Grid key={s.label} item xs={12} sm={6} md={4}>
                    <Switch
                        {...s}
                        onChange={(e,v)=>this.handleSwitchChange(i,v)}
                    />
                </Grid>
            })}
        </Grid>
    }
}
