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
import {
  getBrand,
  getImg,
  getOneFullProduct,
  getOneSupplier,
} from "../services/APIService";
function BuysInfo({
  //   checkoutBrandSchema,

  //-   handleBrandSubmit,
  setBuysInfosVisible,
  setIsConcluded,
  buysInfosVisible,
  isConcluded,

  //   novos
  //   handleSubmit,
  //   register,
  //   error,
}) {
  // vai fazer uma requisição pegando valuesProduct.id
  const {
    valuesProduct,
    setValuesProduct,
    valuesBuy,
    setValuesBuy,
    receiveVisible,
    setReceiveVisible,
    typeWarning,
    setTypeWarning,
    editEntry,
    setEditEntry,
    setImgUrl,
    setToImgVisible,
  } = useContext(SidebarContext);

  const [productInf, setProductInf] = useState({
    product: "",
    unitVal: "",
    stockCur: "",
    brand: "",
    supplier: "",
  });

  console.log(valuesBuy);

  // attachament
  // date
  // totalValue
  // installmentsValue
  // entryValue
  // installments
  // productId
  // supplierId
  // formPayment
  // id
  // amount

  const checkoutBrandSchema = yupResolver(
    yup.object({
      name: yup.string().required("inserir campo"),
    })
  );

  // const checkoutBrandSchema = yup.object().shape({
  //   name: yup.string().required("preencha o campo"),
  // });

  const getInfos = async () => {
    const product = await getOneFullProduct(valuesBuy.productId);
    const brands = await getBrand();
    const supplier = await getOneSupplier(valuesBuy.supplierId);

    const brand = brands.data.find((el) => el.id == product.data.marca_id);

    setProductInf({
      product: product.data.nome,
      stockCur: product.data.estoque_atual,
      unitVal: product.data.preco,
      brand: brand.nome,
      supplier: supplier ? supplier?.data.nome_contato : "não há",
    });

    console.log({
      product: product.data.nome,
      brand: brand.nome,
      // supplier: supplier?.data.nome_contato,
    });
    console.log(product.data);
    console.log(supplier?.data);
  };

  useEffect(() => {
    getInfos();
  }, []);

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
        visibility: `${buysInfosVisible == 0 ? "hidden" : "none"}`,
      }}
      className={`${buysInfosVisible == 0 ? "" : "animationOpacity"}`}
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
              setBuysInfosVisible(0);
              setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box textAlign="center" p="40px">
            <h1 className="text-3xl font-bold">Informações </h1>
            <h1 className="text-3xl font-bold">da compra</h1>
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
                    {valuesBuy.date.split("-").reverse().join("/")}
                  </p>
                </div>
                {/* {valuesBuy.formPayment !== "vista" && <div></div>} */}
                <div>
                  <p className="font-semibold text-start">pagamento</p>
                  <p className="text-start pt-4 ">
                    {valuesBuy.formPayment !== "vista+prazo" && "à"}{" "}
                    {valuesBuy.formPayment == "vista+prazo"
                      ? "entrada + parcelas"
                      : valuesBuy.formPayment}
                  </p>
                </div>{" "}
                {/* {valuesBuy.formPayment == "vista" && ( */}
                <div>
                  <p className="font-semibold text-start w-32">valor</p>
                  <p className="text-start pt-4 ">R$ {valuesBuy.totalValue}</p>
                </div>
                {/* )} */}
              </div>
              {valuesBuy.formPayment !== "vista" && (
                <div className="col-span-2 grid grid-cols-3 gap-12  ">
                  <div>
                    <p className="font-semibold text-start w-32">
                      parcelas valor
                    </p>
                    <p className="text-start pt-4 w-48">
                      R$ {valuesBuy.installmentsValue}
                    </p>
                  </div>

                  <div>
                    {" "}
                    {valuesBuy.formPayment == "vista+prazo" && (
                      <>
                        <p className="font-semibold text-start">parcelas</p>
                        <p className="text-start pt-4 ">
                          {valuesBuy.installments}
                        </p>
                      </>
                    )}
                  </div>

                  <div>
                    {valuesBuy.formPayment == "vista+entrada" ? (
                      <>
                        <p className="font-semibold text-start">entrada</p>
                        <p className="text-start pt-4 w-48">
                          R$ {valuesBuy.entryValue}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-start">parcelas</p>
                        <p className="text-start pt-4 ">
                          {valuesBuy.installments}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="col-span-2 grid grid-cols-3 gap-4  ">
                <div>
                  <p className="font-semibold text-start">produto</p>
                  <p className="text-start pt-4 ">{productInf.product}</p>
                </div>
                <div>
                  <p className="font-semibold text-start">marca</p>
                  <p className="text-start pt-4 ">{productInf.brand}</p>
                </div>{" "}
                <div>
                  <p className="font-semibold text-start w-32">fornecedor</p>
                  <p className="text-start pt-4 ">{productInf.supplier}</p>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-4  ">
                <div>
                  <p className="font-semibold text-start">valor unitário</p>
                  <p className="text-start pt-4 ">R$ {productInf.unitVal}</p>
                </div>
                <div></div>
                <div>
                  <p className="font-semibold text-start w-32">quantidade</p>
                  <p className="text-start pt-4 ">{productInf.stockCur}</p>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-4  ">
                <div>
                  <p className="font-semibold text-start">observações</p>
                  <p className="text-start pt-4 ">{valuesBuy.observations}</p>
                </div>
                <div></div>
                <div>
                  <p className="font-semibold text-start w-32">recebido</p>
                  <p className="text-start pt-4 flex items-center gap-2">
                    {valuesBuy.entry ? "sim" : "não"}
                    {!valuesBuy.entry && (
                      <button
                        onClick={(e) => {
                          // console.log("aa");
                          setEditEntry({
                            attachament: valuesBuy.attachament,
                            date: valuesBuy.date,
                            totalValue: valuesBuy.totalValue,
                            installmentsValue: valuesBuy.installmentsValue,
                            entryValue: valuesBuy.entryValue,
                            installments: valuesBuy.installments,
                            productId: valuesBuy.productId,
                            supplierId: valuesBuy.supplierId
                              ? valuesBuy.supplierId
                              : "não há",
                            formPayment: valuesBuy.formPayment
                              ? valuesBuy.formPayment
                              : "não há",
                            id: valuesBuy.id,
                            amount: valuesBuy.amount,
                            observations: valuesBuy.observations,
                            entry: valuesBuy.entry,
                          });
                          setTypeWarning("stock");

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

              <div className="col-span-2 grid grid-cols-3 gap-4  ">
                <div>
                  <p className="font-semibold text-start w-32">anexo</p>
                  <p className="text-start pt-4 ">
                    {/* <button className=" transition duration-200 hover:bg-[#8b3226] bg-[#B23F30] rounded py-2 px-3">
                      <MdOutlineAttachment size={24} className="text-white" />
                    </button> */}
                    {valuesBuy.attachament ? (
                      <>
                        <button
                          className=" transition duration-200 hover:bg-[#8b3226] bg-[#B23F30] rounded py-2 px-3"
                          onClick={async () => {
                            const response = await getImg(
                              valuesBuy.attachament
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
                <div>
                  {/* <p className="font-semibold text-start">cliente</p>
                  <p className="text-start pt-4 ">carlos antonio</p> */}
                </div>
                <div></div>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BuysInfo;
