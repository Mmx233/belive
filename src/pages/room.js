import react from "react";
import {GlobalContext} from "../global/context";
import {Container} from "@mui/material";

import {Range,General,Forbid,Test} from '../components/RoomGen/form.json'
import {ConnectDanmaku,AvatarUrl} from "../modules/bilibili/live";

export default class Room extends react.Component {
    constructor(props) {
        super(props);
        this.state={
            loading:true,
            connecting:false,
            conn: null,
            Options:{
                General,
                Forbid,
                Test
            },
        }

        this.ConnectDanmaku = this.ConnectDanmaku.bind(this)
        this.OnMsg = this.OnMsg.bind(this)
    }
    OnMsg(data){
        switch (data.cmd) {
            case 'DANMU_MSG':
                let info = data.info
                console.log(info) //demo
                let danma = {
                    User: {
                        ID: info[2][0],
                        Name:info[2][1],
                    },
                    Msg:info[1],
                    IsEmoji:info[0][12]===1,
                }
                console.log(danma)//demo
                break
            default:
                break
        }
    }
    ConnectDanmaku() {
        if(this.state.connecting||this.state.conn) return
        this.setState({connecting:true})
        let conn=ConnectDanmaku(this.state.Options.General.main.id.value)
        conn.on('live',()=>{
            if(this.state.conn) {
                conn.close()
                return
            }
            this.setState({
                conn:conn,
                connecting:false
            })
        })
        conn.on('error',this.ConnectDanmaku)
        conn.on('close',()=>{
            this.setState({conn:null})
            this.ConnectDanmaku()
        })
        conn.on('msg',this.OnMsg)
    }
    componentDidMount() {
        //载入选项
        this.setState({
            Settings: {
                TestMode:Boolean(this.context.searchParams.get('test_mode')),
            }
        })
        let Options=this.state.Options
        Range(Options,(space,name,key,el)=>{
            let q=this.context.searchParams.get(key)
            if(q!==null){
                switch (typeof el.value){
                    case 'number':
                        q=q*1
                        if(isNaN(q))return
                        break
                    default:
                        break
                }
                el.value=q
            }
        })
        this.setState({Options})

        this.setState({loading:false})

        //danmaku连接
        this.ConnectDanmaku()
    }
    componentWillUnmount() {
        if(this.state.conn) {
            this.state.conn.on('close',null)
            this.state.conn.close()
        }
    }
    render(){
        return <Container>

        </Container>
    }
}

Room.contextType=GlobalContext;
