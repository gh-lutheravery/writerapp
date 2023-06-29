import { Tabs, TabList, TabPanel, Tab } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import { Time } from './Time';
import { PrevWorks } from './PrevWorks';
import { Genre } from './Genre';
import { Consistency } from './Consistency';
import { useState } from 'react';
import { getFiction } from '../apiAnalytics'
import user from '../background'

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