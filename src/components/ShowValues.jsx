import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { ResponsiveLine } from "@nivo/line";
import {
  expenseMonthFunc,
  expenseMonthFuncLast,
  liquidRecipeMonth,
  liquidRecipeMonthLast,
  totalRecipeMonth,
  totalRecipeMonthLast,
  valuesAccount,
  valuesAccountLastMonth,
} from "../services/APIService";
import { SidebarContext } from "../context/sidebarContext";
import { GiInfo } from "react-icons/gi";

// console.log

function ShowValues({ title, value, type }) {
  const { attData, attDataFunc } = useContext(SidebarContext);

  const [hiddenValues, setHiddenValues] = useState(false);
  const [allValueMonth, setAllValueMonth] = useState(0);
  const [minusPlus, setMinusPlus] = useState("+");

  // const [allValue, setAllValue] = useState(0)
  // const [monthValue, setMonthValue] = useState(0)
  // const [liquidValue, setLiquidValue] = useState(0)
  // const [expenseValue, setExpenseValue] = useState(0)

  const littleScreen = useMediaQuery("(max-width:700px)");

  let fontSizeNum = "28px";
  let gapSize = "5px";

  // console.log(typeof value !== "string");
  const decreaseFontSize =
    `${typeof value !== "string" ? value.toFixed(2) : " "}`.split("").length >=
    6;
  // console.log("decFontSize -> ", decreaseFontSize);

  const decreaseFontSize1 =
    `${typeof value !== "string" ? value.toFixed(2) : " "}`.split("").length >=
    6;
  // console.log("decFontSize1 -> ", decreaseFontSize1);

  const decreaseFontSize2 =
    `${typeof value !== "string" ? value.toFixed(2) : " "}`.split("").length >=
    9;
  // console.log("decFontSize2 -> ", decreaseFontSize2);

  // const decreaseFontSize = true;

  if (decreaseFontSize1 && decreaseFontSize2 == false) {
    fontSizeNum = "20px";
    gapSize = "12px";
  } else if (decreaseFontSize2) {
    fontSizeNum = "16px";
    gapSize = "22px";
  }

  const getInfos = async () => {
    if (type == "all" && type != "product") {
      const responseAllValuesLast = await valuesAccountLastMonth();
      const responseAllValues = await valuesAccount();

      // console.log(responseAllValuesLast, responseAllValues);

      let allVal = Math.abs(
        100 -
          (responseAllValuesLast.data.resultado * 100) /
            responseAllValues.data.resultado
      ).toFixed(2);
      const sinalPercent =
        responseAllValuesLast.data.resultado -
        +responseAllValues.data.resultado;

      if (responseAllValuesLast == 0) {
        allVal = Math.abs(responseAllValues.toFixed(2)).toFixed(2);
      }

      // console.log(allVal);
      // console.log(sinalPercent);
      if (allVal == "NaN") allVal = "0.00";
      setAllValueMonth(allVal);

      if (sinalPercent > 0) {
        setMinusPlus("-");
      } else if (sinalPercent < 0) {
        setMinusPlus("+");
      }
    } else if (type == "gross" && type != "product") {
      const responseValuesMonthMonthAcc = await totalRecipeMonth();
      const responseMonthValuesLast = await totalRecipeMonthLast();

      console.log(
        "reslast ->",
        responseMonthValuesLast,
        "resacc ->",
        responseValuesMonthMonthAcc
      );

      let monthVal = Math.abs(
        100 -
          (
            (responseMonthValuesLast * 100) /
            responseValuesMonthMonthAcc
          ).toFixed(2)
      ).toFixed(2);
      const sinalPercentMonth =
        responseMonthValuesLast - +responseValuesMonthMonthAcc;

      if (responseMonthValuesLast == 0) {
        monthVal = Math.abs(responseValuesMonthMonthAcc.toFixed(2)).toFixed(2);
      }

      // console.log(monthVal);
      // console.log(sinalPercentMonth);

      setAllValueMonth(monthVal);

      if (sinalPercentMonth > 0) {
        setMinusPlus("-");
      } else if (sinalPercentMonth < 0) {
        setMinusPlus("+");
      }
    } else if (type == "liquid" && type != "product") {
      const responseValuesLiquidMonthAcc = await liquidRecipeMonth();
      const responseLiquidValuesLast = await liquidRecipeMonthLast();

      console.log(
        "liqlast ->",
        responseLiquidValuesLast,
        "liqacc ->",
        responseValuesLiquidMonthAcc
      );

      let liquidVal = Math.abs(
        100 -
          (
            (responseLiquidValuesLast * 100) /
            responseValuesLiquidMonthAcc
          ).toFixed(2)
      ).toFixed(2);
      const sinalPercentLiquid =
        responseLiquidValuesLast - +responseValuesLiquidMonthAcc;

      // console.log(liquidVal);
      // console.log(sinalPercentLiquid);

      if (responseLiquidValuesLast == 0) {
        liquidVal = Math.abs(responseValuesLiquidMonthAcc.toFixed(2)).toFixed(
          2
        );
      }

      setAllValueMonth(liquidVal);

      if (sinalPercentLiquid > 0) {
        setMinusPlus("-");
      } else if (sinalPercentLiquid < 0) {
        setMinusPlus("+");
      }
    } else if (type == "expense" && type != "product") {
      const responseValuesExpenseMonthAcc = await expenseMonthFunc();
      let responseExpenseValuesLast = await expenseMonthFuncLast();

      console.log(
        "explast ->",
        responseExpenseValuesLast,
        "expacc ->",
        responseValuesExpenseMonthAcc
      );

      let expVal = Math.abs(
        100 -
          (
            (responseExpenseValuesLast * 100) /
            responseValuesExpenseMonthAcc
          ).toFixed(2)
      ).toFixed(2);
      let sinalPercentExpense =
        responseExpenseValuesLast - +responseValuesExpenseMonthAcc;

      if (responseExpenseValuesLast == 0) {
        expVal = Math.abs(responseValuesExpenseMonthAcc.toFixed(2)).toFixed(2);
      }

      // console.log(
      //   "--> ->",
      //   responseValuesExpenseMonthAcc,
      //   responseExpenseValuesLast
      // );

      // console.log(expVal);
      // console.log(sinalPercentExpense);

      setAllValueMonth(expVal);

      if (sinalPercentExpense > 0) {
        setMinusPlus("-");
      } else if (sinalPercentExpense < 0) {
        setMinusPlus("+");
      }
    }

    //  setAllValueMonth(allVal)

    //  if (sinalPercent > 0) {
    //   setMinusPlus('-')
    //  } else if (sinalPercent < 0) {
    //   setMinusPlus('+')
    //  }

    // console.log('respLastMonth', responseAllValuesLast)
    // console.log(value)
    // console.log(responseAllValues)
    // console.log('respLastMonth', (100 - (responseAllValuesLast.data.resultado * 100 / responseAllValues.data.resultado).toFixed(2)))

    // // se for negativo retorna positivo a porcentagem, caso positivo retorna negativo
    // console.log('respLastMonth', responseAllValuesLast.data.resultado - (+ responseAllValues.data.resultado))
  };

  const valReturn = (val) => {
    if (
      type == "onlyMoney" ||
      type == "sales" ||
      type == "all" ||
      type == "gross" ||
      type == "liquid" ||
      type == "expense"
    ) {
      return val.toFixed(2);
    } else {
      return val;
    }
  };

  useEffect(() => {
    getInfos();
  }, []);

  useEffect(() => {
    getInfos();
  }, [attData]);

  return (
    <Box height="100%" p="5px 10px">
      <Box display="flex" alignItems="start" justifyContent="space-between">
        <Typography
          variant="p"
          fontSize={["12px", "13px", "14px"]}
          // fontSize={"14px"}
          sx={{
            pt: "4px",
            fontWeight: "700",
            height: "60px",
            width: `${type == "sales" && "67px"}`,
          }}
        >
          {title}
        </Typography>

        <Button
          sx={{
            padding: "4px",
            width: "50px",
            minWidth: "auto",
          }}
          onClick={() => setHiddenValues(!hiddenValues)}
        >
          {hiddenValues ? (
            <FaRegEyeSlash
              style={{ color: "black", height: "18px", width: "18px" }}
            />
          ) : (
            <FaRegEye
              style={{ color: "black", height: "18px", width: "18px" }}
            />
          )}
        </Button>
      </Box>

      <Box
        pt="0px"
        // height="100%"
        display="flex"
        flexDirection="column"
        // alignItems="center"
        // justifyContent="center"
        justifyContent="space-between"
        gap={gapSize}
      >
        <Typography variant="p" fontSize={fontSizeNum} fontFamily="Poppins">
          {" "}
          {/* "all"
"gross"
"liquid"
"expense" */}
          {type == "onlyMoney" ||
          type == "sales" ||
          type == "all" ||
          type == "gross" ||
          type == "liquid" ||
          type == "expense"
            ? "R$"
            : ""}
          <span>
            {hiddenValues
              ? "**"
              : ` ${typeof value !== "string" ? valReturn(value) : " "}`}
          </span>
        </Typography>
        {type == "sales" ||
        type == "all" ||
        type == "gross" ||
        type == "liquid" ||
        type == "expense" ? (
          <Box justifyItems="end">
            <Box
              display="flex"
              // flexDirection="column"
              // flexDirection='row'
              gap="5px"
              bgcolor="#F3E2E0"
              p="4px"
              borderRadius="4px"
            >
              <Typography variant="p" fontSize="12px">
                {minusPlus} {allValueMonth}% {/* (mês anterior) */}
              </Typography>
              <button
                className="btnView"
                onClick={() =>
                  alert("porcentagem relacionada em comparação ao mês anterior")
                }
              >
                <GiInfo />
              </button>{" "}
              {/* <Typography color="red" variant="p" fontSize="12px">
            -12% (ano anterior)
          </Typography> */}
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default ShowValues;
