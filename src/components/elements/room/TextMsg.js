import react from 'react';
import  {Box} from '@mui/material'

import {AvatarUrl} from "../../../modules/bilibili/live";

export default class TextMsg extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: "https://static.hdslb.com/images/member/noface.gif",
        }

    }
    componentDidMount() {
        AvatarUrl(this.props.danma.User.ID).then(url => {
            this.setState({
                avatar: url+'@240w_240h_1c_1s.webp',
            })
        })
    }
    render(){
        return <Box
            sx={{
                display: 'flex',
                maxWidth: '100%',
                height: '3rem',
                "&>.img":{
                    width: '3rem',
                    height: '3rem',
                },
                marginBottom: '1rem',
            }}
        >
            <Box className={"img"} sx={{
                padding: '0.2rem',
                boxSizing: 'border-box',
                "& > img": {
                    width: 'auto',
                    height: '100%',
                    borderRadius: '50%',
                }
            }}>
                <img src={this.state.avatar} alt={"头像"} referrerPolicy={"no-referrer"}/>
            </Box>
            <Box>
                {this.props.danma.Msg}
            </Box>
        </Box>
    }
}
