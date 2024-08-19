import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import {
  UpdateUserInfos,
  exportFileData,
  getAllLiteralMovs,
  getAllMovs,
  getClients,
  getExpenseCategorys,
  getImg,
  getPendingMovs,
  getProducts,
  getRevenueCategorys,
  getServices,
  getUserInfos,
  getUserInfosFunc,
  notAllMovs,
  valuesAccount,
} from "../../services/APIService";
import { Formik } from "formik";
import * as yup from "yup";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoIosCloseCircleOutline, IoMdClose } from "react-icons/io";
import AddAttachment from "../../components/addAttachment";
import ConfirmToDo from "../../components/confirmToDo";
import { SidebarContext } from "../../context/sidebarContext";
// import { MenuItem } from "react-pro-sidebar";

// console.log

function Profile() {
  const [userInfos, setUserInfos] = useState([]);
  const [changeUsername, setChangeUsername] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changeTypeAcc, setChangeTypeAcc] = useState(false);
  const [changeCPForCNPJ, setChangeCPForCNPJ] = useState(false);
  const [oldTypeAcc, setOldTypeAcc] = useState("");
  const [newTypeAcc, setNewTypeAcc] = useState("");
  const [popUpChangeDoc, setPopUpChangeDoc] = useState(false);
  const [isConcluded, setIsConcluded] = useState(false);

  const { attData, attDataFunc, imgUrlProfile, setImgUrlProfile } =
    useContext(SidebarContext);

  const [addImgBoxVisible, setAddImgBoxVisible] = useState(false);
  const [addImgBoxBtn, setAddImgBoxBtn] = useState(false);
  const [addImgBox, setAddImgBox] = useState(false);

  const [image, setImage] = useState(false);
  const [fileInfos, setFileInfos] = useState(false);

  const API_URL = "https://recicont-api-tn8k.onrender.com";

  const isMediumScreen = useMediaQuery("(max-width:750px)");

  function ChangeCPFOrCNPJPop({ type }) {
    const initialValue = {
      value: "",
    };

    const cpfSchema = yup.object().shape({
      value: yup
        .string()
        .min(11, "o CNPJ deve ser válido")
        .max(11, "o CNPJ deve ser válido")
        .required("preencha o campo"),
    });

    const cnpjSchema = yup.object().shape({
      value: yup
        .string()
        .min(14, "o CNPJ deve ser válido")
        .max(14, "o CNPJ deve ser válido")
        .required("preencha o campo"),
    });

    const typeSchema = (type) => {
      if (type == "CPF") {
        return cpfSchema;
      } else if (type == "CNPJ") {
        return cnpjSchema;
      }
    };

    const handleFormSubmit = (value) => {
      // console.log(value);
    };

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
          visibility: `${popUpChangeDoc ? "none" : "hidden"}`,
        }}
        className={`${popUpChangeDoc ? "animationOpacity" : ""}`}
      >
        <Box
          className="centralized"
          transition="all 0.5s"
          backgroundColor="#7A7A7A"
          borderRadius="9px"
          zIndex="101"
          p="10px 10px"
        >
          <Box display="flex" alignItems="center" justifyContent="end">
            <Button
              sx={{ color: "black" }}
              onClick={(e) => {
                // console.log(e.target.style.color);
                setPopUpChangeDoc(false);
                // setIsConcluded(false);
              }}
            >
              <IoMdClose style={{ height: "28px", width: "28px" }} />
            </Button>
          </Box>
          <Box textAlign="center" p="40px">
            <h1>Você mudou o seu tipo de conta </h1>
            <h1>
              Altere de {oldTypeAcc} para {newTypeAcc}
            </h1>
            <Typography textAlign="center" pt="15px" fontFamily="Poppins">
              {" "}
              preencha a informação abaixo
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box pt="30px" minWidth="300px" maxWidth="400px">
                <Formik
                  initialValues={initialValue}
                  validationSchema={typeSchema(type)}
                  onSubmit={handleFormSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        type="text"
                        fullWidth
                        label={`${type}`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.value}
                        name="value"
                        sx={{
                          bgcolor: "#F3E2E0",
                          borderRadius: "4px",
                          "& .MuiFormLabel-root": {
                            backgroundColor: "#F3E2E0",
                            borderRadius: "4px",
                            pr: "10px",
                            pl: "10px",
                            color: "black",
                          },
                        }}
                        error={!!touched.value && !!errors.value}
                        helperText={touched.value && errors.value}
                      />
                      <Box pt="20px">
                        {isConcluded && (
                          <p
                            className="animationStartBottom"
                            style={{
                              color: "#B23F30",
                            }}
                          >
                            Adicionado!
                          </p>
                        )}
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{
                            p: "13.5px 11px ",
                            textTransform: "none",
                            display: "block",
                            backgroundColor: "#B23F30",
                            ":hover": {
                              backgroundColor: "#8b3226",
                            },
                          }}
                        >
                          ADICIONAR
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  function FormChangeData({ type, doc, initialVal }) {
    const initialValue = {
      value: `${initialVal}`,
    };

    const typeAccs = [
      {
        optionValue: "CNPJ",
        optionText: "Empresa",
      },
      {
        optionValue: "CPF",
        optionText: "Pessoa física",
      },
    ];

    const usernameSchema = yup.object().shape({
      value: yup.string().required("preencha o campo"),
    });

    yup.string().required("preencha o campo");

    const emailSchema = yup.object().shape({
      value: yup.string().email("invalid email").required("preencha o campo"),
    });

    const cpfSchema = yup.object().shape({
      value: yup
        .string()
        .min(11, "o CNPJ deve ser válido")
        .max(11, "o CNPJ deve ser válido")
        .required("preencha o campo"),
    });

    const cnpjSchema = yup.object().shape({
      value: yup
        .string()
        .min(14, "o CNPJ deve ser válido")
        .max(14, "o CNPJ deve ser válido")
        .required("preencha o campo"),
    });

    const typeSchema = (type) => {
      if (type == "username") {
        return usernameSchema;
      } else if (type == "email") {
        return emailSchema;
      } else if (type == "CPF") {
        return cpfSchema;
      } else if (type == "CNPJ") {
        return cnpjSchema;
      }
    };

    const closeInput = (type) => {
      if (type == "username") {
        setChangeUsername(false);
      } else if (type == "email") {
        setChangeEmail(false);
      } else if (type == "typeAcc") {
        setChangeTypeAcc(false);
      } else if (type == "CPF") {
        setChangeCPForCNPJ(false);
      } else if (type == "CNPJ") {
        setChangeCPForCNPJ(false);
      }
    };

    const handleFormSubmit = async (value) => {
      // console.log(type);
      // console.log(value.value);
      // const resp = await UpdateUserInfos(type, value.value);
      // const resp = await UpdateUserInfos(type, value.value);

      const formData = new FormData();
      formData.append("file", image);

      const reponseFile = await exportFileData(formData);
      // console.log(reponseFile);
      // console.log(reponseFile.file);

      const resp = await UpdateUserInfos(value.value);

      // console.log(resp);

      // vai ficar o setPraColocar o carregamento como true
      // aqui vai ficar a requisição => const res
      // vai ficar o setPraColocar o carregamento como false

      closeInput(type);

      if (type == "typeAcc" && value.value != userInfos.categoria_conta) {
        setOldTypeAcc(userInfos.categoria_conta);
        setNewTypeAcc(value.value);
        setPopUpChangeDoc(true);
        // console.log("aaaa");
      }
      attDataFunc();
    };

    return (
      <Box>
        <Formik
          validationSchema={typeSchema(type)}
          onSubmit={handleFormSubmit}
          initialValues={initialValue}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form className="animationStartLeft" onSubmit={handleSubmit}>
              <Box display="flex">
                {type == "typeAcc" ? (
                  <TextField
                    // type="text"
                    // label="Nome"
                    select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.value}
                    name="value"
                    error={!!touched.value && !!errors.value}
                    helperText={touched.value && errors.value}
                    defaultValue="-"
                  >
                    {typeAccs.map((option, i) => (
                      <MenuItem
                        key={option.optionValue}
                        value={option.optionValue}
                      >
                        {option.optionText}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    type="text"
                    // label="Nome"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.value}
                    name="value"
                    error={!!touched.value && !!errors.value}
                    helperText={touched.value && errors.value}
                  />
                )}

                {/* <input
                  type="text"
                  label="Nome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.value}
                  name="value"
                  error={!!touched.value && !!errors.value}
                  helperText={touched.value && errors.value}
                /> */}
                <Button
                  sx={{
                    color: "#7A7A7A",
                  }}
                  type="submit"
                >
                  <FaRegArrowAltCircleRight size="20px" />
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        {/* <input /> */}
      </Box>
    );
  }

  const getMovs = async () => {
    const responseUserInfos = await getUserInfosFunc();
    // const responseMovs = await getAllLiteralMovs();
    // // const resCat = await getRevenueCategorys();
    console.log(responseUserInfos.data);

    const imgProfile = await getImg(responseUserInfos.data.anexo);
    console.log(imgProfile);
    setImgUrlProfile(`${imgProfile}`);

    // const res = await getPendingMovs();
    // console.log(responseMovs);
    // console.log(resCat);
    // const aaa = await valuesAccount();
    // console.log("->", res);
    // console.log(aaa);
    // new Date(new Date().getTime() + 86400000)
    // .toISOString()
    // .split("T")[0];

    // console.log(
    //   new Date().toISOString().split("T")[0] <
    //     new Date(new Date().getTime() + 86400000).toISOString().split("T")[0]
    // );

    // console.log("2023-12-29T23:45:22.614Z" < "2023-12-29T23:06:59.266Z");

    // console.log(responseUserInfos);
    setUserInfos(responseUserInfos.data);
  };

  useEffect(() => {
    getMovs();
  }, []);

  useEffect(() => {
    getMovs();
  }, [attData]);
  // useEffect(() => {
  //   getMovs();
  // }, []);

  return (
    <Box>
      <ChangeCPFOrCNPJPop type={newTypeAcc} />
      <Box
        sx={{
          backgroundColor: "#ffffff",
          m: "20px",
          borderRadius: "9px",
        }}
        className="animationStartRight"
        // width="100%"
      >
        <Box sx={{ p: "20px" }} width="100%">
          {/* <h1>a</h1> */}
          <Box
            display="grid"
            //   justifyContent="space-between"
            gridTemplateColumns={isMediumScreen ? "1fr" : "250px 1fr"}
            gap={isMediumScreen ? "10px" : "100px"}
            width="100%"
            pb="20px"
            borderBottom="2px solid #B23F30"
          >
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Box
                width="100%"
                sx={{
                  backgroundColor: "gray",
                  borderRadius: "10000px",
                  height: "250px",
                  width: "250px",
                  overflow: "hidden",
                }}
              >
                {/* img */}
                <img
                  className="aboslute-perfil"
                  // src={`${API_URL}/files/${userInfos.anexo}`}
                  src={`${imgUrlProfile}`}
                  alt="foto de perfil"
                  style={{
                    height: "250px",
                    width: "250px",
                  }}
                />


              </Box>
              {addImgBoxBtn ? (
                <Button
                  className="relative-perfil"
                  variant="contained"
                  sx={{
                    // color: "#7A7A7A",
                    borderRadius: "100000000px",
                    textTransform: "none",
                    backgroundColor: "#B23F30",
                    ":hover": {
                      backgroundColor: "#8b3226",
                    },
                  }}
                  onClick={async () => {
                    // setAddImgBoxVisible(!addImgBoxVisible);
                    setAddImgBoxBtn(!addImgBoxBtn);

                    const formData = new FormData();
                    formData.append("file", image);

                    const reponseFile = await exportFileData(formData);
                    // console.log(reponseFile);
                    // console.log(reponseFile.file);

                    const resp = await UpdateUserInfos("", reponseFile.file);
                    attDataFunc();
                  }}
                >
                  <FaRegArrowAltCircleRight size="26px" />
                </Button>
              ) : (
                <Button
                  className="relative-perfil"
                  variant="contained"
                  sx={{
                    // color: "#7A7A7A",
                    borderRadius: "100000000px",
                    textTransform: "none",
                    backgroundColor: "#B23F30",
                    ":hover": {
                      backgroundColor: "#8b3226",
                    },
                  }}
                  onClick={() => {
                    setAddImgBoxVisible(!addImgBoxVisible);
                    setAddImgBoxBtn(!addImgBoxBtn);
                  }}
                >
                  <FaPencil size="18px" />
                </Button>
              )}
            </Box>

            <Box>
              <Box
                display="flex"
                // flexDirection="column"
                alignItems="center"
                gap="30px"
                // justifyContent="space-between"
                sx={{
                  width: "100%",
                  borderBottom: "2px solid #B23F30",
                }}
              >
                {changeUsername ? (
                  <FormChangeData type="username" initialVal={userInfos.nome} />
                ) : (
                  <h1 className="text-3xl font-bold">{userInfos.nome}</h1>
                )}

                <Button
                  sx={{
                    color: "#7A7A7A",
                  }}
                  onClick={() => setChangeUsername(!changeUsername)}
                >
                  {changeUsername ? (
                    <IoIosCloseCircleOutline size="26px" />
                  ) : (
                    <FaPencil size="18px" />
                  )}
                </Button>
              </Box>
              {/* <p>email</p> */}
              <Box
                pt="20px"
                rowGap="30px"
                display="grid"
                gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}
              >
                <Box display="flex" flexDirection="column" gap="10px">
                  <Box display="flex" gap="10px" alignItems="center">
                    <p style={{ fontSize: "18px" }}>E-mail</p>
                    {/* <Button
                      sx={{
                        color: "#7A7A7A",
                      }}
                      onClick={() => setChangeEmail(!changeEmail)}
                    >
                      {changeEmail ? (
                        <IoIosCloseCircleOutline size="24px" />
                      ) : (
                        <FaPencil size="16px" />
                      )}
                    </Button> */}
                  </Box>

                  {changeEmail ? (
                    <FormChangeData type="email" initialVal={userInfos.email} />
                  ) : (
                    <p>{userInfos.email}</p>
                  )}
                </Box>
                <Box display="flex" flexDirection="column" gap="10px">
                  <Box display="flex" gap="10px" alignItems="center">
                    <p style={{ fontSize: "18px" }}>CPF/CNPJ</p>
                    {/* <Button
                      sx={{
                        color: "#7A7A7A",
                      }}
                      onClick={() => setChangeCPForCNPJ(!changeCPForCNPJ)}
                    >
                      {changeCPForCNPJ ? (
                        <IoIosCloseCircleOutline size="24px" />
                      ) : (
                        <FaPencil size="16px" />
                      )}
                    </Button> */}
                  </Box>
                  {changeCPForCNPJ ? (
                    <FormChangeData
                      type={userInfos.categoria_conta}
                      initialVal={
                        userInfos.cpf ? userInfos.cpf : userInfos.cnpj
                      }
                    />
                  ) : (
                    <p>{userInfos.cpf ? userInfos.cpf : userInfos.cnpj}</p>
                  )}
                </Box>
                <Box display="flex" flexDirection="column" gap="10px">
                  <Box display="flex" gap="10px" alignItems="center">
                    <p style={{ fontSize: "18px" }}>Tipo de conta</p>
                    {/* <Button
                      sx={{
                        color: "#7A7A7A",
                      }}
                      onClick={() => setChangeTypeAcc(!changeTypeAcc)}
                    >
                      {changeTypeAcc ? (
                        <IoIosCloseCircleOutline size="24px" />
                      ) : (
                        <FaPencil size="16px" />
                      )}
                    </Button> */}
                  </Box>
                  {changeTypeAcc ? (
                    <FormChangeData
                      type="typeAcc"
                      // doc={userInfos.categoria_conta}
                      initialVal={userInfos.categoria_conta}
                    />
                  ) : (
                    <p>
                      {userInfos.categoria_conta == "CPF"
                        ? "Pessoa física"
                        : "empresa"}
                    </p>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          {/* <Box>
            <h1 style={{ paddingLeft: "60px" }}>valores</h1>
          </Box> */}
        </Box>
      </Box>
      <ConfirmToDo
        confirmVisible={addImgBoxVisible}
        setConfirmVisible={setAddImgBoxVisible}
        setConfirmedFunc={setAddImgBox}
        confirmedFunc={addImgBox}
      />
      <AddAttachment
        addImgBoxVisible={addImgBox}
        setAddImgBoxVisible={setAddImgBox}
        setImage={setImage}
        image={image}
        setFileInfos={setFileInfos}
      />
    </Box>
  );
}

export default Profile;
// img
