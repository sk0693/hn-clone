import React from 'react';
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
    ResponsiveContainer
} from "recharts";

const Chart = (props) => {

    // const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
    //     const isVert = axisType === 'yAxis';
    //     const cx = isVert ? x : x + (width / 2);
    //     const cy = isVert ? (height / 2) + y : y + height + 10;
    //     const rot = isVert ? `270 ${cx} ${cy}` : 0;
    //     return (
    //         <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
    //             {children}
    //         </text>
    //     );
    // };

    return (
        <>
            {!props.payload.loading &&
                <ResponsiveContainer width='95%' height={500}>
                    <LineChart LineChart
                        width={1024}
                        height={350}
                        data={props.payload.hits}
                        margin={{ top: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="objectID" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="points" stroke="#8884d8" />
                        {/* <Line type="monotone" dataKey="num_comments" stroke="#82ca9d" /> */}
                    </LineChart>
                </ResponsiveContainer>
            }
        </>
    )
}

export default Chart;