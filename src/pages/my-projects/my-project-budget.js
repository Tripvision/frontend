import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

// component
import CheckBoxCard from "~component/my-project/check-box-card";
import LineProgressBar from "~component/core/line-progress-bar";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { IosSwitch } from "~component/core/ios-switch";

import useForm from "~component/my-project/use-form";
import NotifiType from "~component/my-project/NotifiType";
import { validator } from "~component/my-project/setting-validator";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchBudgetByProjectId,
  createBudgetByProjectId,
  UpdateBudgetByProjectId,
} from "~features/budget/budget-slice";
import { DeleteBudgetByProjectId } from "../../features/budget/budget-slice";
import { isEmptyObj } from "~utils/object-utils";

// Refactor : props 전체를 받아오는 행위
export function TwoLineCard(props) {
  const { data } = props;

  return (
    <Card sx={{ width: "100%", mb: 3 }}>
      <CardContent>
        <Typography sx={{ mb: 1 }} variant="body2" color="text.secondary">
          {data.title}
        </Typography>
        <Typography>{data.content}</Typography>
        <Box>{props.children}</Box>
      </CardContent>
    </Card>
  );
}

const MyProjectBudget = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const budget = useSelector((state) => state.budget.budget);

  useEffect(() => {
    dispatch(fetchBudgetByProjectId(id));
    console.log(budget);
    console.log(isEmptyObj(budget));
  }, [dispatch]);

  const submit = () => {
    const result = {
      ...state,
      ["notificationType"]: [...checkedItems],
    };
    console.log(result);
    dispatch(UpdateBudgetByProjectId({ id: id, budget: result }));
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    handleClear,
    handleStatus,
    handleCheckedItemHandler,
    handleSwitch,
    state,
    checkedItems,
    errors,
    isSubmited,
  } = useForm({
    initState: budget,
    callback: submit,
    validator,
    checkBox: true,
  });

  const handleDelete = () => {
    dispatch(DeleteBudgetByProjectId(id));
  };

  let isValidForm =
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length === 0;

  return (
    <Container>
      {isEmptyObj(budget) === false ? (
        <LineProgressBar currentValue={budget.value} maxValue={budget.max} />
      ) : (
        <></>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Stack spacing={4}>
          {/*  useSage Character */}
          <Box sx={{ borderRadius: "12px" }}>
            <Grid
              container
              justifyContent="space-evenly"
              alignItems="center"
              direction="row"
              spacing={5}
              mb={3}
            >
              {Array.from([1, 2, 3]).map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                  <CheckBoxCard />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Card sx={{ borderRadius: "12px" }}>
            <CardContent>
              <Typography> Budget Notes </Typography>
              <TextField
                required
                fullWidth
                type="text"
                name="notes"
                value={state.notes || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name ? true : false}
                helperText={errors.name}
                variant="standard"
                InputProps={{ disableUnderline: true }}
              />
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: "12px" }}>
            <CardContent>
              <Typography> Manage Max value </Typography>
              <TextField
                required
                type="text"
                fullWidth
                name="max"
                value={state.max || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.type ? true : false}
                helperText={errors.type}
                variant="standard"
                margin="dense"
                InputProps={{ disableUnderline: true }}
              />
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: "12px" }}>
            <CardContent>
              <Typography> current value </Typography>
              <TextField
                required
                type="text"
                fullWidth
                name="value"
                value={state.value || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.type ? true : false}
                helperText={errors.type}
                variant="standard"
                margin="dense"
                InputProps={{ disableUnderline: true }}
              />
            </CardContent>
          </Card>

          {/* Checkbox State */}
          <Card sx={{ borderRadius: "12px" }}>
            <CardContent>
              <Typography> Overuse Notifications </Typography>
              <Box sx={{ display: "flex" }}>
                <NotifiType
                  name="email"
                  handleCheckedItemHandler={handleCheckedItemHandler}
                />
                <NotifiType
                  name="phone"
                  handleCheckedItemHandler={handleCheckedItemHandler}
                />
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: "12px" }}>
            <CardContent>
              <Typography> Allow Changes </Typography>
              <IosSwitch
                checked={state.allow || false}
                name="allow"
                onChange={handleSwitch}
                inputProps={{ "aria-label": "controlled" }}
              />
            </CardContent>
          </Card>

          <Box sx={{ display: "flex" }}>
            <Box>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete Project
              </Button>
            </Box>

            <Box sx={{ marginLeft: "auto" }}>
              <Button
                sx={{ mr: 3 }}
                onClick={handleClear}
                type="submit"
                variant="contained"
                color="primary"
              >
                Discard
              </Button>
              <Button
                disabled={!isValidForm && isSubmited}
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Stack>
        <ToastContainer />
      </Box>
    </Container>
  );
};

export default MyProjectBudget;
