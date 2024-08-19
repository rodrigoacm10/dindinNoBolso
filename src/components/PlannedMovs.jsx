import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { Formik } from "formik";
import * as yup from "yup";
import MovimentsGrid from "./MovimentsGrid";
import { useContext, useEffect, useState } from "react";
import {
  getClients,
  getExpenseCategorys,
  getPendingMovs,
  getProducts,
  getRevenueCategorys,
  getServices,
} from "../services/APIService";
import { SidebarContext } from "../context/sidebarContext";

// console.log

function PlannedMovs({ hidden, setHidden }) {
  const {
    attData,
    catsRevArr,
    setCatsRev,
    catsExpArr,
    setCatsExpArr,
    clientsArr,
    setClientsArr,
    productsArr,
    setProductsArr,
    servicesArr,
    setServicesArr,
  } = useContext(SidebarContext);
  const [movsInfo, setMovsInfo] = useState([]);
  const [passMovs, setPassMovs] = useState([]);
  const [haveMovs, setHaveMovs] = useState(false);

  let plannedWid = "1000px";
  let plannedHei = "500px";

  const tabletScreen = useMediaQuery("(max-width:1200px)");
  const littleScreen = useMediaQuery("(max-width:900px)");
  const littleLittleScreen = useMediaQuery("(max-width:700px)");

  const bb = false;

  if (!tabletScreen) {
    plannedWid = "1000px";
    plannedHei = "500px";

    // return "slapx";
  } else if (tabletScreen && !littleScreen) {
    plannedWid = "750px";
    plannedHei = "350px";
  } else if (littleScreen && !littleLittleScreen) {
    plannedWid = "550px";
    plannedHei = "300px";
  } else if (littleLittleScreen) {
    plannedWid = "350px";
    plannedHei = "275px";
  }
  // const responsiveFunc = () => {

  // };

  const getInitVals = async () => {
    const clis = await getClients();
    const prod = await getProducts();
    const serv = await getServices();
    const catRev = await getRevenueCategorys();
    const catExp = await getExpenseCategorys();

    setClientsArr([...clis.data]);
    setProductsArr([...prod.data]);
    setServicesArr([...serv.data]);
    setCatsRev([...catRev.data]);
    setCatsExpArr([...catExp.data]);
  };

  const getMovs = async () => {
    const res = await getPendingMovs();

    console.log(res);

    const allMovsWithCategorys = res.data.map((el) => {
      if (el.categoria_receita_id) {
        el.category = el.categoria_receita_id;
      } else if (el.categoria_despesa_id) {
        el.category = el.categoria_despesa_id;
      }
      return el;
    });

    allMovsWithCategorys.sort((a, b) => {
      const aData = new Date(a.createdAt).getTime();
      const bData = new Date(b.createdAt).getTime();

      return bData - aData;
    });

    // const correctingIdToName = res.data.map((el) => {
    //   //  tem q ver se é despesa ou receita ainda
    //   const newEl = Object.assign({}, el);

    //   let catName;
    //   if (newEl.typeMov == "receita") {
    //     catName = responseCat.data.find(
    //       (cat) => cat.categoria_receita_id == newEl.category
    //     );
    //   } else if (newEl.typeMov == "despesa") {
    //     catName = responseCatEx.data.find(
    //       (cat) => cat.categoria_despesa_id == newEl.category
    //     );
    //   }

    //   const clientName = responseClients.data.find((cli) => {
    //     newEl.Cliente = "-";
    //     const client = cli.id == newEl.cliente_id;
    //     if (client) {
    //       newEl.Cliente = cli.nome;

    //       return cli.nome;
    //     }
    //     return client;
    //   });

    //   const productName = responseProducts.data.find((prod) => {
    //     newEl.Produto = "-";
    //     const product = prod.id == newEl.produto_id;
    //     if (product) {
    //       newEl.Produto = prod.nome;

    //       return prod.nome;
    //     }
    //     return product;
    //   });

    //   const serviceName = responseServices.data.find((serv) => {
    //     newEl.Servico = "-";
    //     const service = serv.id == newEl.servico_id;
    //     if (service) {
    //       newEl.Servico = serv.nome;

    //       return serv.nome;
    //     }
    //     return service;
    //   });

    //   const dateArr = newEl.data.split("-");
    //   const corDate = [dateArr[2], "/", dateArr[1], "/", dateArr[0]].join("");

    //   console.log("clientName", clientName);
    //   console.log("productName", productName);
    //   console.log("serviceName", serviceName);
    //   console.log(corDate);

    //   newEl.Categoria = catName.nome;
    //   newEl.Data = corDate;
    //   newEl.Efetuado = newEl.efetuado == true ? "EFETUADO" : "NÂO EFETUADO";
    //   newEl.Tipo = newEl.typeMov;
    //   // newEl.cliente = clientName.nome;
    //   return {
    //     tipo: newEl.Tipo,
    //     data: newEl.Data,
    //     cliente: newEl.Cliente,
    //     valor: newEl.valor,
    //     categoria: newEl.Categoria,
    //     descricao: newEl.descricao,
    //     produto: newEl.Produto,
    //     servico: newEl.Servico,
    //     efetuado: newEl.Efetuado,
    //     id: newEl.id,
    //   };
    // });

    // console.log("pandign moviments->", res);

    setMovsInfo(allMovsWithCategorys);

    if (res.data.length >= 1) {
      setHaveMovs(true);
    } else if (res.data.length == 0) {
      setHaveMovs(false);
    }

    // console.log("corplanned ----------->", correctingIdToName);

    // setPassMovs(correctingIdToName);
  };

  useEffect(() => {
    getMovs();
    getInitVals();
  }, []);

  useEffect(() => {
    getMovs();
  }, [attData]);

  return (
    <Box
      top="0"
      left="0"
      position="fixed"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      width="100%"
      zIndex="100"
      transition="all 0.5s"
      sx={{
        // display: `${}`,
        // display: `hidden`,
        visibility: `${hidden == 0 || haveMovs == false ? "hidden" : "none"}`,

        // visibility: `${hidden == 0 ? "hidden" : "none"}`,
      }}
      //   className={`${hidden == 0 ? "" : "animationOpacity"}`}
    >
      <Box
        className="centralized"
        transition="all 0.5s"
        backgroundColor="#7A7A7A"
        borderRadius="9px"
        zIndex="101"
        p="10px 10px"
      >
        <Box display="flex" alignItems="center" justifyContent="end">
          <Button
            sx={{ color: "black" }}
            onClick={(e) => {
              // console.log(e.target.style.color);
              setHidden(0);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box textAlign="center" p="40px">
          <h1 className="text-3xl font-bold">Se lembra </h1>
          <h1 className="text-3xl font-bold">destes movimentos? </h1>
          <Typography textAlign="center" pt="15px" fontFamily="Poppins">
            {" "}
            marque como pago/recebido os movimentos já efetuados
          </Typography>
          <Box>
            <Box
              sx={{
                maxWidth: `${plannedWid}  `,

                // maxWidth: `${tabletScreen ? "750px" : "1000px"}  `,
                height: `${plannedHei}  `,
                pt: "20px",
              }}
            >
              {/* {hidden == 1 && ( */}
              <MovimentsGrid moviments={movsInfo} movToPass={passMovs} />
              {/* )} */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PlannedMovs;
