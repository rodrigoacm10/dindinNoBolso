import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { SidebarContext } from "../context/sidebarContext";

// console.log

function ToImgBox({
  toImgVisible = true,
  setToImgVisible,
  //   setConfirmedFunc,
  //   confirmedFunc,
}) {
  const { imgUrl } = useContext(SidebarContext);

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
        visibility: `${toImgVisible ? "none" : "hidden"}`,
      }}
      className={`${toImgVisible ? "animationOpacity" : ""}`}
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
              setToImgVisible(!toImgVisible);
              //   setProductVisible(0);
              //   setIsConcluded(false);
            }}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box> */}
        <Box
          display="flex"
          textAlign="center"
          gap="5px"
          justifyContent="center"
          p="5px"
        >
          {/* <h1>Deseja trocar </h1>
          <h1>o anexo?</h1> */}
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
          <a
            href={imgUrl}
            target="_blank"
            onClick={() => {
              setToImgVisible(!toImgVisible);
              // setConfirmedFunc(!confirmedFunc);
            }}
            fullWidth
            className="transition duration-200 p-2 rounded bg-[#B23F30] text-white hover:bg-[#8b3226]"
          >
            ver anexo
          </a>
          {/* </Box> */}
          {/* <Box> */}
          <button
            onClick={() => {
              setToImgVisible(!toImgVisible);
              // setConfirmedFunc(!confirmedFunc);
            }}
            fullWidth
            className="transition duration-200 p-2 rounded bg-slate-100 text-black hover:bg-slate-300"
          >
            cancelar
          </button>
          {/* </Box> */}
        </Box>
      </Box>
    </Box>
  );
}

export default ToImgBox;
