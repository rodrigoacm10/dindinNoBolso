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

function MiniMovimentsGrid({
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
  } = useContext(SidebarContext);
  const [movs, setMovs] = useState([]);
  const [allMovs, setAllMovs] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [revCats, setRevCats] = useState([]);
  const [expCats, setExpCats] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [exportTest, setExportTest] = useState([]);

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
      field: "actions",
      headerName: "Ações",
      type: "actions",
      width: 260,
      renderCell: (params) => {
        return <MovimentsActions {...{ params, rowId, setRowId }} />;
      },
    },
    {
      field: "anexo",
      headerName: "Anexo",
      headerAlign: "center",
      align: "center",
      width: 60,
      renderCell: ({ value, row }) => {
        // value = "1a12b449-938c-4eb2-a99a-1e8970da973e_1704226871452.jpeg";
        if (idMov == row.id) {
          // console.log("id certo");
        }

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
            }}
          >
            {value ? (
              <Box display="flex" gap="20px">
                {/* <Link to={`${API_URL}/files/${value}`} target="_blank"> */}
                <button
                  onClick={async () => {
                    const response = await getImg(value);
                    console.log(response);
                    setImgUrl(response);
                    setToImgVisible(1);
                    // return navigate(response);
                    console.log("a");
                    // return redirect("/home");
                  }}
                >
                  <p style={{ color: "black" }}>
                    <GrAttachment style={{ width: "18px", height: "18px" }} />
                  </p>
                </button>
                {/* </Link> */}
              </Box>
            ) : (
              <p style={{ color: "rgba(224, 224, 224, 1)" }}>
                <GrAttachment style={{ width: "18px", height: "18px" }} />
              </p>
            )}
          </Box>
        );
      },
    },
    {
      field: "typeMov",
      headerName: "Tipo",
      // width: 130,
      // editable: true,
      renderCell: renderCellExpand,
      // flex: 1,
    },
    {
      field: "data",
      headerName: "Data",
      // flex: 1,
      renderCell: (params) => moment(params.row.data).format("DD/MM/YYYY"),
      editable: true,
    },
    {
      field: "cliente_id",
      headerName: "Cliente",
      type: "singleSelect",
      getOptionValue: (value) => value.id,
      getOptionLabel: (value) => value.nome,
      valueOptions: [...clientsArr],

      editable: true,

      // flex: 1,
    },

    {
      field: "valor",
      headerName: "Valor",
      type: "number",
      headerAlign: "left",
      align: "left",
      editable: true,
      renderCell: (params) => {
        return (
          <div>
            <p>R$ {(+params.row.valor).toFixed(2)}</p>
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Categoria",
      type: "singleSelect",
      getOptionValue: (value) => {
        if (value.categoria_receita_id) {
          return value.categoria_receita_id;
        } else if (value.categoria_despesa_id) {
          return value.categoria_despesa_id;
        }
      },
      getOptionLabel: (value) => value.nome,
      valueOptions: ({ row }) =>
        row.typeMov == "receita" ? [...catsRevArr] : [...catsExpArr],
      width: 130,
      editable: true,
    },

    {
      field: "descricao",
      headerName: "Descrição",
      width: 130,
      editable: true,
      renderCell: renderCellExpand,
      // flex: 1,
    },
    {
      field: "produto_id",
      headerName: "Produto",
      type: "singleSelect",
      getOptionValue: (value) => value.id,
      getOptionLabel: (value) => value.nome,
      valueOptions: [...productsArr],

      editable: true,

      // flex: 1,
    },
    {
      field: "servico_id",
      headerName: "Serviço",
      type: "singleSelect",
      getOptionValue: (value) => value.id,
      getOptionLabel: (value) => value.nome,
      valueOptions: [...servicesArr],

      editable: true,

      // flex: 1,
    },
    // {
    //   field: "produto",
    //   headerName: "Produto",
    // flex: 1,
    //   renderCell: renderCellExpand,
    // },
    {
      field: "efetuado",
      headerName: "EFETUADO",
      type: "singleSelect",
      getOptionValue: (value) => value.trueOrNot,
      getOptionLabel: (value) => value.nome,
      valueOptions: [
        {
          trueOrNot: true,
          // trueOrNot: "sim",

          nome: "EFETUADO",
        },
        {
          trueOrNot: false,
          // trueOrNot: "nao",

          nome: "NÃO EFETUADO",
        },
      ],

      editable: true,

      // flex: 1,
    },

    {
      field: "id",
      headerName: "ID",
      valueGetter: ({ row, value }) => {
        if (row.typeMov == "receita") {
          return +`${value}1`;
        } else if (row.typeMov == "despesa") {
          return +`${value}2`;
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
        getRowId={(row, i) => row.typeMov + "-" + row.id}
        rows={moviments}
        columns={columns}
        onCellEditStop={(params) => setRowId(params.id)}
      ></DataGrid>
    </Box>
  );
}

export default MiniMovimentsGrid;
