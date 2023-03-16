import React, { useEffeect } from "react";

// Material ui
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

// React router
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductivity,
  getProjectCount,
} from "../../services/project-service";
import { getTaskCount } from "../../services/task-service";
import { getAllMyTeamsCount } from "~services/team-service";
import { isEmptyObj } from "../../utils/object-utils";

// Refactor : props 를 전체로 받는 행위
// Refactor : Redux Toolkit 으로 값 useSelector 해와서 렌더링 합시다.
// Refactor : s3 에 저장된 경로만 출력합시다.

const MuiIconCard = () => {
  const [countData, setCountData] = React.useState({});

  const prefix = React.useMemo(() => {
    return "/card/";
  }, []);

  const theme = useTheme();

  React.useEffect(() => {
    async function getCount() {
      let res = {
        project: {
          id: "1",
          title: "Total Projects",
          to: "/projects/overview",
          count: "",
          src: prefix + "project.svg",
        },
        task: {
          id: "2",
          title: "Total Tasks",
          to: "/total/tasks",
          count: "",
          src: prefix + "task.svg",
        },
        members: {
          id: "3",
          title: "Members",
          to: "/connect-memers",
          count: "",
          src: prefix + "member.svg",
        },
        productivity: {
          id: "4",
          title: "Productivity",
          to: "/productivity",
          type: "product",
          count: "",
          src: prefix + "product.svg",
        },
      };
      let projectCount = await getProjectCount();
      res = {
        ...res,
        ["project"]: {
          ...res.project,
          ["count"]: projectCount.data,
        },
      };
      console.log(projectCount.data);
      let taskCount = await getTaskCount();
      res = {
        ...res,
        ["task"]: {
          ...res.task,
          ["count"]: taskCount.data,
        },
      };
      let teamsCount = await getAllMyTeamsCount();
      res = {
        ...res,
        ["members"]: {
          ...res.members,
          ["count"]: teamsCount.data,
        },
      };
      let productivity = await getProductivity();
      res = {
        ...res,
        ["productivity"]: {
          ...res.productivity,
          ["count"]: productivity.data + "%",
        },
      };
      return res;
    }
    let merge = getCount();
    merge.then((result) => {
      setCountData({
        ...result,
      });
    });
  }, []);

  return (
    <>
      <Grid container spacing={2} direction="row" mb={3} mt={3}>
        {isEmptyObj(countData) === false
          ? Object.values(countData).map((item, index) => {
              if (index % 2 !== 0)
                return (
                  <Grid
                    item
                    key={item.index}
                    xs={12}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                  >
                    <Card
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "cardGray.main",
                        minHeight: "112px",
                      }}
                    >
                      <CardActionArea component={RouterLink} to={item.to}>
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              color="alwaysBlack.main"
                            >
                              {item.title}
                            </Typography>
                            <Avatar
                              sx={{ width: "28px", height: "28px" }}
                              alt="Remy Sharp"
                              src={item.src}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="h6"
                              color="alwaysBlack.main"
                              fontWeight={500}
                            >
                              {item.count}
                            </Typography>
                            {/* TODO : Productivity SubResult 제공하기 */}
                            {/* {
                                                item.hasOwnProperty('subResult') === true &&
                                                <Typography variant="body2">{item.subResult}</Typography>
                                            } */}
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              else {
                return (
                  <Grid
                    item
                    key={item.index}
                    xs={12}
                    sm={6}
                    md={3}
                    lg={3}
                    xl={3}
                  >
                    <Card
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "cardNavy.main",
                        minHeight: "112px",
                      }}
                    >
                      <CardActionArea component={RouterLink} to={item.to}>
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              color="alwaysBlack.main"
                            >
                              {item.title}
                            </Typography>
                            <Avatar
                              sx={{ width: "28px", height: "28px" }}
                              alt="Remy Sharp"
                              src={item.src}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="h6"
                              fontWeight={500}
                              color="alwaysBlack.main"
                            >
                              {item.count}
                            </Typography>
                            {/* TODO : Productivity SubResult 제공하기 */}
                            {/* {
                                    item.hasOwnProperty('subResult') === true &&
                                    <Typography variant="body2">{item.subResult}</Typography>
                                } */}
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              }
            })
          : null}
      </Grid>
    </>
  );
};
export default MuiIconCard;
