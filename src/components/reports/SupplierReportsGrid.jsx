import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  getAllMovs,
  getClients,
  getExpenseCategorys,
  getImg,
  getProducts,
  getRevenueCategorys,
  getServices,
  movimentsGetFunc,
} from "../../services/APIService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MovimentsActions from "../MovimentsActions";
import moment from "moment";
import { SidebarContext } from "../../context/sidebarContext";

import * as React from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { FaFileDownload } from "react-icons/fa";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { GrAttachment } from "react-icons/gr";
import { FaPencil } from "react-icons/fa6";
import AddAttachment from "../addAttachment";
import ConfirmToDo from "../confirmToDo";

function SupplierReportGrid({
  change,
  moviments = [],
  movToPass = [],
  report = false,
  text,
}) {
  const {
    attData,
    attDataFunc,
    revenueCats,
    expenseCats,
    clients,
    setImgUrl,
    setToImgVisible,
    catsRevArr,
    catsExpArr,
    clientsArr,
    productsArr,
    servicesArr,
    supplierArr,
    brandArr,
    typeArr,
  } = useContext(SidebarContext);

  const [rowId, setRowId] = useState(null);

  const [addImgBoxVisible, setAddImgBoxVisible] = useState(false);
  const [image, setImage] = useState(false);
  const [fileInfos, setFileInfos] = useState([]);
  const [idMov, setIdMov] = useState(0);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // const API_URL = "https://recicont-api-tn8k.onrender.com";
  // const API_URL = "https://recicont-api.onrender.com/files";

  // console.log

  function isOverflown(element) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };

    const handleMouseLeave = () => {
      setShowFullCell(false);
    };

    React.useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }

      function handleKeyDown(nativeEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
          setShowFullCell(false);
        }
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);

    return (
      <Box
        ref={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          alignItems: "center",
          lineHeight: "24px",
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: "100%",
            width,
            display: "block",
            position: "absolute",
            top: 0,
          }}
        />
        <Box
          ref={cellValue}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
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

  function renderCellExpand(params) {
    return (
      <GridCellExpand
        value={params.value || ""}
        width={params.colDef.computedWidth}
      />
    );
  }

  const columns = [
    {
      field: "fornecedor",
      headerName: "Fornecedor",
      headerAlign: "left",
      align: "left",
      // type: "singleSelect",
      // getOptionValue: (value) => value.id,
      // getOptionLabel: (value) => value.nome,
      // valueOptions: [...supplierArr],

      // editable: true,

      flex: 1,
    },

    {
      field: "quantidade",
      headerName: "Quantidade",
      type: "number",
      headerAlign: "center",
      flex: 1,
      align: "center",
      // editable: true,
    },
    {
      flex: 1,
      field: "custo_total",
      headerName: "Custo total",
      type: "number",
      headerAlign: "left",
      align: "left",
      // editable: true,
      renderCell: (params) => {
        return (
          <div>
            <p>R$ {(+params.row.custo_total).toFixed(2)}</p>
          </div>
        );
      },
    },

    {
      field: "id",
      headerName: "ID",
      valueGetter: ({ row, value }) => {
        if (row.id == null || !!row.id == false) {
          return 0;
        } else {
          return row.id;
        }
      },
      // flex: 1,
    },
  ];

  const handlePassToXLSX = () => {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(movToPass);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const getMovs = async () => {};

  useEffect(() => {
    getMovs();
  }, []);

  useEffect(() => {
    getMovs();
  }, [attData]);

  return (
    <Box
      height="100%"
      sx={{
        "& .MuiDataGrid-root": {
          fontFamily: "Poppins",
          border: "none",
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
          // minHeight: "20px",
          color: `#ffffff !important`,
          paddingBottom: "10px",
        },
        "& .MuiToolbar-root ": {
          fontFamily: "Poppins",
          color: `#ffffff !important`,
        },
        "& .MuiDataGrid-virtualScrollerContent ": {
          // fontFamily: "Poppins",
          // color: `#ffffff !important`,
          maxHeight: "100px",
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
      <Box
        display="flex"
        justifyContent="space-between"
        // borderRadius="2px"
        pt="5px"
        px="20px"
        alignItems="center"
        className="bg-[#7A7A7A] "
      >
        <p className="text-white text-sm">{text}</p>
        <Box
          // width="100%"
          display="flex"
          // style={{ borderBottom: "1px solid #fff" }}
          alignItems="end"
          gap="10px"
        >
          <Button style={{ borderBottom: "1px solid #fff" }}>
            <CSVLink
              data={movToPass}
              style={{
                textTransform: "none",
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <div className="flex gap-1">
                <FaFileDownload size="20px" /> CSV
              </div>
            </CSVLink>
          </Button>
          <Button
            onClick={handlePassToXLSX}
            style={{
              display: "flex",
              gap: "6px",
              padding: "7.5px",
              borderBottom: "1px solid #fff",
            }}
          >
            {/* <CSVLink
              data={movToPass}
              style={{
                textTransform: "none",
                textDecoration: "none",
                color: "#fff",
              }}
            > */}
            <FaFileDownload size="20px" /> XLSX
            {/* </CSVLink> */}
          </Button>
        </Box>
      </Box>

      <AddAttachment
        addImgBoxVisible={addImgBoxVisible}
        setAddImgBoxVisible={setAddImgBoxVisible}
        setImage={setImage}
        image={image}
        setFileInfos={setFileInfos}
      />
      <ConfirmToDo
        confirmVisible={confirmVisible}
        setConfirmVisible={setConfirmVisible}
        setConfirmedFunc={setAddImgBoxVisible}
        confirmedFunc={addImgBoxVisible}
      />

      <DataGrid
        sx={{
          pb: "30px",
          borderBottomLeftRadius: "9px",
          backgroundColor: "#ffffff",
          minHeight: "250px",
          // maxHeight: "100px",
        }}
        disableSelectionOnClick
        // getRowId={(row, i) => row.typeMov + "-" + row.id}
        getRowId={(row, i) => row.fornecedor + "-" + row.id}
        rows={moviments}
        columns={columns}
        onCellEditStop={(params) => setRowId(params.id)}
      ></DataGrid>
    </Box>
  );
}

export default SupplierReportGrid;

// import { Box, Button } from "@mui/material";
// import { useContext, useEffect, useState } from "react";
// import {
//   getAllMovs,
//   getBrand,
//   getClients,
//   getExpenseCategorys,
//   getProducts,
//   getRevenueCategorys,
//   getServices,
//   getSupplier,
//   getType,
//   movimentsGetFunc,
// } from "../../services/APIService";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import MovimentsActions from "../MovimentsActions";
// import moment from "moment";
// import { SidebarContext } from "../../context/sidebarContext";

// import * as React from "react";

// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import Popper from "@mui/material/Popper";
// import { FaFileDownload } from "react-icons/fa";
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import { Link } from "react-router-dom";
// import { GrAttachment } from "react-icons/gr";
// import { FaPencil } from "react-icons/fa6";
// import AddAttachment from "../addAttachment";
// import ConfirmToDo from "../confirmToDo";
// import ProductsActions from "../ProductsActions";

// function SupplierReportGrid({ change, moviments = [], movToPass = [] }) {
//   const {
//     attData,

//     supplierArr,
//     brandArr,
//     typeArr,
//     productsArr,
//   } = useContext(SidebarContext);

//   const [rowId, setRowId] = useState(null);

//   const [addImgBoxVisible, setAddImgBoxVisible] = useState(false);
//   const [image, setImage] = useState(false);
//   const [fileInfos, setFileInfos] = useState([]);
//   // const [idMov, setIdMov] = useState(0);
//   const [confirmVisible, setConfirmVisible] = useState(false);

//   function isOverflown(element) {
//     return (
//       element.scrollHeight > element.clientHeight ||
//       element.scrollWidth > element.clientWidth
//     );
//   }

//   const GridCellExpand = React.memo(function GridCellExpand(props) {
//     const { width, value } = props;
//     const wrapper = React.useRef(null);
//     const cellDiv = React.useRef(null);
//     const cellValue = React.useRef(null);
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [showFullCell, setShowFullCell] = React.useState(false);
//     const [showPopper, setShowPopper] = React.useState(false);

//     const handleMouseEnter = () => {
//       const isCurrentlyOverflown = isOverflown(cellValue.current);
//       setShowPopper(isCurrentlyOverflown);
//       setAnchorEl(cellDiv.current);
//       setShowFullCell(true);
//     };

//     const handleMouseLeave = () => {
//       setShowFullCell(false);
//     };

//     React.useEffect(() => {
//       if (!showFullCell) {
//         return undefined;
//       }

//       function handleKeyDown(nativeEvent) {
//         // IE11, Edge (prior to using Bink?) use 'Esc'
//         if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
//           setShowFullCell(false);
//         }
//       }

//       document.addEventListener("keydown", handleKeyDown);

//       return () => {
//         document.removeEventListener("keydown", handleKeyDown);
//       };
//     }, [setShowFullCell, showFullCell]);

//     return (
//       <Box
//         ref={wrapper}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         sx={{
//           alignItems: "center",
//           lineHeight: "24px",
//           width: "100%",
//           height: "100%",
//           position: "relative",
//           display: "flex",
//         }}
//       >
//         <Box
//           ref={cellDiv}
//           sx={{
//             height: "100%",
//             width,
//             display: "block",
//             position: "absolute",
//             top: 0,
//           }}
//         />
//         <Box
//           ref={cellValue}
//           sx={{
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           {value}
//         </Box>
//         {showPopper && (
//           <Popper
//             open={showFullCell && anchorEl !== null}
//             anchorEl={anchorEl}
//             style={{ width, marginLeft: -17 }}
//           >
//             <Paper
//               elevation={1}
//               style={{ minHeight: wrapper.current.offsetHeight - 3 }}
//             >
//               <Typography variant="body2" style={{ padding: 8 }}>
//                 {value}
//               </Typography>
//             </Paper>
//           </Popper>
//         )}
//       </Box>
//     );
//   });

//   function renderCellExpand(params) {
//     return (
//       <GridCellExpand
//         value={params.value || ""}
//         width={params.colDef.computedWidth}
//       />
//     );
//   }

//   const columns = [
//     {
//       field: "fornecedor",
//       headerName: "cliente",
//       flex: 1,

//       renderCell: renderCellExpand,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "quantidade",
//       headerName: "quantidade",
//       type: "number",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//       renderCell: (params) => {
//         return `${
//           params.row.total_quantidade ? `${+params.row.total_quantidade}` : "0"
//         }`;
//       },
//     },
//     {
//       field: "total_valor",
//       headerName: "valor total",
//       type: "number",
//       headerAlign: "center",
//       align: "center",
//       flex: 1,
//       editable: true,
//       renderCell: (params) => {
//         return `R$ ${
//           params.row.total_valor ? params.row.total_valor : "00.00"
//         }`;
//       },
//     },
//     {
//       field: "produto_nome",
//       headerName: "mais comprou",
//       headerAlign: "left",
//       flex: 1,
//       align: "left",
//       // type: "singleSelect",
//       // getOptionValue: (value) => {
//       //   return value.id;
//       // },
//       // getOptionLabel: (value) => value.nome,
//       // valueOptions: [...productsArr],
//       editable: true,
//       minWidth: 100,
//     },

//     {
//       field: "id",
//       headerAlign: "center",
//       align: "center",
//       headerName: "ID",
//     },
//   ];

//   const handlePassToXLSX = () => {
//     var wb = XLSX.utils.book_new();
//     var ws = XLSX.utils.json_to_sheet(movToPass);

//     XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

//     XLSX.writeFile(wb, "MyExcel.xlsx");
//   };

//   const getMovs = async () => {};

//   useEffect(() => {
//     getMovs();
//   }, []);

//   useEffect(() => {
//     getMovs();
//   }, [attData]);

//   return (
//     <Box
//       height="100%"
//       sx={{
//         "& .MuiDataGrid-root": {
//           fontFamily: "Poppins",
//           border: "none",
//         },
//         "& .MuiDataGrid-columnHeaders": {
//           backgroundColor: "#7A7A7A",
//           borderRadius: "0px",
//           // borderBottom: "none",
//         },
//         "& .MuiDataGrid-toolbarContainer ": {
//           backgroundColor: "#7A7A7A",
//           // overflow: "hidden",
//           // color: ` #ffffff !important`,
//         },
//         "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//           fontFamily: "Poppins",
//           color: `#ffffff !important`,
//         },
//         "& .MuiDataGrid-columnHeaderTitle": {
//           fontFamily: "Poppins",
//           color: "#ffffff",
//         },
//         "& .MuiDataGrid-footerContainer": {
//           borderTop: "none",
//           fontFamily: "Poppins",
//           backgroundColor: "#7A7A7A",
//           color: `#ffffff !important`,
//           paddingBottom: "10px",
//         },
//         "& .MuiToolbar-root ": {
//           fontFamily: "Poppins",
//           color: `#ffffff !important`,
//         },
//         // MuiTablePagination-actions
//         "& .MuiButtonBase-root ": {
//           fontFamily: "Poppins",
//           color: `#ffffff !important`,
//         },
//         "& .MuiDataGrid-selectedRowCount ": {
//           // opacity: "0",
//           display: "none",
//         },
//         borderRadius: "9px",
//         overflow: "hidden",
//       }}
//     >
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         // borderRadius="2px"
//         pt="5px"
//         px="20px"
//         alignItems="center"
//         className="bg-[#7A7A7A] "
//       >
//         <p className="text-white text-sm">compras dos clientes no periodo </p>
//         <Box
//           // width="100%"
//           display="flex"
//           // style={{ borderBottom: "1px solid #fff" }}
//           alignItems="end"
//           gap="10px"
//         >
//           <Button style={{ borderBottom: "1px solid #fff" }}>
//             <CSVLink
//               data={movToPass}
//               style={{
//                 textTransform: "none",
//                 textDecoration: "none",
//                 color: "#fff",
//               }}
//             >
//               <div className="flex gap-1">
//                 <FaFileDownload size="20px" /> CSV
//               </div>
//             </CSVLink>
//           </Button>
//           <Button
//             onClick={handlePassToXLSX}
//             style={{
//               display: "flex",
//               gap: "6px",
//               padding: "7.5px",
//               borderBottom: "1px solid #fff",
//             }}
//           >
//             {/* <CSVLink
//               data={movToPass}
//               style={{
//                 textTransform: "none",
//                 textDecoration: "none",
//                 color: "#fff",
//               }}
//             > */}
//             <FaFileDownload size="20px" /> XLSX
//             {/* </CSVLink> */}
//           </Button>
//         </Box>
//       </Box>

//       {/* onClick={handlePassToXLSX} */}
//       <AddAttachment
//         addImgBoxVisible={addImgBoxVisible}
//         setAddImgBoxVisible={setAddImgBoxVisible}
//         setImage={setImage}
//         image={image}
//         setFileInfos={setFileInfos}
//       />
//       <ConfirmToDo
//         confirmVisible={confirmVisible}
//         setConfirmVisible={setConfirmVisible}
//         setConfirmedFunc={setAddImgBoxVisible}
//         confirmedFunc={addImgBoxVisible}
//       />

//       <DataGrid
//         sx={{
//           pb: "30px",
//           borderBottomLeftRadius: "9px",
//           backgroundColor: "#ffffff",
//         }}
//         // disableSelectionOnClick
//         // getRowId={(row, i) => row.typeMov + "-" + row.id}
//         rows={moviments}
//         columns={columns}
//         // onCellEditStop={(params) => setRowId(params.id)}
//       ></DataGrid>
//     </Box>
//   );
// }

// export default SupplierReportGrid;
