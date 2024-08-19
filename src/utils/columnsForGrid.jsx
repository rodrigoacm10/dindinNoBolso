import { Box, Paper, Popper, Typography } from "@mui/material";
import React from "react";

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

export const suppliersBuysCol = [
  {
    field: "name",
    headerName: "fornecedor",

    // renderCell: renderCellExpand,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: "quantidade",
    type: "number",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "totalValue",
    headerName: "valor total",
    type: "number",
    headerAlign: "center",
    align: "center",
    editable: true,
    renderCell: (params) => {
      return `R$ ${params.row.preco ? params.row.preco : "00.00"}`;
    },
  },
  {
    field: "favProduct",
    headerName: "mais comprou",
    headerAlign: "center",
    align: "center",
    type: "singleSelect",
    // getOptionValue: (value) => {
    //   return value.id;
    // },
    // getOptionLabel: (value) => value.nome,
    // valueOptions: [...clientsArr],

    editable: true,
    minWidth: 100,
  },

  {
    field: "id",
    headerAlign: "center",
    align: "center",
    headerName: "ID",
  },
];

export const productsEntrys = [
  {
    field: "name",
    headerName: "produto",

    renderCell: renderCellExpand,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: "quantidade",
    type: "number",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "totalValue",
    headerName: "valor total",
    type: "number",
    headerAlign: "center",
    align: "center",
    editable: true,
    renderCell: (params) => {
      return `R$ ${params.row.preco ? params.row.preco : "00.00"}`;
    },
  },
  {
    field: "id",
    headerAlign: "center",
    align: "center",
    headerName: "ID",
  },
];

export const brandsEntrys = [
  {
    field: "name",
    headerName: "produto",

    renderCell: renderCellExpand,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: "quantidade",
    type: "number",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "totalValue",
    headerName: "valor total",
    type: "number",
    headerAlign: "center",
    align: "center",
    editable: true,
    renderCell: (params) => {
      return `R$ ${params.row.preco ? params.row.preco : "00.00"}`;
    },
  },
  {
    field: "id",
    headerAlign: "center",
    align: "center",
    headerName: "ID",
  },
];

export const typesEntrys = [
  {
    field: "name",
    headerName: "tipo",

    renderCell: renderCellExpand,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: "quantidade",
    type: "number",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "totalValue",
    headerName: "valor total",
    type: "number",
    headerAlign: "center",
    align: "center",
    editable: true,
    renderCell: (params) => {
      return `R$ ${params.row.preco ? params.row.preco : "00.00"}`;
    },
  },
  {
    field: "id",
    headerAlign: "center",
    align: "center",
    headerName: "ID",
  },
];

export const financeEntry = [
  {
    field: "name",
    headerName: "produto",

    renderCell: renderCellExpand,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: "quantidade",
    type: "number",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "totalValue",
    headerName: "valor total",
    type: "number",
    headerAlign: "center",
    align: "center",
    editable: true,
    renderCell: (params) => {
      return `R$ ${params.row.preco ? params.row.preco : "00.00"}`;
    },
  },
  {
    field: "favProduct",
    headerName: "observação",
    headerAlign: "center",
    align: "center",
    type: "singleSelect",
    editable: true,
    minWidth: 100,
  },
  {
    field: "id",
    headerAlign: "center",
    align: "center",
    headerName: "ID",
  },
];
