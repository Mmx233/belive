import react from "react";
import {Grid, Slider as SliderUI, Typography} from "@mui/material";

export default class TestForm extends react.Component {
    render(){
        return <react.Fragment>
            <Grid
                container
                rowSpacing={2}
                flexShrink={1}
                sx={this.props.sx}
            >
                <Grid item xs={12}>
                    <Typography gutterBottom>
                        {`发送间隔（${this.props.data.sliders.min_test_danmaku_interval.value}~${this.props.data.sliders.max_test_danmaku_interval.value} ms）`}
                    </Typography>
                    <SliderUI
                        value={[this.props.data.sliders.min_test_danmaku_interval.value,this.props.data.sliders.max_test_danmaku_interval.value]}
                        onChange={(e)=>{
                            this.props.handleChange("sliders","min_test_danmaku_interval",e.target.value[0])
                            this.props.handleChange("sliders","max_test_danmaku_interval",e.target.value[1])
                        }}
                        valueLabelDisplay="auto"
                        max={5000}
                        min={0}
                    />
                </Grid>
            </Grid>
        </react.Fragment>
    }
}
