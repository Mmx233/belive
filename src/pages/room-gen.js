import react from 'react';

import Block from '../components/elements/block';
import Tabs from "../components/elements/tabs";

export default class RoomGen extends react.Component {
    constructor(props) {
        super(props);
        this.state={
            menu: [
                {name:"常规",el:null},
                {name:"屏蔽",el:null},
                {name:"高级",el:null},
                {name:"测试",el:null}
            ],
        }
    }
    render(){
        return <react.Fragment>
            <Block>
                <Tabs menu={this.state.menu}/>
            </Block>

            <Block>

            </Block>
        </react.Fragment>
    }
}
