import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { Box, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  categorysInfosValue,
  clientsInfosValue,
  getClients,
  getExpenseCategorys,
  getProducts,
  getRevenueCategorys,
  getServices,
  liquidRecipeMonth,
  productsInfosValue,
  servicesInfosValue,
  valuesDays,
  valuesDaysSeven,
  valuesMonths,
  valuesMonthsExpense,
} from "../../services/APIService";
import { SidebarContext } from "../../context/sidebarContext";

// console.log

function Dash() {
  const [months, setMonths] = useState(12);
  const [typeCat, setTypeCat] = useState("revenue");
  const [typeMonth, setTypeMonth] = useState("revenue");
  const [numMonth, setNumMonth] = useState("twelve");

  const { attData, attDataFunc } = useContext(SidebarContext);

  const [typeValuesDays, setTypeValuesDays] = useState("revenue");
  const [typeValuesMonth, setTypeValuesMonth] = useState("revenue");
  const [typeRev, setTypeRev] = useState("product");
  const [idCat, setIdCat] = useState(0);
  const [valueIdCat, setValueIdCat] = useState([]);

  const [catRevenue, setCatRevenue] = useState([]);
  const [catExpense, setCatExpense] = useState([]);
  const [clientsVal, setClientsVal] = useState([]);
  const [productsVal, setProductsVal] = useState([]);
  const [servsVal, setServsVal] = useState([]);

  const [monthData, setMonthData] = useState([
    // {
    //     id: 'Receita',
    //     color: "hsl(166, 70%, 50%)",
    //     data: [
    //       {x: '07', y: 20},
    //       {x: '08', y: 10}
    //     ]
    //   }
  ]);
  const [monthDataExp, setMonthDataExp] = useState([]);
  const [daysData, setDaysData] = useState([]);

  // const objRevenue = [{
  //   id: 'Receita',
  //   color: "hsl(166, 70%, 50%)",
  //   data: [
  //     // {x: '07', y: 20},
  //     // {x: '08', y: 10}
  //   ]
  // }]

  // {
  //     id: 'Receita',
  //     color: "hsl(166, 70%, 50%)",
  //     data: [
  //       {x: '07', y: 20},
  //       {x: '08', y: 10}
  //     ]
  //   }

  let objMonth = [
    {
      id: "Receita",
      color: "hsl(166, 70%, 50%)",
      data: [
        { x: "07", y: 20 },
        { x: "08", y: 10 },
      ],
    },
  ];

  let objMonthExp = [
    {
      id: "Receita",
      color: "hsl(166, 70%, 50%)",
      data: [
        { x: "07", y: 20 },
        { x: "08", y: 10 },
      ],
    },
  ];

  let objDays = [
    {
      id: "Receita",
      color: "hsl(166, 70%, 50%)",
      data: [
        { x: "07", y: 20 },
        { x: "08", y: 10 },
      ],
    },
  ];

  const objExpense = [
    {
      id: "Despesa",
      color: "red",
      data: [],
    },
  ];

  const isMediumLittleScreen = useMediaQuery("(max-width:800px)");

  // const getCatInfo = async () => {
  //   const resp = await categorysInfosValue(idCat);
  // console.log("resp", resp);
  // };

  // useEffect(() => {
  // console.log(idCat);
  //   getCatInfo();
  // }, [idCat]);

  const getInfos = async () => {
    // const newEl = Object.assign({}, el);

    const responseCat = await getRevenueCategorys();
    const responseCatEx = await getExpenseCategorys();
    const responseClients = await getClients();
    const responseProducts = await getProducts();
    const responseServices = await getServices();
    const responseMonthsValues = await valuesMonths(months);
    const responseMonthsValuesExpense = await valuesMonthsExpense(months);
    const responseDaysSeven = await valuesDaysSeven();
    const responseDaysValues = await valuesDays();

    const curYear = new Date().getFullYear();
    const lastYear = new Date().getFullYear() - 1;

    // console.log(responseDaysSeven)
    // console.log(responseMonthsValuesExpense)
    // console.log('DAYS --->>', responseDaysValues)
    // console.log('MONTHS --->>', responseMonthsValues)
    // console.log('MONTHS --->>', responseMonthsValues.data)
    // console.log('MONTHS --->>', responseMonthsValuesExpense)
    // console.log('MONTHS --->>', responseMonthsValuesExpense.data)

    const { years, data } = responseMonthsValues;
    // console.log(years, data.data)

    const { years: yearsExp, data: dataExp } = responseMonthsValuesExpense;

    const objRevenue = [
      {
        id: "Receita",
        color: "hsl(166, 70%, 50%)",
        data: [
          // {x: '08', y: 10}
          // {x: '07', y: 20},
          // {x: '08', y: 10}
        ],
      },
    ];

    const objExpense = [
      {
        id: "Despesa",
        color: "hsl(166, 70%, 50%)",
        data: [
          // {x: '08', y: 10}
          // {x: '07', y: 20},
          // {x: '08', y: 10}
        ],
      },
    ];

    const objRevenueDays = [
      {
        id: "Receita",
        color: "hsl(166, 70%, 50%)",
        data: [
          // {x: '08', y: 10}
          // {x: '07', y: 20},
          // {x: '08', y: 10}
        ],
      },
    ];

    const objRevenueDaysDays = [
      {
        id: "Receita",
        color: "hsl(166, 70%, 50%)",
        data: [
          // {x: '08', y: 10}
          // {x: '07', y: 20},
          // {x: '08', y: 10}
        ],
      },
    ];

    const catsRevValues = await responseCat.data.map((el) => {
      const newEl = Object.assign({}, el);
      let val;
      // console.log(newEl.categoria_receita_id);
      // console.log(newEl.nome);

      return {
        id: newEl.nome,
        id2: newEl.categoria_receita_id,
        label: newEl.nome,
        value: val,
        color: "hsl(350, 70%, 50%)",
      };
    });

    const catsExpValues = await responseCatEx.data.map((el) => {
      const newEl = Object.assign({}, el);
      let val;
      // console.log(newEl.categoria_despesa_id);
      // console.log(newEl.nome);

      return {
        id: newEl.nome,
        id2: newEl.categoria_despesa_id,
        label: newEl.nome,
        value: val,
        color: "hsl(350, 70%, 50%)",
      };
    });

    const clientsValues = await responseClients.data.map((el, i) => {
      const newEl = Object.assign({}, el);
      let val;
      // console.log(newEl.categoria_despesa_id);
      // console.log(newEl.nome);

      return {
        id: newEl.nome,
        id2: newEl.id,
        id3: i,
        label: newEl.nome,
        value: val,
        color: "hsl(350, 70%, 50%)",
      };
    });

    const productsValues = await responseProducts.data.map((el, i) => {
      const newEl = Object.assign({}, el);
      let val;
      // console.log(newEl.categoria_despesa_id);
      // console.log(newEl.nome);

      return {
        id: newEl.nome,
        id2: newEl.id,
        id3: i,
        label: newEl.nome,
        value: val,
        color: "hsl(350, 70%, 50%)",
      };
    });

    const servicesValues = await responseServices.data.map((el, i) => {
      const newEl = Object.assign({}, el);
      let val;
      // console.log(newEl.categoria_despesa_id);
      // console.log(newEl.nome);

      return {
        id: newEl.nome,
        id2: newEl.id,
        id3: i,
        label: newEl.nome,
        value: val,
        color: "hsl(350, 70%, 50%)",
      };
    });

    // console.log(catsRevValues);

    // console.log(catsExpValues);

    // console.log(clientsValues);

    for (let obj of catsRevValues) {
      const response = await categorysInfosValue(obj.id2);
      obj.value = response.data.receita;
      // console.log(obj);
    }

    for (let obj of catsExpValues) {
      const response = await categorysInfosValue(obj.id2);
      obj.value = response.data.despesa;
      // console.log(obj);
    }

    for (let obj of clientsValues) {
      const response = await clientsInfosValue(obj.id2);
      obj.value = response.data.receita;
      // console.log(obj);
    }

    for (let obj of productsValues) {
      const response = await productsInfosValue(obj.id2);
      obj.value = response.data.receita;
      // console.log(obj);
    }

    for (let obj of servicesValues) {
      const response = await servicesInfosValue(obj.id2);
      obj.value = response.data.receita;
      // console.log(obj);
    }

    const arrLastYear = responseMonthsValues.data.data[`${lastYear}`];
    const arrCurYear = responseMonthsValues.data.data[`${curYear}`];
    const arrDaysValues = responseDaysValues.data;

    // responseMonthsValuesExpense
    const arrLastYearExp = responseMonthsValuesExpense.data.data[`${lastYear}`];
    const arrCurYearExp = responseMonthsValuesExpense.data.data[`${curYear}`];
    const arrDaysValuesExp = responseMonthsValuesExpense.data;

    // console.log(arrDaysValues)

    // console.log('arrs ->',arrLastYear, arrCurYear)

    // for (let i in arrDaysValues['2024']['01']) {
    // console.log('a')
    // console.log(i, arrDaysValues[i])
    // console.log('aaaaaaaaaaiiii' ,+i)

    //   // qnd for colocar a do outro ano passar o id nesse formato -> +`1${+i}`
    // objRevenueDays[0].data.push({x: i, y: arrDaysValues[i], dayNum: +i })
    //   objDays[0] = objRevenueDays
    // }

    for (let i in responseDaysSeven.data) {
      // console.log('a')
      // console.log(i, responseDaysSeven.data[i])
      // console.log('aaaaaaaaaaiiii' ,+i)

      // qnd for colocar a do outro ano passar o id nesse formato -> +`1${+i}`
      objRevenueDays[0].data.push({
        x: i,
        y: responseDaysSeven.data[i],
        dayNum: +i,
      });
      objDays[0] = objRevenueDays;
    }

    for (let i in arrLastYearExp) {
      // console.log('a')
      // console.log(i, arrLastYearExp[i])
      // console.log('aaaaaaaaaaiiii' ,+i)

      // qnd for colocar a do outro ano passar o id nesse formato -> +`1${+i}`
      objExpense[0].data.push({ x: i, y: arrLastYearExp[i], monthNum: +i });

      // objExpense[0].data[+i] = ({x: i, y: arrLastYearExp[i]})

      // objExpense[0].data.push({x: '08', y: 10})
      objMonthExp[0] = objExpense;

      // setMonthData([...monthData, {x: i, y: i + 1}])
      // console.log(monthData)
    }

    for (let i in arrCurYearExp) {
      // console.log('a')
      // console.log(i, arrCurYearExp[i])
      // console.log('aaaaaaaaaaiiii' ,+i)

      // qnd for colocar a do outro ano passar o id nesse formato -> +`1${+i}`
      objExpense[0].data.push({
        x: i,
        y: arrCurYearExp[i],
        monthNum: +`10${+i}`,
      });

      // objExpense[0].data[+i] = ({x: i, y: arrLastYear[i]})

      // objExpense[0].data.push({x: '08', y: 10})
      objMonthExp[0] = objExpense;

      // setMonthData([...monthData, {x: i, y: i + 1}])
      // console.log(monthData)
    }

    for (let i in arrLastYear) {
      // console.log('a')
      // console.log(i, arrLastYear[i])
      // console.log('aaaaaaaaaaiiii' ,+i)

      // qnd for colocar a do outro ano passar o id nesse formato -> +`1${+i}`
      objRevenue[0].data.push({ x: i, y: arrLastYear[i], monthNum: +i });

      // objRevenue[0].data[+i] = ({x: i, y: arrLastYear[i]})

      // objRevenue[0].data.push({x: '08', y: 10})
      objMonth[0] = objRevenue;

      // setMonthData([...monthData, {x: i, y: i + 1}])
      // console.log(monthData)
    }

    for (let i in arrCurYear) {
      // console.log('a')
      // console.log(i, arrCurYear[i])
      // console.log('aaaaaaaaaaiiii' ,+i)

      // qnd for colocar a do outro ano passar o id nesse formato -> +`1${+i}`
      objRevenue[0].data.push({ x: i, y: arrCurYear[i], monthNum: +`10${+i}` });

      // objRevenue[0].data[+i] = ({x: i, y: arrLastYear[i]})

      // objRevenue[0].data.push({x: '08', y: 10})
      objMonth[0] = objRevenue;

      // setMonthData([...monthData, {x: i, y: i + 1}])
      // console.log(monthData)
    }

    // years == 'two'

    objRevenue[0].data = objRevenue[0].data.sort(
      (a, b) => a.monthNum - b.monthNum
    );
    objRevenueDays[0].data = objRevenueDays[0].data.sort(
      (a, b) => b.dayNum - a.dayNum
    );

    // console.log(objRevenue)
    // console.log(objRevenueDays)

    // console.log(objMonth)

    // console.log(years)
    // console.log( responseMonthsValues.data.data)

    // for (let prop in   responseMonthsValues.data.data) {
    //   // setMonthData()
    // console.log("obj." + prop + " = " + await responseMonthsValues.data.data[prop]);
    // }
    console.log("catRev -> ", catsRevValues);
    setCatRevenue(catsRevValues);
    setCatExpense(catsExpValues);
    setClientsVal(clientsValues);
    setProductsVal(productsValues);
    setServsVal(servicesValues);
    setMonthData([objRevenue[0]]);
    setMonthDataExp([objExpense[0]]);
    // criar o setMonth pra expense e colocar objExpense[0]
    // setMonthData([objRevenue[0]])

    setDaysData([objRevenueDays[0]]);

    // const responseCats = await categorysInfosValue(2);
    // console.log("categoria", responseCats);
  };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

  const circularGraphicResp = () => {
    if (!isMediumLittleScreen) {
      return {
        gridColumn: "span 6",
      };
    } else if (isMediumLittleScreen) {
      return {
        gridColumn: "span 12",
      };
    }
  };

  const lineGraphicResp = () => {
    if (!isMediumLittleScreen) {
      return {
        gridColumn: "span 12",
      };
    } else if (isMediumLittleScreen) {
      return {
        gridColumn: "span 12",
      };
    }
  };

  const lideTestData = [
    {
      id: "japan",
      color: "hsl(350, 70%, 50%)",
      data: [
        {
          x: "jan",
          y: 80,
        },
        {
          x: "fev",
          y: 43,
        },
        {
          x: "mar",
          y: 76,
        },
        {
          x: "abr",
          y: 190,
        },
        {
          x: "maio",
          y: 268,
        },
        {
          x: "jun",
          y: 13,
        },
        {
          x: "jul",
          y: 5,
        },
      ],
    },
  ];

  const testData = [
    {
      id: "rust",
      label: "rust",
      value: 346,
      color: "hsl(340, 70%, 50%)",
    },
    {
      id: "ruby",
      label: "ruby",
      value: 38,
      color: "hsl(166, 70%, 50%)",
    },
    {
      id: "go",
      label: "go",
      value: 174,
      color: "hsl(238, 70%, 50%)",
    },
    {
      id: "java",
      label: "java",
      value: 446,
      color: "hsl(181, 70%, 50%)",
    },
    {
      id: "sass",
      label: "sass",
      value: 549,
      color: "hsl(18, 70%, 50%)",
    },
  ];

  const MyResponsiveLineDays = ({ data /* see data tab */ }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 40, bottom: 100, left: 35 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      // legends={[
      //   {
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 100,
      //     translateY: 0,
      //     itemsSpacing: 0,
      //     itemDirection: "left-to-right",
      //     itemWidth: 80,
      //     itemHeight: 20,
      //     itemOpacity: 0.75,
      //     symbolSize: 12,
      //     symbolShape: "circle",
      //     symbolBorderColor: "rgba(0, 0, 0, .5)",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemBackground: "rgba(0, 0, 0, .03)",
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );

  const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 40, bottom: 100, left: 35 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      // legends={[
      //   {
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 100,
      //     translateY: 0,
      //     itemsSpacing: 0,
      //     itemDirection: "left-to-right",
      //     itemWidth: 80,
      //     itemHeight: 20,
      //     itemOpacity: 0.75,
      //     symbolSize: 12,
      //     symbolShape: "circle",
      //     symbolBorderColor: "rgba(0, 0, 0, .5)",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemBackground: "rgba(0, 0, 0, .03)",
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );

  const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 0, right: 60, bottom: 120, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: -15,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );

  return (
    <Box
      m="0px"
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridAutoRows: "150px",
        gap: "20px",
        padding: "20px",
      }}
      className="animationStartRight"
    >
      <Box
        // backgroundColor="red"
        // gridColumn="span 6"
        gridRow="span 3 "
        // borderRadius="12px"
        p="15px"
        backgroundColor="#FFFFFF"
        border="1px solid #C8C8C8"
        borderRadius="9px"
        sx={circularGraphicResp}
      >
        <p>Valores de cada categoria no mês</p>
        <select
          onChange={(e) => setTypeCat(e.target.value)}
          style={{
            backgroundColor: "#F3E2E0",
            borderColor: "#C8C8C8",
            fontSize: "14px",
            padding: "4px 6px",
            borderRadius: "4px",
          }}
        >
          <option value="revenue">Receita</option>
          <option value="expense">Despesa</option>
        </select>
        {typeCat == "revenue" ? (
          <Box width="100%" height="100%">
            {catRevenue.length == 0 && <p>Não há informações</p>}
            <MyResponsivePie data={catRevenue} />
          </Box>
        ) : (
          <Box width="100%" height="100%">
            {catExpense.length == 0 && <p>Não há informações</p>}

            <MyResponsivePie data={catExpense} />
          </Box>
        )}
        {/* <MyResponsivePie
          data={typeCat == "revenue" ? catRevenue : catExpense}
        /> */}
      </Box>
      {/* map */}

      <Box
        // backgroundColor="red"
        // gridColumn="span 6"
        gridRow="span 3 "
        // borderRadius="12px"
        p="15px"
        backgroundColor="#FFFFFF"
        border="1px solid #C8C8C8"
        borderRadius="9px"
        sx={circularGraphicResp}
      >
        <p>Valores de cada produto no mês</p>
        <select
          onChange={(e) => setTypeRev(e.target.value)}
          style={{
            backgroundColor: "#F3E2E0",
            borderColor: "#C8C8C8",
            fontSize: "14px",
            padding: "4px 6px",
            borderRadius: "4px",
          }}
        >
          <option value="product">Produtos</option>
          <option value="service">Serviços</option>
        </select>
        {/* servsVal */}
        {/* {productsVal } */}
        {typeRev == "product" ? (
          <Box width="100%" height="100%">
            {productsVal.length == 0 && <p>Não há informações</p>}
            <MyResponsivePie data={productsVal} />
          </Box>
        ) : (
          <Box width="100%" height="100%">
            {servsVal.length == 0 && <p>Não há informações</p>}
            <MyResponsivePie data={servsVal} />
          </Box>
        )}
        {/* // <MyResponsivePie */}
        {/* //   data={typeRev == "product" ? productsVal : undefined} */}
        {/* // /> */}
      </Box>

      <Box
        // backgroundColor="red"
        gridColumn="span 6"
        gridRow="span 3 "
        // borderRadius="12px"
        p="15px"
        backgroundColor="#FFFFFF"
        border="1px solid #C8C8C8"
        borderRadius="9px"
        sx={circularGraphicResp}
      >
        <p style={{ paddingBottom: "30px" }}>Valores de cada cliente no mês</p>
        {/* <select
          style={{
            backgroundColor: "#F3E2E0",
            borderColor: "#C8C8C8",
            fontSize: "14px",
            padding: "4px 6px",
            borderRadius: "4px",
          }}
        >
          <option>Produtos</option>
          <option>Serviços</option>
        </select> */}
        <Box width="100%" height="100%">
          {clientsVal.length == 0 && <p>Não há informações</p>}

          <MyResponsivePie data={clientsVal} />
        </Box>
      </Box>

      <Box
        // backgroundColor="red"
        gridColumn="span 6"
        gridRow="span 3 "
        // borderRadius="12px"
        p="15px"
        backgroundColor="#FFFFFF"
        border="1px solid #C8C8C8"
        borderRadius="9px"
        sx={circularGraphicResp}
      >
        <p style={{ paddingBottom: "20px" }}>
          Receita arrecadada nos últimos 7 dias
        </p>

        {/* <select
          style={{
            backgroundColor: "#F3E2E0",
            borderColor: "#C8C8C8",
            fontSize: "14px",
            padding: "4px 6px",
            borderRadius: "4px",
          }}
        >
          <option>Produtos</option>
          <option>Serviços</option>
        </select> */}
        <Box width="100%" height="100%">
          {clientsVal.length == 0 && <p>Não há informações</p>}

          <MyResponsiveLineDays data={daysData} />
        </Box>
      </Box>

      <Box // backgroundColor="red"
        // gridColumn="span 8"
        gridRow="span 3 "
        // borderRadius="12px"
        p="15px"
        backgroundColor="#FFFFFF"
        border="1px solid #C8C8C8"
        borderRadius="9px"
        sx={lineGraphicResp}
      >
        <p>Valores dos últimos meses</p>
        <Box display="flex" gap="10px">
          <select
            onChange={(e) => {
              // console.log(+e.target.value)
              setMonths(+e.target.value);
              attDataFunc();
            }}
            style={{
              backgroundColor: "#F3E2E0",
              borderColor: "#C8C8C8",
              fontSize: "14px",
              padding: "4px 6px",
              borderRadius: "4px",
            }}
          >
            <option value="12">12 meses</option>
            <option value="6">6 meses</option>
            <option value="3">3 meses</option>
          </select>
          <select
            onChange={(e) => setTypeMonth(e.target.value)}
            style={{
              backgroundColor: "#F3E2E0",
              borderColor: "#C8C8C8",
              fontSize: "14px",
              padding: "4px 6px",
              borderRadius: "4px",
            }}
          >
            <option value="revenue">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </Box>

        {/* outro select com a opções de 12 meses 6 e 3 FECHADO */}
        <Box width="100%" height="100%">
          {monthData.length == 0 && <p>Não há informações</p>}
          {/* {monthData.length == 0 && <MyResponsiveLine data={monthData} />} */}
          {/* setMonthDataExp */}
          {/* <MyResponsiveLine data={monthData} /> */}
          {/* <MyResponsiveLine data={monthDataExp} /> */}
          {typeMonth == "revenue" ? (
            <MyResponsiveLine data={monthData} />
          ) : (
            <MyResponsiveLine data={monthDataExp} />
          )}
        </Box>
        {/* <MyResponsiveLine data={objMonth} /> */}
      </Box>
    </Box>
  );
}

export default Dash;
