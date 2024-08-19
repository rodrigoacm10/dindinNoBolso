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
  importFileData,
  updatMov,
} from "../services/APIService";
import { SidebarContext } from "../context/sidebarContext";
import { Link, useNavigate } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";

// console.log

function BuysAction({ params, rowId, setRowId }) {
  const { attData, attDataFunc, valuesBuy, setValuesBuy } =
    useContext(SidebarContext);

  const {
    buysInfosVisible,
    setBuysInfosVisible,
    valuesProduct,
    setValuesProduct,
    setEditEntry,
    setTypeWarning,
    setReceiveVisible,
    isConcluded,
    setIsConcluded,
    loading,
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
        // inverter isso, tirar o !
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
        // sx={{
        //   backgroundColor: "#7A7A7A",
        //   color: "#ffffff",
        //   ":hover": {
        //     backgroundColor: "#5E5E5E",
        //     color: "#ffffff",
        //   },
        // }}
        variant="contained"
        onClick={() => {
          // if (params.row.typeMov == "receita") {
          //   deleteMov(params.row.id);
          // } else if (params.row.typeMov == "despesa") {
          //   deleteMovExp(params.row.id);
          // }

          // if (!params.row.cancelado) {
          setEditEntry({
            id: params.row.id,
          });
          setTypeWarning("cancelStock");

          setReceiveVisible(1);
          // }

          attDataFunc();
        }}
        // className="w-full"
      >
        {params.row.cancelado && !loading ? "CANCELADO" : ""}
        {!params.row.cancelado && !loading ? "CANCELAR" : ""}

        {loading ? (
          <CircularProgress size="24px" style={{ color: "#ffffff" }} />
        ) : (
          ""
        )}
        {/* <FaTrashAlt style={{ width: "18px", height: "18px" }} /> */}
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
        onClick={() => {
          setBuysInfosVisible(1);
          console.log(params.row);
          // setValuesProduct({
          //   name: params.row.name,
          //   value: params.row.value,
          // });
          setValuesBuy({
            attachament: params.row.anexo,
            date: params.row.data,
            totalValue: params.row.preco_total,
            installmentsValue: params.row.valor_parcelas,
            entryValue: params.row.valor_entrada,
            installments: params.row.parcelas,
            productId: params.row.produto_id,
            supplierId: params.row.fornecedor_id
              ? params.row.fornecedor_id
              : "não há",
            formPayment: params.row.tipo_pagamento
              ? params.row.tipo_pagamento
              : "não há",
            id: params.row.id,
            amount: params.row.quantidade,
            observations: params.row.descricao,
            entry: params.row.recebido,
          });
          // asda
          // anexo
          // data
          // preco_total
          // produto_id
          // fornecedor_id
          // formPaymen
          // entrada
          // id

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

export default BuysAction;
