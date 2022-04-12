import react from 'react';

import Block from '../components/elements/block';
import Tabs from "../components/elements/tabs";

import GeneralForm from "../components/elements/RoomGen/GeneralForm";

export default class RoomGen extends react.Component {
    constructor(props) {
        super(props);
        this.state={}
        //表单们
        this.state.General={
            main: [
                {label:"房间ID",value:1},
            ],
            switches: [
                {label:"显示消息弹幕",value:false,disabled:true},
                {label:"显示醒目留言(SC)",value:false,disabled:true},
                {label:"显示新舰长",value:false,disabled:true},
                {label:"显示礼物",value:false,disabled:true},
                {label:"显示礼物信息",value:false,disabled:true},
                {label:"弹幕居下",value:false,disabled:true},
                {label:"底部显示SC固定栏",value:false,disabled:true},
                {label:"合并相似弹幕",value:false,disabled:true},
                {label:"合并礼物",value:false,disabled:true},
                {label:"只显示翻译弹幕",value:false,disabled:true},
            ]
        }
        //恢复表单记录
        for(let k in this.state){
            for(let e in this.state[k]) {
                for(let i=0;i<this.state[k][e].length;i++) {
                    let v = localStorage.getItem(`${k}_${e}_${this.state[k][e][i].label}`);
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
    }
    handleChange(space,name,index,value) {
        let data=this.state[space];
        data[name][index].value=value;
        this.setState({[space]:data});
        localStorage.setItem(`${space}_${name}_${data[name][index].label}`,String(value));
    }
    handleProps(space){
        return {
            data: this.state[space],
            handleChange:(name,index,value)=>{
                this.handleChange(space,name,index,value);
            }
        }
    }
    render(){
        return <react.Fragment>
            <Block>
                <Tabs menu={[
                    {name:"常规",el:<GeneralForm {...this.handleProps("General")} />},
                    {name:"屏蔽",el:null},
                    {name:"高级",el:null},
                    {name:"测试",el:null}
                ]}/>
            </Block>

            <Block>

            </Block>
        </react.Fragment>
    }
}
