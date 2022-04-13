import react from 'react';
import {Box} from '@mui/material'

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
                    }}
                >

                </Box>
            </Block>
        </react.Fragment>
    }
}
