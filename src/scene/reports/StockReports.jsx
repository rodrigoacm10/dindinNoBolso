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
import SmallReportGrid from "../../components/reports/SmallReportGrid";
import { suppliersBuysCol } from "../../utils/columnsForGrid.jsx";
import BuysGrid from "../../components/BuysGrid.jsx";
import ClientInfoReport from "../../components/reports/ClientInfoReport.jsx";
import SupplierReportGrid from "../../components/reports/SupplierReportsGrid.jsx";
import ProdEntryReportGrid from "../../components/reports/ProdEntryReportGrid.jsx";
import BrandReportGrid from "../../components/reports/BrandReportGrid.jsx";
import TypesReportGrid from "../../components/reports/TypesReportGrid.jsx";
import {
  buysSupplier,
  entryBrand,
  entryProduct,
  entryType,
  getBrand,
  getProducts,
  getSupplier,
  getType,
  infoSupplier,
  prductEntryOut,
  stockIndicators,
  stockPeriod,
} from "../../services/APIService.js";
import SupplierInfoReport from "../../components/reports/SupplierInfoReport.jsx";
import { exportBuys } from "../../utils/toExportData.js";
// touched
function StocksReports() {
  const [idCliInfo, setIdCliInfo] = useState(1);
  const [supplierInfoArr, setSupplierInfoArr] = useState([]);
  const [supplierInfoArrPass, setSupplierInfoArrPass] = useState([]);

  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [generate, setGenerate] = useState(0);

  const [idCli, setIdCli] = useState(1);
  const [outArr, setOutArr] = useState([]);
  const [idCliReq, setIdCliReq] = useState(1);
  const [idCliNo, setIdCliNo] = useState(true);

  const [idProd, setIdProd] = useState(1);
  const [entryArr, setEntryArr] = useState([]);
  const [idProdReq, setIdProdReq] = useState(1);
  const [idProdNo, setIdProdNo] = useState(true);

  const [indicators, setIndicators] = useState({
    totalEntrada: 0,
    totalSaida: 0,
  });
  const [entrysPeriod, setEntrysPeriod] = useState([]);
  const [entrysPeriodArr, setEntrysPeriodArr] = useState([]);

  const [buysSupplierArr, setBuysSupplierArr] = useState([]);
  const [entryProductsArr, setEntryProductsArr] = useState([]);
  const [entryBrandsArr, setEntryBrandsArr] = useState([]);
  const [entryTypesArr, setEntryTypesArr] = useState([]);

  const [buysSupplierArrPass, setBuysSupplierArrPass] = useState([]);
  const [entryProductsArrPass, setEntryProductsArrPass] = useState([]);
  const [entryBrandsArrPass, setEntryBrandsArrPass] = useState([]);
  const [entryTypesArrPass, setEntryTypesArrPass] = useState([]);

  const [supBuys, setSupBuys] = useState([]);
  const [prodEntrys, setProdEntrys] = useState([]);
  const [brandEntrys, setBrandEntrys] = useState([]);
  const [typeEntrys, setTypesEntrys] = useState([]);

  const {
    productsArr,
    setProductsArr,
    supplierArr,
    setSupplierArr,
    brandArr,
    setBrandArr,
    typeArr,
    setTypeArr,
  } = useContext(SidebarContext);

  const DivValues = ({ ShowValue }) => {
    return (
      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-6 sm:col-span-6 "
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
          return item <= context.parent.finalDate;
        }),
      finalDate: yup
        .string()
        .required("data inválida")
        .test("initialDate", "data invalida", (item, context) => {
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

  const handleStockReport = (values) => {
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
      amount: "20",
    },
    {
      amount: "14",
    },
  ];

  const fakeInfoCli2 = [
    {
      amount: "210",
    },
    {
      amount: "114",
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

  const fakeSup = [
    {
      name: "aaa",
      amount: "100",
      totalValue: "120",
      favProduct: "ssla",
      id: 1,
    },
    {
      name: "aab",
      amount: "100",
      totalValue: "120",
      favProduct: "ssla",
      id: 2,
    },
  ];

  const fakeSup1 = [
    {
      name: "aaa",
      amount: "100",
      totalValue: "120",
      favProduct: "ssla",
      id: "1",
    },
    {
      name: "aab",
      amount: "100",
      totalValue: "120",
      favProduct: "ssla",
      id: "2",
    },
  ];

  const fakeSup2 = [
    {
      name: "aaa",
      amount: "100",
      totalValue: "120",
      favProduct: "ssla",
      id: "1",
    },
    {
      name: "aab",
      amount: "100",
      totalValue: "120",
      favProduct: "ssla",
      id: "2",
    },
  ];

  const fakeSup3 = [
    {
      name: "aaa",
      amount: "100",
      totalValue: "120",
      favProduct: "ssla",
      id: "1",
    },
    {
      name: "aab",
      amount: "100",
      totalValue: "120",
      favProduct: "ssla",
      id: "2",
    },
  ];

  // excluir isso é fake
  const getInfoSupData = async (id) => {
    // faz a requisição e joga o resultado

    if (id == 1) {
      return fakeInfoCli;
    } else if (id == 2) {
      return fakeInfoCli2;
    }
  };

  // excluir isso é fake
  const getProdOutdata = async (id) => {
    setIdCliReq(true);

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
    const resProductOut = await prductEntryOut(
      initialDate,
      finalDate,
      false,
      id
    );
    setIdCliReq(false);

    return resProductOut.data;
  };

  // excluir isso é fake
  const getProdEntryData = async (id) => {
    setIdProdReq(true);

    // faz a requisição e joga o resultado
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
    const resProductEntry = await prductEntryOut(
      initialDate,
      finalDate,
      true,
      id
    );

    console.log("entry", resProductEntry.data);

    setIdProdReq(false);
    return resProductEntry.data;
  };

  const getInfos = async () => {
    const prods = await getProducts();
    const supps = await getSupplier();
    const brands = await getBrand();
    const types = await getType();

    console.log(prods, supps, brands, types);

    setProductsArr([...prods.data]);
    setSupplierArr([...supps.data]);
    setBrandArr([...brands.data]);
    setTypeArr([...types.data]);

    const productArr = await getProdEntryData(idProd);
    const prodOutArr = await getProdOutdata(idCli);
    console.log("AAAAAAAA");
    console.log(productArr);
    console.log(prodOutArr);

    setEntryArr([...productArr]);
    setOutArr([...prodOutArr]);

    if (!!initialDate && !!finalDate) {
      const resIndicators = await stockIndicators(initialDate, finalDate);
      const resStock = await stockPeriod(initialDate, finalDate);
      const resSuplliers = await buysSupplier(initialDate, finalDate);
      const resBrands = await entryBrand(initialDate, finalDate);
      const resProducts = await entryProduct(initialDate, finalDate);
      const resTypes = await entryType(initialDate, finalDate);
      // SupplierArr
      const resSupplierInfo = await infoSupplier(
        initialDate,
        finalDate,
        ""
        // supps.data[0].id
      );
      const resProductEntry = await prductEntryOut(
        initialDate,
        finalDate,
        true,
        prods.data[0].id
      );
      const resProductOut = await prductEntryOut(
        initialDate,
        finalDate,
        false,
        prods.data[0].id
      );

      console.log(resIndicators);
      console.log(resStock);
      console.log(resSuplliers);
      console.log(resBrands);
      console.log(resProducts);
      console.log(resTypes);
      console.log(resSupplierInfo);
      console.log(resProductEntry);
      console.log(resProductOut);

      setIndicators(resIndicators.data);
      setEntrysPeriod([...resStock.data]);

      setEntrysPeriodArr(
        exportBuys([...resStock.data], productsArr, supplierArr)
      );

      setBuysSupplierArr([...resSuplliers.data]);
      setEntryProductsArr([...resProducts.data]);
      setEntryBrandsArr([...resBrands.data]);
      setEntryTypesArr([...resTypes.data]);

      const supPass = resSuplliers.data.map((e) => {
        return {
          fornecedor: e.fornecedor,
          quantidade: e.quantidade,
          custo_total: e.custo_total,
          id: e.id,
        };
      });

      const prodPass = resProducts.data.map((e) => {
        return {
          produto: e.produto,
          quantidade: e.quantidade,
          custo_total: e.custo_total,
          id: e.id,
        };
      });

      const brandPass = resBrands.data.map((e) => {
        return {
          marca: e.marca,
          quantidade: e.quantidade,
          custo_total: e.custo_total,
          id: e.id,
        };
      });

      const typePass = resTypes.data.map((e) => {
        return {
          categoria_produto: e.categoria_produto,
          quantidade: e.quantidade,
          custo_total: e.custo_total,
          id: e.id,
        };
      });

      setBuysSupplierArrPass([...supPass]);
      setEntryProductsArrPass([...prodPass]);
      setEntryBrandsArrPass([...brandPass]);
      setEntryTypesArrPass([...typePass]);

      //       fornecedor
      // quantidade
      // custo_total
      // id

      const productArr = await getProdEntryData(idProd);
      const prodOutArr = await getProdOutdata(idCli);
      const clientsInfoArr = await getInfoSupData(
        idCliInfo,
        initialDate,
        finalDate
      );
      // const supBuysArr = await functionName(initialDate, finalDate)
      // const prodEntrysArr = await functionName(initialDate, finalDate)
      // const brandEntrysArr = await functionName(initialDate, finalDate)
      // const typesEntrysArr = await functionName(initialDate, finalDate)

      console.log("arrays", productArr, prodOutArr, clientsInfoArr);

      setEntryArr([...productArr]);
      setOutArr([...prodOutArr]);
      // setSupplierInfoArr([...clientsInfoArr]);

      const corSupInfoArr = resSupplierInfo.data.map((e, i) => {
        return {
          produto: e.produto,
          quantidade: e.quantidade,
          custo_total: e.custo_total,
          categoria: e.categoria,
          marca: e.marca,
          // fornecedor: e.fornecedor,
          id: i,
        };
      });
      setSupplierInfoArr([...corSupInfoArr]);
      setSupplierInfoArrPass([...corSupInfoArr]);

      // setSupBuys([...supBuysArr])
      // setProdEntrys([...prodEntrysArr])
      // setBrandEntrys([...brandEntrysArr])
      // setTypesEntrys([...typesEntrysArr])
    }
  };

  const getProdEntryInfo = async (id) => {
    const productArr = await getProdEntryData(id);

    console.log("671", productArr);
    setEntryArr([...productArr]);
  };

  const getProdOutputInfo = async (id) => {
    const prodOutArr = await getProdOutdata(id, initialDate, finalDate);
    setOutArr([...prodOutArr]);
  };

  const getSupplierInfos = async (id) => {
    // const clientsInfoArr = await getInfoSupData(id, initialDate, finalDate);
    const resSupplierInfo = await infoSupplier(initialDate, finalDate, id);
    console.log(resSupplierInfo.data);
    const corSupInfoArr = resSupplierInfo.data.map((e, i) => {
      return {
        produto: e.produto,
        quantidade: e.quantidade,
        custo_total: e.custo_total,
        categoria: e.categoria,
        marca: e.marca,
        // fornecedor: e.fornecedor,
        id: i,
      };
    });
    console.log(corSupInfoArr);
    setSupplierInfoArr([...corSupInfoArr]);
    setSupplierInfoArrPass([...corSupInfoArr]);
  };

  // o useEffect tem q ser relacionado com o botão de gerar relatório
  // não pode carregar infos antes dele colocar a data e gerar o relatório
  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [generate]);

  // receber alguma coisa pra diferenciar entre prod e cli
  const MyResponsiveBar = ({ data, type }) => (
    <ResponsiveBar
      data={data}
      // precisa mais n
      // fzr requisição de com os nomes dos clientes q compraram, ou de todos os produtos
      // fzr requisição com os nomes dos produtos q o cliente comprou
      keys={["", "quantidade"]}
      // keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}

      indexBy="fornecedor"
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
          gerar relatório de <span className="font-bold ">estoque</span>{" "}
        </h1>
        <form onSubmit={handleSubmit(handleStockReport)} className="">
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
        <DivValues
          ShowValue={
            <ShowValues
              title="entradas"
              value={+indicators.totalEntrada}
              type="product"
            />
          }
        />
        <DivValues
          ShowValue={
            <ShowValues
              title="saídas"
              value={+indicators.totalSaida}
              type="product"
            />
          }
        />
        {/* <DivValues
          ShowValue={
            <ShowValues title="cancelados" value={100} type="product" />
          }
        /> */}
        {/* <DivValues
          ShowValue={
            <ShowValues title="Custo do Estoque" value={100} type="product" />
          }
        />
        <DivValues
          ShowValue={
            <ShowValues title="valor de venda" value={100} type="product" />
          }
        /> */}

        <div className="col-span-12 row-span-3">
          {/* BuysGrid change, moviments, movToPass */}
          {/* <SalesGrid report={true} /> */}
          <BuysGrid
            moviments={entrysPeriod}
            movToPass={entrysPeriodArr}
            report={true}
          />
        </div>

        <div className="col-span-12 md:col-span-6 row-span-3">
          {/* <ClientsReportGrid /> */}
          {/* <SmallReportGrid
            text="compras com fornecedores no periodo"
            columns={suppliersBuysCol}
            // moviments={supBuys}
            moviments={fakeSup}
            movToPass={fakeSup}
          /> */}
          <SupplierReportGrid
            moviments={buysSupplierArr}
            movToPass={buysSupplierArrPass}
            text="compras com fornecedores no periodo"
          />
        </div>

        <div className="col-span-12 md:col-span-6 row-span-3">
          {/* <ProductReportGrid /> */}
          {/* <SmallReportGrid
            text="entradas dos produtos no periodo"
            columns={suppliersBuysCol}
            // moviments={prodEntrys}
            moviments={fakeSup1}
            movToPass={fakeSup1}
          /> */}
          <ProdEntryReportGrid
            moviments={entryProductsArr}
            movToPass={entryProductsArrPass}
            text="entradas dos produtos no periodo"
          />
        </div>

        <div className="col-span-12 md:col-span-6 row-span-3">
          {/* <SmallReportGrid
            text="entradas das marcas no periodo"
            columns={suppliersBuysCol}
            // moviments={brandEntrys}
            moviments={fakeSup2}
            movToPass={fakeSup2}
          /> */}

          <BrandReportGrid
            moviments={entryBrandsArr}
            movToPass={entryBrandsArrPass}
            text="entradas das marcas no periodo"
          />
        </div>

        <div className="col-span-12 md:col-span-6 row-span-3">
          {/* <SmallReportGrid
            text="entradas dos tipos no periodo"
            columns={suppliersBuysCol}
            // moviments={typeEntrys}
            moviments={fakeSup3}
            movToPass={fakeSup3}
          /> */}
          <TypesReportGrid
            moviments={entryTypesArr}
            movToPass={entryTypesArrPass}
            text="entradas dos tipos no periodo"
          />
        </div>

        <div className="col-span-12 row-span-3 bg-[#B23F30] rounded-lg">
          <div className="flex px-5 pt-3 items-center gap-2">
            <p className="text-white">informe o fornecedor:</p>
            <select
              className="p-1 px-3 rounded border-[#C8C8C8] border"
              onChange={(e) => {
                console.log(e.target.value, "changeCli");
                // setIdCliInfo(e.target.value);
                getSupplierInfos(e.target.value);
              }}
            >
              <option value="">sem fornecedor</option>
              {/* <option value={2}>cli1</option> */}
              {supplierArr.map((e, i) => {
                return (
                  <option key={i} value={e.id}>
                    {e.nome_contato}
                  </option>
                );
              })}
            </select>
          </div>
          <SupplierInfoReport
            moviments={supplierInfoArr}
            movToPass={supplierInfoArrPass}
          />
        </div>

        <div className="bg-white col-span-12 row-span-3 rounded-lg p-5">
          <h2>Entradas do produto em estoque no periodo </h2>
          <div className="flex items-center gap-2 pt-1">
            <p>produto:</p>{" "}
            <select
              className="p-1 px-3 rounded bg-[#F3E2E0] border-[#C8C8C8] border"
              onChange={(e) => {
                // setIdProd(e.target.value);
                console.log(e.target.value, "changeProd");
                getProdEntryInfo(e.target.value);
              }}
            >
              {/* produtos que venderam no periodo */}
              {/* <option value={1}>prod1</option>
              <option value={2}>prod2</option>
              <option value={3}>prod2</option> */}
              {productsArr.map((e, i) => {
                return (
                  <option key={i} value={e.id}>
                    {e.nome}
                  </option>
                );
              })}
            </select>
          </div>
          {idProdReq ? (
            <div className="w-full h-full flex items-center justify-center">
              <CircularProgress size="48px" style={{ color: "#000000" }} />
            </div>
          ) : (
            <div className="w-full h-full">
              {entryArr.length == 0 ? (
                <p className="mt-8 font-bold">Não há informações</p>
              ) : (
                <MyResponsiveBar data={entryArr} />
              )}
            </div>
          )}
        </div>

        <div className="bg-white col-span-12 row-span-3 rounded-lg p-5">
          <h2>Saida do produto em estoque no periodo </h2>
          <div className="flex items-center gap-2 pt-1">
            <p>produto:</p>{" "}
            <select
              className="p-1 px-3 rounded bg-[#F3E2E0] border-[#C8C8C8] border"
              onChange={(e) => {
                // setIdCli(e.target.value);
                console.log(e.target.value, "changeCli");
                getProdOutputInfo(e.target.value);
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
            </select>
          </div>

          {idCliReq ? (
            <div className="w-full h-full flex items-center justify-center">
              <CircularProgress size="48px" style={{ color: "#000000" }} />
            </div>
          ) : (
            <div className="w-full h-full">
              {outArr.length == 0 ? (
                <p className="mt-8 font-bold">Não há informações</p>
              ) : (
                <MyResponsiveBar data={outArr} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StocksReports;
