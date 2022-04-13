import react from "react";
import {Grid,TextField,MenuItem} from "@mui/material";

import Switch from "../switch";

export default class GeneralForm extends react.Component {
    constructor(props) {
        super(props);

        this.handleSwitchChange = this.handleSwitchChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleSwitchChange(index,value){
        this.props.handleChange("switches",index,value);
    }
    handleInputChange(index,value){
        this.props.handleChange("inputs",index,value);
    }
    render(){
        return <react.Fragment><Grid
            container
            rowSpacing={2}
            flexShrink={1}
            marginBottom={"2em"}
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
                        checked={s.value}
                        onChange={(e,v)=>this.handleSwitchChange(i,v)}
                    />
                </Grid>
            })}
        </Grid>
        <Grid
            container
            rowSpacing={2}
            flexShrink={1}
        >
            {this.props.data.inputs.map((s,i)=>{
                return <Grid
                    key={s.key}
                    item xs={12} sm={6}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch',maxWidth: '95%' }
                    }}
                >
                    <TextField
                        {...s}
                        onChange={(e)=>this.handleInputChange(i,e.target.value)}
                    >
                        {s.selection?s.selection.map((o)=>{
                            return <MenuItem key={o.label} value={o.value}>
                                {o.label}
                            </MenuItem>
                        }):null}
                    </TextField>
                </Grid>
            })}
        </Grid>
        </react.Fragment>
    }
}
