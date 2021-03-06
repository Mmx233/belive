import react from 'react';
import iojson from 'iojson'
import {Box,TextField,Button,Tooltip,Stack} from '@mui/material'
import {ContentCopy} from "@mui/icons-material";
import {MainContext} from "../../global/context";

import Block from '../../components/elements/block';
import Tabs from "../../components/elements/tabs";
import GeneralForm from "../../components/RoomGen/GeneralForm";
import ForbidForm from "../../components/RoomGen/ForbidForm";
import TestForm from "../../components/RoomGen/TestForm";

import {Range,General,Forbid,Test} from '../../components/RoomGen/form.json.js';

export default class RoomGen extends react.Component {
    constructor(props) {
        super(props);
        this.state={}
        //表单
        this.state.General= General
        this.state.Forbid= Forbid
        this.state.Test= Test

        //恢复表单记录
        Range(this.state,(space,name,key,el)=>{
            let v = localStorage.getItem(`${space}_${name}_${key}`);
            if(v){
                switch (typeof el.value) {
                    case "boolean":
                        v=v==='true';
                        break;
                    case "number":
                        v=v*1;
                        break;
                    default:
                        break;
                }
                el.value=v
            }
        })

        this.handleChange = this.handleChange.bind(this);
        this.handleProps = this.handleProps.bind(this);
        this.roomUrl = this.roomUrl.bind(this);
    }
    handleChange(space,name,key,value) {
        let data=this.state[space];
        data[name][key].value=value;
        this.setState({[space]:data});
        localStorage.setItem(`${space}_${name}_${key}`,String(value));
    }
    handleProps(space){
        return {
            data: this.state[space],
            handleChange:(name,key,value)=>{
                this.handleChange(space,name,key,value);
            }
        }
    }
    roomUrl(){
        let query=[];
        Range(this.state,(space,name,key,el)=>{
            query.push(`${key}=${encodeURI(el.value)}`);
        })
        return document.location.origin+'/room?'+query.join('&');
    }
    render(){
        return <react.Fragment>
            <Block>
                <Tabs menu={[
                    {name:"常规",el:<GeneralForm {...this.handleProps("General")} />},
                    {name:"屏蔽",el:<ForbidForm {...this.handleProps("Forbid")}/>},
                    {name:"测试",el:<TestForm {...this.handleProps("Test")}/>}
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
                            "&>button":{
                                margin:{xs:"0 0 1em 0!important",md:"0 1em 1em 0!important"},
                            }
                        }}
                    >
                        <Button variant={'contained'} onClick={()=>{
                            window.open(`https://live.bilibili.com/${this.state.General.main[0].value}`,'_blank')
                        }}>进入B站直播间</Button>
                        <Button variant={'contained'} onClick={()=>{
                            window.open(this.roomUrl(), 'room', 'menubar=0,location=0,scrollbars=0,toolbar=0,width=600,height=600')
                        }}>进入房间</Button>
                        <Button variant={'outlined'} onClick={()=>{
                            window.open(this.roomUrl()+'&test_mode=true', 'test room', 'menubar=0,location=0,scrollbars=0,toolbar=0,width=600,height=600')
                        }}>进入测试房间</Button>
                        <Button variant={'outlined'} onClick={()=>{
                            iojson.exportJSON(localStorage, 'filename')
                        }}>导出配置</Button>
                        <Button variant={'outlined'} onClick={()=>{
                            iojson.importJSON().then(data => {
                                localStorage.clear()
                                for(let k in data){
                                    localStorage.setItem(k,data[k])
                                }
                                this.context.Alert('导入成功',{variant:'success'});
                                setTimeout(()=>{document.location.reload()},1000)
                            })
                        }}>导入配置</Button>
                        <Button variant={'outlined'} onClick={()=>{
                            localStorage.clear();
                            document.location.reload()
                        }}>清除配置</Button>
                    </Stack>
                </Box>
            </Block>
        </react.Fragment>
    }
}

RoomGen.contextType = MainContext;
