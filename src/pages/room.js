import react from "react";
import {GlobalContext} from "../global/context";
import {Container} from "@mui/material";

import {Range,General,Forbid,Test} from '../components/RoomGen/form.json'

export default class Room extends react.Component {
    constructor(props) {
        super(props);
        this.state={
            Options:{
                General,
                Forbid,
                Test
            }
        }
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
    }
    render(){
        return <Container>
            123
        </Container>
    }
}

Room.contextType=GlobalContext;
