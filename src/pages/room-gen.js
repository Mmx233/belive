import react from 'react';
import {Tab,Box} from "@mui/material";
import {TabContext,TabList,TabPanel} from '@mui/lab';

import Block from '../components/elements/block';

export default class RoomGen extends react.Component {
    render(){
        return <react.Fragment>
            <Block>
                <TabContext value={{/*value*/}}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={{/*handleChange*/}} aria-label="lab API tabs example">
                            <Tab label="Item One" value="1" />
                            <Tab label="Item Two" value="2" />
                            <Tab label="Item Three" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Block>

            <Block>

            </Block>
        </react.Fragment>
    }
}
