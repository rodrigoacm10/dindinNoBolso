import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  getAllMovs,
  getClients,
  getExpenseCategorys,
  getProducts,
  getRevenueCategorys,
  getServices,
  movimentsGetFunc,
} from "../services/APIService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MovimentsActions from "./MovimentsActions";
import moment from "moment";
import { SidebarContext } from "../context/sidebarContext";

import * as React from "react";

// import moment from "moment";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { FaFileDownload } from "react-icons/fa";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { GrAttachment } from "react-icons/gr";
import { FaPencil } from "react-icons/fa6";
import AddAttachment from "./addAttachment";
import ConfirmToDo from "./confirmToDo";
import ProductsActions from "./ProductsActions";
import SalesActions from "./SalesActions";

function SalesGrid({ change, moviments = [], movToPass = [], report = false }) {
  const { attData, attDataFunc, revenueCats, expenseCats, clients } =
    useContext(SidebarContext);
  const [movs, setMovs] = useState([]);
  const [allMovs, setAllMovs] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [revCats, setRevCats] = useState([]);
  const [expCats, setExpCats] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [exportTest, setExportTest] = useState([]);

  const [addImgBoxVisible, setAddImgBoxVisible] = useState(false);
  const [image, setImage] = useState(false);
  const [fileInfos, setFileInfos] = useState([]);
  const [idMov, setIdMov] = useState(0);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [cliName, setCliName] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  //   console.log("aaa", columns);
  //   console.log(moviments);
  //   console.log(movToPass);

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
  // const columns = [
  //   {
  //     field: "actions",
  //     headerName: "Ações",
  //     type: "actions",
  //     width: 210,
  //     renderCell: (params) => {
  //       return <MovimentsActions {...{ params, rowId, setRowId }} />;
  //     },
  //   },
  //   {
  //     field: "date",
  //     headerName: "Data",
  // flex: 1,
  //     renderCell: (params) => moment(params.row.date).format("DD/MM/YYYY"),
  //   },
  //   {
  //     field: "client",
  //     headerName: "Cliente",
  //     flex: 1,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "typeMov",
  //     headerName: "Tipo de movimento",
  //     flex: 1,
  //   },
  //   {
  //     field: "value",
  //     headerName: "Valor",
  //     type: "number",
  //     headerAlign: "left",
  //     align: "left",
  //     editable: true,
  //   },
  //   {
  //     field: "category",
  //     headerName: "Categoria",
  //     flex: 1,
  //   },

  //   {
  //     field: "description",
  //     headerName: "Descrição",
  //     width: 180,
  //     editable: true,
  //     // flex: 1,
  //   },
  //   {
  //     field: "product",
  //     headerName: "Produto",
  //     flex: 1,
  //   },
  //   // {
  //   //   field: "units",
  //   //   headerName: "Unidades",
  //   //   type: "number",
  //   //   headerAlign: "left",
  //   //   align: "left",
  //   // },

  //   // {
  //   //   field: 'Print',
  //   //   renderCell: (cellValues) => {
  //   //     retun
  //   //   }
  //   // }
  //   // [rowId],
  // ];

  const columns = [
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      width: 200,
      renderCell: (params) => {
        return <SalesActions {...{ params, rowId, setRowId }} />;
      },
    },
    {
      field: "data",
      headerName: "Data",
      // flex: 1,
      renderCell: (params) => moment(params.row.data).format("DD/MM/YYYY"),
      // editable: true,
    },
    {
      field: "preco_total",
      headerName: "valor venda",
      type: "number",
      headerAlign: "center",
      align: "center",
      // editable: true,
      minWidth: 100,
      flex: 1,

      renderCell: (params) => {
        return (
          <div>
            <p>R$ {(+params.row.preco_total).toFixed(2)}</p>
          </div>
        );
      },
    },
    {
      //       produtos
      // produto_id
      field: "produto",
      headerName: "Produto",
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      getOptionValue: (value) => {
        return value.id;
      },
      getOptionLabel: (value) => value.nome,
      valueOptions: [...allProducts],

      // editable: true,
      minWidth: 100,

      flex: 1,
    },
    {
      field: "quantidade",
      headerName: "quantidade",
      type: "number",
      headerAlign: "center",
      align: "center",
      // editable: true,
      minWidth: 100,
      flex: 1,
    },

    {
      field: "cliente_id",
      headerName: "Cliente",
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      getOptionValue: (value) => {
        // console.log("id", value.id);
        return value.id;
      },
      getOptionLabel: (value) => {
        // console.log(value.nome);
        setCliName(value.nome);
        return value.nome;
      },
      valueOptions: [...allClients],

      // editable: true,
      minWidth: 100,

      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            {!!params.row.cliente_id ? (
              <div>{cliName}</div>
            ) : (
              // <div className="bg-red-400 rounded-full p-4"></div>
              <div>balcão</div>
            )}
          </div>
        );
      },
    },
    {
      field: "tipo_pagamento",
      headerName: "Pagamento",
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      getOptionValue: (value) => value.tipo_pagamento,
      getOptionLabel: (value) => value.nome,
      valueOptions: [
        // dinheiro, pix, cartao_debito,

        //                 crediario, cartao_credito e boleto
        {
          tipo_pagamento: "dinheiro",
          nome: "dinheiro",
        },
        {
          tipo_pagamento: "pix",
          nome: "pix",
        },
        {
          tipo_pagamento: "cartao_debito",
          nome: "cartao débito",
        },

        {
          tipo_pagamento: "crediario",
          nome: "crediário",
        },
        {
          tipo_pagamento: "cartao_credito",
          nome: "cartao crédito",
        },
        {
          tipo_pagamento: "boleto",
          nome: "boleto",
        },

        // {
        //   tipo_pagamento: "vista",
        //   nome: "à vista",
        // },
        // {
        //   tipo_pagamento: "prazo",
        //   nome: "à prazo",
        // },
        // {
        //   tipo_pagamento: "vista+prazo",
        //   nome: "à prazo + entrada",
        // },
        // {
        //   tipo_pagamento: "dinheiro",
        //   nome: "dinheiro",
        // },
        // {
        //   tipo_pagamento: "debito",
        //   nome: "débito",
        // },
        // {
        //   tipo_pagamento: "credito",
        //   nome: "crédito",
        // },
        // {
        //   tipo_pagamento: "pix",

        //   nome: "pix",
        // },
        // {
        //   tipo_pagamento: "boleto",

        //   nome: "boleto",
        // },
        // {
        //   tipo_pagamento: "crediario",

        //   nome: "crediário",
        // },
      ],
      minWidth: 100,
      // editable: true,
    },
    {
      field: "entregue",
      headerName: "Entregue",
      headerAlign: "center",
      align: "center",
      type: "singleSelect",
      getOptionValue: (value) => {
        // console.log("-> ->", value);
        return value.trueOrNot;
      },
      getOptionLabel: (value) => {
        // console.log("-> ->", value);
        return value.nome;
      },
      valueOptions: [
        {
          trueOrNot: true,

          nome: "entregue",
        },
        {
          trueOrNot: false,

          nome: "não entregue",
        },
      ],

      // vai ser mais ou menos assim
      // valueOptions: ({ row }) => {
      //   if (row.valor > 20) {
      //     return [...revCats];
      //   } else if (row.valor <= 20) {
      //     return [...expCats];
      //   }
      // },
      // renderCell: renderCellExpand,
      minWidth: 100,

      // editable: true,
      renderCell: (params) => {
        return (
          <div>
            {params.row.entregue ? (
              <div className="bg-green-400 rounded-full p-4"></div>
            ) : (
              // <div className="bg-red-400 rounded-full p-4"></div>
              <div className="bg-red-400 rounded-full p-4"></div>
            )}
          </div>
        );
      },
    },

    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      // valueGetter: ({ row, value }) => {
      //   if (row.typeMov == "receita") {
      //     return +`${value}1`;
      //   } else if (row.typeMov == "despesa") {
      //     return +`${value}2`;
      //   }
      // },
      minWidth: 100,

      flex: 1,
    },
  ];

  const handlePassToXLSX = () => {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(movToPass);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const getMovs = async () => {
    // const response = await movimentsGetFunc({ id: 1 });
    // const responseAllMovs = await getAllMovs();
    const responseCat = await getRevenueCategorys();
    const responseCatEx = await getExpenseCategorys();
    const responseClients = await getClients();
    const responseProducts = await getProducts();
    const responseServices = await getServices();
    // const correctingIdToName = moviments.map((el) => {
    //   //  tem q ver se é despesa ou receita ainda
    //   const catName = responseCat.data.find(
    //     (cat) => cat.categoria_receita_id == el.categoria_receita_id
    //   );

    //   el.categoria_receita_id = catName.nome;
    //   return el;
    // });
    // console.log("export to csv ->", correctingIdToName);
    setRevCats(responseCat.data);
    setExpCats(responseCatEx.data);
    setAllProducts(responseProducts.data);
    setAllServices(responseServices.data);
    setAllClients(responseClients.data);

    // setAllClients(clients);
    // console.log(revCats);
    // console.log(expCats);
    // setMovs(response.moviments);
    // moviments = responseAllMovs.data;
    // setAllMovs(responseAllMovs.data);
    // console.log(movs);
    // console.log(allMovs);
    // console.log("AllMovs -->>>", responseAllMovs.data);
    // console.log(revenueCats);
    // console.log(expenseCats);

    // attDataFunc();
    // if (attData > 3) attDataFunc();
    // console.log(moviments);
    // console.log(movToPass);
    // console.log("exp ->>>>>", exportMovs);
    // console.log(
    //   "movsDatagrid ->",
    //   moviments.map((el) => {
    //     return el;
    //   })
    // );
    // console.log(
    //   "movsDatagrid ->",
    //   movToPass.map((el) => {
    //     return el;
    //   })
    // );

    // if (exportMovs) {
    //   setExportTest(exportMovs);
    // }

    // console.log(
    //   "movsDatagrid ->",
    //   await exportMovs.map((el) => {
    //     return el;
    //   })
    // );
  };

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
          backgroundColor: "#B23F30",
          borderRadius: "0px",
          // borderBottom: "none",
        },
        "& .MuiDataGrid-toolbarContainer ": {
          backgroundColor: "#B23F30",
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
          backgroundColor: "#B23F30",
          color: `#ffffff !important`,
          borderBottomLeftRadius: "9px",
          borderBottomRightRadius: "9px",
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
        "& .MuiDataGrid-virtualScroller ": {
          fontFamily: "Poppins",
          backgroundColor: `#ffffff !important`,
        },
        "& .MuiDataGrid-selectedRowCount ": {
          // opacity: "0",
          display: "none",
        },

        borderRadius: "9px",
        overflow: "hidden",
        backgroundColor: "#B23F30",
      }}
    >
      {/* <DataGrid
        disableSelectionOnClick
        getRowId={(row) =>
          row.date + "-" + row.client + "-" + row.typeMov + "-" + row.category
        }
        rows={movs}
        columns={columns}
        // experimentalFeatures={{ newEditingApi: true }}
        // components={{ toolbar: GridToolbar }}
        // onCellEditCommit={(params) => setRowId(params.id)}
        // onCellEditStart={(params) => setRowId(params.id)}
        onCellEditStop={(params) => setRowId(params.id)}
      /> */}
      <Box
        display="flex"
        // justifyContent="start"
        justifyContent="space-between"
        // borderRadius="2px"
        pt="5px"
        px="20px"
        alignItems="center"
      >
        {report && <p className="text-white">vendas no período</p>}
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

      {/* onClick={handlePassToXLSX} */}
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
        sx={{ pb: "30px", borderBottomLeftRadius: "9px" }}
        disableSelectionOnClick
        getRowId={(row, i) =>
          // row.date +
          // "-" +
          // row.client +
          // "-" +
          // row.typeMov +
          // "-" +
          // row.category +
          // "-" +
          // row.valor +
          // "-" +
          // row.id

          row.typeMov + "-" + row.id
        }
        // rows={movs}
        // moviments[0]
        rows={moviments}
        columns={columns}
        // experimentalFeatures={{ newEditingApi: true }}
        // components={{ toolbar: GridToolbar }}
        // onCellEditCommit={(params) => setRowId(params.id)}
        // onCellEditStart={(params) => setRowId(params.id)}
        getRowClassName={(params) =>
          params.row.cancelado ? "canceled-row" : ""
        }
        onCellEditStop={(params) => setRowId(params.id)}
      ></DataGrid>
    </Box>
  );
}

export default SalesGrid;
