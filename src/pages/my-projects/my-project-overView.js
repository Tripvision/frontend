import React, { useState, useEffect } from "react";

// Material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProjectById,
  fetchProjectOverViewById,
} from "../../features/projects/projects-slice";
import OverViewCard from "~component/overview/overview-header";
import { isEmptyObj, isEmptyArr } from "../../utils/object-utils";
import Activity from "../projects/activity";
import axios from "axios";

const filedData = [
  {
    title: "Project tech requirements.pdf",
    size: "5.6 MB",
    date: "2 days ago",
    uploader: "Karina Clark",
  },
  {
    title: "Dashboard-design.jpg",
    size: "2.3 MB",
    date: "Due in 1 day",
    uploader: "Marcus Blake",
  },
  {
    title: "Create FureStibe branding proposal.zip",
    size: "4.6 MB",
    date: "Due in 1 day",
    uploader: "Terry Barry",
  },
  {
    title: "Completed Project Stylings.pdf",
    size: "1.2 MB",
    date: "Due in 3 day",
    uploader: "Roth Bloom",
  },
  {
    title: "Create Project Wireframes.xls",
    size: "2.8 MB",
    date: "Due in 3 day",
    uploader: "Natali Craig",
  },
];

export const FilesCard = (props) => {
  const [show, setShow] = useState(false);
  const { data } = props;

  React.useEffect(() => {
    console.log(data);
  });

  const downloadFile = React.useCallback((url, fileName) => {
    console.log(url);
    axios
      .get(url, { responseType: "blob" })
      .then((res) => {
        console.log(res);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        link.setAttribute("id", "tempLink");
        document.body.appendChild(link);
        link.click();
        link && link.remove();
        // link.style.display = "none";
        // const injectFilename = (res) => {
        //   const disposition = res.headers["content-disposition"];
        //   const fileName = decodeURI(
        //     disposition
        //       .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
        //       .replace(/['"]/g, "")
        //   );
        //   return fileName;
        // };
        // link.download = injectFilename(res);
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
      })
      .catch((err) => {
        console.error("err: ", err);
      });
  }, []);

  return (
    <>
      {isEmptyArr(data) === true ? (
        <div> File is Empty </div>
      ) : (
        <>
          <Card sx={{ borderRadius: "15px" }}>
            <CardContent>
              {data.map((item) => (
                <List sx={{ width: "100%" }}>
                  <ListItem
                    alignItems="flex-start"
                    onMouseOver={() => setShow(true)}
                    onMouseOut={() => setShow(false)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Box>
                          <Typography
                            color="lightDarkText.main"
                            component="span"
                            variant="body2"
                          >
                            {item.fileSize} /
                          </Typography>
                          <Typography
                            color="lightDarkText.main"
                            component="span"
                            variant="body2"
                          >
                            {" "}
                            {item.fileUploadTime}{" "}
                          </Typography>
                          <Typography
                            color="lightDarkText.main"
                            component="span"
                            variant="body2"
                          >
                            {item.fileUploader}
                          </Typography>
                          {/* {"  I'll be in your neighborhood doing errands this…"} */}
                        </Box>
                      }
                    />
                    <Box>
                      <Typography
                        onClick={() => {
                          downloadFile(
                            item.fileUploaderImageUrl,
                            item.name
                          );
                        }}
                      >
                        {" "}
                        DownLoad
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export const filesCard = () => {
  return <></>;
};

// const data = [
//     {
//         title: 'Edited the details of Project X',
//         time: '5am ago',
//     },
//     {
//         title: 'Changed the status of Project X',
//         time: '1:32 AM',
//     },
//     {
//         title: 'Submitted a bug',
//         time: 'Yesterday 12:39 AM',
//     },
//     {
//         title: 'Modified a date in Page X',
//         time: 'Last Thursday 3:34 AM',
//     },
//     {
//         title: 'Deleted a page in Project X',
//         time: 'Aug 11',
//     },
// ];

export function CalenderCard(props) {
  const { data } = props;

  React.useEffect(() => {
    console.log(data);
  });

  return (
    <>
      {isEmptyObj(data) === true ? (
        <div> Activity is Empty </div>
      ) : (
        <Card sx={{ borderRadius: "15px" }}>
          <CardContent>
            <Box mb={1}>
              <Typography>What's on the road?</Typography>
              <Box></Box>
            </Box>
            <Box>
              {data.map((item) => (
                <Box>
                  <List sx={{ width: "100%", maxWidth: 360 }}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <Box>
                            <Typography component="span" variant="body2">
                              {item.size} /
                            </Typography>
                            <Typography component="span" variant="body2">
                              {" "}
                              {item.date}
                            </Typography>
                            <Typography component="span" variant="body2">
                              {item.uploader}
                            </Typography>
                            {
                              "  I'll be in your neighborhood doing errands this…"
                            }
                          </Box>
                        }
                      />
                    </ListItem>
                  </List>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
}

const MyProjectOverView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.project);
  const fileList = useSelector((state) => state.projects.project.fileList);
  const activityList = useSelector(
    (state) => state.projects.project.activityList
  );

  useEffect(() => {
    dispatch(fetchProjectOverViewById(id));
  }, [dispatch]);

  return (
    <div>
      <OverViewCard data={project} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <CalenderCard data={activityList} />
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <FilesCard data={fileList} />
        </Grid>
      </Grid>
    </div>
  );
};

export default MyProjectOverView;
