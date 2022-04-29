import react from "react";
import {GlobalContext} from "../global/context";
import {Container,Box} from "@mui/material";

import TextMsg from "../components/elements/room/TextMsg";

import {Range,General,Forbid,Test} from '../components/RoomGen/form.json'
import {ConnectDanmaku} from "../modules/bilibili/live";

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
            Danmaku:[],
            TopBar:[],
        }

        this.ConnectDanmaku = this.ConnectDanmaku.bind(this)
        this.OnMsg = this.OnMsg.bind(this)
        this.DanmakuDisplay = this.DanmakuDisplay.bind(this)
    }
    OnMsg(data){
        let danma
        let info = data.info
        switch (data.cmd) {
            case 'DANMU_MSG':
                danma = {
                    User: {
                        ID: info[2][0],
                        Name:info[2][1],
                    },
                    Medal:info[3],
                    Msg:info[1],
                    IsEmoji:info[0][12]===1,
                }
                break
            default:
                return
        }
        danma.Type=data.cmd
        danma.raw=data
        danma.ID = info[9]['ct']
        console.log(danma)//demo

        let Danmaku = this.state.Danmaku
        Danmaku.push(danma)
        let diff = Danmaku.length-this.state.Options.General.inputs.max_danmaku_num
        if(diff>0){
            Danmaku=Danmaku.splice(0,diff)
        }
        this.setState({Danmaku})
    }
    DanmakuDisplay(){
        return this.state.Danmaku.map((danma)=>{
            switch (danma.Type) {
                case 'DANMU_MSG':
                    return <TextMsg key={danma.ID} danma={danma}/>
                default:
                    return null
            }
        })
    }
    ConnectDanmaku() {
        if(this.state.connecting||this.state.conn) return
        this.setState({connecting:true})
        let conn=ConnectDanmaku(this.state.Options.General.main.id.value)
        conn.on('live',()=>{
            this.setState(()=>{
                if(this.state.conn) {
                    conn.close()
                    return
                }
                return {
                    conn:conn,
                    connecting:false
                }
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

        let testMode=this.context.searchParams.get('test_mode')==='true'
        this.setState({loading:false,testMode})
        //danmaku连接
        if(testMode) {
            //todo
        }else {
            if(document.readyState==='complete') {
                this.ConnectDanmaku()
            }else {
                window.addEventListener('load',this.ConnectDanmaku)
            }
        }
    }
    componentWillUnmount() {
        if(this.state.testMode) {
            //todo
        }else if(this.state.conn) {
            this.state.conn.on('close',null)
            this.state.conn.close()
        }
    }
    render(){
        return <Container
            id={"container"}
            sx={{
                height: '100%',
                overflow: 'hidden',
            }}
        >
            {this.state.TopBar.length!==0?<Box
                id={"sc-items"}
            >

            </Box>:null}
            <Box
                id={"chat-items"}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {this.DanmakuDisplay()}
            </Box>
        </Container>
    }
}

Room.contextType=GlobalContext;
