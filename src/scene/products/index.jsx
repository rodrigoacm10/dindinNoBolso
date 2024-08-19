import { Box } from "@mui/material";
import ProductsGrid from "../../components/ProductsGrid";
// import ShowValues from "../../components/showValues";
import MovimentsGrid from "../../components/MovimentsGrid";
import { useContext, useEffect, useState } from "react";
import {
  getBrand,
  getProducts,
  getProductsBelow,
  getProductsSaleCost,
  getStockWeekEntry,
  getSupplier,
  getType,
} from "../../services/APIService";
import { SidebarContext } from "../../context/sidebarContext";
import BrandGrid from "../../components/brandGrid";
import ClientsGrid from "../../components/ClientsGrid";
import TypeGrid from "../../components/TypeGrid";
import SupplierGrid from "../../components/supplierGrid";
import ShowValues from "../../components/ShowValues";

function Products() {
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

  const [movsToPass, setMovsToPass] = useState([]);
  // const [productArr, setProductArr] = useState([]);
  // const [brandArr, setBrandArr] = useState([]);
  // const [typeArr, setTypeArr] = useState([]);
  // const [supplierArr, setSupplierArr] = useState([]);
  const [productsBelowVal, setProductsBelowVal] = useState(0);
  const [productsSaleCostVal, setProductsSaleCostVal] = useState(0);
  const [stockWeekEntryVal, setStockWeekEntryVal] = useState(0);

  const {
    attData,
    productsArr: productArr,
    setProductsArr: setProductArr,
    supplierArr,
    setSupplierArr,
    brandArr,
    setBrandArr,
    typeArr,
    setTypeArr,
  } = useContext(SidebarContext);

  const getInfos = async () => {
    const products = await getProducts();
    const brands = await getBrand();
    const types = await getType();
    const suppliers = await getSupplier();

    const productsBelow = await getProductsBelow();
    const productsSaleCost = await getProductsSaleCost();
    const stockWeekEntry = await getStockWeekEntry();

    console.log(productsBelow, productsSaleCost, stockWeekEntry);

    const correctingIdToName = products.data.map((el) => {
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

      // trocar para tipo
      const typeName = types.data.find((ty) => {
        newEl.Tipo = "-";
        const type = ty.id == newEl.categoria_produto_id;
        if (type) {
          newEl.Tipo = ty.nome;

          return ty.nome;
        }
        return type;
      });

      // trocar para fornecedor
      const supplierName = suppliers.data.find((sup) => {
        newEl.Fornecedor = "-";
        const supplier = sup.id == newEl.fornecedor_id;
        if (supplier) {
          console.log("supplier -><", sup);
          newEl.Fornecedor = sup.nome_contato;

          return sup.nome_contato;
        }
        return supplier;
      });

      // trocar para marca
      const brandName = brands.data.find((bra) => {
        newEl.Marca = "-";
        const brand = bra.id == newEl.marca_id;
        if (brand) {
          newEl.Marca = bra.nome;

          return bra.nome;
        }
        return brand;
      });

      // const dateArr = newEl.data.split("-");
      // const corDate = [dateArr[2], "/", dateArr[1], "/", dateArr[0]].join("");

      // newEl.Categoria = catName?.nome;
      // newEl.Data = corDate;
      // newEl.Efetuado = newEl.efetuado == true ? "EFETUADO" : "NÂO EFETUADO";
      // newEl.Tipo = newEl.typeMov;

      return {
        // data: newEl.Data,
        nome: newEl.nome,
        codigo: newEl.codigo_referencia,
        valor: `R$ ${newEl.preco}`,
        estoque: newEl.estoque_atual,
        tipo: newEl.Tipo,
        fornecedor: newEl.Fornecedor,
        marca: newEl.Marca,
        estoqueMin: newEl.estoque_minimo,
        estoqueMax: newEl.estoque_maximo,
        observacao: newEl.observacao,
        id: newEl.id,
      };
    });

    setMovsToPass(correctingIdToName);
    setProductArr([...products.data]);
    setBrandArr([...brands.data]);
    setTypeArr([...types.data]);
    setSupplierArr([...suppliers.data]);

    setProductsBelowVal(+productsBelow.data.abaixoDoEstoque);
    setProductsSaleCostVal(+productsSaleCost.data.valorTotal);
    setStockWeekEntryVal(+stockWeekEntry.data.quantidadeTotal);

    console.log("-a-", products.data);
    console.log("-b-", brands.data);
    console.log("-c-", types.data);
    console.log("-d-", suppliers.data);
  };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

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

      id: 16,
      produto_id: 3,

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
            // title="Devolução de Pedidos"
            title="Entrada de estoque (7 dias)"
            value={stockWeekEntryVal}
            type="product"
          />
        }
      />

      <DivValues
        ShowValue={
          <ShowValues
            title="Produtos abaixo do Estoque mínimo"
            value={productsBelowVal}
            type="product"
          />
        }
      />

      {/* <DivValues
        ShowValue={
          <ShowValues
            title="Valor de custo em estoque"
            value={100}
            type="product"
          />
        }
      /> */}

      <DivValues
        ShowValue={
          <ShowValues
            title="Valor de venda em estoque"
            value={productsSaleCostVal}
            type="onlyMoney"
          />
        }
      />

      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-12 row-span-4"
      >
        <ProductsGrid moviments={productArr} movToPass={movsToPass} />
      </div>

      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-12 md:col-span-6 row-span-2 md:row-span-4"
      >
        <SupplierGrid supplierData={supplierArr} />
      </div>

      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-12 md:col-span-6 row-span-2"
      >
        <BrandGrid brandData={brandArr} />
      </div>
      <div
        style={{ border: "1px solid #C8C8C8" }}
        className="bg-[#FFFFFF] rounded-lg col-span-12 md:col-span-6 row-span-2"
      >
        <TypeGrid typeData={typeArr} />
      </div>
    </div>
  );
}

export default Products;
