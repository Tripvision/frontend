import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

// Material ui
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CircleIcon from "@mui/icons-material/Circle";

// Redux toolkit
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectListByUserId,
  fetchMyProjectSituation,
  statusColor,
} from "~features/projects/projects-slice";
import { isEmptyArr, isEmptyObj } from "~utils/object-utils";
import { useTheme } from "@mui/material/styles";

const stateColor = [
  {
    key: "YET",
    textColor: "#FFC555",
    lineColor: "#FFE999;",
  },
  {
    key: "PENDING",
    textColor: "#59A8D4",
    lineColor: "#B1E3FF",
  },
  {
    key: "REJECTED",
    textColor: "rgba(255, 255, 255, 0.4)",
    lineColor: "rgba(255, 255, 255, 0.4)",
  },
  {
    key: "COMPLETED",
    textColor: "#4AA785",
    lineColor: "#BAEDBD",
  },
  {
    key: "PROGRESS",
    textColor: "#8A8CD9",
    lineColor: "#95A4FC",
  },
];

const TitleCard = (props) => {
  const { data } = props;
  const theme = useTheme();

  return (
    <>
      {data[1] === null ? (
        <>
          <Card sx={{ borderRadius: "16px" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ mb: 1.5 }} variant="body2">
                  {data[0]}
                </Typography>
                <img alt="" src="/card/Folder.svg" width={24} height={24} />
              </Box>
              <Typography variant="h5">아직 없는 값입니다.</Typography>
            </CardContent>
          </Card>
        </>
      ) : data[3] % 2 !== 0 ? (
        <>
          <Card sx={{ backgroundColor: "cardGray.main", borderRadius: "16px" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ mb: 1.5 }}
                  variant="h5"
                  color="alwaysBlack.main"
                >
                  {data[0]}
                </Typography>
                <img alt="" src={data[2]} width={24} height={24} />
              </Box>
              <Typography variant="h6" color="alwaysBlack.main">
                {data[1]}
              </Typography>
            </CardContent>
          </Card>
        </>
      ) : (
        // TODO 1. 여기 반복문으로 색깔 렌더링 해줘야 합니다.
        <Card sx={{ backgroundColor: "cardNavy.main", borderRadius: "16px" }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{ mb: 1.5 }}
                variant="h5"
                color="alwaysBlack.main"
              >
                {data[0]}
              </Typography>
              <img alt="" src={data[2]} width={24} height={24} />
            </Box>
            <Typography variant="h6" color="alwaysBlack.main">
              {data[1]}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

const BasicCard = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/projects/" + data.projectId + "/overview", {
      state: { index: 0 },
    });
  };

  React.useEffect(() => {
    console.log(props);
  });

  return (
    <Card sx={{ borderRadius: "16px" }}>
      <CardActionArea onClick={handleClick}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mb: 2,
            borderRadius: "16px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box>
              <Typography
                variant="body1"
                sx={{ maxWidth: "170px" }}
                noWrap={true}
              >
                {data.projectName}
              </Typography>
              <Typography
                variant="body2"
                color="lightDarkText.main"
                noWrap={true}
              >
                Due Date : {data.projectDueDate}
              </Typography>
            </Box>
            <Avatar
              sx={{ width: 56, height: 56, marginLeft: "auto" }}
              src={data.projectLogoUrl}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
              mb: 2,
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", marginRight: "auto" }}>
              {data.memberList.map((member) => (
                <>
                  <Avatar
                    sx={{ width: 25, height: 25, mr: 1 }}
                    src={member.memberAvatarUrl}
                  />
                </>
              ))}
            </Box>

            {Object.keys(data).includes("textColor") === true ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* <CircleIcon
                  sx={{ mr: 1, width: "12px", height: "12px" }}
                  color={data.textColor}
                /> */}
                <Typography variant="body2" color={data.textColor}>
                  {data.projectStatus}
                </Typography>
              </Box>
            ) : null}
          </Box>

          <Box sx={{ mb: 1 }} color={data.lineColor}>
            {Object.keys(data).includes("lineColor") === true ? (
              <LinearProgress
                color="inherit"
                value={20}
                variant="indeterminate"
              />
            ) : null}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                {data.completeTaskCount}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mr: 1 }}
                color="lightDarkText.main"
              >
                /
              </Typography>
              <Typography variant="body2" sx={{ mr: 1 }}>
                {data.totalTaskCount}
              </Typography>
              <Typography variant="body2" color="lightDarkText.main">
                {" "}
                Total Tasks
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">{data.taskPercent}% </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ProjectsOverView = () => {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.projects.projects);
  const metaData = useSelector((state) => state.projects.meta);

  const [colorList, setColorList] = React.useState([]);
  const [metaList, setMetaList] = React.useState([]);

  useEffect(() => {
    dispatch(fetchProjectListByUserId());
    dispatch(fetchMyProjectSituation());
  }, [dispatch]);

  React.useEffect(() => {
    const result = projectList.map((project) => {
      const result = stateColor.find(
        (color) => color.key === project.projectStatus
      );
      return {
        ...result,
        ...project,
      };
    });
    setColorList(result);
  }, [projectList]);

  React.useEffect(() => {
    const obj = {};
    Object.assign(obj, metaData);

    obj["Current Projects"] = obj.currentProjectsCount;
    obj["Project Finance"] = obj.projectFinance;
    obj.MyMembers = obj.projectMembersCount;

    delete obj.currentProjectsCount;
    delete obj.projectFinance;
    delete obj.projectMembersCount;

    console.log(obj);
    const arr = Object.entries(obj);
    arr.map((ar, index) => ar.push(`/card/projects-card${index + 1}.svg`));

    arr.map((ar, index) => ar.push(index));

    setMetaList(arr);
  }, [metaData]);

  React.useEffect(() => {
    // console.log(projectList);
    // console.log(metaData);
    // console.log(colorList);
  });

  return (
    <div>
      <Typography sx={{ mt: 3 }} variant="h5">
        My Projects
      </Typography>
      <Grid container spacing={3} mt={3}>
        {metaList &&
          metaList.map((meta, index) => (
            <>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                <TitleCard data={meta} />
              </Grid>
            </>
          ))}
      </Grid>
      {colorList && (
        <>
          <Grid container spacing={3} mt={3}>
            {colorList.map((colorList) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={4}
                index={colorList.projectId}
              >
                <BasicCard data={colorList} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default ProjectsOverView;
