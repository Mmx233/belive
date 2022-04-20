import react from 'react';
import {Grid, MenuItem, TextField} from "@mui/material";

export default class InputArea extends react.Component {
    render(){
        return <Grid
            container
            rowSpacing={2}
            flexShrink={1}
            sx={this.props.sx}
        >
            {Object.keys(this.props.data).map(key=>{
                let el=this.props.data[key]
                return <Grid
                    key={key}
                    item xs={12} sm={6}
                    sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '25ch',
                            maxWidth: '95%'
                        }
                    }}
                >
                    <TextField
                        {...el}
                        onChange={(e)=>this.props.handleChange(key,e.target.value)}
                    >
                        {el.selection?el.selection.map((o)=>{
                            return <MenuItem key={o.label} value={o.value}>
                                {o.label}
                            </MenuItem>
                        }):null}
                    </TextField>
                </Grid>
            })}
        </Grid>
    }
}
