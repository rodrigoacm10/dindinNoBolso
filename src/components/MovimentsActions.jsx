import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { IoIosSave } from "react-icons/io";
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

// console.log

function MovimentsActions({ params, rowId, setRowId }) {
  const { attData, attDataFunc } = useContext(SidebarContext);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // const API_URL = "https://recicont-api-tn8k.onrender.com/files/";
  // const API_URL = "https://recicont-api.onrender.com";

  const navigate = useNavigate();

  return (
    <Box display="flex" gap="5px">
      {/* <Tooltip title="">
        // <IconButton onClick={() => console.log("a")}>aaaa</IconButton>
      </Tooltip> */}
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
          // console.log("aa", params.row);

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
        // disabled={params.id !== rowId || loading}
        disabled={params.row.efetuado == true}
      >
        EFETUAR
      </Button>
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
          // console.log("aa", params.row.id);
          // console.log(`${params.row.id}`.split().pop().join(""));
          // deleteMov(params.row.id);
          // console.log(params.row.typeMov);
          if (params.row.typeMov == "receita") {
            deleteMov(params.row.id);
          } else if (params.row.typeMov == "despesa") {
            deleteMovExp(params.row.id);
          }
          attDataFunc();
        }}
      >
        <FaTrashAlt style={{ width: "18px", height: "18px" }} />
      </Button>
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
          // console.log("aa", params.row.id);
          // console.log("aa", params.row);
          // {params.row.servico_id == '' ? }

          // updatMov(
          //   params.row.id,
          //   params.row.descricao,
          //   params.row.valor,
          //   params.row.data,
          //   params.row.produto_id,
          //   params.row.categoria_receita_id,
          //   params.row.servico_id,
          //   params.row.cliente_id
          // );
          // console.log(params.row.typeMov);
          // console.log(
          //   "-->>>>",
          //   params.row.id,
          //   params.row.descricao,
          //   params.row.valor,
          //   params.row.data,
          //   params.row.produto_id,
          //   params.row.category,
          //   params.row.servico_id,
          //   params.row.cliente_id,
          //   params.row.typeMov,
          //   params.row.efetuado
          // );

          // receita
          // despesa

          // console.log(
          //   "--->>>",
          //   +`${123}`
          //     .split("")
          //     .slice(0, `${params.row.id}`.split("").length)
          //     .join(""),
          //   "<<<-----"
          // );
          // console.log(`${params.row.id}`.split("").length);

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
            params.row.efetuado
          );

          attDataFunc();
        }}
        disabled={params.id !== rowId || loading}
      >
        <IoIosSave style={{ width: "18px", height: "18px" }} />
      </Button>
      {/* <Box display="flex" alignItems="center" justifyContent="center">
        <Link
          to={`${API_URL}1a12b449-938c-4eb2-a99a-1e8970da973e_1704226871452.jpeg`}
          target="_blank"
        >
          <GrAttachment style={{ width: "18px", height: "18px" }} />
        </Link>
      </Box> */}

      {/* <Button
        onClick={async (e) => {
          return;
          // const response = await importFileData();
          console.log(response);
        }}
      > */}
      {/* <a
          href="blob:http://localhost:5173/bf9828eb-9ffd-4028-aef1-dcc6d5a349a7"
          target="_blank"
          style={{
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        > */}
      {/* <GrAttachment style={{ width: "18px", height: "18px" }} /> */}
      {/* </a> */}
      {/* </Button> */}

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
        // onClick={() => console.log("aa", params.row)}
        disabled={params.id !== rowId || loading}
      >
        <GrAttachment style={{ width: "18px", height: "18px" }} />
      </Button> */}
    </Box>
  );
}

export default MovimentsActions;
