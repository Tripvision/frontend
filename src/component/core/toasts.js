import {
    isRejectedWithValue,
    isAsyncThunkAction,
    isPending,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";


export const promiseToast =
    (api) => (next) => (action) => {
        if (isPending(action)) {
            toast.promise("요청을 진행 중입니다.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        return next(action);
    };

export const errorToast =
    (api) => (next) => (action) => {
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