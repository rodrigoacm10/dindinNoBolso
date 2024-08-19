import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { deleteClient, movimentsGetFunc } from "../services/APIService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { SidebarContext } from "../context/sidebarContext";
import { FaTrashAlt } from "react-icons/fa";

// console.log

function ClientsGrid({ clientsData = [] }) {
  const { attData, attDataFunc } = useContext(SidebarContext);

  const clientsObj = [
    {
      client: "redimi brunho",
      valueTotal: 245.6,
      contact: "(81)99999-9999",
    },
    {
      client: "ayrton senna",
      valueTotal: 115.6,
      contact: "(81)99999-9999",
    },
    {
      client: "wagner love",
      valueTotal: 635.6,
      contact: "(81)99999-9999",
    },
    {
      client: "neymar Jr",
      valueTotal: 1245.6,
      contact: "(81)99999-9999",
    },
  ];

  const columns = [
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      width: 90,
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
                deleteClient(row.id);
                attDataFunc();
              }}
            >
              <FaTrashAlt style={{ width: "18px", height: "18px" }} />
            </Button>
          </Box>
        );
      },
    },
    // {
    //   renderCell: ({ value, row }) => {
    //     // value = "1a12b449-938c-4eb2-a99a-1e8970da973e_1704226871452.jpeg";
    //     if (idMov == row.id) {
    // console.log("id certo");
    //     }

    //     return (
    //       <Box
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           color: "black",
    //         }}
    //       >
    //         {/* <p>{value}</p> */}
    //         {value ? (
    //           <Box display="flex" gap="20px">
    //             <Link to={`${API_URL}/${value}`} target="_blank">
    //               <p style={{ color: "black" }}>
    //                 <GrAttachment style={{ width: "18px", height: "18px" }} />
    //               </p>
    //             </Link>
    //             <button
    //               style={{
    //                 border: "none",
    //                 cursor: "pointer",
    //                 backgroundColor: "#ffffff",
    //               }}
    //               onClick={() => {
    //                 //  n vai dar setAddIMg.. e sim um set pra abrir um popup para confirmar a troca do anexo, apos confirmar ira dar o setAddImgBox
    //                 // setAddImgBoxVisible(!addImgBoxVisible);
    //                 setConfirmVisible(!confirmVisible);
    //                 setIdMov(row.id);
    // console.log(row.id);
    //               }}
    //             >
    //               {/* {idMov == row.id && "a"} */}
    //               <FaPencil />
    //             </button>
    //           </Box>
    //         ) : (
    //           <p style={{ color: "rgba(224, 224, 224, 1)" }}>
    //             <GrAttachment style={{ width: "18px", height: "18px" }} />
    //           </p>
    //         )}
    //       </Box>
    //     );
    //   }
    // },
    {
      field: "nome",
      headerName: "Cliente",
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
      // whatsapp
      field: "whatsapp",
      headerName: "Whatsapp",
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      minWidth: 90,
      flex: 1.5,
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
            {row.whatsapp == true ? <p>Possui</p> : <p>Não possui</p>}
          </Box>
        );
      },
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
        "& .MuiDataGrid-selectedRowCount ": {
          // opacity: "0",
          display: "none",
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
        rows={clientsData}
        columns={columns}
        // components={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}

export default ClientsGrid;
