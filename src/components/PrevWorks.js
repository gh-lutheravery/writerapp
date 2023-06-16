import { Popularity } from './Popularity';
import {ListGroup, ListGroupItem, Badge} from 'reactstrap'
import { AreaChart, CartesianGrid, XAxis, 
    YAxis, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts'

export function SocialMedia() {

    const data = [
        {
          name: "Page A",
          uv: 3243,
          pv: 2400,
          amt: 2400
        },
        {
          name: "Page B",
          uv: 4314,
          pv: 1398,
          amt: 2210
        },
        {
          name: "Page C",
          uv: 6423,
          pv: 9800,
          amt: 2290
        },
        {
          name: "Page D",
          uv: 7855,
          pv: 3908,
          amt: 2000
        },
        {
          name: "Page E",
          uv: 8143,
          pv: 4800,
          amt: 2181
        },
        {
          name: "Page F",
          uv: 8784,
          pv: 3800,
          amt: 2500
        },
        {
          name: "Page G",
          uv: 4573,
          pv: 4300,
          amt: 2100
        }
      ];

    const renderSites = (sites) => {
        {sites.map(site => {
            return (
                <ListGroupItem className="justify-content-between">
                    {site.name}{' '}
                    <Badge>
                        Posts: {site.postStat}
                    </Badge>
                    <Badge>
                        Total Likes: {site.likeStat}
                    </Badge>
                </ListGroupItem>
            )
        })}
    };

    return (
        <div>
            <div style={{ marginBottom: "1rem"}}>
                <h2>Mentions on other websites since release</h2>
            </div>

            <ListGroup>
                {/*props.renderSites()*/}
            </ListGroup>
        </div>
    );
}