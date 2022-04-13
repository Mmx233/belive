import react from 'react';
import {Box,TextField,Button,Tooltip,Stack} from '@mui/material'
import {ContentCopy} from "@mui/icons-material";

import {GlobalContext} from "../global/context";

import Block from '../components/elements/block';
import Tabs from "../components/elements/tabs";
import GeneralForm from "../components/elements/RoomGen/GeneralForm";

import {General} from '../components/elements/RoomGen/form.json';

export default class RoomGen extends react.Component {
    constructor(props) {
        super(props);
        this.state={}
        //表单们
        this.state.General= General

        //恢复表单记录
        for(let k in this.state){
            for(let e in this.state[k]) {
                for(let i=0;i<this.state[k][e].length;i++) {
                    let v = localStorage.getItem(`${k}_${e}_${this.state[k][e][i].key}`);
                    if(v){
                        switch (typeof this.state[k][e][i].value) {
                            case "boolean":
                                this.state[k][e][i].value=v==='true';
                                break;
                            case "number":
                                this.state[k][e][i].value=v*1;
                                break;
                            default:
                                this.state[k][e][i].value=v;
                                break;
                        }
                    }
                }
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleProps = this.handleProps.bind(this);
        this.roomUrl = this.roomUrl.bind(this);
    }
    handleChange(space,name,index,value) {
        let data=this.state[space];
        data[name][index].value=value;
        this.setState({[space]:data});
        localStorage.setItem(`${space}_${name}_${data[name][index].key}`,String(value));
    }
    handleProps(space){
        return {
            data: this.state[space],
            handleChange:(name,index,value)=>{
                this.handleChange(space,name,index,value);
            }
        }
    }
    roomUrl(){
        let query=[];
        for(let k in this.state){
            for(let e in this.state[k]) {
                for(let i=0;i<this.state[k][e].length;i++) {
                    let v=this.state[k][e][i]
                    query.push(`${v.key}=${encodeURI(v.value)}`);
                }
            }
        }
        return document.location.origin+'/room?'+query.join('&');
    }
    render(){
        return <react.Fragment>
            <Block>
                <Tabs menu={[
                    {name:"常规",el:<GeneralForm {...this.handleProps("General")} />},
                    {name:"屏蔽",el:null},
                    {name:"测试",el:null}
                ]}/>
            </Block>

            <Block>
                <Box
                    sx={{
                        display:"flex",
                        flexDirection:"column",
                        width:"100%",
                        height:"100%",
                        padding:"2rem 1rem",
                        boxSizing:"border-box",
                    }}
                >
                    <Box
                        sx={{
                            width:"100%",
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-between",
                        }}
                    >
                        <TextField
                            id={'room-url'}
                            label={"房间URL"}
                            value={this.roomUrl()}
                            sx={{
                                width:"90%",
                            }}
                        />
                        <Tooltip title={"复制"} placement="top" arrow>
                            <Button
                                variant={'contained'}
                                onClick={()=>{
                                    navigator.clipboard.writeText(document.getElementById('room-url').value).then(()=>{
                                        this.context.Alert('复制成功',{variant:'success'});
                                    }).catch(e=>{
                                        this.context.Alert(`复制失败：${e}`,{variant:'error'});
                                    })
                                }}
                            ><ContentCopy fontSize={"small"}/></Button>
                        </Tooltip>
                    </Box>

                    <Stack
                        paddingTop={'1rem'}
                        flexDirection={{xs:"column",md:"row"}}
                        flexWrap={'wrap'}
                        sx={{
                            "&>*":{
                                margin:{xs:"0 0 1em 0!important",md:"0 1em 0 0!important"},
                            }
                        }}
                    >
                        <Button variant={'contained'}>进入B站直播间</Button>
                        <Button variant={'contained'}>进入房间</Button>
                        <Button variant={'outlined'}>进入测试房间</Button>
                        <Button variant={'outlined'}>导出配置</Button>
                        <Button variant={'outlined'}>导入配置</Button>
                        <Button variant={'outlined'} onClick={()=>{
                            localStorage.clear();
                            window.location.reload()
                        }}>清除缓存</Button>
                    </Stack>
                </Box>
            </Block>
        </react.Fragment>
    }
}

RoomGen.contextType = GlobalContext;
