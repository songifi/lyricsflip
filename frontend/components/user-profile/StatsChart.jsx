"use client";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";

const data = [
  { name: "1M", actual: 0, projected: 0 },
  { name: "3M", actual: 20, projected: 40 },
  { name: "6M", actual: 333, projected: 433 },
  { name: "1Y", actual: 667, projected: 800 },
  { name: "ALL", actual: 1000, projected: 1100 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-[8px] py-2 px-3 shadow-[0px_3px_6px_#00000029] bg-white"
        style={{ width: "120px" }}
      >
        <p
          className="text-[#929292] font-primary text-[10px] leading-[15px] not-italic"
          style={{ marginBottom: "4px" }}
        >{`Time: ${label}`}</p>
        <p className="font-primary text-[12px] leading-[18px] not-italic text-[#212121]">
          {`Actual: $${payload[0].value}`}
        </p>
        <p className="font-primary text-[12px] leading-[18px] not-italic text-[#212121]">
          {`Projected: $${payload[1].value}`}
        </p>
      </div>
    );
  }
};

const renderCustomizedTick = (props) => {
  const { x, y, payload } = props;
  const isFirst = payload.value === "1M";

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fontSize={12}
        fontFamily="var(--font-primary)"
        fill={isFirst ? "#000" : "#929292"}
      >
        {payload.value}
      </text>
    </g>
  );
};

const StatsChart = () => {
  return (
    <div className="flex flex-col w-full gap-3 pt-3 px-3 md:pt-6 pb-0 h-full md:px-6 rounded-[16px]  border border-[#DBE2E8] bg-white">
      {/* Current value and statistics */}
      <div>
        <h2 className="text-gray-500 font-primary text-[12px] not-italic  leading-[20px]">
          Your Savings
        </h2>
        <div className="text-[#212121] font-primary text-[16px] font-semibold leading-[24px]">
          $ 24,000.00
        </div>
        <div className="mt-1 flex items-center font-primary gap-1">
          <span className="text-[#0AC660] text-center  text-[12px]  leading-[18px]">
            +$100 (10%)
          </span>
          <span className="text-[#929292] text-center  text-[12px]   leading-[18px]">
            • Total returns
          </span>
        </div>
      </div>

      {/* Chart area */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: "#DBE2E8" }}
              tick={renderCustomizedTick}
            />
            <YAxis orientation="right" hide />

            <Tooltip content={<CustomTooltip />} />

            <Line
              type="linear"
              dataKey="actual"
              dot={false}
              stroke="#0AC660"
              strokeWidth={2}
              label={({ x, y, value }) => {
                if (value === 1000) {
                  return (
                    <text
                      x={x}
                      y={y + 3}
                      fill="#000"
                      fontSize={12}
                      textAnchor="right"
                    >
                      ${`${value / 1000}k`}
                    </text>
                  );
                }
                return null;
              }}
            />
            <Line
              type="linear"
              dataKey="projected"
              dot={false}
              stroke="#0AC660"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={({ x, y, value }) => {
                if (value === 1100) {
                  return (
                    <text
                      x={x}
                      y={y - 6}
                      fill="#0AC660"
                      fontSize={12}
                      textAnchor="top"
                    >
                      ${`${(value / 1000).toFixed(1)}k`}
                    </text>
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsChart;
