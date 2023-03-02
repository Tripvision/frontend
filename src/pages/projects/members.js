import React, { useRef, useEffect, useState } from 'react';
import {
    DataGrid,
    GridToolbar,
    useGridRootProps,
    GridRowsProp,
    GridColDef,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarContainerProps,
    GridCellEditStopReasons

} from '@mui/x-data-grid';
import Button from '@mui/material/Button';


// Material ui 
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectMembersThunk, deleteProjectMemberThunk, InviteProjectMemberThunk, updateProjectMemberThunk } from '~features/project-members/project-members-slice';
import { useParams } from 'react-router-dom';
import { isEmptyArr, isEmptyObj } from '../../utils/object-utils';
import { DeleteTeamByProjectId, UpdateTeamByProjectId } from '~features/team/team-slice';


// Refactor : Avatar 정보 Redux 에서 가져오기 memberRows
const RenderAvatar = (props) => {
    const { hasFocus, value } = props;
    return (
        <Avatar src={value} variant="rounded" alt="Not Found" />
    )
}



function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = useRef(null);
    const cellDiv = useRef(null);
    const cellValue = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showFullCell, setShowFullCell] = useState(false);
    const [showPopper, setShowPopper] = useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: '100%',
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width, marginLeft: -17 }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});





const Members = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const entities = useSelector(state => state.projectMember.entities.content);
    const [selectionModel, setSelectionModel] = React.useState({
        projectId: id

    });
    const [value, setValue] = React.useState({});
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
        const selectedRowsData = ids.map((id) => entities.find((row) => row.memberId === id));
        const newRows = selectedRowsData.slice(0, 1)

        setSelectionModel({
            ...selectionModel,
            ...newRows,
        })
    };

    useEffect(() => {
        dispatch(fetchProjectMembersThunk(id));
    }, [dispatch])

    React.useEffect(() => {
        // console.log(selectionModel);
    })

    const handleUpdate = () => {
        dispatch(updateProjectMemberThunk(
            selectionModel
            // projectId: selectionModel.projectId, member: selectionModel['0']
        ))  
    }


    const RenderUpdateButton = (props) => {
        const { hasFocus, value, field } = props;
        console.log(selectionModel);
        return (
            <Button color="primary"
                variant="rounded"
                alt="Not Found"
                onClick={handleUpdate}
            >{field}</Button>
        )
    }

    const RenderDeleteButton = (props, id) => {
        const { hasFocus, value, field } = props;
        return (
            <Button color="primary"
                variant="rounded"
                alt="Not Found"
                onClick={() => { dispatch(deleteProjectMemberThunk({ projectId: selectionModel.projectId, memberId: selectionModel['0'].memberId })) }}
            >{field}</Button>
        )
    }


    const memberColumn = React.useMemo(() => {
        return [
            { field: 'memberId', hide: true },
            {
                field: 'memberAvatarUrl',
                headerName: 'Avatar',
                width: 80,
                sortable: false,
                renderCell: RenderAvatar,
            },
            { field: 'memberName', headerName: '이름', renderCell: renderCellExpand, flex: 1, maxWidth: 120, },
            { field: 'memberEmail', headerName: '이메일', renderCell: renderCellExpand, flex: 1, maxWidth: 200, },
            { field: 'memberProjectRole', headerName: '권한', renderCell: renderCellExpand, width: 120, editable: true },
            { field: 'memberStandardPosition', headerName: '선호포지션', renderCell: renderCellExpand, flex: 1, editable: true },
            {
                field: '수정',
                headerName: '',
                width: 80,
                renderCell: RenderUpdateButton
            },
            {
                field: '삭제',
                headerName: '',
                width: 80,
                renderCell: RenderDeleteButton
            },
            // {
            //     field: 'memberRegistrationDate',
            //     headerName: 'Update On',
            //     // type: 'dateTime',
            //     width: 120,
            //     flex: 1,
            //     valueGetter: ({ value }) => value && new Date(value),
            // },
        ];

    }, []);

    return (
        <>
            {
                isEmptyArr(entities) === false ?
                    <div style={{ height: 700, width: '100%' }}>
                        <DataGrid
                            components={{
                                NoRowsOverlay: CustomNoRowsOverlay,
                                Toolbar: GridToolbar,
                            }}
                            columns={memberColumn}
                            rows={entities || []}
                            getRowId={(row) => row.memberId}

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
                    : <div>1</div>
            }
        </>
    );
};
export default Members;


// 툴바 커스텀 

const GridCustomToolbar = (props, ref) => {
    const { className, ...other } = props;
    const rootProps = useGridRootProps();

    return (
        <Box>
            <GridToolbarContainer ref={ref} {...other}>
                <GridToolbarColumnsButton startIcon={<img alt='Not Found' src='/data-grid/add.svg' />} />
                <GridToolbarFilterButton startIcon={<img alt='Not Found' src='/data-grid/filter.svg' />} />
                <GridToolbarDensitySelector startIcon={<img alt='Not Found' src='/data-grid/hamburger.svg' />} />
                <GridToolbarExport startIcon={<img alt='Not Found' src='/data-grid/simCard.svg' />} />
                <showQuickFilter />
            </GridToolbarContainer>
        </Box>
    );
}

//



// 로우가 없을 경우 에러처리 
function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <Box sx={{ mt: 1 }}>No Rows</Box>
        </StyledGridOverlay>
    );
}

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));


