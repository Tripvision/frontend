import React, { useEffect } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  Sector,
  ResponsiveContainer,
} from "recharts";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import chartService from "~services/chart-service";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const FullCircleChart = () => {
  const circleData = [
    { name: "United States", value: 386 },
    { name: "Canada", value: 225 },
    { name: "Mexico", value: 308 },
    { name: "Other", value: 200 },
  ];

  const COLORS = ["#BAEDBD", "#C6C7F8", "#95A4FC", "#B1E3FF"];
  const [positionGraph, setPositionGraph] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const changeIndex = (data, index) => {
    setActiveIndex(index);
  };

  React.useEffect(() => {
    async function getProjectGraph() {
      let positionGraph = await chartService.getConnectgraph();
      return positionGraph;
    }
    const merge = getProjectGraph();
    merge.then((result) => {
      setPositionGraph(result.data);
    });
  }, []);

  const renderLegend = (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex" }} alignItems="center">
            <img alt="" height="7px" width="7px" src="/chart/pink-dot.svg" />
            <Typography variant="body2" sx={{ ml: 0.5, mr: 2 }}>
              PreviousWeek
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }} alignItems="center">
            <img alt="" height="7px" width="7px" src="/chart/blue-dot.svg" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              CurrentWeek
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );

  useEffect(() => {
    console.log(positionGraph);
  });

  return (
    <Card>
      <Typography variant="body1">Traffic by Location</Typography>
      <ResponsiveContainer width="100%" aspect={1.5}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={positionGraph}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={changeIndex}
          />
          <Pie data={positionGraph} fill="#8884d8" dataKey="value">
            {positionGraph.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default React.memo(FullCircleChart);
