import react from 'react';
import {Box, Grid, Input, Typography, Slider as SliderUI} from "@mui/material";

export default class Slider extends react.Component {
    render(){
        return <Box>
            <Typography gutterBottom>
                {this.props.label}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <SliderUI
                        {...this.props}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item
                    sx={{
                        "&>*":{
                            maxWidth: "5em"
                        }
                    }}
                >
                    <Input
                        {...this.props}
                        size="small"
                        inputProps={Object.assign({
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        },this.props.inputProps)}
                    />
                </Grid>
            </Grid>
        </Box>
    }
}
