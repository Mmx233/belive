import react from "react";
import {GlobalContext} from "../global/context";

import {General,Forbid,Test} from '../components/RoomGen/form.json'

export default class Room extends react.Component {
    constructor(props) {
        super(props);
        this.state={
            Options:{
                General,
                Forbid,
                Test
            },
            Settings:{
                TestMode:Boolean(this.context.searchParams.get('test_mode')),
            }
        }

        for(let k in this.state.Options){
            for(let i=0;i<this.state.Options[k].length;i++){
                let q=this.context.searchParams.get(this.state.Options[k][i].key)
                console.log(q)
            }
        }
    }
    render(){

    }
}

Room.contextType=GlobalContext;
