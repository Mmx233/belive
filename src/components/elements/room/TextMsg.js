import react from 'react';
import  {Box} from '@mui/material'

import {AvatarUrl} from "../../../modules/bilibili/live";

export default class TextMsg extends react.Component {
    render(){
        return <Box
            sx={{
                display: 'flex',
                maxWidth: '100%',
            }}
        >
            <Box>
                <img src={AvatarUrl(this.props.danma.User.ID)}/>
            </Box>
            <Box>
                {this.props.danma.Msg}
            </Box>
        </Box>
    }
}
