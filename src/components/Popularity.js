import { AreaChart, CartesianGrid, XAxis, 
        YAxis, Tooltip, Line, Legend } from 'recharts'

export function Popularity() {
    // const data = props.reduxDataList
    const data = [{ name: 'a', value: [2, 4, 34, 32, 3, 5, 53, 73, 
        79, 133, 423, 468, 785, 1254, 2311] }]
        
    return (
        <div id="popularity-container">
            <div>
                <h2>Popularity Graph</h2>
            </div>
            
            <AreaChart width={730} height={250} data={data}
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
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </AreaChart>
        </div>
    );
}