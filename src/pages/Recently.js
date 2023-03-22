import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { getLastPath, findIndex } from "~utils/object-utils";
import { Typography } from "@mui/material";

export const Recently = (props) => {
  const [preves, setPreves] = useState([]);
  const { children, value, index, prev, ...other } = props;
  const label = useMemo(() => {
    return [
      "overview",
      "tasks",
      "budgets",
      "members",
      "files",
      "activities",
      "settings",
    ];
  }, []);

  useEffect(() => {
    let history = {
      path: null,
      lastString: null,
    };
    if (typeof prev === "string") {
      history.path = prev;
      const findWord = getLastPath("/", prev);
      const index = findIndex(label, findWord);
      history.lastString = index;
      if (preves.length >= 4) {
        let temp = preves.concat(history);
        temp.shift();
        setPreves(temp);
      } else {
        setPreves(preves.concat(history));
      }
    } else {
    }
  }, [props.prev, label]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} color="textPrimary">
          <Box>
            {preves.map((prev, index) => (
              <Box key={index} sx={{ display: "flex" }}>
                {" "}
                <Link to={`${prev.path}`} state={{ index: prev.lastString }}>
                  <Typography color="textPrimary">{prev.path}</Typography>
                </Link>{" "}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Recently;
