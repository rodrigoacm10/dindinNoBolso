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
import ClientInfoReport from "../../components/reports/clientInfoReport";
import {
  buysClients,
  clientByOneProduct,
  clientByProduct,
  getBrand,
  getClients,
  getProducts,
  getSupplier,
  getType,
  productByClient,
  salesIndicators,
  salesPeriod,
} from "../../services/APIService";
import { exportCliInfo, exportSales } from "../../utils/toExportData";
// touched
function SalesReports() {
  const [idCliInfo, setIdCliInfo] = useState(1);
  const [cliInfoArr, setCliInfoArr] = useState([]);
  const [cliInfoArrPass, setCliInfoArrPass] = useState([]);

  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [generate, setGenerate] = useState(0);

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

  const [indicatorsPeriod, setIndicatorsPeriod] = useState({
    totalVendas: 0,
    vendasValorTotal: 0,
    devolucoes: 0,
    lucro: 0,
  });
  const [salesArr, setSalesArr] = useState([]);
  const [salesArrPass, setSalesArrPass] = useState([]);

  const [cliProdArr, setCliProdArr] = useState([]);
  const [prodCliArr, setProdCliArr] = useState([]);

  const [cliProdArrPass, setCliProdArrPass] = useState([]);
  const [prodCliArrPass, setProdCliArrPass] = useState([]);

  const {
    clientsArr,
    setClientsArr,
    productsArr,
    setProductsArr,
    setSupplierArr,
    setBrandArr,
    setTypeArr,
    supplierArr,
    brandArr,
    typeArr,
  } = useContext(SidebarContext);

  const DivValues = ({ ShowValue }) => {
    return (
      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-6 sm:col-span-3 "
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

  const handleSalesReport = (values) => {
    console.log(values);
    setInitialDate(values.initialDate);
    setFinalDate(values.finalDate);
    setGenerate(generate + 1);
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

  //  tabela client especifico
  const getInfoCliData = async (id) => {
    // faz a requisição e joga o resultado

    if (id == 1) {
      return fakeInfoCli;
    } else if (id == 2) {
      return fakeInfoCli2;
    }
  };

  // grafico2
  const getCliBuysData = async (initialDate, finalDate, id) => {
    setIdCliReq(true);

    const response = await buysClients(initialDate, finalDate, id);
    console.log("resssssCli", response.data[0]);
    setIdCliReq(false);

    const clientArrId = response.data[0].map((e, i) => {
      return {
        ...e,
        id: i,
      };
    });
    console.log("aasda", clientArrId);

    return clientArrId;

    // // faz a requisição e joga o resultado
    // setTimeout(() => {
    //   setIdCliReq(false);
    // }, 2000);

    // if (id == 1) {
    //   return fakeData;
    // } else if (id == 2) {
    //   return fakeData2;
    // } else if (id == 3) {
    //   return [];
    // }
  };

  // grafico1
  const getProdBuysData = async (initialDate, finalDate, id) => {
    setIdProdReq(true);

    const response = await clientByOneProduct(initialDate, finalDate, id);
    console.log("resssssProd", response.data[0]);
    setIdProdReq(false);

    return response.data[0];
    // // faz a requisição e joga o resultado
    // setTimeout(() => {
    //   setIdProdReq(false);
    // }, 2000);

    // if (id == 1) {
    //   return fakeData;
    // } else if (id == 2) {
    //   return fakeData2;
    // } else if (id == 3) {
    //   return [];
    // }
  };

  const getInfos = async () => {
    const clis = await getClients();
    const prods = await getProducts();
    const sups = await getSupplier();
    const brands = await getBrand();
    const types = await getType();

    setSupplierArr([...sups.data]);
    setBrandArr([...brands.data]);
    setTypeArr([...types.data]);
    setClientsArr([...clis.data]);
    setProductsArr([...prods.data]);

    // indicadores

    if (!!initialDate && !!finalDate) {
      const indicators = await salesIndicators(initialDate, finalDate);
      const sales = await salesPeriod(initialDate, finalDate);

      console.log(clientsArr[0].id);
      const cliProd = await clientByProduct(
        initialDate,
        finalDate
        // clientsArr[0].id
      );
      const prodCli = await productByClient(
        initialDate,
        finalDate
        // productsArr[0].id
      );

      console.log("indicadores", indicators);
      console.log("salesPeriodo", sales);
      console.log("cliPRod", cliProd);
      console.log("prodCli", prodCli);

      const cliProdId = cliProd.data.map((e, i) => {
        return {
          ...e,
          id: i,
        };
      });

      const prodCliId = prodCli.data.map((e, i) => {
        return {
          ...e,
          id: i,
        };
      });

      // console.log(cliProd.data[0]);
      // console.log(prodCli.data[0]);

      console.log(prodCliId);
      console.log(cliProdId);
      const corSales = sales.data.map((e) => {
        return {
          entrada: e.entrada,
          entregue: e.entregue,
          anexo: e.anexo,
          cancelado: e.cancelado,
          cliente_id: e.cliente_id,
          data: e.data,
          id: e.id,
          observacao: e.observacao,
          parcelas: e.parcelas,
          preco_total: e.preco_total,
          produto: e.produtos[0]?.produto_id,
          quantidade: +e.produtos[0]?.quantidade,
          tipo_pagamento: e.tipo_pagamento,
          valor_entrada: e.valor_entrada,
          valor_parcelas: e.valor_parcelas,
        };
      });

      // inverti

      setIndicatorsPeriod(indicators.data);
      setSalesArr(corSales);
      setSalesArrPass([...exportSales(corSales, clis.data, prods.data)]);
      setCliProdArr(prodCliId);
      setProdCliArr(cliProdId);

      const arrCorProdCli = cliProdId.map((e) => {
        return {
          cliente: e.cliente_nome,
          quantidade: e.total_quantidade,
          valor_total: e.preco_total,

          mais_comprou: e.produto_nome,
        };
      });

      const arrCorCliProd = prodCliId.map((e) => {
        return {
          produto: e.produto_nome,
          quantidade: e.total_quantidade,
          valor_total: e.preco_total,
          mais_comprou: e.cliente_nome,
        };
      });
      // inverti

      setCliProdArrPass([...arrCorCliProd]);
      setProdCliArrPass([...arrCorProdCli]);

      // grafico1
      const productArr = await getProdBuysData(
        initialDate,
        finalDate,
        productsArr[0]?.id
      );
      // grafico2
      const clientArr = await getCliBuysData(
        initialDate,
        finalDate,
        // clientsArr[0].id
        ""
      );
      //  tabela client especifico
      // const clientsInfoArr = await getInfoCliData(
      //   idCliInfo,
      //   initialDate,
      //   finalDate
      // );
      const clientsInfoArr = await getCliBuysData(
        initialDate,
        finalDate,
        // clientsArr[0].id
        ""
      );

      // console.log("arrays", productArr, clientArr, clientsInfoArr);
      // console.log(productArr)

      console.log(clis, prods);

      console.log("aasdas-ÇÇ", clientsInfoArr);

      setProdArr([...productArr]);
      setCliArr([...clientArr]);

      setCliInfoArr([...clientsInfoArr]);
      setCliInfoArrPass(
        exportCliInfo(
          [...clientsInfoArr],
          [...types.data],
          [...brands.data],
          [...sups.data],
          [...clis.data]
        )
      );
    }

    // salesPeriod
    // clientByProduct
    // productByClient
    // buysClients
    // clientByOneProduct

    // const cliBuysArr = await functionName(initialDate, finalDate)
    // const prodSalesArr = await functionName(initialDate, finalDate)

    // setCliBuys([...cliBuysArr])
    // setProdSales([...prodSalesArr])
  };

  // inverti os sets
  // grafico1
  const getProdInfo = async (initialDate, finalDate, id) => {
    const response = await getProdBuysData(initialDate, finalDate, id);

    setProdArr([...response]);
  };

  // grafico2
  const getCliInfo = async (id) => {
    const response = await getCliBuysData(initialDate, finalDate, id);
    setCliArr([...response]);
  };

  //  tabela client especifico
  const getCliInfoInfo = async (id) => {
    // const clientsInfoArr = await getInfoCliData(id, initialDate, finalDate);
    const clientsInfoArr = await getCliBuysData(initialDate, finalDate, id);
    setCliInfoArr([...clientsInfoArr]);

    setCliInfoArrPass(
      exportCliInfo(
        [...clientsInfoArr],
        typeArr,
        brandArr,
        supplierArr,
        clientsArr
      )
    );
  };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [generate]);

  // receber alguma coisa pra diferenciar entre prod e cli
  const MyResponsiveBar = ({ data, choice }) => (
    <ResponsiveBar
      data={data}
      // precisa mais n
      // fzr requisição de com os nomes dos clientes q compraram, ou de todos os produtos
      // fzr requisição com os nomes dos produtos q o cliente comprou
      // keys={["", "value", "", "total_quantidade_comprada"]}
      keys={["", "total_quantidade_comprada"]}
      // keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}

      // indexBy="title"
      indexBy={choice == "cli" ? "cliente_nome" : "produto"}
      margin={{ top: 50, right: 20, bottom: 100, left: 45 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      // legends={[
      //   {
      //     dataFrom: "keys",
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 120,
      //     translateY: 0,
      //     itemsSpacing: 2,
      //     itemWidth: 100,
      //     itemHeight: 20,
      //     itemDirection: "left-to-right",
      //     itemOpacity: 0.85,
      //     symbolSize: 20,
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );

  return (
    <div>
      <div className="mt-5 mx-5 row-span-2 md:row-span-1 rounded-lg bg-[#B23F30] text-white p-4 pl-5">
        <h1 className="text-lg">
          gerar relatório de <span className="font-bold ">vendas</span>{" "}
        </h1>
        <form onSubmit={handleSubmit(handleSalesReport)} className="">
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

        <DivValues
          ShowValue={
            <ShowValues
              title="Vendas"
              value={+indicatorsPeriod.totalVendas}
              type="product"
            />
          }
        />

        <DivValues
          ShowValue={
            <ShowValues
              title="Cancelados"
              value={+indicatorsPeriod.devolucoes}
              type="product"
            />
          }
        />
        <DivValues
          ShowValue={
            <ShowValues
              title="Valor total"
              value={+indicatorsPeriod.vendasValorTotal}
              type="onlyMoney"
            />
          }
        />
        <DivValues
          ShowValue={
            <ShowValues
              title="Lucro líquido"
              value={+indicatorsPeriod.lucro}
              type="onlyMoney"
            />
          }
        />

        <div className="col-span-12 row-span-3">
          <SalesGrid
            moviments={salesArr}
            movToPass={salesArrPass}
            report={true}
          />
        </div>

        <div className="col-span-12 md:col-span-6 row-span-3">
          <ClientsReportGrid
            moviments={prodCliArr}
            movToPass={prodCliArrPass}
            // moviments={fakeClis}
          />
        </div>

        <div className="col-span-12 md:col-span-6 row-span-3">
          <ProductReportGrid
            // moviments={prodSales}
            moviments={cliProdArr}
            movToPass={cliProdArrPass}
          />
        </div>

        <div className="col-span-12 row-span-3 bg-[#B23F30] rounded-lg">
          <div className="flex px-5 pt-3 items-center gap-2">
            <p className="text-white">informe o cliente:</p>
            <select
              className="p-1 px-3 rounded border-[#C8C8C8] border"
              onChange={(e) => {
                console.log(e.target.value, "changeCli");
                // setIdCliInfo(e.target.value);
                getCliInfoInfo(e.target.value);

                // setIdCli(e.target.value);
                // console.log(e.target.value, "changeCli");
                // getCliInfo(e.target.value);
              }}
            >
              <option value="">balcão</option>

              {clientsArr.map((e, i) => {
                return (
                  <option key={i} value={e.id}>
                    {e.nome}
                  </option>
                );
              })}
            </select>
          </div>
          <ClientInfoReport
            // moviments={cliArr}

            moviments={cliInfoArr}
            movToPass={cliInfoArrPass}
          />
        </div>

        <div className="bg-white col-span-12 row-span-3 rounded-lg p-5">
          <h2>clientes que compraram o produto no periodo </h2>
          <div className="flex items-center gap-2 pt-1">
            <p>produto:</p>{" "}
            <select
              className="p-1 px-3 rounded bg-[#F3E2E0] border-[#C8C8C8] border"
              onChange={(e) => {
                // setIdProd(e.target.value);
                console.log(e.target.value, "changeProd");
                getProdInfo(initialDate, finalDate, e.target.value);
              }}
            >
              {/* produtos que venderam no periodo */}
              {productsArr.map((e, i) => {
                return (
                  <option key={i} value={e.id}>
                    {e.nome}
                  </option>
                );
              })}
              {/* <option value={1}>prod1</option>
              <option value={2}>prod2</option>
              <option value={3}>prod2</option> */}
            </select>
          </div>
          {idProdReq ? (
            <div className="w-full h-full flex items-center justify-center">
              <CircularProgress size="48px" style={{ color: "#000000" }} />
            </div>
          ) : (
            <div className="w-full h-full">
              {prodArr.length == 0 ? (
                <p className="mt-8 font-bold">Não há informações</p>
              ) : (
                <MyResponsiveBar data={prodArr} choice="cli" />
              )}
            </div>
          )}
        </div>

        <div className="bg-white col-span-12 row-span-3 rounded-lg p-5">
          <h2>o que o cliente comprou durante o periodo </h2>
          <div className="flex items-center gap-2 pt-1">
            <p>client:</p>{" "}
            <select
              className="p-1 px-3 rounded bg-[#F3E2E0] border-[#C8C8C8] border"
              onChange={(e) => {
                // setIdCli(e.target.value);
                console.log(e.target.value, "changeCli");
                getCliInfo(e.target.value);
              }}
            >
              <option value="">balcão</option>
              {/* produtos que venderam no periodo */}
              {clientsArr.map((e, i) => {
                return (
                  <option key={i} value={e.id}>
                    {e.nome}
                  </option>
                );
              })}
              {/* <option value={1}>cli1</option>
              <option value={2}>cli2</option>
              <option value={3}>cli2</option> */}
            </select>
          </div>

          {idCliReq ? (
            <div className="w-full h-full flex items-center justify-center">
              <CircularProgress size="48px" style={{ color: "#000000" }} />
            </div>
          ) : (
            <div className="w-full h-full">
              {cliArr.length == 0 ? (
                <p className="mt-8 font-bold">Não há informações</p>
              ) : (
                <MyResponsiveBar data={cliArr} choice="prod" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SalesReports;
