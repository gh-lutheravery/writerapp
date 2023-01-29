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

            <div id="popularity-container">
                <div>
                    <h2>Mentions Graph</h2>
                </div>
                
                <ResponsiveContainer width="100%" height={450}>
                    <AreaChart width={1030} height={450} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <Popularity />
        </div>
    );
}