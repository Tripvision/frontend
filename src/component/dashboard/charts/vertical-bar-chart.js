import React, { useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Material ui
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import chartService from "~services/chart-service";

const VerticalBarChart = () => {
  // const data =  [
  //     {
  //         "name": "Google",
  //         "value": 800
  //     },
  //     {
  //         "name": "Youtube",
  //         "value": 400
  //     },
  //     {
  //         "name": "Instagram",
  //         "value": 550
  //     },
  //     {
  //         "name": "Pinterest",
  //         "value": 300
  //     },
  //     {
  //         "name": "Facebook",
  //         "value": 700
  //     },
  //     {
  //         "name": "Twitter",
  //         "value": 370
  //     },
  //     {
  //         "name": "Tumblr",
  //         "value": 550
  //     }
  // ]

  const [budgetChart, setBudgetChart] = React.useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const changeIndex = (data, index) => {
    setActiveIndex(index);
  };

  React.useEffect(() => {
    async function getProjectGraph() {
      let budgetChart = await chartService.getBudgetGraph();
      return budgetChart;
    }
    const merge = getProjectGraph();
    merge.then((result) => {
      setBudgetChart(
        result.data.map((budget) => {
          if (budget.value === null) {
            return {
              ...budget,
              ["value"]: 0,
            };
          } else return budget;
        })
      );
    });
    // setBudgetChart(budgetChart.map(budget => {
    //     if(budget.value === null) {
    //         return {
    //           ...budget,
    //           ['value'] : 0
    //         }
    //       }
    //       else return budget;
    // }))
  }, []);

  React.useEffect(() => {
    console.log(budgetChart);
  });

  return (
    <Card sx={{ borderRadius: "15px" }}>
      <Container sx={{ mt: 2, mb: 1 }}>
        <Typography variant="body1"> Top 7 Budget </Typography>
      </Container>
      <ResponsiveContainer width="100%" height="100%" aspect={1}>
        <BarChart
          layout="vertical"
          width="100%"
          height="100%"
          data={budgetChart}
          barSize={15}
        >
          <XAxis type="number" hide="true" />
          <Tooltip hide="true" />
          <YAxis
            dataKey="projectName"
            type="category"
            tickLine={false}
            axisLine={{ stroke: "" }}
            tick={{ fontSize: 10 }}
          />
          <Bar dataKey="value" radius={[0, 5, 5, 0]} onClick={changeIndex}>
            {budgetChart.map((entry, index) =>
              entry.value === null ? (
                <>
                  <span> Empty Typo</span>
                  <Cell
                    cursor="pointer"
                    fill={index === activeIndex ? "#C6C7F8" : "#565957"}
                    key={`cell-${index}`}
                  />
                </>
              ) : (
                <>
                  <Cell
                    cursor="pointer"
                    fill={index === activeIndex ? "#C6C7F8" : "#565957"}
                    key={`cell-${index}`}
                  />
                </>
              )
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default React.memo(VerticalBarChart);
