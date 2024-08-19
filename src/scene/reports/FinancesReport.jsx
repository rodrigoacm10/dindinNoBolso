import { CircularProgress, TextField } from "@mui/material";
import { FaFileDownload } from "react-icons/fa";
import ShowValues from "../../components/ShowValues";
import SalesGrid from "../../components/SalesGrid";
import ProductReportGrid from "../../components/reports/ProductReportGrid";
import ClientsReportGrid from "../../components/reports/ClientsReportGrid";
import { ResponsiveBar } from "@nivo/bar";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import ClientInfoReport from "../../components/reports/ClientInfoReport";

import SmallReportGrid from "../../components/reports/SmallReportGrid";
import { financeEntry } from "../../utils/columnsForGrid.jsx";
import Dash from "../dash/index.jsx";
import MovimentsGrid from "../../components/MovimentsGrid";

import {
  expenseFunc,
  financeCategorysExp,
  financeCategorysRev,
  getClients,
  getExpenseCategorys,
  getMovsPeriod,
  getProducts,
  getRevenueCategorys,
  getServices,
  liquidRecipe,
  totalRecipe,
} from "../../services/APIService.js";
import MiniMovimentsGrid from "../../components/reports/MiniMovimentsGrid.jsx";
import CategorysReportGrid from "../../components/reports/CategorysReportGrid.jsx";
import { exportMovs } from "../../utils/toExportData.js";

// touched
function FinancesReports() {
  const [companyRevenue, setCompanyRevenue] = useState(0);
  const [liquidMonth, setliquidMonth] = useState(0);
  const [totalMonth, settotalMonth] = useState(0);
  const [expenseMonth, setexpenseMonth] = useState(0);

  const [idCliInfo, setIdCliInfo] = useState(1);
  const [cliInfoArr, setCliInfoArr] = useState(1);

  const [initialDate, setInitialDate] = useState("0000-00-00");
  const [finalDate, setFinalDate] = useState("0000-00-00");
  // const [generate, setGenerate] = useState(0);

  const [idCli, setIdCli] = useState(1);
  const [cliArr, setCliArr] = useState([]);
  const [idCliReq, setIdCliReq] = useState(1);
  const [idCliNo, setIdCliNo] = useState(true);

  const [idProd, setIdProd] = useState(1);
  const [prodArr, setProdArr] = useState([]);
  const [idProdReq, setIdProdReq] = useState(1);
  const [idProdNo, setIdProdNo] = useState(true);

  const [cliBuys, setCliBuys] = useState([]);
  const [prodSales, setProdSales] = useState([]);

  const [curMovs, setCurMovs] = useState([]);
  const [curExpenses, setCurExpenses] = useState([]);
  const [curRevenue, serCurRevenue] = useState([]);
  const [curCatsRev, setCurCatsRev] = useState([]);
  const [curCatsExp, setCurCatsExp] = useState([]);

  const [allMovsPass, setAllMovsPass] = useState([]);
  const [revMovsPass, setRevMovsPass] = useState([]);
  const [expMovsPass, setExpMovsPass] = useState([]);

  const {
    attData,
    catsRevArr,
    setCatsRev,
    catsExpArr,
    setCatsExpArr,
    clientsArr,
    productsArr,
    servicesArr,
    setClientsArr,
    setProductsArr,
    setServicesArr,
  } = useContext(SidebarContext);

  const DivValues = ({ ShowValue }) => {
    return (
      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-6 sm:col-span-4 "
      >
        {ShowValue}
      </div>
    );
  };

  const reportSchema = yupResolver(
    yup.object({
      initialDate: yup
        .string()
        .required("data inválida")
        .test("initialDate", "data invalida", (item, context) => {
          // console.log(item);
          // console.log(item, context.parent.finalDate);
          return item <= context.parent.finalDate;
        }),
      finalDate: yup
        .string()
        .required("data inválida")
        .test("initialDate", "data invalida", (item, context) => {
          // console.log(item);
          // console.log(item, context.parent.initialDate);
          return item >= context.parent.initialDate;
        }),
    })
  );

  function InputError({ field }) {
    // @ts-expect-error
    // console.log(field, errors[field]?.message);
    return (
      <p className="text-xs text-left text-[#B23F30] px-4 font-bol">
        {errors[field].message}
      </p>
    );
  }

  const formMethods = useForm({
    resolver: reportSchema,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = formMethods;

  const handleFinanceReport = async (values) => {
    console.log(values);
    setInitialDate(values.initialDate);
    setFinalDate(values.finalDate);
    const resCatRev = await financeCategorysRev(
      values.initialDate,
      values.finalDate
    );
    const resCatExp = await financeCategorysExp(
      values.initialDate,
      values.finalDate
    );
    console.log(resCatRev);
    console.log(resCatExp);

    const addIdRevArr = resCatRev.data.map((e, i) => {
      return {
        nome: e.nome,
        quantidade: e.quantidade,
        valor: e.valor,
        id: i,
      };
    });

    const addIdRevExp = resCatExp.data.map((e, i) => {
      return {
        nome: e.nome,
        quantidade: e.quantidade,
        valor: e.valor,
        id: i,
      };
    });

    setCurCatsRev([...addIdRevArr]);
    setCurCatsExp([...addIdRevExp]);

    const movs = await getMovsPeriod(values.initialDate, values.finalDate);
    const expenses = movs?.data.filter((e) => e.typeMov == "despesa");
    const revenues = movs?.data.filter((e) => e.typeMov == "receita");

    // const responseValuesAcc = await valuesAccount();
    const responseValuesLiquidMonthAcc = await liquidRecipe(
      values.initialDate,
      values.finalDate
    );
    const responseValuesMonthMonthAcc = await totalRecipe(
      values.initialDate,
      values.finalDate
    );
    const responseValuesExpenseMonthAcc = await expenseFunc(
      values.initialDate,
      values.finalDate
    );

    console.log(movs);
    console.log(expenses, revenues);

    // setCompanyRevenue(
    //   responseValuesAcc?.data?.resultado
    //     ? responseValuesAcc?.data?.resultado
    //     : 0
    // );

    setliquidMonth(
      responseValuesLiquidMonthAcc ? responseValuesLiquidMonthAcc : 0
    );
    settotalMonth(
      responseValuesMonthMonthAcc ? responseValuesMonthMonthAcc : 0
    );
    setexpenseMonth(
      responseValuesExpenseMonthAcc ? responseValuesExpenseMonthAcc : 0
    );

    setAllMovsPass(
      exportMovs(
        movs.data,
        catsRevArr,
        catsExpArr,
        clientsArr,
        productsArr,
        servicesArr
      )
    );
    setRevMovsPass(
      exportMovs(
        revenues,
        catsRevArr,
        catsExpArr,
        clientsArr,
        productsArr,
        servicesArr
      )
    );
    setExpMovsPass(
      exportMovs(
        expenses,
        catsRevArr,
        catsExpArr,
        clientsArr,
        productsArr,
        servicesArr
      )
    );

    console.log(values);

    // setGenerate(generate + 1);
    setCurMovs([...movs.data]);
    setCurExpenses([...expenses]);
    serCurRevenue([...revenues]);

    setAllMovsPass(
      exportMovs(
        movs.data,
        catsRevArr,
        catsExpArr,
        clientsArr,
        productsArr,
        servicesArr
      )
    );
    setRevMovsPass(
      exportMovs(
        revenues,
        catsRevArr,
        catsExpArr,
        clientsArr,
        productsArr,
        servicesArr
      )
    );
    setExpMovsPass(
      exportMovs(
        expenses,
        catsRevArr,
        catsExpArr,
        clientsArr,
        productsArr,
        servicesArr
      )
    );
  };

  // edit CSV
  const exportData = (data) => {
    if (data == "all") {
      return [
        {
          details: { firstName: "Ahmed", lastName: "Tomi" },
          job: "manager",
        },
        {
          details: { firstName: "John", lastName: "Jones" },
          job: "developer",
        },
      ];
    } else if (data == "clientsPe") {
      return;
    } else if (data == "productsPe") {
      return;
    } else if (data == "infoClientsPe") {
      return;
    }
  };

  // edit CSV
  const headersToExport = (header) => {
    if (header == "all") {
      return [
        { label: "First Name", key: "details.firstName" },
        { label: "Last Name", key: "details.lastName" },
        { label: "Job", key: "job" },
      ];
    } else if (header == "clientsPe") {
      return;
    } else if (header == "productsPe") {
      return;
    } else if (header == "infoClientsPe") {
      return;
    }
  };

  const handlePassToXLSX = (data) => {
    var wb = XLSX.utils.book_new();
    // var ws = XLSX.utils.json_to_sheet([{ id: "teste", sla: "ava" }]);
    var ws = XLSX.utils.json_to_sheet(exportData(data));

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const fakeInfoCli = [
    {
      productId: 1,
      amount: "20",
      id: 1,
    },
    {
      amount: "14",
      productId: 2,
      id: 2,
    },
  ];

  const fakeInfoCli2 = [
    {
      productId: 3,
      amount: "20",
      id: 3,
    },
    {
      amount: "14",
      productId: 4,
      id: 4,
    },
  ];

  const fakeData = [
    {
      title: "AD",
      // "hot dog": 15,
      // "hot dogColor": "hsl(288, 70%, 50%)",
      value: 179,
      valueColor: "hsl(84, 70%, 50%)",
      // sandwich: 187,
      // sandwichColor: "hsl(62, 70%, 50%)",
      // kebab: 92,
      // kebabColor: "hsl(244, 70%, 50%)",
      // fries: 83,
      // friesColor: "hsl(72, 70%, 50%)",
      // donut: 35,
      // donutColor: "hsl(71, 70%, 50%)",
    },
    {
      title: "AE",
      // "hot dog": 144,
      // "hot dogColor": "hsl(281, 70%, 50%)",
      value: 84,
      valueColor: "hsl(297, 70%, 50%)",
      // sandwich: 13,
      // sandwichColor: "hsl(357, 70%, 50%)",
      // kebab: 119,
      // kebabColor: "hsl(141, 70%, 50%)",
      // fries: 31,
      // friesColor: "hsl(278, 70%, 50%)",
      // donut: 157,
      // donutColor: "hsl(99, 70%, 50%)",
    },
    {
      title: "AF",
      // "hot dog": 40,
      // "hot dogColor": "hsl(264, 70%, 50%)",
      value: 191,
      valueColor: "hsl(39, 70%, 50%)",
      // sandwich: 147,
      // sandwichColor: "hsl(253, 70%, 50%)",
      // kebab: 16,
      // kebabColor: "hsl(85, 70%, 50%)",
      // fries: 59,
      // friesColor: "hsl(350, 70%, 50%)",
      // donut: 58,
      // donutColor: "hsl(2, 70%, 50%)",
    },
    {
      title: "AG",
      // "hot dog": 60,
      // "hot dogColor": "hsl(112, 70%, 50%)",
      value: 199,
      valueColor: "hsl(138, 70%, 50%)",
      // sandwich: 181,
      // sandwichColor: "hsl(228, 70%, 50%)",
      // kebab: 4,
      // kebabColor: "hsl(229, 70%, 50%)",
      // fries: 81,
      // friesColor: "hsl(158, 70%, 50%)",
      // donut: 39,
      // donutColor: "hsl(351, 70%, 50%)",
    },
    {
      title: "AI",
      // "hot dog": 132,
      // "hot dogColor": "hsl(117, 70%, 50%)",
      value: 115,
      valueColor: "hsl(241, 70%, 50%)",
      // sandwich: 54,
      // sandwichColor: "hsl(82, 70%, 50%)",
      // kebab: 48,
      // kebabColor: "hsl(105, 70%, 50%)",
      // fries: 96,
      // friesColor: "hsl(187, 70%, 50%)",
      // donut: 4,
      // donutColor: "hsl(124, 70%, 50%)",
    },
    {
      title: "AL",
      // "hot dog": 165,
      // "hot dogColor": "hsl(249, 70%, 50%)",
      value: 157,
      valueColor: "hsl(198, 70%, 50%)",
      // sandwich: 20,
      // sandwichColor: "hsl(131, 70%, 50%)",
      // kebab: 181,
      // kebabColor: "hsl(134, 70%, 50%)",
      // fries: 117,
      // friesColor: "hsl(163, 70%, 50%)",
      // donut: 180,
      // donutColor: "hsl(210, 70%, 50%)",
    },
    {
      title: "AM",
      // "hot dog": 143,
      // "hot dogColor": "hsl(292, 70%, 50%)",
      value: 77,
      valueColor: "hsl(231, 70%, 50%)",
      // sandwich: 147,
      // sandwichColor: "hsl(45, 70%, 50%)",
      // kebab: 156,
      // kebabColor: "hsl(53, 70%, 50%)",
      // fries: 167,
      // friesColor: "hsl(191, 70%, 50%)",
      // donut: 128,
      // donutColor: "hsl(235, 70%, 50%)",
    },
  ];

  const fakeData2 = [
    {
      title: "AE",
      // "hot dog": 144,
      // "hot dogColor": "hsl(281, 70%, 50%)",
      value: 814,
      valueColor: "hsl(297, 70%, 50%)",
      // sandwich: 13,
      // sandwichColor: "hsl(357, 70%, 50%)",
      // kebab: 119,
      // kebabColor: "hsl(141, 70%, 50%)",
      // fries: 31,
      // friesColor: "hsl(278, 70%, 50%)",
      // donut: 157,
      // donutColor: "hsl(99, 70%, 50%)",
    },

    {
      title: "AG",
      // "hot dog": 60,
      // "hot dogColor": "hsl(112, 70%, 50%)",
      value: 129,
      valueColor: "hsl(138, 70%, 50%)",
      // sandwich: 181,
      // sandwichColor: "hsl(228, 70%, 50%)",
      // kebab: 4,
      // kebabColor: "hsl(229, 70%, 50%)",
      // fries: 81,
      // friesColor: "hsl(158, 70%, 50%)",
      // donut: 39,
      // donutColor: "hsl(351, 70%, 50%)",
    },
    {
      title: "AI",
      // "hot dog": 132,
      // "hot dogColor": "hsl(117, 70%, 50%)",
      value: 175,
      valueColor: "hsl(241, 70%, 50%)",
      // sandwich: 54,
      // sandwichColor: "hsl(82, 70%, 50%)",
      // kebab: 48,
      // kebabColor: "hsl(105, 70%, 50%)",
      // fries: 96,
      // friesColor: "hsl(187, 70%, 50%)",
      // donut: 4,
      // donutColor: "hsl(124, 70%, 50%)",
    },
    {
      title: "AL",
      // "hot dog": 165,
      // "hot dogColor": "hsl(249, 70%, 50%)",
      value: 127,
      valueColor: "hsl(198, 70%, 50%)",
      // sandwich: 20,
      // sandwichColor: "hsl(131, 70%, 50%)",
      // kebab: 181,
      // kebabColor: "hsl(134, 70%, 50%)",
      // fries: 117,
      // friesColor: "hsl(163, 70%, 50%)",
      // donut: 180,
      // donutColor: "hsl(210, 70%, 50%)",
    },
  ];

  const fakeClis = [
    {
      nome: 1,
      amount: "10",
      totalValue: "10",
      favProduct: "2",
      id: 1,
    },
  ];

  const getInfoCliData = async (id) => {
    // faz a requisição e joga o resultado

    if (id == 1) {
      return fakeInfoCli;
    } else if (id == 2) {
      return fakeInfoCli2;
    }
  };

  const getCliBuysData = async (id) => {
    setIdCliReq(true);

    // faz a requisição e joga o resultado
    setTimeout(() => {
      setIdCliReq(false);
    }, 2000);

    if (id == 1) {
      return fakeData;
    } else if (id == 2) {
      return fakeData2;
    } else if (id == 3) {
      return [];
    }
  };

  const getProdBuysData = async (id) => {
    setIdProdReq(true);

    // faz a requisição e joga o resultado
    setTimeout(() => {
      setIdProdReq(false);
    }, 2000);

    if (id == 1) {
      return fakeData;
    } else if (id == 2) {
      return fakeData2;
    } else if (id == 3) {
      return [];
    }
  };

  const getInfos = async () => {
    // const productArr = await getProdBuysData(idProd, initialDate, finalDate);
    // const clientArr = await getCliBuysData(idCli, initialDate, finalDate);
    // const clientsInfoArr = await getInfoCliData(
    //   idCliInfo,
    //   initialDate,
    //   finalDate
    // );

    // console.log("arrays", productArr, clientArr, clientsInfoArr);

    // setProdArr([...productArr]);
    // setCliArr([...clientArr]);
    // setCliInfoArr([...clientsInfoArr]);

    // initialDate, finalDate
    const catRev = await getRevenueCategorys();
    const catExp = await getExpenseCategorys();
    const cliArr = await getClients();
    const prodArr = await getProducts();
    const servArr = await getServices();
    console.log(catRev, catExp);

    setClientsArr([...cliArr.data]);
    setProductsArr([...prodArr.data]);
    setServicesArr([...servArr.data]);
    console.log(cliArr.data, prodArr.data, servArr.data);

    setCatsRev([...catRev.data]);
    setCatsExpArr([...catExp.data]);

    if (!!initialDate && !!finalDate) {
      console.log("datas ->_.", initialDate, finalDate);

      const movs = await getMovsPeriod(initialDate, finalDate);
      const expenses = movs.data.filter((e) => e.typeMov == "despesa");
      const revenues = movs.data.filter((e) => e.typeMov == "receita");

      const resCatRev = await financeCategorysRev(initialDate, finalDate);
      const resCatExp = await financeCategorysExp(initialDate, finalDate);

      console.log(movs);
      console.log(expenses, revenues);
      console.log(resCatRev);
      console.log(resCatExp);

      setCurCatsRev([...resCatRev.data]);
      setCurCatsExp([...resCatExp.data]);

      setCurMovs([...movs.data]);
      setCurExpenses([...expenses]);
      serCurRevenue([...revenues]);
    }
  };

  // const getProdInfo = async (id) => {
  //   const productArr = await getProdBuysData(id, initialDate, finalDate);
  //   setProdArr([...productArr]);
  // };

  // const getCliInfo = async (id) => {
  //   const clientArr = await getCliBuysData(id, initialDate, finalDate);
  //   setCliArr([...clientArr]);
  // };

  // const getCliInfoInfo = async (id) => {
  //   const clientsInfoArr = await getInfoCliData(id, initialDate, finalDate);
  //   setCliInfoArr([...clientsInfoArr]);
  // };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

  // useEffect(() => {
  //   getInfos();
  // }, [generate]);

  // receber alguma coisa pra diferenciar entre prod e cli

  // const MyResponsiveBar = ({ data, type }) => (
  //   <ResponsiveBar
  //     data={data}
  //     // precisa mais n
  //     // fzr requisição de com os nomes dos clientes q compraram, ou de todos os produtos
  //     // fzr requisição com os nomes dos produtos q o cliente comprou
  //     keys={["", "value"]}
  //     // keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}

  //     indexBy="title"
  //     margin={{ top: 50, right: 20, bottom: 100, left: 45 }}
  //     padding={0.3}
  //     valueScale={{ type: "linear" }}
  //     indexScale={{ type: "band", round: true }}
  //     colors={{ scheme: "nivo" }}
  //     defs={[
  //       {
  //         id: "dots",
  //         type: "patternDots",
  //         background: "inherit",
  //         color: "#38bcb2",
  //         size: 4,
  //         padding: 1,
  //         stagger: true,
  //       },
  //       {
  //         id: "lines",
  //         type: "patternLines",
  //         background: "inherit",
  //         color: "#eed312",
  //         rotation: -45,
  //         lineWidth: 6,
  //         spacing: 10,
  //       },
  //     ]}
  //     fill={[
  //       {
  //         match: {
  //           id: "fries",
  //         },
  //         id: "dots",
  //       },
  //       {
  //         match: {
  //           id: "sandwich",
  //         },
  //         id: "lines",
  //       },
  //     ]}
  //     borderColor={{
  //       from: "color",
  //       modifiers: [["darker", 1.6]],
  //     }}
  //     axisTop={null}
  //     axisRight={null}
  //     axisBottom={{
  //       tickSize: 5,
  //       tickPadding: 5,
  //       tickRotation: 0,
  //       // legend: "country",
  //       legendPosition: "middle",
  //       legendOffset: 32,
  //       truncateTickAt: 0,
  //     }}
  //     axisLeft={{
  //       tickSize: 5,
  //       tickPadding: 5,
  //       tickRotation: 0,
  //       // legend: "food",
  //       legendPosition: "middle",
  //       legendOffset: -40,
  //       truncateTickAt: 0,
  //     }}
  //     labelSkipWidth={12}
  //     labelSkipHeight={12}
  //     labelTextColor={{
  //       from: "color",
  //       modifiers: [["darker", 1.6]],
  //     }}
  //     // legends={[
  //     //   {
  //     //     dataFrom: "keys",
  //     //     anchor: "bottom-right",
  //     //     direction: "column",
  //     //     justify: false,
  //     //     translateX: 120,
  //     //     translateY: 0,
  //     //     itemsSpacing: 2,
  //     //     itemWidth: 100,
  //     //     itemHeight: 20,
  //     //     itemDirection: "left-to-right",
  //     //     itemOpacity: 0.85,
  //     //     symbolSize: 20,
  //     //     effects: [
  //     //       {
  //     //         on: "hover",
  //     //         style: {
  //     //           itemOpacity: 1,
  //     //         },
  //     //       },
  //     //     ],
  //     //   },
  //     // ]}
  //     role="application"
  //     ariaLabel="Nivo bar chart demo"
  //     barAriaLabel={(e) =>
  //       e.id + ": " + e.formattedValue + " in country: " + e.indexValue
  //     }
  //   />
  // );

  return (
    <div>
      <div className="mt-5 mx-5 row-span-2 md:row-span-1 rounded-lg bg-[#B23F30] text-white p-4 pl-5">
        <h1 className="text-lg">
          gerar relatório <span className="font-bold ">Financeiro</span>{" "}
        </h1>
        <form onSubmit={handleSubmit(handleFinanceReport)} className="">
          <div className="mt-9 pb-2 flex flex-wrap md:flex-nowrap gap-3">
            <div className="relative max-w-40 ">
              <p className="text-sm pb-1 absolute bottom-14 left-0 ">
                data inicial
              </p>
              <TextField
                {...register("initialDate")}
                fullWidth
                className="z-50"
                type="date"
                onChange={(e) => {
                  setValue("initialDate", e.target.value);

                  console.log(e.target.value);
                }}
                name="dateTest"
                sx={{
                  bgcolor: "#F3E2E0",
                  borderRadius: "4px",
                  "& .MuiFormLabel-root": {
                    backgroundColor: "#F3E2E0",
                    borderRadius: "4px",

                    height: "10px",
                    color: "black",
                  },
                  "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                    py: "14px",
                  },
                }}
                error={getValues("initialDate") > getValues("finalDate")}
              />
              {errors?.initialDate?.type && (
                <div className="absolute bg-[#F3E2E0] -bottom-4 rounded z-10 pt-2 pr-12 ">
                  <InputError field="initialDate" />
                </div>
              )}
            </div>
            <div className="relative   max-w-40 ">
              <p className="text-sm pb-1 absolute bottom-14 left-0 ">
                data final
              </p>
              <TextField
                {...register("finalDate")}
                fullWidth
                className="z-50"
                type="date"
                onChange={(e) => {
                  setValue("finalDate", e.target.value);

                  console.log(e.target.value);
                }}
                name="finalDate"
                sx={{
                  bgcolor: "#F3E2E0",
                  borderRadius: "4px",
                  "& .MuiFormLabel-root": {
                    backgroundColor: "#F3E2E0",
                    borderRadius: "4px",

                    height: "10px",
                    color: "black",
                  },
                  "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                    py: "14px",
                  },
                }}
              />
              {errors?.finalDate?.type && (
                <div className="absolute bg-[#F3E2E0] -bottom-4 rounded z-10 pt-2 pr-12 ">
                  <InputError field="finalDate" />
                </div>
              )}
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-3">
              <button
                type="submit"
                className="transition duration-200 bg-white text-black rounded px-5 hover:bg-slate-200 "
              >
                gerar relatório
              </button>
              {/* <button
                type="button"
                className="transition duration-200 text-black rounded py-3 px-2 w-24 bg-[#7A7A7A] flex items-center justify-center gap-2 text-white hover:bg-[#5E5E5E]"
              >
                <CSVLink
                  className="flex w-full h-full   items-center justify-center gap-2"
                  headers={headersToExport("all")}
                  data={exportData("all")}
                >
                  <FaFileDownload size="20px" /> CSV
                </CSVLink>
              </button>
              <button
                onClick={() => handlePassToXLSX("all")}
                type="button"
                className="transition duration-200 py-3 text-black rounded w-24 bg-[#7A7A7A] flex items-center justify-center gap-2 text-white px-2 hover:bg-[#5E5E5E]"
              >
                <FaFileDownload size="20px" /> XLSX
              </button> */}
            </div>
          </div>
        </form>
      </div>
      <div
        style={{ gridAutoRows: "150px" }}
        className="min-h-screen p-5 pb-5 grid grid-cols-12 gap-5 "
      >
        {/* style={{ gridAutoRows: "150px" }} */}
        {/* className="m-5 min-h-screen pb-5 grid grid-cols-12 gap-5" */}
        {/* bg-[#B23F30] */}
        {/* Tudo que tem que pagar */}
        {/* <DivValues
          ShowValue={
            <ShowValues title="Contas a pagar" value={100} type="onlyMoney" />
          }
        /> */}
        {/* Tudo que vai receber - compras no cartão*/}
        <DivValues
          ShowValue={
            <ShowValues
              title="Receita liquida"
              value={liquidMonth}
              type="onlyMoney"
            />
          }
        />
        {/* Receita liquida no mês  - Dashboard */}
        <DivValues
          ShowValue={
            <ShowValues
              title="Receita bruta"
              value={totalMonth}
              type="onlyMoney"
            />
          }
        />
        {/* Saldo - Contas a pagar + contas a receber */}
        <DivValues
          ShowValue={
            <ShowValues
              title="Despesas"
              value={expenseMonth}
              type="onlyMoney"
            />
          }
        />
        {/* Gráfico de Movimentações */}
        <div className="col-span-12 row-span-3">
          <MovimentsGrid
            report={true}
            moviments={curMovs}
            movToPass={allMovsPass}
          />
        </div>
        {/* Despesa */} {/* Receita */}
        <div className="col-span-12 md:col-span-6 row-span-3">
          <MiniMovimentsGrid
            moviments={curExpenses}
            movToPass={expMovsPass}
            text="Despesa no periodo"
          />
          {/* <SmallReportGrid text="Despesa no periodo" columns={financeEntry} /> */}
        </div>
        <div className="col-span-12 md:col-span-6 row-span-3">
          <MiniMovimentsGrid
            moviments={curRevenue}
            movToPass={revMovsPass}
            text="Receita no periodo"
          />

          {/* <SmallReportGrid text="Receita no periodo" columns={financeEntry}
           /> */}
        </div>
        <div className="col-span-12 md:col-span-6 row-span-3">
          <CategorysReportGrid
            moviments={curCatsExp}
            movToPass={curCatsExp}
            text="Categoria de despesa"
          />
        </div>
        <div className="col-span-12 md:col-span-6 row-span-3">
          <CategorysReportGrid
            moviments={curCatsRev}
            movToPass={curCatsRev}
            text="Categoria de receita"
          />
        </div>
      </div>
    </div>
  );
}

export default FinancesReports;
