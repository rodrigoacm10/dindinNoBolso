import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  getAllMovs,
  getBrand,
  getClients,
  getExpenseCategorys,
  getProducts,
  getRevenueCategorys,
  getServices,
  getSupplier,
  getType,
  movimentsGetFunc,
} from "../services/APIService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MovimentsActions from "./MovimentsActions";
import moment from "moment";
import { SidebarContext } from "../context/sidebarContext";

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
import AddAttachment from "./addAttachment";
import ConfirmToDo from "./confirmToDo";
import ProductsActions from "./ProductsActions";

function ProductsSimpleGrid({ change, moviments = [] }) {
  const { attData, attDataFunc, revenueCats, expenseCats, clients } =
    useContext(SidebarContext);
  const [movs, setMovs] = useState([]);
  const [allMovs, setAllMovs] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [revCats, setRevCats] = useState([]);
  const [expCats, setExpCats] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [exportTest, setExportTest] = useState([]);
  // tipo fornece marca
  const [allTypes, setAllTypes] = useState([]);
  const [allSupplier, setAllSupplier] = useState([]);
  const [allBrand, setAllBrand] = useState([]);

  const [addImgBoxVisible, setAddImgBoxVisible] = useState(false);
  const [image, setImage] = useState(false);
  const [fileInfos, setFileInfos] = useState([]);
  const [idMov, setIdMov] = useState(0);
  const [confirmVisible, setConfirmVisible] = useState(false);

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

  const columns = [
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      width: 150,
      renderCell: (params) => {
        return <ProductsActions {...{ params, rowId, setRowId }} />;
      },
    },
    {
      field: "nome",
      headerName: "nome",

      renderCell: renderCellExpand,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "codigo_referencia",
      headerName: "código",

      renderCell: renderCellExpand,
      // flex: 1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "categoria_produto_id",
      headerAlign: "center",
      align: "center",
      headerName: "Tipo",
      type: "singleSelect",
      getOptionValue: (value) => {
        // console.log(value);
        return value.id;
      },
      getOptionLabel: (value) => value.nome,
      valueOptions: [...allTypes],
      width: 130,
      // editable: true,
    },

    {
      field: "fornecedor_id",
      headerAlign: "center",
      align: "center",
      headerName: "fornecedor",
      type: "singleSelect",
      getOptionValue: (value) => {
        // console.log(value);
        return value.id;
      },
      getOptionLabel: (value) => value.nome_contato,
      valueOptions: [...allSupplier],
      width: 130,
      // editable: true,
    },
    {
      field: "marca_id",
      headerAlign: "center",
      align: "center",
      headerName: "marca",
      type: "singleSelect",
      getOptionValue: (value) => {
        // console.log(value);
        return value.id;
      },
      getOptionLabel: (value) => value.nome,
      valueOptions: [...allBrand],
      width: 130,
      // editable: true,
    },

    {
      field: "id",
      headerAlign: "center",
      align: "center",
      headerName: "ID",
      // valueGetter: ({ row, value }) => {
      //   if (row.typeMov == "receita") {
      //     return +`${value}1`;
      //   } else if (row.typeMov == "despesa") {
      //     return +`${value}2`;
      //   }
      // },
      // flex: 1,
    },
  ];

  const getMovs = async () => {
    const responseCat = await getRevenueCategorys();
    const responseCatEx = await getExpenseCategorys();
    const responseClients = await getClients();
    const responseProducts = await getProducts();
    const responseServices = await getServices();

    const brands = await getBrand();
    const suppliers = await getSupplier();
    const types = await getType();

    setAllBrand([...brands.data]);
    setAllSupplier([...suppliers.data]);
    setAllTypes([...types.data]);

    setRevCats(responseCat.data);
    setExpCats(responseCatEx.data);
    setAllProducts(responseProducts.data);
    setAllServices(responseServices.data);
    setAllClients(responseClients.data);
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
      <DataGrid
        sx={{ borderBottomLeftRadius: "9px" }}
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
        rows={moviments}
        columns={columns}
        onCellEditStop={(params) => setRowId(params.id)}
      ></DataGrid>
    </Box>
  );
}

export default ProductsSimpleGrid;
