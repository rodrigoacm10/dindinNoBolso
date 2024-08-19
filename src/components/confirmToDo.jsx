import { Box, Button, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";

// console.log

function ConfirmToDo({
  confirmVisible = true,
  setConfirmVisible,
  setConfirmedFunc,
  confirmedFunc,
}) {
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
          <h1>Deseja trocar </h1>
          <h1>o anexo?</h1>
          <Typography
            pb="20px"
            textAlign="center"
            pt="15px"
            fontFamily="Poppins"
          >
            {" "}
            {/* preencha as informações abaixo */}
            tenho certeza
          </Typography>
          <Box>
            <Button
              onClick={() => {
                setConfirmVisible(!confirmVisible);
                setConfirmedFunc(!confirmedFunc);
              }}
              fullWidth
              sx={{
                color: 'white',
                display: "flex",
                alignItems: "center",
                gap: "3px",
                fontFamily: "Poppins",
                textTransform: "none",
                background: "#B23F30",
                ":hover": {
                  backgroundColor: "#8b3226",
                },
              }}
            >
              Continuar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ConfirmToDo;
