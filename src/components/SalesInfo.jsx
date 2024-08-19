import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaPlus } from "react-icons/fa";
import { MenuItem } from "react-pro-sidebar";
import { FaPencilAlt } from "react-icons/fa";
import { SidebarContext } from "../context/sidebarContext";
import { useContext, useEffect, useState } from "react";
import { values } from "lodash";
// import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineAttachment } from "react-icons/md";
import { getImg } from "../services/APIService";
function SalesInfo({
  //   checkoutBrandSchema,

  //-   handleBrandSubmit,
  setSalesInfosVisible,
  setIsConcluded,
  salesInfosVisible,
  isConcluded,

  //   novos
  //   handleSubmit,
  //   register,
  //   error,
}) {
  const [productCur, setProductCur] = useState({
    nome: "",
    marca_id: 0,
    fornecedor_id: 0,
  });
  // vai fazer uma requisição pegando valuesProduct.id
  const {
    valuesProduct,
    setValuesProduct,
    salesInfo,
    productsArr,
    supplierArr,
    brandArr,
    clientsArr,
    setImgUrl,
    setToImgVisible,
    setReceiveVisible,
    setEditEntry,
    setTypeWarning,
  } = useContext(SidebarContext);

  const checkoutBrandSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
    })
  );

  // const checkoutBrandSchema = yup.object().shape({
  //   name: yup.string().required("preencha o campo"),
  // });

  const formMethods = useForm({
    resolver: checkoutBrandSchema,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = formMethods;

  const fakeObj = [
    {
      text: "testText",
      value: "testValue",
    },
  ];

  useEffect(() => {
    setProductCur(productsArr.find((e) => e.id == salesInfo.product));
    console.log(
      "-> -> ->",
      productsArr.find((e) => e.id == salesInfo.product)
    );
    // console.log(brandArr, supplierArr);
    // console.log(productCur.marca_id, productCur.fornecedor_id);

    // console.log(brandArr.find((e) => e.id == productCur.marca_id));
    // console.log(supplierArr.find((e) => e.id == productCur.fornecedor_id));
    // clientsArr.find((e) => e.id == salesInfo.client);
  }, []);

  function InputError({ field }) {
    // @ts-expect-error
    return (
      <p className="text-xs text-left text-[#B23F30] px-4 font-bol">
        {errors[field].message}
      </p>
    );
  }

  return (
    <Box
      top="0"
      left="0"
      position="fixed"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      width="100%"
      zIndex="100"
      transition="all 0.5s"
      sx={{
        visibility: `${salesInfosVisible == 0 ? "hidden" : "none"}`,
      }}
      className={`${salesInfosVisible == 0 ? "" : "animationOpacity"}`}
    >
      <Box
        className="centralized "
        transition="all 0.5s"
        backgroundColor="#7A7A7A"
        borderRadius="9px"
        zIndex="101"
        p="10px 10px"
        sx={{
          maxWidth: "450px",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="end">
          <Button
            sx={{ color: "black" }}
            onClick={(e) => {
              // console.log(e.target.style.color);
              setSalesInfosVisible(0);
              setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box textAlign="center" p="40px">
            <h1 className="text-3xl font-bold">Informações </h1>
            <h1 className="text-3xl font-bold">da Venda</h1>
            <Typography textAlign="center" pt="15px" fontFamily="Poppins">
              {" "}
              analise as informações abaixo
            </Typography>
            {/* <div className="flex items-start mt-5 px-6">
              <div className="flex items-center gap-2">
                <button className="transition duration-200 hover:bg-[#8b3226] bg-[#B23F30] rounded py-2 px-3">
                  <FaPencilAlt className="text-white" />
                </button>
                editar
              </div>
            </div> */}
            <Box
              width="375px"
              className="grid grid-cols-2 mt-5 gap-2 gap-y-10 max-h-80 scroll-classes overflow-scroll pt-2  px-6 "
            >
              <div className="col-span-2 grid grid-cols-3 gap-4  ">
                <div>
                  <p className="font-semibold text-start">data</p>
                  <p className="text-start pt-4 ">
                    {salesInfo.date.split("-").reverse().join("/")}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-start">pagamento</p>
                  <p className="text-start pt-4 ">{salesInfo.formType}</p>
                </div>{" "}
                <div>
                  <p className="font-semibold text-start w-32">
                    valor da venda
                  </p>
                  <p className="text-start pt-4 ">R$ {salesInfo.totalVal}</p>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-4  ">
                <div>
                  <p className="font-semibold text-start">produto</p>
                  <p className="text-start pt-4 ">{productCur.nome}</p>
                </div>
                <div>
                  <p className="font-semibold text-start">marca</p>
                  <p className="text-start pt-4 ">
                    {" "}
                    {brandArr.find((e) => e.id == productCur.marca_id)?.nome}
                  </p>
                </div>{" "}
                <div>
                  <p className="font-semibold text-start w-32">fornecedor</p>
                  <p className="text-start pt-4 ">
                    {
                      supplierArr.find((e) => e.id == productCur.fornecedor_id)
                        ?.nome_contato
                    }
                  </p>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-4  ">
                <div>
                  <p className="font-semibold text-start">valor unitário</p>
                  <p className="text-start pt-4 ">R$ {productCur.preco}</p>
                </div>
                <div></div>
                <div>
                  <p className="font-semibold text-start w-32">quantidade</p>
                  <p className="text-start pt-4 ">
                    {+salesInfo.totalVal / +productCur.preco}
                  </p>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-4  ">
                <div>
                  <p className="font-semibold text-start">cliente</p>
                  <p className="text-start pt-4 ">
                    {salesInfo.client
                      ? clientsArr.find((e) => e.id == salesInfo.client)?.nome
                      : "balcão"}
                  </p>
                </div>
                <div></div>
                <div>
                  <p className="font-semibold text-start w-32">anexo</p>
                  <p className="text-start pt-4 ">
                    {/* <button className=" transition duration-200 hover:bg-[#8b3226] bg-[#B23F30] rounded py-2 px-3">
                      <MdOutlineAttachment size={24} className="text-white" />
                    </button> */}

                    {salesInfo.attachament ? (
                      <>
                        <button
                          className=" transition duration-200 hover:bg-[#8b3226] bg-[#B23F30] rounded py-2 px-3"
                          onClick={async () => {
                            const response = await getImg(
                              salesInfo.attachament
                            );
                            console.log(response);
                            setImgUrl(response);
                            setToImgVisible(1);
                            // return navigate(response);
                            console.log("a");
                            // return redirect("/home");
                          }}
                        >
                          <p style={{ color: "black" }}>
                            <MdOutlineAttachment
                              size={24}
                              className="text-white"
                            />
                          </p>
                        </button>
                      </>
                    ) : (
                      <button className=" transition duration-200 hover:bg-[#8b3226] bg-[#8b3226] rounded py-2 px-3">
                        <MdOutlineAttachment size={24} className="text-white" />
                      </button>
                    )}
                  </p>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-4  ">
                <div>
                  <p className="font-semibold text-start">observações</p>
                  <p className="text-start pt-4 ">{salesInfo.observations}</p>
                </div>
                <div></div>
                <div>
                  <p className="font-semibold text-start w-32">entregue</p>
                  <p className="text-start pt-4 flex items-center gap-2 ">
                    {salesInfo.delivered ? "sim" : "não"}
                    {!salesInfo.delivered && (
                      <button
                        onClick={(e) => {
                          // console.log("aa");
                          setEditEntry({
                            id: salesInfo.id,
                          });
                          setTypeWarning("sale");

                          setReceiveVisible(1);
                        }}
                        className="transition duration-200 hover:bg-[#8b3226] bg-[#B23F30] text-white p-1 px-2 rounded"
                      >
                        recebi
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SalesInfo;
