import react from "react";

import SliderArea from "../elements/SliderArea";

export default class TestForm extends react.Component {
    render(){
        return <react.Fragment>
            <SliderArea
                data={this.props.data.sliders}
                handleChange={(index,value)=>{this.props.handleChange("sliders",index,value);}}
            />
        </react.Fragment>
    }
}
