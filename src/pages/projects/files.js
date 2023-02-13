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

const fileRows = [
    {
        id: '1',
        type: 'jpg',
        img: 'asda',
        name: 'Project tech requirements.pdf',
        size: '5.6',
        uploader: 'Karina Clark',
        uploadTime: new Date(),
    },
    {
        id: '2',
        type: 'pdf',
        img: 'https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        name: 'Project tech requirements.pdf',
        size: '5.6',
        uploader: 'Karina Clark',
        uploadTime: new Date(),
    },
    {
        id: '3',
        type: 'xls',
        img: '',
        name: 'Project tech requirements.pdf',
        size: '5.6',
        uploader: 'Karina Clark',
        uploadTime: new Date(),
    },
    {
        id: '4',
        type: 'zip',
        img: '',
        name: 'Project tech requirements.pdf',
        size: '5.6',
        uploader: 'Karina Clark',
        uploadTime: new Date(),
    },
    {
        id: '5',
        type: 'jpg',
        img: '',
        name: 'Project tech requirements.pdf',
        size: '5.6',
        uploader: 'Karina Clark',
        uploadTime: new Date(),
    },
    {
        id: '6',
        type: 'jpg',
        img: '',
        name: 'Project tech requirements.pdf',
        size: '5.6',
        uploader: 'Karina Clark',
        uploadTime: new Date(),
    },
];

export default function Files() {
    return (
        <div className='App'>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid columns={fileColumn} rows={fileRows} components={{ Toolbar: GridToolbar }}

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


