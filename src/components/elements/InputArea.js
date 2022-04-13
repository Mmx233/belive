import react from 'react';
import {Grid, MenuItem, TextField} from "@mui/material";

export default class InputArea extends react.Component {
    render(){
        return <Grid
            container
            rowSpacing={2}
            flexShrink={1}
        >
            {this.props.data.map((s,i)=>{
                return <Grid
                    key={s.key}
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
                        {...s}
                        onChange={(e)=>this.props.handleChange(i,e.target.value)}
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
    }
}
