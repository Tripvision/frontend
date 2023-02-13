import * as React from 'react';


// Material ui
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';


// OK
const MuiChip = styled(Chip)(({ theme }) => ({
  // 1. color : dark Mode 때문에, 직접 주지 맙시다.
  // 2. size : props 를 이용해서 전달 합시다.
  // 3. custom delete icons : deleteIcon={<DeleteIcon />} 와 같이 삽입
  // 4. Chips Array : 다른 컴포넌트에서 구현하자. 공식문서 예제를 참고하는 습관을 기르자 꼭.
  // + delete 는 아직 구현해야 할 필요를 잘 못느끼겟다. 
  // + Toolkit 에서 받아온 값을 렌더링 시키자. 굳이 지우고 보낼 필요가 있을까 싶기도 함. (아직 그런 구현이 없음)
  // customize 
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '4px',
  '&:hover': {
    // background : 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), #1C1C1C;',
    cursor: "pointer",
    // backgroundColor: '#0069d9',
    // borderColor: '#0062cc',
    // boxShadow: 'none',
  },
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

export default MuiChip;