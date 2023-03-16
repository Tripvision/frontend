import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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

const names = [
  "BACK_END",
  "FRONT_END",
  "SERVER_DEVELOPER",
  "DESIGNER",
  "PROJECTMANAGER",
  "TESTER",
];

function getStyles(name, position, theme) {
  if (position === null || position === undefined) {
    return {
      fontWeight: theme.typography.fontWeightMedium,
    };
  }
  return {
    fontWeight:
      position.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function PositionSelectBox({ user, setUser }) {
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
      subPosition: value === "string" ? value.split(",") : value,
    };
    setUser(newUser);
  };

  React.useEffect(() => {
    if (user.subPosition === null) {
      setPosition([]);
    } else {
      const arr = user.subPosition.split(",");
      console.log(arr);
      setPosition(arr);
    }
  }, [user]);

  return (
    <div>
      {position && (
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Sub Position</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={position || []}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, position, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
