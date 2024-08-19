import logo from "../../assets/logo-dindin.png";
import { FaPhoneAlt } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import imgStock from "../../assets/9948593.jpg";
import imgFinance from "../../assets/8953479.jpg";
import imgSale from "../../assets/5035121.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsBoxSeam } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { BsGraphUp } from "react-icons/bs";
import { PiUserFocus } from "react-icons/pi";
import { MdMoreTime } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHandshake } from "react-icons/fa";
import logoWhite from "../../assets/logo-dindin-white.png";

// function CarouselItem({ Icon, title, text }) {
//   return (
//     <div className="flex flex-col items-center">
//       <Icon size={60} />
//       <h3 className="text-2xl font-semibold text-[#B23F30] mt-4 mb-2">
//         {title}
//       </h3>
//       <p className="w-40 text-center text-sm">{text}</p>
//     </div>
//   );
// }

function StyledImg({ img }) {
  return (
    <div
      style={{
        width: "235px",
        height: "156px",
        // backgroundImage: `url(${imgFinance})`,
      }}
      className="relative bg-no-repeat bg-cover bg-center rounded-2xl"
    >
      <img
        className="absolute top-4 left-0 z-30 rounded-2xl hidden sm:block"
        src={img}
        alt="logo dindin"
        style={{
          // height: `${isLittleHeight ? "120px" : "170px"}`,
          // width: `${isLittleHeight ? "120px" : "170px"}`,
          height: "156px",
          width: "235px",
        }}
      />
      <img
        className=" absolute top-2 left-5 z-30 rounded-2xl block sm:hidden"
        src={img}
        alt="logo dindin"
        style={{
          height: "125px",
          width: "188px",
        }}
      />
      <div className="bg-[#B23F30] rounded-3xl w-56 sm:w-72 lg:w-96 h-24 sm:h-28 absolute bottom-2 sm:-bottom-6 left-1 sm:-left-6 lg:-left-20 z-10"></div>
      <div className="bg-[#F3E2E0] rounded-3xl w-24 sm:w-32 lg:w-64 h-12 sm:h-16 absolute top-6 sm:top-10 -left-6 sm:-left-16 lg:-left-32 z-20"></div>
      <div className="bg-[#E3E3E3] rounded-3xl w-24 sm:w-32 lg:w-64 h-12 sm:h-16 absolute -bottom-1 sm:-bottom-10 left-40 lg:left-20 z-20"></div>
      <div className="bg-[#D9D9D9] elipse-gradient absolute -bottom-28 -left-10 z-20 flex items-center justify-center">
        <div className="bg-[#AFAFAF] elipse-gradient-small"></div>
      </div>
      {/* w-64 h-4 rounded-full  */}
    </div>
  );
}

function Initial() {
  const navigate = useNavigate();

  const toLogin = () => {
    return navigate("/login");
  };

  const toRegister = () => {
    return navigate("/register");
  };
  // Aqui é a função do carrossel
  var settings = {
    dots: false, //true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // para telas de tamanho médio
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // para telas pequenas
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const data = [
    {
      icon: MdMoreTime,
      titulo: "Efiência",
      descricao:
        "A automatização dos processos, reduz o tempo gasto e aumenta a eficiência operacional",
    },
    {
      icon: BsCashCoin,
      titulo: "Fluxo de caixa",
      descricao:
        "O monitoramento do fluxo de caixa permite uma gestão mais precisa do capital.",
    },
    {
      icon: BsBoxSeam,
      titulo: "Estoque",
      descricao: "Controle e organize todas as informações do seu estoque.",
    },
    {
      icon: BsGraphUp,
      titulo: "Relatórios",
      descricao:
        "Visualize seu desempenho com os relatórios de vendas e de estoque.",
    },
    {
      icon: PiUserFocus,
      titulo: "Personalização",
      descricao: "O sistema se adequa as necessidades únicas da sua empresa",
    },
    {
      icon: MdOutlineShoppingCart,
      titulo: "Vendas",
      descricao: "Controle o ciclo de vendas e impulsione seu negócio.",
    },
    {
      icon: FaRegHandshake,
      titulo: "Cadastro flexivel",
      descricao:
        "Você pode selecionar cliente já cadastrado ou realizar a transação com um cliente padrão.",
    },
  ];
  console.log(data);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white flex items-center h-20 justify-between px-5">
        <div className="relative w-36 h-2 mt-2">
          <img
            className="absolute -top-14 -left-3"
            src={logo}
            alt="logo dindin"
            style={{
              // height: `${isLittleHeight ? "120px" : "170px"}`,
              // width: `${isLittleHeight ? "120px" : "170px"}`,
              height: "120px",
              width: "120px",
            }}
          />
        </div>

        <div className="flex gap-3">
          <button onClick={() => toRegister()} className="hidden md:block">
            Cadastrar-se
          </button>
          <button
            onClick={() => toLogin()}
            className="bg-[#B23F30] hover:bg-[#9F392C] transition duration-200 text-white rounded-lg p-2 px-4"
          >
            Entrar
          </button>
        </div>
      </div>
      <div
        style={{
          height: "500px",
        }}
        className="bg-[#B23F30] grid grid-cols-1 md:grid-cols-2 md:bg-[#F3E2E0]"
      >
        <div className="bg-[#B23F30] half-div flex items-center justify-center z-50  w-full md:col-span-1">
          <div className="w-96">
            <h1 className="text-3xl tracking-wider font-bold text-white">
              O Dindin no Bolso é A solução para otimizar suas finanças e
              estoque.
            </h1>
            <p className="pt-5 text-white">
              Simplifique a sua gestão com uma ferramenta poderosa e intuitiva.
              Experimente e leve seu negócio para um próximo nível.
            </p>
            <button
              onClick={() => toLogin()}
              className="transtion duration-200 hover:bg-slate-200 bg-white rounded-xl mt-4 text-lg p-2 px-7 "
            >
              começar
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <div
            style={{
              width: "340px",
              height: "340px",
              // backgroundImage: `url(${imgFinance})`,
            }}
            className="relative bg-no-repeat bg-cover bg-center rounded-2xl"
          >
            <img
              className="hidden lg:flex absolute top-4 z-50"
              src={logo}
              alt="logo dindin"
              style={{
                // height: `${isLittleHeight ? "120px" : "170px"}`,
                // width: `${isLittleHeight ? "120px" : "170px"}`,
                height: "340px",
                width: "340px",
              }}
            />

            <img
              className="hidden md:flex lg:hidden absolute top-12 left-10 z-50"
              src={logo}
              alt="logo dindin"
              style={{
                // height: `${isLittleHeight ? "120px" : "170px"}`,
                // width: `${isLittleHeight ? "120px" : "170px"}`,
                height: "272px",
                width: "272px",
              }}
            />

            <div
              // style={{ width: "425px" }}
              className="bg-[#B23F30] rounded-3xl w-80 h-36 lg:w-96 lg:h-44 absolute bottom-12 lg:bottom-10 left-2 lg:-left-8 z-10"
            ></div>
            <div className="bg-white rounded-3xl w-64 lg:w-80 h-44 lg:h-56 absolute bottom-20 lg:bottom-14 left-12 lg:left-3 z-30"></div>
            <div className="bg-[#F4C2C2] rounded-3xl w-40 lg:w-64 h-20 lg:h-24 absolute top-28 lg:top-20 -left-5 lg:-left-20 z-20"></div>
            <div className="bg-[#AFAFAF] rounded-3xl w-40 lg:w-64 h-20 lg:h-24 absolute bottom-10 lg:-bottom-0 left-48 lg:left-40 z-20"></div>
            {/* E3E3E3 */}
            {/* <div className="bg-[#D9D9D9] elipse-gradient absolute -bottom-28 -left-10  z-20 flex items-center justify-center">
              <div className="bg-[#AFAFAF] elipse-gradient-small"></div>
            </div> */}
            {/* w-64 h-4 rounded-full  */}
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-20">
          <div className="flex items-center justify-center order-2 md:order-1">
            <div className="w-96">
              <h1 className="text-3xl font-bold pb-4 text-center md:text-left">
                Gerenciador <span className="text-[#B23F30]">financeiro</span>{" "}
                simples e completo
              </h1>
              <p className="pb-4 text-center md:text-left">
                Você controla a vida financeira da sua empresa de uma forma mais
                simples e direta. Tenha acesso a ferramentas de fluxo de caixa
                de forma rápida e intuitiva.
              </p>
              <button
                onClick={() => toLogin()}
                className="block mx-auto md:inline-block hover:bg-[#9F392C] transition duration-200 bg-[#B23F30] text-white p-2 px-12 rounded-xl"
              >
                testar
              </button>
            </div>
          </div>
          <div className="mb-40 md:mb-0 flex  justify-center order-1 md:order-2">
            <StyledImg img={imgFinance} className="mt-8 md:mt-0" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-32 ">
          <div className="mb-40 md:mb-0 flex justify-center">
            <StyledImg img={imgStock} />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-96">
              <h1 className="text-3xl font-bold pb-4 text-center md:text-left">
                Controle de <span className="text-[#B23F30]">estoque</span>{" "}
                prático
              </h1>
              <p className="pb-4 text-center md:text-left">
                Com o estoque e o gerenciador financeiro integrado você monitora
                o seu inventário, rastreando as entradas e saídas.
              </p>
              <button
                onClick={() => toLogin()}
                className="block mx-auto md:inline-block hover:bg-[#9F392C] transition duration-200 bg-[#B23F30] text-white p-2 px-12 rounded-xl"
              >
                testar
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-40 pb-10">
          <div className="flex items-center justify-center order-2 md:order-1">
            <div className="w-96">
              <h1 className="text-3xl font-bold pb-4 text-center md:text-left">
                Gestão de <span className="text-[#B23F30]">vendas</span>{" "}
                otimizada
              </h1>
              <p className="pb-4 text-center md:text-left">
                Com o controle de todas as operações de vendas você pode
                impulsionar suas vendas e atingir suas metas.
              </p>
              <button
                onClick={() => toLogin()}
                className="block mx-auto md:inline-block hover:bg-[#9F392C] transition duration-200 bg-[#B23F30] text-white p-2 px-12 rounded-xl"
              >
                testar
              </button>
            </div>
          </div>
          <div className="mb-40 md:mb-0 flex  justify-center order-1 md:order-2">
            <StyledImg img={imgSale} className="mt-8 md:mt-0" />
          </div>
        </div>

        {/* aqui é a secção onde tem o carousel */}

        <div className=" bg-[#F3E2E0] mt-20 py-14">
          <h2 className="text-3xl font-bold text-center ">
            Conheça tudo o que{" "}
            <span className="text-[#B23F30] ">Dindin no Bolso</span> oferece
          </h2>
          <div className="flex items-center justify-center gap-20">
            <div className="w-3/4 m-auto">
              <div className="mt-20">
                <Slider {...settings}>
                  {data.map((index, d) => (
                    <div key={d} className="flex flex-col text-center p-10">
                      <div className="flex justify-center items-center pb-4">
                        <index.icon size={60} />
                      </div>
                      <p className="text-2x1 font-semibold text-[#B23F30]">
                        {index.titulo}
                      </p>
                      <p className="text-sm">{index.descricao}</p>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-[#B23F30]">
          <div className="grid grid-cols-1 md:grid-cols-3 py-8 ">
            <div className="flex flex-col items-center">
              <div>
                <h2 className="text-2xl text-white">Funcionalidades</h2>
                <ul className="text-white mt-2 mb-10 md:mb-0 text-center md:text-left">
                  <li className="flex items-center justify-center md:justify-start gap-4 pt-2">
                    -Controle de estoque
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-4 pt-2">
                    -Gereciamento financeiro
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-4 pt-2">
                    -Estatísticas
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center ">
              <img
                src={logoWhite}
                alt="logo dindin"
                style={{
                  width: "auto",
                  height: "110px",
                }}
              />
            </div>

            <div className="flex flex-col items-center">
              <div>
                <h2 className="text-2xl text-white text-center md:text-left">
                  Contatos
                </h2>
                <ul className="text-white mt-2 mb-10 md:mb-0">
                  <li className="flex items-center justify-center md:justify-start gap-4 pt-2">
                    <FaPhoneAlt /> (81)99118-6620
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-4 pt-2">
                    <CgMail /> cybelle@recicont.com.br
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/recicont_consultoria/"
                      className="flex items-center justify-center md:justify-start gap-4 pt-2"
                    >
                      <FaInstagram />
                      @recicont _consultoria
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-sm border-t border-white text-white text-center p-8 mx-10">
            <p>
              © copyright. Créditos imagens de storyset:{" "}
              <a
                className="underline"
                href="https://br.freepik.com/vetores-gratis/ilustra-o-do-conceito-interior-do-armazem_82648730.htm#fromView=search&page=1&position=4&uuid=ae1b4419-a829-4975-a732-bcdb9418f79d"
              >
                Estoque
              </a>
              ,{" "}
              <a
                className="underline"
                href="https://br.freepik.com/vetores-gratis/ilustracao-do-conceito-de-banco-online_42106518.htm#fromView=search&page=1&position=9&uuid=d44ae3ce-bff2-48e3-ab4c-5856d7614368"
              >
                Gerenciador financeiro
              </a>
              ,{" "}
              <a
                className="underline"
                href="https://br.freepik.com/vetores-gratis/ilustracao-do-conceito-de-dados-de-investimento_12704375.htm#from_view=detail_author#position=11"
              >
                Vendas
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Initial;
