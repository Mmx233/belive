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
            {this.props.data.map((s,i)=>{
                return <Grid key={s.label} item xs={12}>
                    <Slider
                        {...s}
                        onChange={(e)=>{
                            let v=e.target.value;
                            v=Math.abs(v*1)
                            if(s.max){
                                v=Math.min(v,s.max)
                            }
                            if(s.min){
                                v=Math.max(v,s.min)
                            }
                            this.props.handleChange(i,v)
                        }}
                    />
                </Grid>
            })}
        </Grid>
    }
}
