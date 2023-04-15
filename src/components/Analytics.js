import { Tabs, TabList, TabPanel, Tab } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import { Time } from './Time';
import { SocialMedia } from './SocialMedia';
import { Genre } from './Genre';
import { Consistency } from './Consistency';
import { useState } from 'react';

// use redux for these components to manage state being passed into the levels 
// of smaller components easier

function analyzeCallback() {
    /*new promise*/
    /*function that calls api*/
    /*get json*/
    /*call func to populate obj*/
}

export function Analytics() {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div>
            <div>
                <div style={{ width: "100%" }}>
                    <h1 style={{ margin: "auto", width: "fit-content" }}>*Story* Analytics</h1>
                </div>

                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Time</Tab>
                        <Tab>Social Media</Tab>
                        <Tab>Genre</Tab>
                        <Tab>Consistency</Tab>
                    </TabList>

                    <TabPanel>
                        <Time />
                    </TabPanel>
                    <TabPanel>
                        <SocialMedia />
                    </TabPanel>
                    <TabPanel>
                        <Genre />
                    </TabPanel>
                    <TabPanel>
                        <Consistency />
                    </TabPanel>
                </Tabs>
            </div>
        </div>

    );
}