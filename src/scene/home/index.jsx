import imgStock from "../../assets/9948593.jpg";
import imgFinance from "../../assets/8953479.jpg";
import imgSale from "../../assets/5035121.jpg";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "../../context/sidebarContext";
import { useContext, useEffect } from "react";
import { getImg, getUserInfosFunc } from "../../services/APIService";

function CardRegister({ registerName, text, setFunc }) {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col justify-between items-start">
      <h2 className="text-base sm:text-xl pb-2">
        cadastrar <span className="text-[#B23F30]">{registerName}</span>{" "}
      </h2>
      <p className=" text-xs sm:text-sm pb-3 h-30">{text}</p>
      <button
        onClick={() => setFunc(1)}
        className="transition duration-200  text-sm sm:text-lg text-white p-1 bg-[#B23F30] hover:bg-[#9F392C] rounded-lg w-full"
      >
        cadastrar
      </button>
    </div>
  );
}

function ResponsiveImg({ img }) {
  return (
    <div>
      <div
        style={{
          width: "235px",
          height: "156px",
          backgroundImage: `url(${img})`,
        }}
        className="hidden md:block bg-no-repeat bg-cover bg-center rounded-2xl"
      ></div>
      <div
        style={{
          width: "188px",
          height: "125px",
          backgroundImage: `url(${img})`,
        }}
        className="block md:hidden bg-no-repeat bg-cover bg-center rounded-2xl"
      ></div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  const {
    clientVisible,
    setClientVisible,
    productVisible,
    setProductVisible,
    serviceVisible,
    setServiceVisible,
    categoryVisible,
    setCategoryVisible,
    setAddStockVisible,
    setSaleVisible,
    setBrandVisible,
    setSupplierVisible,
    setFormTypeVisible,
    setImgUrlProfile,
  } = useContext(SidebarContext);
  {
    /* + estoque, + venda, + marca, + fornecedor, + tipo */
  }

  const toStock = () => {
    return navigate("/products");
  };

  const toFinance = () => {
    return navigate("/finance");
  };

  const toSales = () => {
    return navigate("/sales");
  };

  const getInfos = async () => {
    const responseUserInfos = await getUserInfosFunc();
    // console.log(responseUserInfos.data);

    const imgProfile = await getImg(responseUserInfos.data.anexo);
    console.log(imgProfile);
    setImgUrlProfile(`${imgProfile}`);
  };

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <div>
      <div className="m-5 ">
        <div className="rounded-lg bg-[#B23F30] text-white">
          <div className=" p-5">
            <h1 className="font-bold text-lg">
              Bem-vindo ao Dindin no Bolso, $username!
            </h1>
            <p
              style={{
                maxWidth: "450px",
              }}
              className=" pt-3"
            >
              Estamos muito felizes por você está aqui! Gostaria de gerenciar o
              seu estoque ou as finanças?
            </p>
            <div className="grid sm:grid-cols-2 gap-5 xl:grid-cols-3 p-6">
              <div className=" flex flex-col gap-4 items-center justify-center">
                <ResponsiveImg img={imgStock} />
                <button
                  onClick={() => {
                    toStock();
                  }}
                  className="transition duration-200 hover:bg-slate-200 bg-white p-1 text-black min-w-40 rounded-2xl"
                >
                  estoque
                </button>
              </div>
              {/* Adicionar página vendas*/}
              <div className=" flex flex-col gap-4 items-center justify-center">
                <ResponsiveImg img={imgSale} />
                <button
                  onClick={() => toSales()}
                  className="transition duration-200 hover:bg-slate-200 bg-white p-1 text-black min-w-40 rounded-2xl"
                  // adicionar evento para página de vendas
                >
                  vendas
                </button>
              </div>
              <div className=" flex flex-col gap-4 items-center justify-center">
                <ResponsiveImg img={imgFinance} />
                <button
                  onClick={() => {
                    toFinance();
                  }}
                  className="transition duration-200 hover:bg-slate-200 bg-white p-1 text-black min-w-40 rounded-2xl"
                >
                  finanças
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold my-8">
            VEJA ALGUMAS <span className="text-[#B23F30]">FUNÇÕES </span>
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pb-5">
            <CardRegister
              registerName="produto"
              text="Ao cadastrar um produto suas informações serão disponibilizadas no estoque"
              setFunc={setProductVisible}
            />
            <CardRegister
              registerName="cliente"
              text="Ao cadastrar um cliente suas informações ficarão disponíveis para compra de produto ou utilização de serviços"
              setFunc={setClientVisible}
            />
            <CardRegister
              registerName="serviço"
              text="Ao cadastrar um serviço ele pode ser vinculado a um cliente"
              setFunc={setServiceVisible}
            />
            <CardRegister
              registerName="categoria"
              text="Ao cadastrar uma categoria de despesa e receita ela poderá ser selecionada ao registrar transações"
              setFunc={setCategoryVisible}
            />

            {/* setAddStockVisible, setSaleVisible, setBrandVisible,
            setSupplierVisible, setFormTypeVisible, */}
            {/* + estoque, + venda, + marca, + fornecedor, + tipo */}

            <CardRegister
              registerName="estoque"
              text="Ao cadastrar um produto no estoque você deixa disponíveis as informações do produto no estoque."
              setFunc={setAddStockVisible}
            />
            <CardRegister
              registerName="venda"
              text="Ao registrar a venda de um produto ou serviço, você gera uma receita"
              setFunc={setSaleVisible}
            />
            <CardRegister
              registerName="marca"
              text="Ao registrar uma marca você permite que ela seja atribuida a determinado produto comprado"
              setFunc={setBrandVisible}
            />
            <CardRegister
              registerName="fornecedor"
              text="Ao registrar um fornecedor você tem as informações de sua parceria, e pode atribuí-lo como fornecedor ao registrar o produto"
              setFunc={setSupplierVisible}
            />
            <CardRegister
              registerName="tipo"
              text="Ao cadastrar um tipo de produto você pode referenciar ao cadastrar um produto no estoque"
              setFunc={setFormTypeVisible}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
