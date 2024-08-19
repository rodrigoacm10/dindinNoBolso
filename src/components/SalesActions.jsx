import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
// import { IoIosSave } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { useContext, useState } from "react";
import {
  deleteMov,
  deleteMovExp,
  deleteSale,
  importFileData,
  updatMov,
} from "../services/APIService";
import { SidebarContext } from "../context/sidebarContext";
import { Link, useNavigate } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";

// console.log

function SalesActions({ params, rowId, setRowId }) {
  const { attData, attDataFunc } = useContext(SidebarContext);

  const {
    salesInfosVisible,
    setSalesInfosVisible,

    valuesProduct,
    setValuesProduct,
    salesInfo,
    setSalesInfo,
    isConcluded,
    setLoading,
    loading,
    setEditEntry,
    setTypeWarning,
    setReceiveVisible,
  } = useContext(SidebarContext);

  // const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  return (
    <Box
      // className="w-full"
      display="flex"
      gap="5px"
    >
      {/* <Button
        sx={{
          backgroundColor: "#7A7A7A",
          color: "#ffffff",
          ":hover": {
            backgroundColor: "#5E5E5E",
            color: "#ffffff",
          },
        }}
        variant="contained"
        onClick={() => {
          updatMov(
            params.row.id,
            params.row.descricao,
            params.row.valor,
            params.row.data,
            params.row.produto_id,
            params.row.category,
            params.row.servico_id,
            params.row.cliente_id,
            params.row.typeMov,
            true
          );

          attDataFunc();
        }}
        disabled={params.row.efetuado == true}
      >
        EFETUAR
      </Button> */}
      <Button
        disabled={params.row.cancelado || loading}
        sx={
          params.row.cancelado
            ? {
                backgroundColor: "#B23F30",
                color: "#ffffff",
                // fontSize: "14px",
                width: "107px",
                ":hover": {
                  backgroundColor: "#8b3226",
                  color: "#ffffff",
                },
                ":disabled": {
                  backgroundColor: params.row.cancelado ? "#8b3226" : "#5E5E5E",
                },
              }
            : {
                backgroundColor: "#7A7A7A",
                width: "107px",

                color: "#ffffff",
                ":hover": {
                  backgroundColor: "#5E5E5E",
                  color: "#ffffff",
                },
              }
        }
        variant="contained"
        onClick={async () => {
          if (!params.row.cancelado) {
            // const response = await deleteSale(params.row.id);
            // console.log(response);

            // attDataFunc();
            console.log("load", loading);
            setEditEntry({
              id: params.row.id,
            });
            setTypeWarning("cancelSale");

            setReceiveVisible(1);
          }
        }}
        // className="w-full"
      >
        {/* isConcluded */}
        {params.row.cancelado && !loading ? "CANCELADO" : ""}
        {!params.row.cancelado && !loading ? "CANCELAR" : ""}

        {loading ? (
          <CircularProgress size="24px" style={{ color: "#ffffff" }} />
        ) : (
          ""
        )}

        {/* CANCELAR */}
        {/* <FaTrashAlt style={{ width: "18px", height: "18px" }} /> */}
      </Button>
      <Button
        disabled={params.row.cancelado}
        sx={
          params.row.cancelado
            ? {
                backgroundColor: "#B23F30",
                color: "#ffffff",
                // fontSize: "14px",

                ":hover": {
                  backgroundColor: "#8b3226",
                  color: "#ffffff",
                },
                ":disabled": {
                  backgroundColor: "#8b3226",
                },
              }
            : {
                backgroundColor: "#7A7A7A",
                color: "#ffffff",
                ":hover": {
                  backgroundColor: "#5E5E5E",
                  color: "#ffffff",
                },
              }
        }
        variant="contained"
        onClick={() => {
          setSalesInfosVisible(1);
          console.log(params.row.id);
          setSalesInfo({
            id: params.row.id,
            date: params.row.data,
            datePay: params.row.data_pagamento,
            observations: params.row.observacao,
            installments: params.row.parcelas,
            totalVal: params.row.preco_total,
            product: params.row.produto,
            formType: params.row.tipo_pagamento,
            entryVal: params.row.valor_entrada,
            installmentsVal: params.row.valor_parcelas,
            client: params.row.cliente_id,
            attachament: params.row.anexo,
            delivered: params.row.entregue,
          });
          //   updatMov(
          //     params.row.id,
          //     params.row.descricao,
          //     params.row.valor,
          //     params.row.data,
          //     params.row.produto_id,
          //     params.row.category,
          //     params.row.servico_id,
          //     params.row.cliente_id,
          //     params.row.typeMov,
          //     params.row.efetuado
          //   );
          //   attDataFunc();
        }}
        // disabled={params.id !== rowId || loading}
      >
        <CiCircleInfo style={{ width: "24px", height: "24px" }} />
      </Button>
    </Box>
  );
}

export default SalesActions;
