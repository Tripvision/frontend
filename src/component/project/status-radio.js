import * as React from "react";
import { pink } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import { InputLabel } from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function StatusRadio({ status, handleStatus }) {
  const [selectedValue, setSelectedValue] = React.useState(status);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    handleStatus(event);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <div>
      <FormControlLabel
        value="YET"
        control={<Radio {...controlProps("YET")} />}
        label="YET"
      />
      <FormControlLabel
        value="PROGRESS"
        control={<Radio {...controlProps("PROGRESS")} color="secondary" />}
        label="PROGRESS"
      />
      <FormControlLabel
        value="COMPLETED"
        control={<Radio {...controlProps("COMPLETED")} color="success" />}
        label="COMPLETED"
      />
      <FormControlLabel
        value="PENDING"
        control={<Radio {...controlProps("PENDING")} color="default" />}
        label="PENDING"
      />
      <FormControlLabel
        value="REJECTED"
        control={
          <Radio
            {...controlProps("REJECTED")}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
        }
        label="REJECTED"
      />
    </div>
  );
}
