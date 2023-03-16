import React from "react";
import moment from "moment";

// Material ui
import {
  DataGrid,
  GridToolbar,
  GridCellEditStopReasons,
} from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// component
import { GridPurpleButton } from "~component/core/mui-button";
import { useDispatch, useSelector } from "react-redux";
import { fetchfileListByProjectId } from "~features/files/files-slice";
import { useParams } from "react-router-dom";
import { isEmptyArr } from "~utils/object-utils";
import { maxWidth } from "@mui/system";

// Refactor : fileRows
function getFileImgName(params) {
  console.log(params);
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {/* <Typography> {params.row.fileExt} </Typography> */}
      <Typography> {params.row.fileName} </Typography>
    </Box>
  );
}

const fileColumn = [
  { field: "id", hide: true },
  {
    field: "File Name",
    headerName: "File Name",
    renderCell: getFileImgName,
    flex: 1,
    maxWidth: "150px",
  },
  { field: "fileSize", headerName: "File Size", flex: 1 },
  { field: "fileUploader", headerName: "Uploader", flex: 1 },
  {
    field: "uploadTime",
    headerName: "Upload Time",
    flex: 1,
    valueFormatter: (params) =>
      moment(params.value).format("DD/MM/YYYY hh:mm A"),
  },
];

export default function Files() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fileList = useSelector((state) => state.files.files);
  const [selectionModel, setSelectionModel] = React.useState({
    projectId: id,
  });

  React.useEffect(() => {
    dispatch(fetchfileListByProjectId(id));
  }, [dispatch]);

  React.useEffect(() => {
    console.log(selectionModel);
  }, [selectionModel]);

  const handleProcessRowUpdate = (newRow, oldRow) => {
    setSelectionModel({
      ...selectionModel,
      ["0"]: {
        ...selectionModel["0"],
        ...newRow,
      },
    });
    return newRow;
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      fileList.find((row) => row.id === id)
    );
    const newRows = selectedRowsData.slice(0, 1);

    setSelectionModel({
      ...selectionModel,
      ...newRows,
    });
  };

  return (
    <div className="App">
      {isEmptyArr(fileList) === false ? (
        <div style={{ height: 400, width: "100%" }}>
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
      ) : (
        <> </>
      )}
    </div>
  );
}
