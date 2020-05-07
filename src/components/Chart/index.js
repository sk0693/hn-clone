import React from 'react';
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from "recharts";

const Chart = (props) => {
    return (
        <div>
            {!props.payload.loading &&
                <LineChart LineChart
                    width={1024}
                    height={250}
                    data={props.payload.hits}
                    margin={{ top: 5, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="objectID" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="points" stroke="#8884d8" />
                    {/* <Line type="monotone" dataKey="num_comments" stroke="#82ca9d" /> */}
                </LineChart>
            }
        </div>
    )
}

export default Chart;