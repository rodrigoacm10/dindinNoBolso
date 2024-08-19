import { Box, Button, useMediaQuery } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import {
  createFaq,
  deleteFaq,
  getAllFaq,
  getUserInfosFunc,
} from "../../services/APIService";
import { useState } from "react";
import WarningPopUp from "../../components/WarningPopUp";
import AddFaqComponent from "../../components/addFaqComponent";
import { FaPlus, FaQ } from "react-icons/fa6";
import { SidebarContext } from "../../context/sidebarContext";
import { useContext } from "react";
import { FaMinus } from "react-icons/fa";

// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//           malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
//           dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
//           lacus ex, sit amet blandit leo lobortis eget.

// console.log

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  // border: `1px solid ${theme.palette.divider}`,

  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  //   backgroundColor:
  //     theme.palette.mode === "dark"
  //       ? "rgba(255, 255, 255, .05)"
  //       : "rgba(0, 0, 0, .03)",
  color: "#ffffff",
  // backgroundColor: "rgba(255, 255, 255, .05)",
  backgroundColor: "#B23F30",

  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    color: "#ffffff",
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "#ffffff",
  },
  "& .MuiAccordionSummary-content": {
    // marginLeft: theme.spacing(1),
    marginLeft: "10px",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, 0.125)",
  // backgroundColor: "#F3E2E0",
}));

function Faq() {
  const { attData, attDataFunc, attFaq, attFaqFunc } =
    useContext(SidebarContext);

  const [expanded, setExpanded] = useState("panel1");
  const [faqQuestions, setFaqQuestions] = useState([]);
  const [visibleAddFaq, setVisibleAddFaq] = useState(false);
  const [userInfos, setUserInfos] = useState([]);

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  const getInfos = async () => {
    console.log("tá indo");
    const responseUserInfos = await getUserInfosFunc();
    const responseGetFaq = await getAllFaq();
    console.log(responseUserInfos, responseGetFaq);
    // const responseCreateFaq = await createFaq()
    // console.log(responseGetFaq);
    // console.log(responseCreateFaq)
    // console.log(responseUserInfos.data.nivel_acesso);
    setFaqQuestions(responseGetFaq.data);
    setUserInfos(responseUserInfos.data.nivel_acesso);

    // / Obtém a data atual
    let dataAtual = new Date();

    // Subtrai um mês da data atual
    let dataMesAnterior = new Date(dataAtual);
    dataMesAnterior.setMonth(dataAtual.getMonth() - 1);

    // console.log(dataMesAnterior.getFullYear(), dataMesAnterior.getMonth(), dataMesAnterior.getDate())

    // Agora, a variável 'dataMesAnterior' contém a data do mês anterior
    console.log("Data do mês anterior: " + dataMesAnterior.toDateString());
  };

  useEffect(() => {
    getInfos();
    console.log("aaaaabbb");
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

  //

  // useEffect(() => {
  //   getInfos();
  //   console.log("aaaaabbb");
  // }, []);

  // useEffect(() => {
  //   getInfos();
  // }, [attData]);

  function FAQItems({ titleFAQ, contentFAQ, id }) {
    return (
      <Accordion
        defaultExpanded
        // expanded={expanded === "panel1"}
        // onChange={handleChange("panel1")}
      >
        <AccordionSummary
        //    aria-controls="panel1d-content" id="panel1d-header"
        >
          {/* {userInfos == 'ADMIN' && <Button><FaMinus/></Button>} */}
          <Typography fontFamily="Poppins">
            {titleFAQ}
            {userInfos == "ADMIN" && (
              <Button
                sx={{
                  textTransform: "none",
                  // display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  pl: "0px",
                  color: "#ffffff",
                  ":hover": {
                    color: "#8b3226",
                  },
                }}
                onClick={() => {
                  console.log(id);
                  deleteFaq(id);
                  attDataFunc();
                }}
              >
                <FaMinus />
              </Button>
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography fontFamily="Poppins">{contentFAQ}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Box p="20px" className="animationStartRight">
      <Box>
        <Typography variant="h4" fontFamily="Poppins" fontWeight="700">
          PERGUNTAS{" "}
          <span
            style={{
              color: "#d32f2f",
              fontWeight: 700,
            }}
          >
            FREQUENTES
          </span>
        </Typography>
        <Typography fontFamily="Poppins">Perguntas e respostas</Typography>
        {userInfos == "ADMIN" && (
          <Button
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              pl: "0px",
              color: "#B23F30",
              ":hover": {
                color: "#8b3226",
              },
            }}
            onClick={() => {
              setVisibleAddFaq(!visibleAddFaq);
              // console.log("a");
            }}
          >
            Adicionar pergunta e resposta <FaPlus size="18px" />{" "}
          </Button>
        )}
      </Box>
      <Box
        borderRadius="10px"
        overflow="hidden"
        mt="30px"
        border="1px solid black"
      >
        {/* <FAQItems
          titleFAQ="Como posso usar o aplicativo para gerenciar minhas finanças pessoais ou empresariais?"
          contentFAQ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
          lacus ex, sit amet blandit leo lobortis eget."
        />
        <FAQItems
          titleFAQ="Quais são os recursos disponíveis no aplicativo para facilitar a organização financeira?"
          contentFAQ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
          lacus ex, sit amet blandit leo lobortis eget."
        />
        <FAQItems
          titleFAQ="Como posso acessar  relatórios e informações importantes sobre minha contabilidade através do aplicativo?"
          contentFAQ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
          lacus ex, sit amet blandit leo lobortis eget."
        />
        <FAQItems
          titleFAQ="Qual é a melhor forma de organizar minhas finanças?"
          contentFAQ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
          lacus ex, sit amet blandit leo lobortis eget."
        /> */}
        {faqQuestions.map((el) => {
          return (
            <FAQItems
              titleFAQ={el.pergunta}
              contentFAQ={el.resposta}
              id={el.id}
            />
          );
        })}
        <AddFaqComponent
          confirmVisible={visibleAddFaq}
          setConfirmVisible={setVisibleAddFaq}
        />
      </Box>
    </Box>
  );
}

export default Faq;
