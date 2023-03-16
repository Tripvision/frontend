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
  fetchMyProductivity,
} from "~features/projects/projects-slice";
import { isEmptyArr, isEmptyObj } from "~utils/object-utils";

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

  console.log(data);

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
      ) : (
        <Card sx={{ borderRadius: "16px" }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ mb: 1.5 }} variant="h5">
                {data[0]}
              </Typography>
              <img alt="" src={data[2]} width={24} height={24} />
            </Box>
            <Typography variant="h6">{data[1]}</Typography>
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
            }}
          >
            {data.memberList.length !== 0 &&
              data.memberList.map((member) => (
                <>
                  <Avatar
                    sx={{ width: 25, height: 25 }}
                    src={member.memberAvatarUrl}
                  />
                </>
              ))}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" color="green">
                {data.projectStatus}
              </Typography>
            </Box>
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
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box>
                <Typography variant="body2" color="lightDarkText.main">
                  {" "}
                  Total Tasks
                </Typography>
              </Box>
              <Box sx={{ marginLeft: "auto" }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  {data.completeTaskCount}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const CompletedProjectCard = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.projects.productList);

  useEffect(() => {
    dispatch(fetchMyProductivity());
  }, [dispatch]);

  React.useEffect(() => {
    console.log(productList);
  });

  return (
    <div>
      <Typography sx={{ mt: 3 }} variant="h5">
        My Product List
      </Typography>
      {productList.length !== 0 && (
        <>
          <Grid container spacing={3} mt={3}>
            {productList.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={4}
                index={product.projectId}
              >
                <BasicCard data={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default CompletedProjectCard;
