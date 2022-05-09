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
                marginRight: '0.4rem',
                boxSizing: 'border-box',
                "& > img": {
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                }
            }}>
                <img src={this.state.avatar} alt={"头像"} referrerPolicy={"no-referrer"}/>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                }}
            >
                <Box sx={{
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    "& > *:first-child": {
                        margin: 'unset'
                    },
                    "& > *" : {
                        marginLeft: '0.5rem',
                    }
                }}>
                    <span>{this.props.danma.User.Name}</span>
                    {this.props.Options.General.switches2.display_medal.value&&
                    this.props.danma.Medal&&this.props.danma.Medal.Display?<Box
                        sx={{
                            //padding: '1.5px 2px',
                            borderRadius: '2px',
                            backgroundColor: '#' + this.props.danma.Medal.Color.Background,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                fontSize: '0.3rem',
                                paddingLeft: '2px',
                                border: '1px solid black',
                                borderRadius: '2px',
                                "&>span:first-of-type": {
                                    //backgroundImage: `linear-gradient(45deg, #${this.props.danma.Medal.Color.From}, #${this.props.danma.Medal.Color.To})`,
                                },
                                "&>span:last-of-type": {
                                    display: 'inline-block',
                                    backgroundColor: 'black',
                                    color: '#fff',
                                    minWidth: '1rem',
                                    textAlign: 'center',
                                    marginLeft: '2px',
                                }
                            }}
                        >
                            <span>{this.props.danma.Medal.Name}</span>
                            <span>{this.props.danma.Medal.Level}</span>
                        </Box>
                    </Box>:null}
                </Box>
                <Box><span>{this.props.danma.Msg}</span></Box>
            </Box>
        </Box>
    }
}
