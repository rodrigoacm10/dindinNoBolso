import { Box } from "@mui/material";
import ProductsGrid from "../../components/ProductsGrid";
// import ShowValues from "../../components/showValues";
import MovimentsGrid from "../../components/MovimentsGrid";
import SalesGrid from "../../components/SalesGrid";
import BuysGrid from "../../components/BuysGrid";
import { useContext, useEffect, useState } from "react";
import {
  getProducts,
  getStock,
  getStockExpense,
  getStockNotReceived,
  getSupplier,
} from "../../services/APIService";
import ProductsSimpleGrid from "../../components/productSimpleGrid";
import SupplierGrid from "../../components/supplierGrid";
import { SidebarContext } from "../../context/sidebarContext";
import ShowValues from "../../components/ShowValues";

function Buys() {
  const DivValues = ({ ShowValue }) => {
    return (
      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-6 md:col-span-4"
      >
        {ShowValue}
      </div>
    );
  };

  const [stockNotReceivedVal, setStockNotReceivedVal] = useState(0);
  const [stockInstallmentsVal, setStockInstallmentsVal] = useState(0);
  const [stockExpenseVal, setStockExpenseVal] = useState(0);

  //   name
  // value
  // stock
  // tipo
  // supplier
  // mark
  // stockMin
  // stockMax
  // produto_id
  // id

  const allMovs = [
    {
      name: "testNome",
      value: "120.00",
      stock: 15,
      tipo: 1,
      supplier: 1,
      mark: 1,
      product: 1,
      client: 1,
      efetuado: true,
      createdAt: "2024-03-14T18:21:54.248Z",
      code: "codeaaaa",
      formPayment: "à vista",
      id: 16,
      produto_id: 1,

      stockMin: 10,
      stockMax: 20,
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
      formPayment: "à vista",

      produto_id: "abc",
      servico_id: null,
      typeMov: "receita",
      updatedAt: "2024-03-14T18:21:54.248Z",
      usuario_id: "f956c814-822b-4341-826c-7daa841cec99",
      valor: "120.00",
    },
  ];

  const [stockArr, setStockArr] = useState([]);
  // const [supplierArr, setSupplierArr] = useState([]);
  // const [productsArr, setProductsArr] = useState([]);

  const [movsToPass, setMovsToPass] = useState([]);

  const {
    attData,
    productsArr,
    setProductsArr,
    supplierArr,
    setSupplierArr,
    setLoading,
  } = useContext(SidebarContext);

  const getInfos = async () => {
    const stocks = await getStock();
    const suppliers = await getSupplier();
    const products = await getProducts();

    const stockNotReceived = await getStockNotReceived();
    // totalNaoRecebido
    const stockExpense = await getStockExpense();
    // parcelas - total_a_pagar

    console.log("aaa", stockNotReceived, stockExpense);

    console.log("stock", stocks);

    const correctingIdToName = stocks.data
      .filter((e) => e.entrada == true)
      .map((el) => {
        //  tem q ver se é despesa ou receita ainda
        const newEl = Object.assign({}, el);

        let catName;
        // if (newEl.typeMov == "receita") {
        //   catName = responseCat.data.find(
        //     (cat) => cat.categoria_receita_id == newEl.category
        //   );
        // } else if (newEl.typeMov == "despesa") {
        //   catName = responseCatEx.data.find(
        //     (cat) => cat.categoria_despesa_id == newEl.category
        //   );
        // }

        // trocar para produto
        const productName = products.data.find((prod) => {
          newEl.Produto = "-";
          const product = prod.id == newEl.produto_id;
          if (product) {
            newEl.Produto = prod.nome;

            return prod.nome;
          }
          return product;
        });

        // trocar para fornecedor
        const supplierName = suppliers.data.find((sup) => {
          newEl.Fornecedor = "-";
          const supplier = sup.id == newEl.fornecedor_id;
          if (supplier) {
            // console.log("supplier -><", sup);
            newEl.Fornecedor = sup.nome_contato;

            return sup.nome_contato;
          }
          return supplier;
        });

        // trocar para marca
        // const brandName = brands.data.find((bra) => {
        //   newEl.Marca = "-";
        //   const brand = bra.id == newEl.marca_id;
        //   if (brand) {
        //     newEl.Marca = bra.nome;

        //     return bra.nome;
        //   }
        //   return brand;
        // });

        const dateArr = newEl.data.split("-");
        const corDate = [dateArr[2], "/", dateArr[1], "/", dateArr[0]].join("");

        // newEl.Categoria = catName?.nome;
        newEl.Data = corDate;
        // newEl.Efetuado = newEl.efetuado == true ? "EFETUADO" : "NÂO EFETUADO";
        // newEl.Tipo = newEl.typeMov;

        return {
          id: newEl.id,
          data: newEl.Data,
          // nome: newEl.nome,
          // codigo: newEl.codigo_referencia,
          valor: `R$ ${newEl.preco_total}`,
          produto: newEl.Produto,
          quantidade: newEl.quantidade,
          // estoque: newEl.estoque_atual,
          // tipo: newEl.Tipo,
          fornecedor: newEl.Fornecedor,
          pagamento:
            newEl.tipo_pagamento == "vista+prazo"
              ? "entrada + parcelas"
              : `à ${newEl.tipo_pagamento}`,
          valor_parcelas: `R$ ${newEl.valor_parcelas}`,
          parcelas: newEl.parcelas,

          // marca: newEl.Marca,
          // estoqueMin: newEl.estoque_minimo,
          // estoqueMax: newEl.estoque_maximo,
          nota_fiscal: newEl.nota_fiscal,
          observacao: newEl.descricao,
        };
      });

    setMovsToPass(correctingIdToName);
    // vamo passar +- assim, mas essa infos de testVal tem q estar no primeiro mov no correctingIdToName[0] botar assim -> correctingIdToName[0].testVal1: "100"
    // console.log([
    //   { testVal1: "100", testVal2: "200", testVal3: "300", testVal4: "400" },
    //   ...correctingIdToName,
    // ]);
    // apagar dps
    setStockArr([...stocks.data.filter((e) => e.entrada == true)]);
    setSupplierArr([...suppliers.data]);
    setProductsArr([...products.data]);
    setStockNotReceivedVal(+stockNotReceived.data.totalNaoRecebido);
    setStockInstallmentsVal(+stockExpense.data.parcelas);
    setStockExpenseVal(+stockExpense.data.total_a_pagar);

    setLoading(false);

    console.log(
      stockNotReceived.data.totalNaoRecebido,
      +stockExpense.data.parcelas,
      stockExpense.data.total_a_pagar
    );
  };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

  return (
    <div
      style={{ gridAutoRows: "150px" }}
      className="m-5 min-h-screen   grid grid-cols-12 gap-5"
    >
      <DivValues
        ShowValue={
          <ShowValues
            title="compras não recebidas"
            // title="ver"
            value={stockNotReceivedVal}
            type="product"
          />
        }
      />

      <DivValues
        ShowValue={
          <ShowValues
            title="parcelas a pagar"
            // title="ver"
            value={stockInstallmentsVal}
            type="product"
          />
        }
      />

      {/* noOne sales */}
      <DivValues
        ShowValue={
          <ShowValues
            // title="Devolução de Pedidos"
            title="valores a pagar"
            value={stockExpenseVal}
            type="onlyMoney"
          />
        }
      />

      {/* <DivValues
        ShowValue={
          <ShowValues title={`Vendas \n(7 dias)`} value={100} type="sales" />
        }
      /> */}

      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-12 row-span-3 md:row-span-4"
      >
        {/* <ProductsGrid moviments={allMovs} movToPass={allMovsString} /> */}
        <BuysGrid moviments={stockArr} movToPass={movsToPass} />
      </div>

      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-12 md:col-span-6 row-span-2 md:row-span-3"
      >
        <ProductsSimpleGrid moviments={productsArr} />
      </div>

      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-12 md:col-span-6 row-span-2 md:row-span-3"
      >
        <SupplierGrid supplierData={supplierArr} />
      </div>
    </div>
  );
}

export default Buys;
