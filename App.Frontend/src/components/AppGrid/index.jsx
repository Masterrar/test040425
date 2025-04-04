import { DataGrid } from '@mui/x-data-grid';

const AppGrid = ({ rows, paginationModel, setPaginationModel, totalRecords }) => {
  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "code", headerName: "Code", width: 130 },
    { field: "value", headerName: "Value", flex: 1 },
  ];
  const pageSizeOptions = [5, 10, 25];

  return (
    <DataGrid
  paginationModel={paginationModel}
  initialState={{
    pagination: {
      paginationModel: {
        pageSize: 25,
      },
    },
  }}
  rows={rows}
  columns={columns}
  pagination
  paginationMode="server"
  disableRowSelectionOnClick
  rowCount={totalRecords}
  onPaginationModelChange={setPaginationModel}
  pageSizeOptions={pageSizeOptions}
  rowsPerPageOptions={pageSizeOptions}
  sx={{ height: "100%" }}
/>
  );
};

export default AppGrid;