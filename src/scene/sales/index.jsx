import { Box } from "@mui/material";
import ProductsGrid from "../../components/ProductsGrid";
// import ShowValues from "../../components/showValues";
import MovimentsGrid from "../../components/MovimentsGrid";
import SalesGrid from "../../components/SalesGrid";
import ClientsGrid from "../../components/ClientsGrid";
import ProductsSimpleGrid from "../../components/productSimpleGrid";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import {
  getBrand,
  getClients,
  getProducts,
  getSales,
  getSupplier,
  salesMonth,
  salesUnitsIndicators,
  salesWeek,
} from "../../services/APIService";
import ShowValues from "../../components/ShowValues";
import { exportSales } from "../../utils/toExportData";

function Sales() {
  const DivValues = ({ ShowValue }) => {
    return (
      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-6 md:col-span-3"
      >
        {ShowValue}
      </div>
    );
  };

  // const [productsArr, setProductsArr] = useState([]);
  // const [clientsArr, setClientsArr] = useState([]);
  const [salesToPass, setSalesToPass] = useState([]);
  const [indicators, setIndicators] = useState({
    month: 0,
    week: 0,
    yearUnits: 0,
    monthUnits: 0,
  });

  const {
    attData,
    clientsArr,
    setClientsArr,
    productsArr,
    setProductsArr,
    salesArr,
    setSalesArr,

    supplierArr,
    setSupplierArr,
    brandArr,
    setBrandArr,
    setLoading,
  } = useContext(SidebarContext);

  const getInfos = async () => {
    const products = await getProducts();
    const clients = await getClients();
    const sales = await getSales();

    const brands = await getBrand();
    const suppliers = await getSupplier();

    const valMonth = await salesMonth();
    const valWeek = await salesWeek();

    const valUnits = await salesUnitsIndicators();

    console.log(valUnits);

    // getSales
    // getOneSale
    // addSale

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
        produto: e.produtos[0].produto_id,
        quantidade: +e.produtos[0].quantidade,
        tipo_pagamento: e.tipo_pagamento,
        valor_entrada: e.valor_entrada,
        valor_parcelas: e.valor_parcelas,
      };
    });

    //

    console.log("cor->", corSales);

    setProductsArr([...products.data]);
    setClientsArr([...clients.data]);
    // sales.data
    console.log("salesCOr_", corSales);
    setSalesArr([...corSales]);
    setSalesToPass([...exportSales(corSales, clients.data, products.data)]);

    setSupplierArr([...suppliers.data]);
    setBrandArr([...brands.data]);
    setLoading(false);
    console.log("SALES ->", sales);
    console.log("-a-", products.data);
    console.log("-d-", clients.data);
    console.log("ainasda");
    console.log(valMonth.vendasValorTotal);
    console.log(valWeek.vendasValorTotal);

    setIndicators({
      month: valMonth.data.vendasValorTotal,
      week: valWeek.data.vendasValorTotal,
      yearUnits: valUnits.data.vendasAnoPassado,
      monthUnits: valUnits.data.vendasMesPassado,
    });
  };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

  const allMovs = [
    {
      data: "2024-06-06",
      data_pagamento: "2024-06-06",
      observacao: "obsBe",
      parcelas: 1,
      preco_total: 60,
      produtos: [
        {
          preco_vendas: 20,
          quantidade: 3,
          produto_id: 2,
        },
      ],
      tipo_pagamento: "vista",
      valor_entrada: 0,
      valor_parcelas: 0,
      cliente_id: 1,
    },
  ];

  const allMovsString = [
    {
      anexo: null,
      categoria_receita_id: "abxs",
      category: "aaa",
      cliente_id: "bbb",
      createdAt: "2024-03-14T18:21:54.248Z",
      data: "2024-03-14",
      descricao: "a",
      efetuado: true,
      id: 15,
      product: 1,
      client: 1,
      formPayment: "debito",

      produto_id: "abc",
      servico_id: null,
      typeMov: "receita",
      updatedAt: "2024-03-14T18:21:54.248Z",
      usuario_id: "f956c814-822b-4341-826c-7daa841cec99",
      valor: "120.00",
    },
  ];

  return (
    <div
      style={{ gridAutoRows: "150px" }}
      className="m-5 min-h-screen pb-5  grid grid-cols-12 gap-5"
    >
      <DivValues
        ShowValue={
          <ShowValues
            title="Unidades vendidas (ano)"
            value={+indicators.yearUnits}
            type="noOne"
          />
        }
        //
      />

      <DivValues
        ShowValue={
          <ShowValues
            title="Unidades vendidas (30 dias)"
            value={+indicators.monthUnits}
            type="noOne"
          />
        }
      />

      <DivValues
        ShowValue={
          <ShowValues
            title="Vendas (30 dias)"
            value={+indicators.month}
            type="onlyMoney"
          />
        }
      />

      <DivValues
        ShowValue={
          <ShowValues
            title={`Vendas \n(7 dias)`}
            value={+indicators.week}
            type="onlyMoney"
          />
        }
      />

      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-12 row-span-3 md:row-span-4"
      >
        {/* <ProductsGrid moviments={allMovs} movToPass={allMovsString} /> */}
        <SalesGrid moviments={salesArr} movToPass={salesToPass} />
      </div>

      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-12 md:col-span-6 row-span-2"
      >
        <ProductsSimpleGrid moviments={productsArr} />
      </div>

      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-12 md:col-span-6 row-span-2"
      >
        <ClientsGrid clientsData={clientsArr} />
      </div>
    </div>
  );
}

export default Sales;
