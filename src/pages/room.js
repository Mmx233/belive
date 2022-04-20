import react from "react";
import {GlobalContext} from "../global/context";

import {General,Forbid,Test} from '../components/RoomGen/form.json'

export default class Room extends react.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount() {
        //载入选项
        this.setState({
            Settings: {
                TestMode:Boolean(this.context.searchParams.get('test_mode')),
            }
        })
        let forms={
            General,
            Forbid,
            Test
        }
        let Options={}
        for(let k in forms){
            for(let a in forms[k]){
                for(let i=0;i<forms[k][a].length;i++){
                    let key=forms[k][a][i].key
                    let q=this.context.searchParams.get(key)
                    if(q!==null){
                        switch (typeof forms[k][a][i].value){
                            case 'number':
                                q=q*1
                                if(isNaN(q))continue
                                break
                            default:
                                break
                        }
                        Options[key]=q
                    }
                }
            }
        }
        this.setState({Options})
    }
    render(){
        return <div/>
    }
}

Room.contextType=GlobalContext;
