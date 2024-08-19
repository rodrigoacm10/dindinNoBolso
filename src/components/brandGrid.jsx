import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  deleteBrand,
  deleteClient,
  movimentsGetFunc,
} from "../services/APIService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { SidebarContext } from "../context/sidebarContext";
import { FaTrashAlt } from "react-icons/fa";

// console.log

function BrandGrid({ brandData = [] }) {
  const { attData, attDataFunc } = useContext(SidebarContext);

  const columns = [
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      width: 90,
      renderCell: ({ value, row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
            }}
          >
            <Button
              sx={{
                // textTransform: "none",
                // display: "block",
                backgroundColor: "#7A7A7A",
                color: "#ffffff",
                ":hover": {
                  backgroundColor: "#5E5E5E",
                  color: "#ffffff",
                },
              }}
              variant="contained"
              onClick={() => {
                // console.log('ab')
                deleteBrand(row.id);
                attDataFunc();
              }}
            >
              <FaTrashAlt style={{ width: "18px", height: "18px" }} />
            </Button>
          </Box>
        );
      },
    },
    {
      field: "nome",
      headerName: "Marca",
      flex: 1,
      minWidth: 220,
      cellClassName: "name-column--cell",
    },

    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
  ];

  return (
    <Box
      height="100%"
      sx={{
        "& .MuiDataGrid-root": {
          fontFamily: "Poppins",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#7A7A7A",
          borderRadius: "0px",
          // borderBottom: "none",
        },
        "& .MuiDataGrid-toolbarContainer ": {
          backgroundColor: "#7A7A7A",
          // overflow: "hidden",
          // color: ` #ffffff !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          fontFamily: "Poppins",
          color: `#ffffff !important`,
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontFamily: "Poppins",
          color: "#ffffff",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          fontFamily: "Poppins",
          backgroundColor: "#7A7A7A",
          color: `#ffffff !important`,
        },
        "& .MuiToolbar-root ": {
          fontFamily: "Poppins",
          color: `#ffffff !important`,
        },
        // MuiTablePagination-actions
        "& .MuiButtonBase-root ": {
          fontFamily: "Poppins",
          color: `#ffffff !important`,
        },
        borderRadius: "9px",
        overflow: "hidden",
      }}
    >
      {/* {movs.map((el, i) => {
      return <p key={i}>{el.value}</p>;
    })} */}
      <DataGrid
        // getRowId={(row) => row.client + "-" + row.contact}
        rows={brandData}
        columns={columns}
        // components={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}

export default BrandGrid;
