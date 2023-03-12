import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import UserSearch from "./user-search";
import { Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




export default function OnePositionSelectBox({ user, setUser }) {

  function getStyles(name, position, theme) {
    if (position === undefined) {
      return {
        fontWeight:
            theme.typography.fontWeightMedium,
      };
    }
    return {
      fontWeight:
        position.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const names = [
    "BACK_END",
    "FRONT_END",
    "SERVER_DEVELOPER",
    "DESIGNER",
    // "publisher",
    "PROJECTMANAGER",
    "TESTER",
  ];

  const theme = useTheme();
  const [position, setPosition] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPosition(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const newUser = {
      ...user,
      mainPosition: value === "string" ? value.split(",") : value,
    };
    setUser(newUser);
  };

  React.useEffect(() => {
    setPosition(user.mainPosition);
  }, [user]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Position</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={position || ""}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              <Chip key={selected} label={selected} />
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {
            user &&
            names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, position, theme)}
              >
                {name}
              </MenuItem>
            ))

          }
        </Select>
      </FormControl>
    </div>
  );
}
