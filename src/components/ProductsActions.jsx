import { Box, Button, IconButton, Tooltip } from "@mui/material";
// import { IoIosSave } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { useContext, useState } from "react";
import {
  deleteFullProduct,
  deleteMov,
  deleteMovExp,
  getOneFullProduct,
  importFileData,
  updatMov,
} from "../services/APIService";
import { SidebarContext } from "../context/sidebarContext";
import { Link, useNavigate } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";

// console.log

function ProductsActions({ params, rowId, setRowId }) {
  const { attData, attDataFunc } = useContext(SidebarContext);

  const {
    productsInfosVisible,
    setProductsInfosVisible,
    valuesProduct,
    setValuesProduct,
  } = useContext(SidebarContext);

  const [loading, setLoading] = useState(false);
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
          const deleteProd = deleteFullProduct(params.row.id);
          console.log(deleteProd);
          attDataFunc();
        }}
        // className="w-full"
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
          // vou ter q fzr a requisição aki go getFullOneProduc(param.row.id)
          // e dps passar as infos no values product
          //       nome: "test",
          // codigo_referencia: "",
          // estoque_atual: 0,
          // estoque_minimo: 0,
          // estoque_maximo: 0,
          // preco: "",
          // observacao: "",
          // fornecedor_id: "",
          // marca_id: "",
          // categoria_produto_id: "",
          const infos = await getOneFullProduct(params.row.id);

          console.log(infos.data);

          setProductsInfosVisible(1);
          console.log(params.row);
          setValuesProduct({
            id: params.row.id,
            brandId: params.row.marca_id,
            supplierId: params.row.fornecedor_id,
            typeId: params.row.categoria_produto_id,
            name: params.row.name,
            value: params.row.value,
            values: infos.data,
            costVal: params.row.valor_custo,
            margin: params.row.margem_lucro,
          });
          attDataFunc();
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

export default ProductsActions;
