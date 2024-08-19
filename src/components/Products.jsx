import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  deleteProducts,
  deleteServices,
  movimentsGetFunc,
} from "../services/APIService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { SidebarContext } from "../context/sidebarContext";
import { FaTrashAlt } from "react-icons/fa";

// console.log

function ProductsGrid({ prodAndServData = [] }) {
  const { attData, attDataFunc } = useContext(SidebarContext);

  const productsObj = [
    {
      product: "boné",
      valueTotal: 245.6,
      units: 10,
    },
    {
      product: "sapato all stars",
      valueTotal: 642.6,
      units: 12,
    },
    {
      product: "tag t-shirt insider",
      valueTotal: 1245.6,
      units: 15,
    },
  ];

  const columns = [
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      // width: 260,
      flex: 1,
      renderCell: ({ value, row }) => {
        // value = "1a12b449-938c-4eb2-a99a-1e8970da973e_1704226871452.jpeg";
        // row.id

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
                if (row.type == "product") {
                  deleteProducts(row.id);
                } else if (row.type == "service") {
                  deleteServices(row.id);
                }

                // deleteProducts
                // deleteClient(row.id)
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
      field: "type",
      headerName: "Produto/Serviço",
      flex: 1,
      renderCell: (params) => {
        if (params.row.type == "product") {
          return "Produto";
        }
        return "Serviço";
      },
      // cellClassName: "name-column--cell",
    },

    {
      field: "name",
      headerName: "Nome",
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      flex: 1.5,
    },
    {
      field: "id",
      headerName: "ID",
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      renderCell: (params) => {
        if (params.row.type == "product") {
          return `${params.row.id}1`;
        }
        return `${params.row.id}2`;
      },
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
        getRowId={(row) => row.type + "-" + row.id}
        rows={prodAndServData}
        columns={columns}
        // components={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}

export default ProductsGrid;
