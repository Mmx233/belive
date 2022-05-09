import react from "react";
import {TextField,Typography} from "@mui/material";

import InputArea from "../elements/InputArea";
import SwitchArea from "../elements/SwitchArea";

export default class GeneralForm extends react.Component {
    constructor(props) {
        super(props);

        this.handleSwitchChange = this.handleSwitchChange.bind(this);
        this.handleSwitch2Change = this.handleSwitch2Change.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleSwitchChange(index,value){
        this.props.handleChange("switches",index,value);
    }
    handleSwitch2Change(index,value){
        this.props.handleChange("switches2",index,value);
    }
    handleInputChange(index,value){
        this.props.handleChange("inputs",index,value);
    }
    render(){
        return <react.Fragment>
            <TextField
                {...this.props.data.main.id}
                onChange={(e)=>{
                    if(!(e.target.value*1>0)){
                        return
                    }
                    this.props.handleChange("main","id",e.target.value*1)
                }}
                fullWidth
                sx={{
                    marginTop:'0.5em',
                    marginBottom:'1.5em'
                }}
            />

            <SwitchArea
                data={this.props.data.switches}
                handleChange={this.handleSwitchChange}
            />

            <Typography variant={"h6"} sx={{marginBottom:"0.5em"}}>弹幕设置</Typography>

            <SwitchArea
                data={this.props.data.switches2}
                handleChange={this.handleSwitch2Change}
            />

            <InputArea
                data={this.props.data.inputs}
                handleChange={this.handleInputChange}
            />
        </react.Fragment>
    }
}
