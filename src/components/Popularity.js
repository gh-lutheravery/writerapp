import { AreaChart, CartesianGrid, XAxis, 
        YAxis, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts'
import { getPopularityAnalytics } from '../apiAnalytics.js'

export function Popularity(url) { 
    const popularityMap = getPopularityAnalytics(url);
    const popularityChartData = []
    popularityMap.forEach(value, key, map => {
      object = {
        name: key,
        comments: value.length
      }
      popularityChartData.push(object);
    });
    
    return (
        <div id="popularity-container">
            <div>
                <h2>Popularity Graph</h2>
            </div>
            
            <ResponsiveContainer width="100%" height={450}>
                <AreaChart width={1030} height={450} data={popularityChartData}
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
    );
}