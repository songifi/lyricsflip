import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Line, Text as SvgText } from "react-native-svg";

// const CHART_WIDTH = Dimensions.get("window").width - 48; // Accounting for padding
const CHART_WIDTH = 300; // Accounting for padding
const CHART_HEIGHT = 150;
const PADDINGVERTICAL = 20;
const USABLE_WIDTH = CHART_WIDTH - 2 * PADDINGVERTICAL;
const USABLE_HEIGHT = CHART_HEIGHT - 2 * PADDINGVERTICAL;

const data = [
  { x: "1M", y: 0 },
  { x: "3M", y: 0 },
  { x: "6M", y: 150 },
  { x: "1Y", y: 300 },
  { x: "ALL", y: 450 },
];

const projectedData = [
  { x: "1M", y: 0 },
  { x: "3M", y: 0 },
  { x: "6M", y: 200 },
  { x: "1Y", y: 400 },
  { x: "ALL", y: 600 },
];

const EarningsChart = () => {
  const maxY = Math.max(
    ...data.map((d) => d.y),
    ...projectedData.map((d) => d.y)
  );
  const minY = Math.min(
    ...data.map((d) => d.y),
    ...projectedData.map((d) => d.y)
  );

  const xScale = (i: number) =>
    (i / (data.length - 1)) * USABLE_WIDTH + PADDINGVERTICAL;
  const yScale = (y: number) =>
    CHART_HEIGHT -
    ((y - minY) / (maxY - minY)) * USABLE_HEIGHT -
    PADDINGVERTICAL;

  const linePath = (dataSet: typeof data) => {
    return dataSet
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(p.y)}`)
      .join(" ");
  };

  return (
    <View style={{}}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        {/* X-axis */}
        <Line
          x1={PADDINGVERTICAL}
          y1={CHART_HEIGHT - PADDINGVERTICAL}
          x2={CHART_WIDTH - PADDINGVERTICAL}
          y2={CHART_HEIGHT - PADDINGVERTICAL}
          stroke="#E0E0E0"
        />

        {/* Actual data line */}
        <Path d={linePath(data)} fill="none" stroke="#4CAF50" strokeWidth="2" />

        {/* Projected data line (dashed) */}
        <Path
          d={linePath(projectedData)}
          fill="none"
          stroke="#4CAF50"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* X-axis labels */}
        {data.map((point, i) => (
          <SvgText
            key={i}
            x={xScale(i)}
            y={CHART_HEIGHT - 5}
            fontSize="12"
            fill="#666666"
            textAnchor="middle"
          >
            {point.x}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DBE2E8",
  },
  title: {
    fontSize: 14,
    color: "#666666",
  },
  amount: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 4,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  change: {
    fontSize: 14,
    color: "#4CAF50",
    marginRight: 12,
  },
  subtext: {
    fontSize: 12,
    color: "#666666",
  },
});

export default EarningsChart;
