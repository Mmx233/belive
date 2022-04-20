import react from "react";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {GlobalContext} from "../../global/context";

export default class Tabs extends react.Component {
    constructor(props) {
        super(props);
        this.state={
            selected:0,
        }

        this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidMount() {
        let tab=this.context.searchParams.get("tab")
        this.props.menu.forEach((v,i)=>{
            if(v.name===tab){
                this.setState({selected:i})
            }
        })
    }
    handleSelect(e,v){
        this.setState({selected:v})
        this.context.setSearchParams({tab:this.props.menu[v].name})
    }
    render(){
        return <TabContext value={String(this.state.selected)}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={this.handleSelect} aria-label="tabs">
                    {this.props.menu.map((item,i)=>{
                        return <Tab
                            key={item.name}
                            label={item.name}
                            value={String(i)}
                        />
                    })}
                </TabList>
            </Box>
            {this.props.menu.map((item,i)=>{
                return <TabPanel
                    key={item.name}
                    value={String(i)}
                    sx={{
                        "&>*":{
                            marginBottom:'2rem',
                        },
                        "&>:last-child":{
                            marginBottom:'unset'
                        }
                    }}
                >{item.el}</TabPanel>
            })}
        </TabContext>
    }
}

Tabs.contextType = GlobalContext;
