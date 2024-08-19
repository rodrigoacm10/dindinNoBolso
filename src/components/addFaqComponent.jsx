import { Box, Button, TextField, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { Formik } from "formik";
import * as yup from "yup";
import { createFaq } from "../services/APIService";
import { useContext } from "react";
import { SidebarContext } from "../context/sidebarContext";

function AddFaqComponent({ confirmVisible = true, setConfirmVisible }) {
  const { attData, attDataFunc, attFaq, attFaqFunc } =
    useContext(SidebarContext);

  const productInitialValues = {
    // name: "",
    question: "",
    answer: "",
  };

  const handleProductSubmit = async (values) => {
    // console.log(values);
    const responseCreateFaq = await createFaq(values.question, values.answer);
    // console.log(responseCreateFaq);
    // setLoading(true);
    // setIsConcluded(false);

    // const response = await addProduct(values.name);
    // setLoading(false);
    // if (response) {
    //   setIsConcluded(true);
    // }
    // console.log(response);
    attDataFunc();
  };

  const checkoutProductSchema = yup.object().shape({
    // name: yup.string().required("preencha o campo"),
    question: yup.string().required("preencha o campo"),
    answer: yup.string().required("preencha o campo"),
  });

  return (
    <Box
      top="0"
      left="0"
      position="fixed"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      width="100%"
      zIndex="10000"
      transition="all 0.5s"
      sx={{
        visibility: `${confirmVisible ? "none" : "hidden"}`,
      }}
      className={`${confirmVisible ? "animationOpacity" : ""}`}
    >
      <Box
        className="centralized"
        transition="all 0.5s"
        backgroundColor="#7A7A7A"
        borderRadius="9px"
        // zIndex="101"
        zIndex="1000000000."
        p="10px 10px"
      >
        <Box display="flex" alignItems="center" justifyContent="end">
          <Button
            sx={{ color: "black" }}
            onClick={(e) => {
              // console.log(e.target.style.color);
              setConfirmVisible(!confirmVisible);
              //   setProductVisible(0);
              //   setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box textAlign="center" p="40px">
          <h1>Função em </h1>
          <h1>desenvolvimento</h1>
          <Typography textAlign="center" pt="15px" fontFamily="Poppins">
            {" "}
            {/* preencha as informações abaixo */}
          </Typography>
          <Box>
            <Formik
              validationSchema={checkoutProductSchema}
              initialValues={productInitialValues}
              onSubmit={handleProductSubmit}
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
                  <Box
                    pt="30px"
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                  >
                    <TextField
                      type="text"
                      label="Pergunta"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.question}
                      name="question"
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
                      error={!!touched.question && !!errors.question}
                      helperText={touched.question && errors.question}
                    />

                    <TextField
                      type="text"
                      label="Resposta"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.answer}
                      name="answer"
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
                      error={!!touched.answer && !!errors.answer}
                      helperText={touched.answer && errors.answer}
                    />
                  </Box>
                  <Box pt="20px">
                    {/* {isConcluded && (
                        <p
                          className="animationStartBottom"
                          style={{
                            color: "#B23F30",
                          }}
                        >
                          Adicionado!
                        </p>
                      )} */}

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

                      // onClick={() =>  attDataFunc()}
                    >
                      ADICIONAR
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
          {/* <Box>
            <Button
              onClick={() => {
                setConfirmVisible(!confirmVisible);
                setConfirmedFunc(!confirmedFunc);
              }}
            >
              a
            </Button>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}

export default AddFaqComponent;
