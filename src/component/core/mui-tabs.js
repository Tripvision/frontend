import React, {useState} from 'react'
import SwipeableViews from 'react-swipeable-views';

// Material ui 
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import MuiTab from '@component/core/MuiTab.jsx.js';

// Options
// 1. color tab
// -> textColor="primary" , indicatorColor="secondary"
// 2. Fixed Tabs (Full width)
// -> variant="fullWidth"
// 3. Verticla Tabs
// -> orientation="vertical" + 상위 태그에 flex 와 같은 레이아웃으로 잡기


// OK 
export default MuiTabs = () => {
   
   const theme = useTheme();
   const [value,setValue] = useState(0);

   const handleChange = (event, newValue) => {
    setValue(newValue);
   }

   const handleChangeIndex = (index) => {
    setValue(index);
   }

  return (
    <>
      <Box sx={{display:flex}}>
        <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs example"
            orientation="vertical"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
          <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <MuiTab value={value} index={0} dir={theme.direction}>
          Item One
        </MuiTab>
        <MuiTab value={value} index={1} dir={theme.direction}>
          Item Two
        </MuiTab>
        <MuiTab value={value} index={2} dir={theme.direction}>
          Item Three
        </MuiTab>
      </SwipeableViews>
      </Box>
    </>
  )
}

function a11yProps(index) {
  return {  
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}