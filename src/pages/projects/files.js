import React from 'react';
import moment from "moment";

// Material ui 
import { DataGrid, GridToolbar
,    GridCellEditStopReasons } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

// component 
import { GridPurpleButton } from '~component/core/mui-button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchfileListByProjectId } from '~features/files/files-slice';
import { useParams } from 'react-router-dom';
import { isEmptyArr } from '~utils/object-utils';


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
    { field: 'fileName', headerName: 'Name' },
    { field: 'fileSize', headerName: 'Size' },
    { field: 'fileUploader', headerName: 'Uploader' },
    { field: 'fileThumbnail', headerName: 'Thumbnail', renderCell: getFileImgName, flex: 1 },
    { field: 'taskTitle', headerName: 'Title' },
    // {
    //     field: 'uploadTime',
    //     headerName: 'Upload Time',
    //     width: 100,
    //     valueFormatter: params => moment(params.value).format("DD/MM/YYYY hh:mm A"),
    // }
];

export default function Files() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const fileList = useSelector(state => state.files.files);
    const [selectionModel, setSelectionModel] = React.useState({
        projectId: id

    });

    React.useEffect(() => {
        dispatch(fetchfileListByProjectId(id));
    }, [dispatch]);

    React.useEffect(() => {
        console.log(selectionModel)
    },[selectionModel]);

    const handleProcessRowUpdate = (newRow, oldRow) => {
        setSelectionModel({
            ...selectionModel,
            ['0']: {
                ...selectionModel['0'],
                ...newRow
            }
        })
        return newRow;
    };

    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => fileList.find((row) => row.id === id));
        const newRows = selectedRowsData.slice(0, 1)

        setSelectionModel({
            ...selectionModel,
            ...newRows,
        })
    };

    return (
        <div className='App'>
             {
                isEmptyArr(fileList) === false ?
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    columns={fileColumn}
                    rows={fileList}
                    components={{ Toolbar: GridToolbar }}

                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}

                    checkboxSelection
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    experimentalFeatures={{ newEditingApi: true }}
                    onCellEditStop={(params, event) => {
                        if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                            event.defaultMuiPrevented = true;
                        }
                    }}
                    processRowUpdate={handleProcessRowUpdate}

                />
            </div>
            : <> </>
            }
        </div>
    );
}


