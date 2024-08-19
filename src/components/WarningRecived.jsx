import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { IoMdClose } from "react-icons/io";
// import { SidebarContext } from "../context/sidebarContext";
import {
  deleteSale,
  deleteStock,
  deliveredSale,
  editStockEntry,
} from "../services/APIService";
import { SidebarContext } from "../context/sidebarContext";

// console.log

function WarningReceived({
  receiveVisible = true,
  setReceiveVisible,
  type,
  //   setConfirmedFunc,
  //   confirmedFunc,
}) {
  const {
    imgUrl,
    editEntry,
    setEditEntry,
    attDataFunc,
    setLoading,
    loading,
    setIsConcluded,
  } = useContext(SidebarContext);

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
        visibility: `${receiveVisible ? "none" : "hidden"}`,
      }}
      className={`${receiveVisible ? "animationOpacity" : ""}`}
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
        {/* <Box display="flex" alignItems="center" justifyContent="end" pl="40px">
          <Button
            sx={{ color: "black" }}
            onClick={(e) => {
              // console.log(e.target.style.color);
              setreceiveVisible(!receiveVisible);
              //   setProductVisible(0);
              //   setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box> */}
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          gap="15px"
          //   justifyContent="center"
          p="5px"
        >
          <div>
            <h1 className="text-xl font-bold">
              {type == "stock" ? "A compra foi" : ""}
              {type == "sale" ? "A venda foi" : ""}
              {type.includes("cancel") ? "Certeza do" : ""}
            </h1>
            <h1 className="text-xl font-bold">
              {type == "stock" ? "recebida?" : ""}
              {type == "sale" ? "entregue?" : ""}
              {type.includes("cancel") ? "cancelamento?" : ""}
            </h1>
          </div>

          {/* <Typography
            pb="20px"
            textAlign="center"
            pt="15px"
            fontFamily="Poppins"
          >
            {" "}
             
            ver anexo
          </Typography> */}
          {/* <Box> */}
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={async () => {
                // setLoading(true);
                if (type == "stock") {
                  const response = await editStockEntry(editEntry);
                  console.log(response);
                } else if (type == "sale") {
                  const response = await deliveredSale(editEntry.id);
                  console.log(response);
                } else if (type == "cancelSale") {
                  console.log("laodign");
                  // setIsConcluded(false);

                  console.log("load", loading);
                  setLoading(true);
                  const response = await deleteSale(editEntry.id);
                  console.log(response);
                  // setLoading(false);
                  // setIsConcluded(true);
                  console.log("load", loading);
                } else if (type == "cancelStock") {
                  console.log("CANCELANDO STOCK");
                  // setIsConcluded(false);

                  console.log("load", loading);
                  console.log(editEntry.id);
                  setLoading(true);
                  const response = await deleteStock(editEntry.id);
                  console.log(response);
                  // setLoading(false);
                  // setIsConcluded(true);
                  console.log("load", loading);
                }
                // setLoading(false);
                setReceiveVisible(!receiveVisible);
                // setConfirmedFunc(!confirmedFunc);
                attDataFunc();
              }}
              //   fullWidth
              className="w-full min-w-20 transition duration-200 p-1 px-2 rounded bg-[#B23F30] text-white hover:bg-[#8b3226]"
            >
              sim
            </button>
            {/* </Box> */}
            {/* <Box> */}
            <button
              onClick={() => {
                setReceiveVisible(!receiveVisible);
                // setConfirmedFunc(!confirmedFunc);
              }}
              fullWidth
              className="w-full min-w-20 transition duration-200 p-1 px-2 rounded bg-slate-100 text-black hover:bg-slate-300"
            >
              não
            </button>
          </div>

          {/* </Box> */}
        </Box>
      </Box>
    </Box>
  );
}

export default WarningReceived;
