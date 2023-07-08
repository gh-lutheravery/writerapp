import {ListGroup, ListGroupItem, Badge} from './node_modules/reactstrap'
import { AreaChart, CartesianGrid, XAxis, 
    YAxis, Tooltip, Legend, Area, ResponsiveContainer } from './node_modules/recharts'
import { Analytics } from '../apiAnalytics.ts'

export function PrevWorks(url) {
    // add check for no prev works
    const prevWorksDict = Analytics.getPrevWorksAnalytics(url);
    const renderPrevWorks = (works) => {
        {works.forEach(value, key, map => {
          return (
            <ListGroupItem className="justify-content-between">
                {key}{' '}
                <Badge>
                    Posts: {value.TimeStamp}
                </Badge>
                <Badge>
                    Total Followers: {value.Followers}
                </Badge>
            </ListGroupItem>
        )})}
    };

    return (
        <div>
            <div style={{ marginBottom: "1rem"}}>
                <h2>All other stories done by this author</h2>
            </div>

            <ListGroup>
                {renderPrevWorks(prevWorksDict)}
            </ListGroup>
        </div>
    );
}