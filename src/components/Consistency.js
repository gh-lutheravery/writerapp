import { AreaChart, CartesianGrid, XAxis, 
        YAxis, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts'

export function Consistency() {
    // const data = props.reduxDataList
    // const data = [{ name: 'a', value: [2, 4, 34, 32, 3, 5, 53, 73, 
    //     79, 133, 423, 468, 785, 1254, 2311] }]

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

    return (
        <div id="popularity-container">
          <h2>This story has been updated, on average, every {/*props.stringDate*/}.</h2>
            <div>
                <h2>Consistency Graph</h2>
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
            {/* <AreaChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
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

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart> */}
        </div>
    );
}