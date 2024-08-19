import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  deleteAddress,
  deleteClient,
  deleteSupplier,
  deleteType,
  getOneAddress,
  getOneSupplier,
  movimentsGetFunc,
} from "../services/APIService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { SidebarContext } from "../context/sidebarContext";
import { FaTrashAlt } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";

// console.log

function SupplierGrid({ supplierData = [] }) {
  const {
    attData,
    attDataFunc,
    setSupplierValues,
    setSupplierInfosVisible,
    supplierInfosVisible,
  } = useContext(SidebarContext);

  const columns = [
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      width: 150,
      renderCell: ({ value, row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
            }}
            className="gap-1"
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
              onClick={async () => {
                // console.log('ab')
                const address = await getOneAddress(row.id);
                const supplier = await getOneSupplier(row.id);
                console.log(address, address.data[0].id, supplier);
                // pegar o id do address n do fornecedor
                const deleteAddress2 = await deleteAddress(address.data[0].id);
                const deleteSup = await deleteSupplier(row.id);
                // console.log(deleteSup);
                console.log(deleteAddress2);

                attDataFunc();
              }}
            >
              <FaTrashAlt style={{ width: "18px", height: "18px" }} />
            </Button>
            <Button
              sx={{
                backgroundColor: "#7A7A7A",
                color: "#ffffff",
                ":hover": {
                  backgroundColor: "#5E5E5E",
                  color: "#ffffff",
                },
              }}
              variant="contained"
              onClick={async () => {
                // setSalesInfosVisible(1);
                const address = await getOneAddress(row.id);

                setSupplierInfosVisible(1);
                // console.log(params.row);
                console.log(
                  row.id,
                  row.nome_contato,
                  row.telefone,
                  row.email,
                  row.pessoa_fisica,
                  row.cnpj,
                  row.cpf,
                  row.nome_fantasia,
                  row.razao_social,
                  address.data
                );
                console.log(address);
                setSupplierValues({
                  id: row.id,
                  nameContact: row.nome_contato,
                  phone: row.telefone,
                  email: row.email,
                  personType: row.pessoa_fisica,
                  cnpj: row.cnpj,
                  cpf: row.cpf,
                  nameFantasy: row.nome_fantasia,
                  social: row.razao_social,
                  address: address.data,
                });
                // setValuesProduct({
                //   name: params.row.name,
                //   value: params.row.value,
                // });
                //   attDataFunc();
              }}
              // disabled={params.id !== rowId || loading}
            >
              <CiCircleInfo style={{ width: "18px", height: "18px" }} />
            </Button>
          </Box>
        );
      },
    },

    {
      field: "nome_contato",
      headerName: "Fornecedor",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 135,
    },
    {
      field: "telefone",
      headerName: "Telefone",
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      minWidth: 135,

      flex: 1.5,
    },
    {
      field: "email",
      headerName: "E-mail",
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      minWidth: 150,

      flex: 1.5,
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
        "& .MuiDataGrid-selectedRowCount ": {
          // opacity: "0",
          display: "none",
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
        rows={supplierData}
        columns={columns}
        // components={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}

export default SupplierGrid;
