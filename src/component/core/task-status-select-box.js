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

const names = ["YET", "PROGRESS", "COMPLETED"];

export default function TaskStatusSelectBox({ task, setTask }) {
  function getStyles(name, status, theme) {
    console.warn(status);
    if (status === null || status === undefined) {
      return {
        fontWeight: theme.typography.fontWeightMedium,
      };
    }

    // return {
    //   fontWeight:
    //     status.indexOf(name) === -1
    //       ? theme.typography.fontWeightRegular
    //       : theme.typography.fontWeightMedium,
    // };
  }
  const theme = useTheme();
  const [status, setStatus] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const newStatus = {
      ...task,
      taskStatus: value === "string" ? value.split(",") : value,
    };
    setTask(newStatus);
  };

  React.useEffect(() => {
    setStatus(task.taskStatus);
  }, [task]);

  return (
    <div>
      {task && (
        <FormControl sx={{ m: 1, width: "100%", height: "40px" }}>
          <InputLabel id="demo-multiple-chip-label">Status</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            value={status || ""}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                <Chip key={selected} label={selected} />
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {task &&
              names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, status, theme)}
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
