import react from "react";
import {GlobalContext} from "../global/context";
import {Container,Box} from "@mui/material";

import TextMsg from "../components/elements/room/TextMsg";

import {Range,General,Forbid,Test} from '../components/RoomGen/form.json'
import {ConnectDanmaku} from "../modules/bilibili/live";
import GenMsg, {Random} from "../modules/bilibili/genTestMsg";

export default class Room extends react.Component {
    constructor(props) {
        super(props);
        this.state={
            tester:null,
            loading:true,
            connecting:false,
            conn: null,
            Options:{
                General,
                Forbid,
                Test
            },
            scrolled:false,
            Danmaku:[],
            TopBar:[],
        }

        this.ConnectDanmaku = this.ConnectDanmaku.bind(this)
        this.ConnectTestDanmaku = this.ConnectTestDanmaku.bind(this)
        this.OnMsg = this.OnMsg.bind(this)
        this.DanmakuDisplay = this.DanmakuDisplay.bind(this)
    }
    onBottom() {
        let el=document.getElementById('container')
        return el.scrollHeight - el.scrollTop - el.clientHeight < 50
    }
    OnMsg(data){
        console.log(data)//demo
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
        //console.log(danma)//demo

        let Danmaku = this.state.Danmaku
        Danmaku.push(danma)
        let diff = Danmaku.length-this.state.Options.General.inputs.max_danmaku_num.value
        if(diff>0){
            Danmaku=Danmaku.splice(diff,Danmaku.length)
        }
        this.setState({Danmaku})
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
    ConnectTestDanmaku() {
        let sendTestMsg=()=>{
            this.OnMsg(GenMsg())
            this.setState({tester:setTimeout(sendTestMsg,Random(
                    this.state.Options.Test.sliders.min_test_danmaku_interval.value,
                    this.state.Options.Test.sliders.max_test_danmaku_interval.value
                ))})
        }
        sendTestMsg()
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
    componentDidMount() {
        new MutationObserver(()=>{
            if(!this.state.scrolled) {
                /*let el=document.getElementById('container')
                el.scrollTop=el.scrollHeight*/
                document.getElementById('bottom').scrollIntoView({behavior:'smooth',block:'end'})
            }
        }).observe(document.getElementById('chat-items'),{childList:true})
        window.addEventListener('wheel',(e)=>{
            this.setState({scrolled:!this.onBottom()})
        })
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
        let f
        if(testMode) {
            f=this.ConnectTestDanmaku
        }else {
            f=this.ConnectDanmaku
        }
        if(document.readyState==='complete') {
            f()
        }else {
            window.addEventListener('load',f)
        }
    }
    componentWillUnmount() {
        if(this.state.testMode) {
            clearTimeout(this.state.tester)
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
                overflow: 'auto',
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
            <div id="bottom"></div>
        </Container>
    }
}

Room.contextType=GlobalContext;
