import react from "react";

import SwitchArea from "../elements/SwitchArea";
import SliderArea from "../elements/SliderArea";

export default class ForbidForm extends react.Component {
    render(){
        return <react.Fragment>
            <SwitchArea
                data={this.props.data.switches}
                handleChange={(index,value)=>{this.props.handleChange("switches",index,value);}}
                sx={{
                    marginTop: "0!important",
                }}
            />
            <SliderArea
                data={this.props.data.sliders}
                handleChange={(index,value)=>{this.props.handleChange("sliders",index,value);}}
            />
        </react.Fragment>
    }
}
