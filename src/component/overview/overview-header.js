import React, { useState, useEffect } from "react";

// Material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import { isEmptyObj } from "../../utils/object-utils";

const OverViewCard = (props) => {
  const { data } = props;
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const divideIndex = 2;
    if (data.memberList.length >= 3) {
      let addSrc = data.memberList.slice(0, divideIndex + 1);
      const memberCount = data.member.length - divideIndex;
      addSrc[divideIndex].path = `/card/people${memberCount}`;
      setMembers(addSrc);
    } else {
      let addSrc = data.memberList.map((member) => member);
      setMembers(addSrc);
    }
  }, [props]);

  return (
    <>
      {isEmptyObj(data) === true ? null : (
        <Card sx={{ mb: 3, borderRadius: "15px", minHeight: "144px" }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ marginBottom: "10px" }}>
                  {" "}
                  <Typography variant="h6">
                    {data.projectOverViewHeadDto.projectName}
                  </Typography>{" "}
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">Status</Typography>
                      <Typography variant="h6">
                        {data.projectOverViewHeadDto.status} /{" "}
                        {data.projectOverViewHeadDto.taskPercent}
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />

                    <Box>
                      <Typography variant="subtitle2">Total Tasks</Typography>
                      <Typography variant="h6">
                        {data.projectOverViewHeadDto.completedTaskSize} /{" "}
                        {data.projectOverViewHeadDto.totalTaskSize}
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box>
                      <Typography variant="subtitle2">Due Date</Typography>
                      <Typography variant="h6">
                        {data.projectOverViewHeadDto.dueDate}
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box>
                      <Typography variant="subtitle2">Budget Spent</Typography>
                      <Typography variant="h6">
                        {data.projectOverViewHeadDto.budgetSpent}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  marginLeft: "auto",
                  flexBasis: "20%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Avatar
                  src={data.projectOverViewHeadDto.projectLogoUrl}
                  alt="d"
                  sx={{ marginLeft: "auto", width: 42, height: 42 }}
                />
                <Box sx={{ marginTop: "auto" }}>
                  <AvatarGroup
                    max={4}
                    sx={{
                      "& .MuiAvatar-root": {
                        width: 20,
                        height: 20,
                        fontSize: 15,
                      },
                    }}
                  >
                    {members.map((member) => (
                      <>
                        <Avatar
                          alt={member.name}
                          src={member.avatarUrl}
                          sx={{ width: "20px", height: "20px" }}
                        />
                      </>
                    ))}
                  </AvatarGroup>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default OverViewCard;
