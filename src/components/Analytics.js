import { Tabs, TabList, TabPanel, Tab } from 'react-tabs'
import { Time } from './Time';
import { useState } from 'react';

// use redux for these components to manage state being passed into the levels 
// of smaller components easier

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
                    </TabList>

                    <TabPanel>
                        <Time />
                    </TabPanel>
                </Tabs>
            </div>
        </div>

    );
}