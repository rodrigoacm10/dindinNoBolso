import { Box, Button, Typography } from "@mui/material";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import QrScanner from "qr-scanner";
import AddAttachment from "../../components/addAttachment";

// import BarcodeScannerComponent from "react-qr-barcode-scanner";

import { IoMdClose } from "react-icons/io";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { DropContainer, UploadMessage } from "../../styles";

import { Container, FileInfo, Preview } from "../../styles";

import { uniqueId } from "lodash";

import { filesize } from "filesize";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

// console.log

function QrCodeReader() {
  const [scanResult, setScanResult] = useState(null);
  const [resout, setResout] = useState("");
  // const [data, setData] = useState("Not Found");

  const readCode = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true });
    // .then((result) => console.log(result))
    // .catch((e) => console.log(e));
  };

  const readCodeTest = (file) => {
    // const file = e.target.files[0];
    // console.log(file);
    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true });
    // .then((result) => console.log(result))
    // .catch((e) => console.log(e));
  };

  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner("reader", {
  //     qrbox: {
  //       width: 250,
  //       height: 250,
  //       // width: "100px",
  //       // height: "100px",
  //     },
  //     fps: 5,
  //   });

  //   scanner.render(success, error);

  //   function success(result) {
  //     scanner.clear();
  //     setScanResult(result);
  // console.log(result);
  //     // window.location.href = `/initialPage`;
  //   }

  //   function error(err) {
  //     console.warn(err);
  //   }
  // }, []);

  const [addedFile, setAddedFile] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const state = {
    uploadedFiles: [],
  };

  const processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append("file", uploadedFile);
    setImage(uploadedFile);
    // console.log("data ->", data);
    // console.log("image ->", image);
    // console.log("--->>>", uploadedFile.file);
  };

  const handleUpload = (files) => {
    const uploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    // console.log(uploadedFiles);
    // readCodeTest(uploadedFiles);
    readCodeTest(files[0]);

    if (!!state.uploadedFiles.length) {
      state.uploadedFiles[0] = uploadedFiles;
      setAddedFile(!!state.uploadedFiles.length);
      setFile(state.uploadedFiles[0][0]);
      // console.log(state);
      // console.log(file);
      processUpload(state.uploadedFiles[0][0]);

      return;
    }

    state.uploadedFiles.push(uploadedFiles);
    setAddedFile(!!state.uploadedFiles.length);
    setFile(state.uploadedFiles[0][0]);
    // console.log(state);
    // console.log(file);
    processUpload(state.uploadedFiles[0][0]);
  };

  const renderDragMessege = (isDragActive, isDragReject) => {
    // console.log(isDragActive, isDragReject);
    if (!isDragActive) {
      return <UploadMessage>Insira a imagem do QR Code aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  };

  return (
    <Box p="20px" className="animationStartRight">
      <Box>
        <Typography variant="h4" fontFamily="Poppins" fontWeight="700">
          LEITOR DE{" "}
          <span
            style={{
              color: "#d32f2f",
              fontWeight: 700,
            }}
          >
            QRCODE
          </span>
        </Typography>
        <Typography fontFamily="Poppins">Centralize o QRcode</Typography>
      </Box>
      {/* <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Box width="600px" height="500px" pt="40px">
          {scanResult ? <div>{scanResult}</div> : <div id="reader"></div>}
        </Box>
      </Box> */}
      <Box
        textAlign="center"
        p="40px"
        sx={{
          backgroundColor: "#ffffff",
          border: "12px solid #d32f2f",
          borderRadius: "20px",
        }}
      >
        <h1>Adicione uma imagem de QR Code</h1>
        <Dropzone
          // accept="image/*"
          accept={{
            "image/jpeg": [],
            "image/png": [],
          }}
          maxFiles={1}
          // accept={["image/jpeg", "image/png"]}

          // onDrop={(a) => {
          //   setImage(a.file);
          // console.log(a[0]);
          // console.log(a);
          // }}

          onDropAccepted={(a) => {
            handleUpload(a);
            // setImage(a.file);
            // readCodeTest(a[0]);
            // console.log(a[0]);
            // console.log(a);
          }}
        >
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <DropContainer
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
              style={{ minWidth: "300px", height: "100px" }}
            >
              <input {...getInputProps()} />
              {renderDragMessege(isDragActive, isDragReject)}
            </DropContainer>
          )}
        </Dropzone>
        {addedFile && image ? (
          <Container>
            <li>
              <FileInfo>
                <Preview src={file.preview} />
                <div>
                  <strong>{file.name}</strong>
                  <span>
                    {file.readableSize}{" "}
                    {!!file.url && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        Excluir
                      </button>
                    )}
                  </span>
                </div>
              </FileInfo>

              <div style={{ width: "40px", height: "40px" }}>
                {!file.uploaded && !file.error && (
                  <CircularProgressbar
                    style={buildStyles({
                      with: "100%",
                      height: "100%",
                      root: { width: 1 },
                      path: { stroke: "#7159c1" },
                    })}
                    // strokeWidth={10}
                    value={file.progress}
                  />
                )}
                {file.url && (
                  <a href="#" target="_blank" rel="">
                    <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                  </a>
                )}

                {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                {file.error && <MdError size={24} color="#e57878" />}
              </div>
            </li>
          </Container>
        ) : (
          ""
        )}
      </Box>

      {/* <input type="file" onChange={(e) => readCode(e)}></input> */}
      {/* <BarcodeScannerComponent
        // style={{ backgroundColor: "red" }}
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("Not Found");
        }}
      />
      <p>-- {data} --</p> */}
    </Box>
  );
}

export default QrCodeReader;
