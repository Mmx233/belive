import react from 'react';
import {Grid} from '@mui/material';

import Slider from './slider'

export default class SliderArea extends react.Component {
    render(){
        return <Grid
            container
            rowSpacing={2}
            flexShrink={1}
            sx={this.props.sx}
        >
            {Object.keys(this.props.data).map(key=>{
                let el=this.props.data[key]
                return <Grid key={key} item xs={12}>
                    <Slider
                        {...el}
                        onChange={(e)=>{
                            let v=e.target.value;
                            v=Math.abs(v*1)
                            if(el.max){
                                v=Math.min(v,el.max)
                            }
                            if(el.min){
                                v=Math.max(v,el.min)
                            }
                            this.props.handleChange(key,v)
                        }}
                    />
                </Grid>
            })}
        </Grid>
    }
}
