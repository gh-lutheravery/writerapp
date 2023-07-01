import { Tabs, TabList, TabPanel, Tab } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import { Time } from './Time.js';
import { PrevWorks } from './PrevWorks.js';
import { Genre } from './Genre.js';
import { Consistency } from './Consistency.js';
import { useState } from 'react';
import { getFiction } from '../apiAnalytics.ts'
import { user } from '../background.js'

export function Analytics(fictionUrl) {
    const [tabIndex, setTabIndex] = useState(0);

    const getTitle = (url) => {
        const fict = getFiction(url);
        return fict.title;
    };
    
    return (
        <div>
            <div>
                <div style={{ width: "100%" }}>
                    <h1 style={{ margin: "auto", width: "fit-content" }}>{getTitle(fictionUrl)} Analytics</h1>
                    {
                        user.paid ? <h3 style={{ margin: "auto", width: "fit-content" }}>Paid Writerapp</h3>

                        : <h3 style={{ margin: "auto", width: "fit-content" }}>Free Writerapp</h3>
                    }
                </div>

                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        {
                            user.paid ? <Tab>Time</Tab>
                            : <Tab disabled>Time</Tab>
                        }
                        <Tab>Previous Works</Tab>
                        <Tab>Genre</Tab>
                        <Tab>Consistency</Tab>
                    </TabList>

                    <TabPanel>
                        <Time url={fictionUrl}/>
                    </TabPanel>
                    <TabPanel>
                        <PrevWorks url={fictionUrl} />
                    </TabPanel>
                    <TabPanel>
                        <Genre url={fictionUrl} />
                    </TabPanel>
                    <TabPanel>
                        <Consistency url={fictionUrl} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>

    );
}