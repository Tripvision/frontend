import React from 'react';
import moment from "moment";

// Material ui 
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

// component 
import { GridPurpleButton } from '~component/core/mui-button';
import { useDispatch, useSelector } from 'react-redux';


// Refactor : fileRows 
function getFileImgName(params) {
    const a = <img src={`/data-grid/${params.row.type}.svg`} width='16px' height='16px' variant="rounded" alt="Not Found" />
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton sx={{
                backgroundColor: '#E5ECF6',

            }}>
                {a}
            </IconButton>
            <Typography> {params.row.name} </Typography>
        </Box>
    )
}


const fileColumn = [
    { field: 'id', hide: true },
    { field: 'type', headerName: 'Type', hide: true },
    { field: 'img', headerName: 'File Img', hide: true },
    { field: 'name', headerName: 'File Name', hide: true },
    { field: 'fileNameImg', headerName: 'File Img Name', renderCell: getFileImgName, flex: 1 },
    { field: 'size', headerName: 'File Size' },
    { field: 'uploader', headerName: 'Uploader' },
    {
        field: 'uploadTime',
        headerName: 'Upload Time',
        width: 100,
        valueFormatter: params => moment(params.value).format("DD/MM/YYYY hh:mm A"),
    }
];

export default function Files() {

    const dispatch = useDispatch();
    const fileList = useSelector(state => state.files.files);
    
    React.useEffect(() => {
        // dispatch(fetchfileListByProjectId(1));
    },[]);


    return (
        <div className='App'>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid columns={fileColumn} rows={fileList} components={{ Toolbar: GridToolbar }}

                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                />
            </div>
        </div>
    );
}


