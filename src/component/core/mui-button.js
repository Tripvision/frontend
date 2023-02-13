import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import * as React from 'react';
import Stack from '@mui/material/Stack';


// OK 
const MuiButton = styled(Button)(({ theme }) => ({
  // Icons : EndIcons, StartIcon 로 정의
  // size :  size props 로 정의.
  // Disabled 값 비교해서 disabled 는 따로 작성합시다.
  // customize 
  backgroundColor: '#1C1C1C',
  borderRadius: '8px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  textTransform: 'none',
  color: '#FFFFFF',
  // padding: '8px 8px 8px 8px',
  borderColor: '#1C1C1C',
  // default 
  //  fontSize: 16,
  // border: '1px solid',
  // lineHeight: 1.5,
  // fontFamily: [
  //   '-apple-system',
  //   'BlinkMacSystemFont',
  //   '"Segoe UI"',
  //   'Roboto',
  //   '"Helvetica Neue"',
  //   'Arial',
  //   'sans-serif',
  //   '"Apple Color Emoji"',
  //   '"Segoe UI Emoji"',
  //   '"Segoe UI Symbol"',
  // ].join(','),
  '&:hover': {
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), #1C1C1C;',
    cursor: "pointer",
    // backgroundColor: '#0069d9',
    // borderColor: '#0062cc',
    // boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
  "&:disabled": {
    background: 'rgba(0, 0, 0, 0.05)',

  }
}));

export default MuiButton










const GridBlueButton = styled(Button)(({ theme }) => ({
  // Icons : EndIcons, StartIcon 로 정의
  // size :  size props 로 정의.
  // Disabled 값 비교해서 disabled 는 따로 작성합시다.
  // customize 
  maxWidth : '24px',
  minWidth : '24px',
  backgroundColor: '#E3F5FF',
  width : '24px',
  height : '24px',
  borderRadius: '8px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  textTransform: 'none',
  color: 'text.primary',
  // padding: '8px 8px 8px 8px',
  //borderColor: '#1C1C1C',
  // default 
  //  fontSize: 16,
  // border: '1px solid',
  // lineHeight: 1.5,
  // fontFamily: [
  //   '-apple-system',
  //   'BlinkMacSystemFont',
  //   '"Segoe UI"',
  //   'Roboto',
  //   '"Helvetica Neue"',
  //   'Arial',
  //   'sans-serif',
  //   '"Apple Color Emoji"',
  //   '"Segoe UI Emoji"',
  //   '"Segoe UI Symbol"',
  // ].join(','),
  // '&:hover': {
  //   background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), #1C1C1C;',
  //   cursor: "pointer",
  //   // backgroundColor: '#0069d9',
  //   // borderColor: '#0062cc',
  //   // boxShadow: 'none',
  // },
  // '&:active': {
  //   boxShadow: 'none',
  //   backgroundColor: '#0062cc',
  //   borderColor: '#005cbf',
  // },
  // '&:focus': {
  //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  // },
  // "&:disabled": {
  //   background: 'rgba(0, 0, 0, 0.05)',

  // }
}));


const GridPurpleButton = styled(Button)(({ theme }) => ({
  // Icons : EndIcons, StartIcon 로 정의
  // size :  size props 로 정의.
  // Disabled 값 비교해서 disabled 는 따로 작성합시다.
  // customize 

  maxWidth : '24px',
  minWidth : '24px',
  backgroundColor: '#E5ECF6',
  width : '24px',
  height : '24px',
  borderRadius: '8px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  textTransform: 'none',
  color: 'text.primary',
  // padding: '8px 8px 8px 8px',
  //borderColor: '#1C1C1C',
  // default 
  //  fontSize: 16,
  // border: '1px solid',
  // lineHeight: 1.5,
  // fontFamily: [
  //   '-apple-system',
  //   'BlinkMacSystemFont',
  //   '"Segoe UI"',
  //   'Roboto',
  //   '"Helvetica Neue"',
  //   'Arial',
  //   'sans-serif',
  //   '"Apple Color Emoji"',
  //   '"Segoe UI Emoji"',
  //   '"Segoe UI Symbol"',
  // ].join(','),
  // '&:hover': {
  //   background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), #1C1C1C;',
  //   cursor: "pointer",
  //   // backgroundColor: '#0069d9',
  //   // borderColor: '#0062cc',
  //   // boxShadow: 'none',
  // },
  // '&:active': {
  //   boxShadow: 'none',
  //   backgroundColor: '#0062cc',
  //   borderColor: '#005cbf',
  // },
  // '&:focus': {
  //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  // },
  // "&:disabled": {
  //   background: 'rgba(0, 0, 0, 0.05)',

  // }
}));



export {
  GridBlueButton,
  GridPurpleButton,
};