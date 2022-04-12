import react from "react";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";

export default class Tabs extends react.Component {
    constructor(props) {
        super(props);
        this.state={
            selected:0,
        }
    }
    render(){
        return <TabContext value={String(this.state.selected)}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={(e,v)=>{
                    this.setState({selected:v})
                }} aria-label="tabs">
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
                >{item.el}</TabPanel>
            })}
        </TabContext>
    }
}
