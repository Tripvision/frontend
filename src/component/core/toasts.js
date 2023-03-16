import {
  isRejectedWithValue,
  isAsyncThunkAction,
  isPending,
  isFulfilled,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const successToast = (api) => (next) => (action) => {
  if (isFulfilled(action)) {
    toast.success("Load Success", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return next(action);
};

export const errorToast = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.warn(action.payload.error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return next(action);
};
