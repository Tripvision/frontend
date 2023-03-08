// import React,{useEffect} from 'react'

// // Material ui 
// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import Typography from '@mui/material/Typography'
// import Box from '@mui/material/Box'
// import Avatar from '@mui/material/Avatar'
// import Chip from '@mui/material/Chip';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
// import Stack from '@mui/material/Stack';
// import { useTheme } from '@mui/material/styles';

// // Redux
// import { useSelector, useDispatch } from 'react-redux';
// import { selectTasks, fetchTaskListByMemberId } from '~features/tasks/tasks-slice';

// export function BasicCard() {

//     const theme = useTheme();

//     return (
//         <Card >
//             <CardContent>
//                 <Chip color="secondary" label="Chip Filled" size="small" sx={{ borderRadius: '5px', mb: 1.5 }} />
//                 <Typography noWrap={true} >
//                     Meeting with customer
//                 </Typography>
//                 <Typography variant='body2' gutterBottom color="text.secondary" maxWidth={230}
//                     sx={{
//                         wordWrap: 'break-word',
//                     }}>
//                 First, a disclaimer - the entire process writing a blog post often takes a couple
//             </Typography>

//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Avatar src='' alt='' sx={{ width: 25, height: 25 }} />
//                 <Box sx={{ display: 'flex' }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} mr={1}>
//                         {theme.palette.mode === 'dark' ? (
//                             <img width='12px' height='12px' src="/card/black-clip.svg" />
//                         ) : (
//                             <img width='12px' height='12px' src="/card/white-clip.svg" />
//                         )}
//                         <Typography ml={0.5} variant='body2' color='text.secondary'>6</Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} >
//                         {theme.palette.mode === 'dark' ? (
//                             <img width='12px' height='12px' src="/card/black-chat-text.svg" />
//                         ) : (
//                             <img width='12px' height='12px' src="/card/white-chat-text.svg" />
//                         )}
//                         <Typography ml={0.5} variant='body2' color='text.secondary' > 8</Typography>
//                     </Box>
//                 </Box>
//             </Box>
//         </CardContent>
//         </Card >
//     )
// }

// const MyMemberTask = () => {

//     const dispatch = useDispatch();

//     const taskList = useSelector(state => state.tasks.taskList);

//     useEffect(() => {
//         dispatch(fetchTaskListByMemberId());
//     },[]);

//     return (
//         <Container fixed >
//             <Grid container spacing={3}>
//                 <Grid item
//                     xs={12}
//                     sm={6}
//                     md={4}
//                     lg={4}
//                     xl={4}
//                 >
//                     <Box sx={{ display: 'flex' }}><Typography mr={1} >Yet to Start</Typography><Typography color="text.secondary">6</Typography></Box>
//                     <Divider sx={{ borderColor: '#A1E3CB', borderBottomWidth: 5, mb: 3, borderRadius: 3 }}></Divider>
//                     <Stack spacing={3}>
//                         {/* <BasicCard />
//                         <BasicCard />
//                         <BasicCard />
//                         <BasicCard />
//                         <BasicCard /> */}
//                     </Stack>
//                 </Grid>
//                 <Grid item
//                     xs={12}
//                     sm={6}
//                     md={4}
//                     lg={4}
//                     xl={4}>
//                     <Box sx={{ display: 'flex' }}><Typography mr={1} >In Progress</Typography><Typography color="text.secondary">6</Typography></Box>
//                     <Divider sx={{ borderColor: '#C6C7F8', borderBottomWidth: 5, mb: 3 }}></Divider>
//                     <Stack spacing={2}>
//                         {/* <BasicCard />
//                         <BasicCard />

//                         <BasicCard />
//                         <BasicCard /> */}
//                     </Stack>
//                 </Grid>
//                 <Grid item
//                     xs={12}
//                     sm={6}
//                     md={4}
//                     lg={4}
//                     xl={4}>
//                     <Box sx={{ display: 'flex' }}><Typography mr={1} >Completed</Typography><Typography color="text.secondary">6</Typography></Box>
//                     <Divider sx={{ borderColor: '#95A4FC', borderBottomWidth: 5, mb: 3 }}></Divider>
//                     <Stack spacing={2}>
//                         {/* <BasicCard />
//                         <BasicCard />

//                         <BasicCard />
//                         <BasicCard /> */}
//                     </Stack>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default MyMemberTask;