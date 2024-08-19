import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  addMovimentPostFunc,
  createMoviment,
  expenseMonthFunc,
  exportFileData,
  getAllLiteralMovs,
  getAllMovs,
  getClients,
  getExpenseCategorys,
  getMovs,
  getProducts,
  getRevenueCategorys,
  getServices,
  getUserInfos,
  getUserInfosFunc,
  liquidRecipeMonth,
  totalRecipeMonth,
  valuesAccount,
  valuesMonths,
} from "../../services/APIService";
import MovimentsGrid from "../../components/MovimentsGrid";
import ClientsGrid from "../../components/ClientsGrid";
import ProductsGrid from "../../components/Products";
// import ShowValues from "../../components/showValues";
import "../../index.css";
import { useLocation, useSearchParams } from "react-router-dom";
import { TokenContext } from "../../context/tokenContext";
import { SidebarContext } from "../../context/sidebarContext";
import AddAttachment from "../../components/addAttachment";
import PlannedMovs from "../../components/PlannedMovs";
import ConfirmToDo from "../../components/confirmToDo";
import WarningPopUp from "../../components/WarningPopUp";
import ShowValues from "../../components/ShowValues";
// import ShowValues from "../../components/ShowValues";
// import ShowValues from "../../components/showValues";

// service
function Dashboard() {
  const {
    toggleOpenPopUp,
    openPopUp,
    attData,
    attDataFunc,
    attAllCats,
    passClients,
    clients,
    movs,
    setMovs,
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

  const [loading, setLoading] = useState(false);

  const [companyRevenue, setCompanyRevenue] = useState(0);
  const [liquidMonth, setliquidMonth] = useState(0);
  const [totalMonth, settotalMonth] = useState(0);
  const [expenseMonth, setexpenseMonth] = useState(0);

  const [netRevenue, setNetRevenue] = useState(0);
  const [grossRevenue, setGrossRevenue] = useState(0);
  const [monthExpense, setmonthExpense] = useState(0);

  const [typeDate, setTypeDate] = useState("today");
  const [revenueType, setRevenueType] = useState("product");
  const [clientType, setClientType] = useState("have");
  const [valueDate, setValueDate] = useState("");
  const [moreInfo, setMoreInfo] = useState(true);
  const [updatindElements, setUpdatindElements] = useState(1);
  const [userInfos, setUserInfos] = useState(0);
  const [userObj, setUserObj] = useState({});
  const { tokenUser, setTokenFunc } = useContext(TokenContext);
  const [categorysRev, setCategorysRev] = useState([]);
  const [categorysExp, setCategorysExp] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [hidden, setHidden] = useState(1);
  const [allMovs, setAllMovs] = useState([]);
  const [producstAndServices, setProducstAndServices] = useState([]);
  // const [exportMovs, setExportMovs] = useState([]);
  const [movsToPass, setMovsToPass] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const [attTest, setAttTest] = useState(0);

  const [addImgBoxVisible, setAddImgBoxVisible] = useState(false);
  const [image, setImage] = useState(false);

  const scheduleDate = new Date(new Date().getTime() + 86400000)
    .toISOString()
    .split("T")[0];
  console.log("scheduleDate", scheduleDate);

  const happeDate = new Date(new Date().getTime() - 86400000)
    .toISOString()
    .split("T")[0];
  console.log("happenDate", happeDate);

  const isMediumScreen = useMediaQuery("(max-width:1400px)");

  const isMediumMediumScreen = useMediaQuery("(max-width:1100px)");

  const isMediumLittleScreen = useMediaQuery("(max-width:850px)");

  const isLittleScreen = useMediaQuery("(max-width:700px)");

  const isMobileScreen = useMediaQuery("(max-width:550px)");

  const isMobileLittleScreen = useMediaQuery("(max-width:475px)");

  const location = useLocation();

  let token;

  const getInfos = async () => {
    // pode remover esse response de baixo
    // const response = await getMovs();
    setLoading(true);

    const responseCat = await getRevenueCategorys();
    const responseCatEx = await getExpenseCategorys();
    // pode remover esse response de baixo
    // const responseAllMovs = await getAllMovs();
    const responseClients = await getClients();
    const responseProducts = await getProducts();
    const responseServices = await getServices();
    const responseUserInfos = await getUserInfosFunc();
    const responseLiteralAllMovs = await getAllLiteralMovs();
    const responseValuesAcc = await valuesAccount();
    const responseValuesLiquidMonthAcc = await liquidRecipeMonth();
    const responseValuesMonthMonthAcc = await totalRecipeMonth();
    const responseValuesExpenseMonthAcc = await expenseMonthFunc();

    // const aaaaaaaa = await valuesMonths();
    // console.log("->> Month", aaaaaaaa);

    console.log("----->>>>>>", responseLiteralAllMovs);

    const allMovsWithCategorys = responseLiteralAllMovs?.data?.map((el) => {
      if (el.categoria_receita_id) {
        el.category = el.categoria_receita_id;
      } else if (el.categoria_despesa_id) {
        el.category = el.categoria_despesa_id;
      }
      return el;
    });

    console.log("----->>>>>>", allMovsWithCategorys);

    allMovsWithCategorys?.sort((a, b) => {
      const aData = new Date(a.createdAt).getTime();
      const bData = new Date(b.createdAt).getTime();

      return bData - aData;
    });

    console.log("----->>>>>>", allMovsWithCategorys);

    const correctingIdToName = allMovsWithCategorys?.map((el) => {
      //  tem q ver se é despesa ou receita ainda
      const newEl = Object.assign({}, el);

      let catName;
      if (newEl.typeMov == "receita") {
        catName = responseCat?.data.find(
          (cat) => cat.categoria_receita_id == newEl.category
        );
      } else if (newEl.typeMov == "despesa") {
        catName = responseCatEx.data.find(
          (cat) => cat.categoria_despesa_id == newEl.category
        );
      }

      const clientName = responseClients?.data?.find((cli) => {
        newEl.Cliente = "-";
        const client = cli.id == newEl.cliente_id;
        if (client) {
          newEl.Cliente = cli.nome;

          return cli.nome;
        }
        return client;
      });

      const productName = responseProducts?.data?.find((prod) => {
        newEl.Produto = "-";
        const product = prod.id == newEl.produto_id;
        if (product) {
          newEl.Produto = prod.nome;

          return prod.nome;
        }
        return product;
      });

      const serviceName = responseServices?.data?.find((serv) => {
        newEl.Servico = "-";
        const service = serv.id == newEl.servico_id;
        if (service) {
          newEl.Servico = serv.nome;

          return serv.nome;
        }
        return service;
      });

      const dateArr = newEl.data.split("-");
      const corDate = [dateArr[2], "/", dateArr[1], "/", dateArr[0]].join("");

      // console.log("clientName", clientName);
      // console.log("productName", productName);
      // console.log("serviceName", serviceName);
      // console.log(corDate);

      newEl.Categoria = catName?.nome;
      newEl.Data = corDate;
      newEl.Efetuado = newEl.efetuado == true ? "EFETUADO" : "NÂO EFETUADO";
      newEl.Tipo = newEl.typeMov;
      // newEl.cliente = clientName.nome;
      return {
        tipo: newEl.Tipo,
        data: newEl.Data,
        cliente: newEl.Cliente,
        valor: newEl.valor,
        categoria: newEl.Categoria,
        descricao: newEl.descricao,
        produto: newEl.Produto,
        servico: newEl.Servico,
        efetuado: newEl.Efetuado,
        id: newEl.id,
      };
    });
    console.log("---->", [...responseProducts.data, ...responseServices.data]);

    const prodDif = [...responseProducts.data].map((el) => {
      const newEl = Object.assign({}, el);

      return {
        id: newEl.id,
        name: newEl.nome,
        type: "product",
      };
    });

    const serviceDif = [...responseServices.data].map((el) => {
      const newEl = Object.assign({}, el);

      return {
        id: newEl.id,
        name: newEl.nome,
        type: "service",
      };
    });

    const prodAndService = [...prodDif, ...serviceDif];

    setProducstAndServices(prodAndService);

    console.log(prodDif);
    console.log(serviceDif);
    console.log(prodAndService);

    // const prodAndService = [
    //   ...responseProducts.data,
    //   ...responseServices.data,
    // ].map((el) => {
    //   const newEl = Object.assign({}, el);
    // });

    // const sla = correctingIdToName;
    // console.log("ssssslaaaaaa ->", sla);
    console.log("values ACC ->", responseValuesAcc.data);
    console.log(
      "datas",
      responseValuesAcc?.data?.resultado,
      responseValuesLiquidMonthAcc,
      responseValuesMonthMonthAcc,
      responseValuesExpenseMonthAcc
    );
    setCompanyRevenue(
      responseValuesAcc?.data?.resultado
        ? responseValuesAcc?.data?.resultado
        : 0
    );
    setliquidMonth(
      responseValuesLiquidMonthAcc ? responseValuesLiquidMonthAcc : 0
    );
    settotalMonth(
      responseValuesMonthMonthAcc ? responseValuesMonthMonthAcc : 0
    );
    setexpenseMonth(
      responseValuesExpenseMonthAcc ? responseValuesExpenseMonthAcc : 0
    );

    passClients(responseClients.data);
    console.log("clientesContext ->>>", clients);
    setCategorysRev(responseCat.data);
    setCategorysExp(responseCatEx.data);
    setAllProducts(responseProducts.data);
    setAllServices(responseServices.data);
    setAllClients(responseClients.data);

    setCatsRev(responseCat.data);
    setCatsExpArr(responseCatEx.data);
    setClientsArr(responseClients.data);
    setProductsArr(responseProducts.data);
    setServicesArr(responseServices.data);
    // setAllMovs(responseAllMovs.data);
    // console.log("->", responseAllMovs.data, "<-");
    console.log("->", allMovsWithCategorys, "<-");
    // console.log(
    //   "->",
    //   allMovsWithCategorys.sort((a, b) => {
    //     const aData = new Date(a.createdAt).getTime();
    //     const bData = new Date(b.createdAt).getTime();

    //     return bData - aData;
    //   }),
    //   "<-"
    // );

    // console.log("export to csv ->", correctingIdToName);
    // setAllMovs(responseLiteralAllMovs.data);
    // setAllMovs(allMovsWithCategorys);

    // setAllMovs(
    //   allMovsWithCategorys.sort((a, b) => {
    //     const aData = new Date(a.createdAt).getTime();
    //     const bData = new Date(b.createdAt).getTime();

    //     return bData - aData;
    //   })
    // );
    setLoading(false);
    setMovs(
      allMovsWithCategorys.sort((a, b) => {
        const aData = new Date(a.createdAt).getTime();
        const bData = new Date(b.createdAt).getTime();

        return bData - aData;
      })
    );
    setMovsToPass(correctingIdToName);
    // setExportMovsTest(sla);
    // console.log("aaa->>", responseAllMovs);
    console.log(attData);
    attAllCats(responseCat.data, responseCatEx.data);
    console.log(
      "prod ser cli -> ",
      responseClients.data,
      responseProducts.data,
      responseServices.data
    );
    // console.log("->> ", response, responseCat.data, responseCatEx.data);
    console.log("->", responseUserInfos.data, "<-");
    console.log("->>>>>>>", allMovsWithCategorys);
    // setLoading(false);
  };

  useEffect(() => {
    console.log(attData);
    console.log("aaaaaaaa");
    getInfos();
  }, [attData]);

  useEffect(() => {
    console.log(location.pathname.split("/")[1]);
    console.log("media screen:", isMediumScreen);
    console.log("->", tokenUser);
    setUserInfos(+location.pathname.split("/")[1]);
    let localToken = localStorage.getItem("@Auth:token");
    token = JSON.parse(localToken);
    console.log(token);
    getInfos();
    console.log(
      "---------------------",
      new Date().toISOString().split("T")[0]
    );
    setAttTest(attTest + 1);
  }, []);

  // useEffect(() => {
  //   setCatsRev(categorysRev);
  //   setCatsExpArr(categorysExp);
  //   setClientsArr([...allClients]);
  //   setProductsArr(allProducts);
  //   setServicesArr(allServices);
  // }, [attTest]);

  // useEffect(() => {
  //   setCatsRev(categorysRev);
  //   setCatsExpArr(categorysExp);
  //   setClientsArr([...allClients]);
  //   setProductsArr(allProducts);
  //   setServicesArr(allServices);
  // }, [attData]);

  const aa = true;
  const bb = false;

  const gridTemplateColumnsResponse = () => {
    if (!isMediumLittleScreen && !isMobileScreen && !isMobileLittleScreen) {
      return {
        gridTemplateColumns: "repeat(5, 1fr)",
      };
    } else if (
      isMediumLittleScreen &&
      !isMobileScreen &&
      !isMobileLittleScreen
    ) {
      return {
        gridTemplateColumns: "repeat(3, 1fr)",
      };
    } else if (isMobileScreen && !isMobileLittleScreen) {
      return {
        // justifyContent: "center",
        // alignItems: "center",
        gridTemplateColumns: "repeat(2, 1fr)",
      };
    } else if (isMobileLittleScreen) {
      return {
        // justifyContent: "center",
        // alignItems: "center",
        paddingLeft: "20px",
        gridTemplateColumns: "repeat(1, 300px)",
      };
    }
  };

  const valuesResponse = () => {
    if (!isLittleScreen) {
      return {
        gridColumn: "span 3",
      };
    } else if (isLittleScreen) {
      return {
        // gridRow: "span 2",
        gridColumn: "span 6",
      };
    }
  };

  const addMovRespons = () => {
    if (isMediumScreen) {
      return {
        // gridRow: "span 2",

        gridColumn: "span 12",
      };
    }
  };

  const movsRespons = () => {
    if (isMediumScreen && isMediumLittleScreen == false) {
      return {
        gridColumn: "span 12",
        // gridRow: "span 2",
        gridRow: `${moreInfo === true ? "4 / 7" : "3 / 6"}`,
        // gridRow: `${moreInfo === true ? "5 / 8" : "3 / 6"}`,
      };
    } else if (isMediumLittleScreen && !isLittleScreen) {
      return {
        gridColumn: "span 12",
        // gridRow: "span 2",
        // gridRow: `${moreInfo === true ? "4 / 7" : "3 / 6"}`,
        gridRow: `${moreInfo === true ? "5 / 8" : "3 / 6"}`,
      };
    } else if (isMediumLittleScreen) {
      return {
        gridColumn: "span 12",
        // gridRow: "span 2",
        // gridRow: `${moreInfo === true ? "4 / 7" : "3 / 6"}`,
        gridRow: `${moreInfo === true ? "6 / 9" : "3 / 6"}`,
      };
    }
    // else if (isMediumLittleScreen) {
    //   return {
    //     gridColumn: "span 12",

    //     gridRow: `${moreInfo === true ? "6 / 9" : "3 / 6"}`,
    //   };
    // }
  };

  const clientRespons = () => {
    if (isMediumScreen && isMediumLittleScreen == false) {
      return {
        gridRow: "7 / 9",
        // gridRow: "8 / 10",
        gridColumn: "span 6",
      };
    } else if (isMediumLittleScreen && !isLittleScreen) {
      return {
        gridRow: "8 / 10",
        gridColumn: "span 6",
      };
    } else if (isMediumLittleScreen && !isLittleScreen) {
      return {
        gridRow: "9 / 11",
        gridColumn: "span 6",
      };
    } else if (isLittleScreen) {
      return {
        gridRow: "9 / 11",

        gridColumn: "span 12",
      };
    }
  };

  const productRespons = () => {
    if (isMediumScreen && isMediumLittleScreen == false) {
      return {
        gridRow: "7 / 9",
        // gridRow: "8 / 10",
        gridColumn: "span 6",
      };
    }
    // else if (isLittleScreen) {
    //   return {
    //     gridRow: "8 / 10",
    //     gridColumn: "span 6",
    //   };
    // }
    else if (isMediumLittleScreen && !isLittleScreen) {
      return {
        gridRow: "8 / 10",
        gridColumn: "span 6",
      };
    } else if (isMediumLittleScreen && !isLittleScreen) {
      return {
        gridRow: "9 / 11",
        gridColumn: "span 6",
      };
    } else if (isLittleScreen) {
      return {
        gridRow: " 11 / 13",
        gridColumn: "span 12",
      };
    }
  };

  const testService = ["-", "aaaa"];

  const testClient = [
    "-",
    "redimi brunho",
    "ayrton senna",
    "wagner love",
    "neymar Jr",
  ];

  const testProd = ["-", "boné", "sapato all stars", "tag t-shirt insider"];

  const typeMovOpt = [
    {
      optionValue: "revenue",
      optionText: "receita",
    },
    {
      optionValue: "expense",
      optionText: "despesa",
    },
  ];

  const checkoutSchema = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    value: yup
      .string()
      .required("preencha valor")
      .matches(/^\d+(\.\d{2})?$/, "Este valor não é válido")
      .min(0, "Valor deve ser maior ou igual a 0"),
    date: yup.string().required("required"),
    units: yup
      .string()
      .matches(/^\d+(\.\d{2})?$/, "Valor deve ser um número decimal válido")
      .min(0, "Valor deve ser maior ou igual a 0"),
    typeMov: yup.string().required("required"),
    product: yup.string(),
    service: yup.string(),
    category: yup.string().required("required"),
  });

  const checkoutSchemaScheduleDate = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    value: yup
      .string()
      .required("preencha valor")
      .matches(/^\d+(\.\d{2})?$/, "Este valor não é válido")
      .min(0, "Valor deve ser maior ou igual a 0"),
    date: yup
      .date()
      .min(`${scheduleDate}`, "data inválida tem q ser maior")
      .required("required"),
    units: yup
      .string()
      .matches(/^\d+(\.\d{2})?$/, "Valor deve ser um número decimal válido")
      .min(0, "Valor deve ser maior ou igual a 0"),
    typeMov: yup.string().required("required"),
    product: yup.string(),
    service: yup.string(),
    category: yup.string().required("required"),
  });

  const checkoutSchemaHappenDate = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    value: yup
      .string()
      .required("preencha valor")
      .matches(/^\d+(\.\d{2})?$/, "Este valor não é válido")
      .min(0, "Valor deve ser maior ou igual a 0"),
    date: yup
      .date()
      .max(happeDate, "data inválida tem q ser menor")
      .required("required"),
    units: yup
      .string()
      .matches(/^\d+(\.\d{2})?$/, "Valor deve ser um número decimal válido")
      .min(0, "Valor deve ser maior ou igual a 0"),
    typeMov: yup.string().required("required"),
    product: yup.string(),
    service: yup.string(),
    category: yup.string().required("required"),
  });

  const validate = (
    values,
    props /* only available when using withFormik */
  ) => {
    const errors = {};

    if (
      values.date == `${new Date().toISOString().split("T")[0]}` &&
      typeDate != "today"
    ) {
      errors.date = "data inválida";
    }

    return errors;
  };

  const initialValues = {
    name: "",
    description: "",
    value: "",
    date:
      typeDate === "today" ? `${new Date().toISOString().split("T")[0]}` : "",

    client: "",
    category: "",
    typeMov: "revenue",
    product: "",
    units: 0,
    service: "",
  };

  useEffect(() => {
    if (typeDate === "today") {
      setValueDate(`${new Date().toISOString().split("T")[0]}`);
    } else if (typeDate === "happened" || typeDate === "schedule") {
      setValueDate("");
    }
  }, [typeDate]);

  const undefinedConversor = (value) => {
    if (value == "") {
      return "-";
    } else if (value != "" || value == 0) {
      return value;
    }
  };
  // attDataFunc
  const addMovSubmit = async (values) => {
    setLoading(true);
    let {
      category,
      client,
      date,
      description,
      name,
      product,
      typeMov,
      units,
      value,
      service,
    } = values;
    category = undefinedConversor(category);
    client = undefinedConversor(client);
    description = undefinedConversor(description);
    name = undefinedConversor(name);
    product = undefinedConversor(product);
    units = undefinedConversor(+units);

    const magicIdNumber = 1;

    const id = magicIdNumber;

    console.log("a");
    console.log(values);
    console.log(
      "values:",
      category,
      client,
      date,
      description,
      name,
      product,
      typeMov,
      units,
      value
    );

    // image

    // const response = await addMovimentPostFunc({
    //   id,
    //   category,
    //   client,
    //   date,
    //   description,
    //   name,
    //   product,
    //   typeMov,
    //   units,
    //   value,
    // });

    // const responseNewMov = await createMoviment(
    //   typeMov,
    //   "testName",
    //   description,
    //   value,
    //   date,
    //   product,
    //   category
    // );

    // image

    // fileInfos

    const formData = new FormData();
    formData.append("file", image);

    const reponseFile = await exportFileData(formData);
    console.log(reponseFile);
    console.log(reponseFile.file);

    console.log("fileee --->", formData);
    console.log([...formData]);

    const responseNewMov = await createMoviment(
      revenueType,
      typeMov,
      "testName",
      description,
      value,
      date,
      product,
      category,
      service,
      client,
      // fileInfos
      reponseFile.file
    );
    // setLoading(false);

    console.log("-->>>", responseNewMov);
    setUpdatindElements(() => updatindElements + 1);
    setImage(false);
    attDataFunc();
  };

  const moreOrLessInfo = (e) => {
    e.preventDefault();
    setMoreInfo(!moreInfo);
    console.log(moreInfo);
  };

  const getCheckout = (type) => {
    console.log("----", type, "-----");
    if (type == "today") {
      return checkoutSchema;
    } else if (type == "happened") {
      return checkoutSchemaHappenDate;
    } else if (type == "schedule") {
      return checkoutSchemaScheduleDate;
    }
  };

  return (
    <Box
      className="animationStartRight test"
      height="100%"
      // className="test"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="150px"
      gap="20px"
      p="20px"
      // bgcolor="#E3E3E3"
    >
      {/* <PlannedMovs hidden={hidden} setHidden={setHidden} /> */}

      <Box
        backgroundColor="#FFFFFF"
        // color="white"
        border="1px solid #C8C8C8"
        borderRadius="9px"
        // gridColumn="span 3"
        sx={valuesResponse}
      >
        <ShowValues
          title="Receita acumulada"
          value={companyRevenue}
          type="all"
        />
      </Box>
      <Box
        // backgroundColor="black"
        backgroundColor="#FFFFFF"
        border="1px solid #C8C8C8"
        borderRadius="9px"
        // gridColumn="span 3"
        sx={valuesResponse}
      >
        <ShowValues
          title="Receita liquida no mês"
          value={liquidMonth}
          type="liquid"
        />
      </Box>
      <Box
        // backgroundColor="black"
        backgroundColor="#FFFFFF"
        border="1px solid #C8C8C8"
        borderRadius="9px"
        // gridColumn="span 3"
        sx={valuesResponse}
      >
        <ShowValues
          title="Receita bruta no mês"
          value={totalMonth}
          type="gross"
        />
      </Box>
      <Box
        // backgroundColor="black"
        backgroundColor="#FFFFFF"
        border="1px solid #C8C8C8"
        borderRadius="9px"
        // gridColumn="span 3"
        sx={valuesResponse}
      >
        <ShowValues
          title="despesas no mês"
          value={expenseMonth}
          type="expense"
        />
      </Box>

      <Box
        // backgroundColor="black"
        color="white"
        border="1px solid #C8C8C8"
        borderRadius="9px"
        // gridRow="span 2"
        // gridColumn="span 12"
        gridColumn="span 8"
        gridRow={isMediumLittleScreen === true ? "span 3" : "span 2"}
        display="flex"
        alignItems="center"
        bgcolor="#B23F30"
        // bgcolor="#ffffff"
        sx={addMovRespons}
      >
        <Formik
          validate={validate}
          validationSchema={() => {
            if (typeDate == "today") {
              return checkoutSchema;
            } else if (typeDate == "schedule") {
              return checkoutSchemaScheduleDate;
            } else if (typeDate == "happened") {
              return checkoutSchemaHappenDate;
            }
          }}
          initialValues={initialValues}
          onSubmit={addMovSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box p="20px">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  pb="30px"
                >
                  <p>adicionar movimento</p>
                </Box>
                <Box
                  display="grid"
                  gap="20px"
                  gridTemplateColumns="repeat(3, 1fr)"
                  justifyContent="center"
                  alignItems="center"
                  mb={moreInfo === true ? "40px" : "10px"}
                  paddingLeft={isMobileLittleScreen ? "20px" : "0px"}
                >
                  <Box
                    height="16px"
                    display="flex"
                    alignItems="center"
                    gap="10px"
                    // justifyContent="center"
                  >
                    {!isMobileLittleScreen && (
                      <Box display="flex" flexDirection="column" gap="5px">
                        <p style={{ textAlign: "center", fontSize: "12px" }}>
                          data
                        </p>

                        <select
                          onChange={(e) => {
                            setTypeDate(e.target.value);
                            console.log(e.target.value);
                            console.log(new Date().toISOString().split("T")[0]);
                          }}
                          name="typeDay"
                          id="typeDay"
                          style={{
                            color: "#000",
                            backgroundColor: "#F3E2E0",
                            borderColor: "#C8C8C8",
                            fontSize: "14px",
                            padding: "5px 10px",
                            borderRadius: "4px",
                          }}
                        >
                          <option value="today">hoje</option>
                          <option value="happened">já aconteceu</option>
                          <option value="schedule">planejar</option>
                        </select>
                      </Box>
                    )}

                    <Box display="flex" flexDirection="column" gap="5px">
                      <p style={{ textAlign: "center", fontSize: "12px" }}>
                        produto/serviço
                      </p>
                      <select
                        onChange={(e) => {
                          setRevenueType(e.target.value);
                          // if (e.target.value == "product") {
                          //   console.log("PRODUTO");
                          //   values.service = 10000;
                          // } else if (e.target.value == "service") {
                          //   console.log("SERVICO");
                          //   values.product = 10000;
                          // }
                          console.log(e.target.value);
                          console.log(new Date().toISOString().split("T")[0]);
                        }}
                        name="typeRevenue"
                        id="typeRevenue"
                        style={{
                          backgroundColor: "#F3E2E0",
                          borderColor: "#C8C8C8",
                          fontSize: "14px",
                          padding: "5px 10px",
                          borderRadius: "4px",
                        }}
                        className="text-black"
                      >
                        <option value="product">produto</option>
                        <option value="service">serviço</option>
                        <option value="none">nenhum</option>
                      </select>
                    </Box>

                    <Box display="flex" flexDirection="column" gap="5px">
                      <p style={{ textAlign: "center", fontSize: "12px" }}>
                        cliente
                      </p>
                      <select
                        onChange={(e) => {
                          setClientType(e.target.value);
                          console.log(e.target.value);
                          console.log(new Date().toISOString().split("T")[0]);
                        }}
                        name="typeRevenue"
                        id="typeRevenue"
                        style={{
                          backgroundColor: "#F3E2E0",
                          borderColor: "#C8C8C8",
                          fontSize: "14px",
                          padding: "5px 10px",
                          borderRadius: "4px",
                        }}
                        className="text-black"
                      >
                        <option value="have">possui</option>
                        <option value="none">nenhum</option>
                      </select>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* <Typography variant="p">adicionar movimento</Typography> */}
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="end">
                    {/* <Button
                      onClick={(e) => {
                        moreOrLessInfo(e);
                        // setMoreInfo(!moreInfo);
                        console.log(moreInfo);
                      }}
                      className="hoverBtnMoreOrLess"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#B23F30",

                        // color: "#B23F30",
                        color: "#ffffff",

                        border: "none",
                        borderRadius: "50px",
                      }}
                    >
                      {moreInfo === true ? (
                        <RemoveIcon style={{ height: "30px", width: "30px" }} />
                      ) : (
                        <AddIcon style={{ height: "30px", width: "30px" }} />
                      )}
                    </Button> */}
                  </Box>
                </Box>

                {/* colocar qnd for 600px "repeat(3, 1fr)" */}

                <Box
                  display="grid"
                  // gridTemplateColumns={`${
                  //   isMediumLittleScreen ? "repeat(3, 1fr)" : "repeat(5, 1fr)"
                  // }`}
                  // gridAutoRows="100%"
                  gap="10px"
                  sx={gridTemplateColumnsResponse}
                >
                  {isMobileLittleScreen && (
                    <Box
                      display="grid"
                      gap="10px"
                      gridTemplateColumns="1fr 1fr"
                    >
                      <Box display="flex" flexDirection="column" gap="5px">
                        <select
                          onChange={(e) => {
                            setTypeDate(e.target.value);
                            console.log(e.target.value);
                            console.log(new Date().toISOString().split("T")[0]);
                          }}
                          name="typeDay"
                          id="typeDay"
                          style={{
                            backgroundColor: "#F3E2E0",
                            borderColor: "#C8C8C8",
                            fontSize: "16px",
                            padding: "16px 14px",
                            borderRadius: "4px",
                            color: "#000",
                            width: "100%",
                          }}
                        >
                          <option value="today">hoje</option>
                          <option value="happened">já aconteceu</option>
                          <option value="schedule">planejar</option>
                        </select>
                      </Box>

                      {typeDate === "today" ? (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          gap="10px"
                        >
                          {/* <Typography variant="p">nome</Typography> */}

                          <TextField
                            fullWidth
                            // variant="filled"
                            type="date"
                            // label="date"
                            onBlur={handleBlur}
                            // onChange={handleChange}
                            onChange={(e) => {
                              // handleChange(e);
                              // setValueDate(e.target.value);
                              console.log(e.target.value);
                            }}
                            value={valueDate}
                            // value={values.date}
                            name="date"
                            error={!!touched.date && !!errors.date}
                            helperText={touched.date && errors.date}
                            sx={{
                              bgcolor: "#F3E2E0",
                              borderRadius: "4px",
                              "& .MuiFormLabel-root": {
                                // borderTop: "none",
                                backgroundColor: "#F3E2E0",
                                borderRadius: "4px",
                                pr: "10px",
                                pl: "10px",
                                color: "black",
                              },
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          gap="10px"
                        >
                          <TextField
                            fullWidth
                            // variant="filled"
                            type="date"
                            // label="date"
                            onBlur={handleBlur}
                            // onChange={handleChange}
                            onChange={(e) => {
                              handleChange(e);
                              setValueDate(e.target.value);
                              console.log(e.target.value);
                            }}
                            value={valueDate}
                            // value={values.date}
                            name="date"
                            sx={{
                              bgcolor: "#F3E2E0",
                              borderRadius: "4px",
                              "& .MuiFormLabel-root": {
                                // borderTop: "none",
                                backgroundColor: "#F3E2E0",
                                borderRadius: "4px",
                                pr: "10px",
                                pl: "10px",
                                color: "black",
                              },
                            }}
                            error={!!touched.date && !!errors.date}
                            helperText={touched.date && errors.date}
                          />
                        </Box>
                      )}
                    </Box>
                  )}

                  {/* <Box display="flex" flexDirection="column" gap="5px">
                    <select
                      onChange={(e) => {
                        setTypeDate(e.target.value);
                        console.log(e.target.value);
                        console.log(new Date().toISOString().split("T")[0]);
                      }}
                      name="typeDay"
                      id="typeDay"
                      style={{
                        backgroundColor: "#F3E2E0",
                        borderColor: "#C8C8C8",
                        fontSize: "16px",
                        padding: "5px 10px",
                        borderRadius: "4px",
                      }}
                    >
                      <option value="today">hoje</option>
                      <option value="happened">já acontceu</option>
                      <option value="schedule">planejar</option>
                    </select>
                  </Box> */}
                  {!isMobileLittleScreen && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {typeDate === "today" ? (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          gap="10px"
                          width="100%"
                        >
                          {/* <Typography variant="p">nome</Typography> */}

                          <TextField
                            fullWidth
                            // variant="filled"
                            type="date"
                            // label="date"
                            onBlur={handleBlur}
                            // onChange={handleChange}
                            onChange={(e) => {
                              // handleChange(e);
                              // setValueDate(e.target.value);
                              console.log(e.target.value);
                            }}
                            value={valueDate}
                            // value={values.date}
                            name="date"
                            error={!!touched.date && !!errors.date}
                            helperText={touched.date && errors.date}
                            sx={{
                              bgcolor: "#F3E2E0",
                              borderRadius: "4px",
                              "& .MuiFormLabel-root": {
                                // borderTop: "none",
                                backgroundColor: "#F3E2E0",
                                borderRadius: "4px",
                                pr: "10px",
                                pl: "10px",
                                color: "black",
                              },
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          gap="10px"
                        >
                          <TextField
                            fullWidth
                            // variant="filled"
                            type="date"
                            // label="date"
                            onBlur={handleBlur}
                            // onChange={handleChange}
                            onChange={(e) => {
                              handleChange(e);
                              setValueDate(e.target.value);
                              console.log(e.target.value);
                            }}
                            value={valueDate}
                            // value={values.date}
                            name="date"
                            sx={{
                              bgcolor: "#F3E2E0",
                              borderRadius: "4px",
                              "& .MuiFormLabel-root": {
                                // borderTop: "none",
                                backgroundColor: "#F3E2E0",
                                borderRadius: "4px",
                                pr: "10px",
                                pl: "10px",
                                color: "black",
                              },
                            }}
                            error={!!touched.date && !!errors.date}
                            helperText={touched.date && errors.date}
                          />
                        </Box>
                      )}
                    </Box>
                  )}

                  {!isMobileLittleScreen && (
                    <Box
                      display={clientType == "have" ? "flex" : "none"}
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      gap="10px"
                    >
                      {/* <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        gap="10px"
                      > */}
                      {clientType == "have" ? (
                        <TextField
                          fullWidth
                          select
                          onChange={handleChange}
                          value={values.client}
                          name="client"
                          label="cliente"
                          defaultValue="-"
                          sx={{
                            bgcolor: "#F3E2E0",
                            borderRadius: "4px",
                            "& .MuiFormLabel-root": {
                              // borderTop: "none",
                              backgroundColor: "#F3E2E0",
                              borderRadius: "4px",
                              pr: "10px",
                              pl: "10px",
                              color: "black",
                            },
                          }}
                        >
                          {allClients.map((option, i) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.nome}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        ""
                      )}
                      {/* </Box> */}
                    </Box>
                  )}

                  {!isMobileLittleScreen && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      // gap="4px"
                    >
                      <TextField
                        fullWidth
                        select
                        sx={{
                          bgcolor: "#F3E2E0",
                          borderRadius: "4px",
                          "& .MuiFormLabel-root": {
                            // borderTop: "none",
                            backgroundColor: "#F3E2E0",
                            borderRadius: "4px",
                            pr: "10px",
                            pl: "10px",
                            color: "black",
                          },
                        }}
                        onChange={(e) => {
                          handleChange(e);
                          console.log(e.target.value);
                          if (values.typeMov == "expense") {
                            setClientType("have");
                            setRevenueType("product");
                          } else if (values.typeMov == "revenue") {
                            setClientType("none");
                            setRevenueType("none");
                          }
                        }}
                        value={values.typeMov}
                        name="typeMov"
                        label="Tipo de movimento"
                        defaultValue="revenue"
                        color={
                          !!touched.typeMov && !!errors.typeMov ? "warning" : ""
                        }
                        focused={
                          !!touched.typeMov && !!errors.typeMov ? true : false
                        }
                      >
                        {typeMovOpt.map((option, i) => (
                          <MenuItem key={i} value={option.optionValue}>
                            {option.optionText}
                          </MenuItem>
                        ))}
                      </TextField>
                      {!!touched.typeMov && !!errors.typeMov ? (
                        <FormHelperText
                          sx={{
                            letterSpacing: "0",
                            mt: "0",
                            p: " 1px 20px",
                            color: "red",
                            borderRadius: "4px",
                            backgroundColor: "#F3E2E0",
                          }}
                        >
                          selecione o movimento
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </Box>
                  )}

                  {isMobileLittleScreen && (
                    <Box
                      display="grid"
                      gap="10px"
                      gridTemplateColumns="1fr 1fr"
                    >
                      {" "}
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        // gap="4px"
                      >
                        <TextField
                          fullWidth
                          select
                          sx={{
                            bgcolor: "#F3E2E0",
                            borderRadius: "4px",
                            "& .MuiFormLabel-root": {
                              // borderTop: "none",
                              backgroundColor: "#F3E2E0",
                              borderRadius: "4px",
                              pr: "10px",
                              pl: "10px",
                              color: "black",
                            },
                          }}
                          onChange={(e) => {
                            handleChange(e);
                            console.log(e.target.value);
                            if (values.typeMov == "expense") {
                              setClientType("have");
                              setRevenueType("product");
                            } else if (values.typeMov == "revenue") {
                              setClientType("none");
                              setRevenueType("none");
                            }
                          }}
                          value={values.typeMov}
                          name="typeMov"
                          label="Tipo de movimento"
                          defaultValue="revenue"
                          color={
                            !!touched.typeMov && !!errors.typeMov
                              ? "warning"
                              : ""
                          }
                          focused={
                            !!touched.typeMov && !!errors.typeMov ? true : false
                          }
                        >
                          {typeMovOpt.map((option, i) => (
                            <MenuItem key={i} value={option.optionValue}>
                              {option.optionText}
                            </MenuItem>
                          ))}
                        </TextField>
                        {!!touched.typeMov && !!errors.typeMov ? (
                          <FormHelperText
                            sx={{
                              letterSpacing: "0",
                              mt: "0",
                              p: " 1px 20px",
                              color: "red",
                              borderRadius: "4px",
                              backgroundColor: "#F3E2E0",
                            }}
                          >
                            selecione o movimento
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        // gap="10px"
                      >
                        <TextField
                          fullWidth
                          type="text"
                          label="valor"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.value}
                          name="value"
                          sx={{
                            bgcolor: "#F3E2E0",
                            borderRadius: "4px",
                            // maxWidth: "100px",
                            "& .MuiFormLabel-root": {
                              backgroundColor: "#F3E2E0",
                              borderRadius: "4px",
                              pr: "10px",
                              pl: "10px",
                              color: "black",
                            },
                          }}
                          // error={!!touched.value && !!errors.value}
                          // helperText={touched.value && errors.value}
                          color={
                            !!touched.value && !!errors.value ? "warning" : ""
                          }
                          focused={
                            !!touched.value && !!errors.value ? true : false
                          }
                        />
                        {!!touched.value && !!errors.value ? (
                          <FormHelperText
                            sx={{
                              width: "170px",
                              letterSpacing: "0",
                              mt: "0",
                              p: " 2px 10px",
                              color: "red",
                              borderRadius: "4px",
                              backgroundColor: "#F3E2E0",
                            }}
                          >
                            {errors.value}
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                  )}

                  {!isMobileLittleScreen && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      // gap="10px"
                    >
                      <TextField
                        fullWidth
                        type="text"
                        label="valor"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.value}
                        name="value"
                        sx={{
                          bgcolor: "#F3E2E0",
                          borderRadius: "4px",
                          // maxWidth: "100px",
                          "& .MuiFormLabel-root": {
                            backgroundColor: "#F3E2E0",
                            borderRadius: "4px",
                            pr: "10px",
                            pl: "10px",
                            color: "black",
                          },
                        }}
                        // error={!!touched.value && !!errors.value}
                        // helperText={touched.value && errors.value}
                        color={
                          !!touched.value && !!errors.value ? "warning" : ""
                        }
                        focused={
                          !!touched.value && !!errors.value ? true : false
                        }
                      />
                      {!!touched.value && !!errors.value ? (
                        <FormHelperText
                          sx={{
                            width: "170px",
                            letterSpacing: "0",
                            mt: "0",
                            p: " 2px 10px",
                            color: "red",
                            borderRadius: "4px",
                            backgroundColor: "#F3E2E0",
                          }}
                        >
                          {errors.value}
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </Box>
                  )}

                  {isMobileLittleScreen && (
                    <Box
                      display="grid"
                      gap="10px"
                      gridTemplateColumns="1fr 1fr"
                    >
                      {clientType == "have" ? (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          gap="10px"
                        >
                          <TextField
                            fullWidth
                            select
                            onChange={handleChange}
                            value={values.client}
                            name="client"
                            label="cliente"
                            defaultValue="-"
                            sx={{
                              bgcolor: "#F3E2E0",
                              borderRadius: "4px",
                              "& .MuiFormLabel-root": {
                                // borderTop: "none",
                                backgroundColor: "#F3E2E0",
                                borderRadius: "4px",
                                pr: "10px",
                                pl: "10px",
                                color: "black",
                              },
                            }}
                          >
                            {allClients.map((option, i) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.nome}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      ) : (
                        ""
                      )}
                      {revenueType == "service" ? (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          gap="10px"
                        >
                          <TextField
                            fullWidth
                            select
                            onChange={handleChange}
                            value={values.service}
                            name="service"
                            label="serviço"
                            sx={{
                              bgcolor: "#F3E2E0",
                              borderRadius: "4px",
                              "& .MuiFormLabel-root": {
                                // borderTop: "none",
                                backgroundColor: "#F3E2E0",
                                borderRadius: "4px",
                                pr: "10px",
                                pl: "10px",
                                color: "black",
                              },
                            }}
                            defaultValue="-"
                          >
                            {allServices.map((option, i) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.nome}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      ) : (
                        ""
                      )}
                      {revenueType == "product" ? (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          gap="10px"
                        >
                          <TextField
                            fullWidth
                            select
                            onChange={handleChange}
                            value={values.product}
                            name="product"
                            label="produto"
                            sx={{
                              bgcolor: "#F3E2E0",
                              borderRadius: "4px",
                              "& .MuiFormLabel-root": {
                                // borderTop: "none",
                                backgroundColor: "#F3E2E0",
                                borderRadius: "4px",
                                pr: "10px",
                                pl: "10px",
                                color: "black",
                              },
                            }}
                            defaultValue="-"
                          >
                            {allProducts.map((option, i) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.nome}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                  )}

                  {!isMobileLittleScreen && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      // gap="10px"
                    >
                      <TextField
                        fullWidth
                        select
                        onChange={handleChange}
                        value={values.category}
                        name="category"
                        label="categoria"
                        sx={{
                          bgcolor: "#F3E2E0",
                          borderRadius: "4px",
                          "& .MuiFormLabel-root": {
                            // borderTop: "none",
                            backgroundColor: "#F3E2E0",
                            borderRadius: "4px",
                            pr: "10px",
                            pl: "10px",
                            color: "black",
                          },
                        }}
                        defaultValue="-"
                        color={
                          !!touched.category && !!errors.category
                            ? "warning"
                            : ""
                        }
                        focused={
                          !!touched.category && !!errors.category ? true : false
                        }
                      >
                        {values.typeMov == "revenue"
                          ? categorysRev.map((option, i) => (
                              <MenuItem
                                key={option.categoria_receita_id}
                                value={option.categoria_receita_id}
                              >
                                {option.nome}
                              </MenuItem>
                            ))
                          : categorysExp.map((option, i) => (
                              <MenuItem
                                key={option.categoria_despesa_id}
                                value={option.categoria_despesa_id}
                              >
                                {option.nome}
                              </MenuItem>
                            ))}
                      </TextField>
                      {!!touched.category && !!errors.category ? (
                        <FormHelperText
                          sx={{
                            width: "170px",
                            letterSpacing: "0",
                            mt: "0",
                            p: " 2px 10px",
                            color: "red",
                            borderRadius: "4px",
                            backgroundColor: "#F3E2E0",
                          }}
                        >
                          selecione a categoria
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </Box>
                  )}

                  {!isMobileLittleScreen ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      gap="10px"
                    >
                      <TextField
                        fullWidth
                        type="text"
                        label="descrição"
                        sx={{
                          bgcolor: "#F3E2E0",
                          borderRadius: "4px",
                          "& .MuiFormLabel-root": {
                            // borderTop: "none",
                            backgroundColor: "#F3E2E0",
                            borderRadius: "4px",
                            pr: "10px",
                            pl: "10px",
                            color: "black",
                          },
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        name="description"
                        error={!!touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                      />
                    </Box>
                  ) : (
                    ""
                  )}

                  {!isMobileLittleScreen && (
                    <Box
                      display={
                        revenueType == "service" || revenueType == "product"
                          ? "flex"
                          : "none"
                      }
                      justifyContent="center"
                      alignItems="center"
                      // flexDirection="column"
                      // gap="10px"
                    >
                      {revenueType == "service" ? (
                        // <Box
                        //   display="flex"
                        //   justifyContent="center"
                        //   alignItems="center"
                        //   flexDirection="column"
                        //   gap="10px"
                        // >
                        <TextField
                          fullWidth
                          select
                          onChange={handleChange}
                          value={values.service}
                          name="service"
                          label="serviço"
                          sx={{
                            bgcolor: "#F3E2E0",
                            borderRadius: "4px",
                            "& .MuiFormLabel-root": {
                              // borderTop: "none",
                              backgroundColor: "#F3E2E0",
                              borderRadius: "4px",
                              pr: "10px",
                              pl: "10px",
                              color: "black",
                            },
                          }}
                          defaultValue="-"
                        >
                          {allServices.map((option, i) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.nome}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        ""
                      )}
                      {revenueType == "product" ? (
                        // <Box
                        //   display="flex"
                        //   justifyContent="center"
                        //   alignItems="center"
                        //   flexDirection="column"
                        //   gap="10px"
                        // >
                        <TextField
                          fullWidth
                          select
                          onChange={handleChange}
                          value={values.product}
                          name="product"
                          label="produto"
                          sx={{
                            bgcolor: "#F3E2E0",
                            borderRadius: "4px",
                            "& .MuiFormLabel-root": {
                              // borderTop: "none",
                              backgroundColor: "#F3E2E0",
                              borderRadius: "4px",
                              pr: "10px",
                              pl: "10px",
                              color: "black",
                            },
                          }}
                          defaultValue="-"
                        >
                          {allProducts.map((option, i) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.nome}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        // {/* </Box> */}
                        ""
                      )}
                    </Box>
                  )}

                  {/* antigo produto/serviço */}
                  {/* {moreInfo === true ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      gap="10px"
                    >
                      {revenueType == "product" ? (
                        <TextField
                          fullWidth
                          select
                          onChange={handleChange}
                          value={values.product}
                          name="product"
                          label="produto"
                          sx={{
                            bgcolor: "#F3E2E0",
                            borderRadius: "4px",
                            "& .MuiFormLabel-root": {
                              // borderTop: "none",
                              backgroundColor: "#F3E2E0",
                              borderRadius: "4px",
                              pr: "10px",
                              pl: "10px",
                              color: "black",
                            },
                          }}
                          defaultValue="-"
                        >
                          {testProd.map((option, i) => (
                            <MenuItem key={i} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        <TextField
                          fullWidth
                          select
                          onChange={handleChange}
                          value={values.service}
                          name="service"
                          label="serviço"
                          sx={{
                            bgcolor: "#F3E2E0",
                            borderRadius: "4px",
                            "& .MuiFormLabel-root": {
                              // borderTop: "none",
                              backgroundColor: "#F3E2E0",
                              borderRadius: "4px",
                              pr: "10px",
                              pl: "10px",
                              color: "black",
                            },
                          }}
                          defaultValue="-"
                        >
                          {testService.map((option, i) => (
                            <MenuItem key={i} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Box>
                  ) : (
                    ""
                  )} */}
                  {/* <Box sx={{ width: "200px" }}>
                    <input
                      type="file"
                      sx={{ display: "flex", flexDirection: "column" }}
                    />
                  </Box> */}

                  {isMobileLittleScreen && (
                    <Box
                      display="grid"
                      gap="10px"
                      gridTemplateColumns="1fr 1fr"
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        // gap="10px"
                      >
                        <TextField
                          fullWidth
                          select
                          onChange={handleChange}
                          value={values.category}
                          name="category"
                          label="categoria"
                          sx={{
                            bgcolor: "#F3E2E0",
                            borderRadius: "4px",
                            "& .MuiFormLabel-root": {
                              // borderTop: "none",
                              backgroundColor: "#F3E2E0",
                              borderRadius: "4px",
                              pr: "10px",
                              pl: "10px",
                              color: "black",
                            },
                          }}
                          defaultValue="-"
                          color={
                            !!touched.category && !!errors.category
                              ? "warning"
                              : ""
                          }
                          focused={
                            !!touched.category && !!errors.category
                              ? true
                              : false
                          }
                        >
                          {values.typeMov == "revenue"
                            ? categorysRev.map((option, i) => (
                                <MenuItem
                                  key={option.categoria_receita_id}
                                  value={option.categoria_receita_id}
                                >
                                  {option.nome}
                                </MenuItem>
                              ))
                            : categorysExp.map((option, i) => (
                                <MenuItem
                                  key={option.categoria_despesa_id}
                                  value={option.categoria_despesa_id}
                                >
                                  {option.nome}
                                </MenuItem>
                              ))}
                        </TextField>
                        {!!touched.category && !!errors.category ? (
                          <FormHelperText
                            sx={{
                              width: "170px",
                              letterSpacing: "0",
                              mt: "0",
                              p: " 2px 10px",
                              color: "red",
                              borderRadius: "4px",
                              backgroundColor: "#F3E2E0",
                            }}
                          >
                            selecione a categoria
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        gap="10px"
                      >
                        <TextField
                          fullWidth
                          type="text"
                          label="descrição"
                          sx={{
                            bgcolor: "#F3E2E0",
                            borderRadius: "4px",
                            "& .MuiFormLabel-root": {
                              // borderTop: "none",
                              backgroundColor: "#F3E2E0",
                              borderRadius: "4px",
                              pr: "10px",
                              pl: "10px",
                              color: "black",
                            },
                          }}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description}
                          name="description"
                          error={!!touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                        />
                      </Box>
                    </Box>
                  )}

                  {isMobileLittleScreen && (
                    <Box justifyContent="space-between" display="flex">
                      {" "}
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        gap="0px"
                      >
                        {image ? (
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            gap="0px"
                          >
                            <Typography>{image.name}</Typography>
                            <Button
                              variant="contained"
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
                              onClick={() => setImage(false)}
                            >
                              <RemoveIcon />
                            </Button>
                            {/* <Box>{image.preview}</Box> */}
                          </Box>
                        ) : (
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            gap="0px"
                          >
                            <Typography fontSize="12px" fontFamily="Poppins">
                              adicionar anexo
                            </Typography>{" "}
                            <Button
                              variant="contained"
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
                              onClick={() =>
                                setAddImgBoxVisible(!addImgBoxVisible)
                              }
                            >
                              <AddIcon />
                            </Button>
                          </Box>
                        )}

                        <AddAttachment
                          addImgBoxVisible={addImgBoxVisible}
                          setAddImgBoxVisible={setAddImgBoxVisible}
                          setImage={setImage}
                          image={image}
                          setFileInfos={setFileInfos}
                        />
                        {/* <TextField type="file" /> */}
                      </Box>
                      <Box
                        display="flex"
                        justifyContent={
                          isMediumLittleScreen ? "center" : "start"
                        }
                        alignItems="end"
                      >
                        <Button
                          disabled={loading}
                          type="submit"
                          variant="contained"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#ffffff",
                            boxShadow: "none",
                            height: "40px",
                            width: "40px",

                            // color: "#B23F30",
                            color: "#B23F30",

                            border: "none",
                            borderRadius: "50px",
                            ":hover": {
                              color: "#8b3226",
                              backgroundColor: "#E0E0E0",
                              boxShadow: "none",
                            },
                            ":disabled": {
                              color: "#8b3226",
                              backgroundColor: "#E0E0E0",
                              boxShadow: "none",
                            },
                          }}
                        >
                          {/* MuiButton-root */}
                          {loading ? (
                            <CircularProgress
                              size="24px"
                              style={{ color: "#B23F30" }}
                            />
                          ) : (
                            <ArrowForwardIosIcon />
                          )}
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {!isMobileLittleScreen && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      gap="0px"
                    >
                      {image ? (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          gap="0px"
                        >
                          <Typography>{image.name}</Typography>
                          <Button
                            variant="contained"
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
                            onClick={() => setImage(false)}
                          >
                            <RemoveIcon />
                          </Button>
                          {/* <Box>{image.preview}</Box> */}
                        </Box>
                      ) : (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          gap="0px"
                        >
                          <Typography fontSize="12px" fontFamily="Poppins">
                            adicionar anexo
                          </Typography>{" "}
                          <Button
                            variant="contained"
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
                            onClick={() =>
                              setAddImgBoxVisible(!addImgBoxVisible)
                            }
                          >
                            <AddIcon />
                          </Button>
                        </Box>
                      )}

                      <AddAttachment
                        addImgBoxVisible={addImgBoxVisible}
                        setAddImgBoxVisible={setAddImgBoxVisible}
                        setImage={setImage}
                        image={image}
                        setFileInfos={setFileInfos}
                      />
                      {/* <TextField type="file" /> */}
                    </Box>
                  )}

                  {/* {isMediumLittleScreen && !isMobileLittleScreen && <Box></Box>}
                  {isMediumLittleScreen && !isMobileLittleScreen && <Box></Box>} */}
                  {!isMobileLittleScreen && (
                    <Box
                      display="flex"
                      justifyContent={isMediumLittleScreen ? "center" : "start"}
                      alignItems="end"
                    >
                      <Button
                        type="submit"
                        disabled={loading}
                        variant="contained"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#ffffff",
                          boxShadow: "none",
                          height: "40px",
                          width: "40px",

                          // color: "#B23F30",
                          color: "#B23F30",

                          border: "none",
                          borderRadius: "50px",
                          ":hover": {
                            color: "#8b3226",
                            backgroundColor: "#E0E0E0",
                            boxShadow: "none",
                          },
                          ":disabled": {
                            color: "#8b3226",
                            backgroundColor: "#E0E0E0",
                            boxShadow: "none",
                          },
                        }}
                      >
                        {/* MuiButton-root */}
                        {loading ? (
                          <CircularProgress
                            size="24px"
                            style={{ color: "#B23F30" }}
                          />
                        ) : (
                          <ArrowForwardIosIcon />
                        )}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>

      <Box
        borderRadius="9px"
        backgroundColor="#FFFFFF"
        border="1px solid #C8C8C8"
        gridColumn="span 4"
        gridRow="span 2"
        sx={clientRespons}
      >
        <ClientsGrid clientsData={allClients} />
      </Box>

      <Box
        border="1px solid #C8C8C8"
        backgroundColor="#FFFFFF"
        borderRadius="9px"
        gridColumn="span 8"
        gridRow={moreInfo === true ? "span 2" : "span 3"}
        sx={movsRespons}
      >
        <MovimentsGrid
          // change={updatindElements}
          moviments={movs}
          movToPass={movsToPass}
          // exportMovs={exportMovsTest}
        />
      </Box>

      <Box
        borderRadius="9px"
        backgroundColor="#FFFFFF"
        border="1px solid #C8C8C8"
        gridColumn="span 4"
        gridRow="span 2"
        sx={productRespons}
      >
        <ProductsGrid prodAndServData={producstAndServices} />
      </Box>
      {/* openPopUp */}
      <WarningPopUp
        confirmVisible={openPopUp}
        setConfirmVisible={toggleOpenPopUp}
      />
    </Box>
  );
}

export default Dashboard;
