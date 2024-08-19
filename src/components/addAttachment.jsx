// import filesize from "filesize";
// import { filesize } from "/node_modules/.vite/deps/filesize.js?v=c8940b6a";

// import "react-circular-progressbar/dist/styles.css";
// import CircularProgressbar from "react-circular-progressbar";
// import { CircularProgressBar } from "/node_modules/.vite/deps/react-circular-progressbar.js?v=6f3187a8";
// import * as CircularProgressbar from "/node_modules/.vite/deps/react-circular-progressbar.js?v=6f3187a8";
// console.log
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { DropContainer, UploadMessage } from "../styles";

import { Container, FileInfo, Preview } from "../styles";

import { uniqueId } from "lodash";

import { filesize } from "filesize";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useState } from "react";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

// console.log

function AddAttachment({
  addImgBoxVisible,
  setAddImgBoxVisible,
  setImage,
  image,
  setFileInfos,
}) {
  // const {
  //   getRootProps,
  //   getInputProps,
  //   isDragActive,
  //   isDragAccept,
  //   isDragReject,
  // } = useDropzone({
  //   accept: {
  //     "image/jpeg": [],
  //     "image/png": [],
  //   },
  // });

  const [addedFile, setAddedFile] = useState(false);
  const [file, setFile] = useState(null);

  const state = {
    uploadedFiles: [],
  };

  const processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append("file", uploadedFile);
    // setImage(uploadedFile);
    // console.log("upload ---->", uploadedFile);
    // console.log("data ->", data);
    // console.log("image ->", image);
  };

  const handleUpload = async (files) => {
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

    const formData = new FormData();
    formData.append("file", files[0]);

    // setImage(files[0]);
    setImage(files[0]);
    setFileInfos(formData);

    // console.log(formData);
    // console.log([...formData]);
    // console.log("como vou enviar -->>", files[0]);
    // console.log("como vou enviar -->>", files);

    // const reponseFile = await exportFileData(formData);
    // console.log(reponseFile);
    // console.log(reponseFile.file);

    // console.log(uploadedFiles);

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
      return <UploadMessage>Arraste os arquivos aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
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
        visibility: `${addImgBoxVisible ? "none" : "hidden"}`,
      }}
      // onClick={() => setAddImgBoxVisible(!addImgBoxVisible)}
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
            onClick={() => setAddImgBoxVisible(!addImgBoxVisible)}
          >
            <IoMdClose style={{ height: "28px", width: "28px" }} />
          </Button>
        </Box>
        <Box textAlign="center" p="40px">
          <h1>Adicione um anexo</h1>
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
                <input
                  type="file"
                  enctype="multipart/form-data"
                  {...getInputProps()}
                />
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
                  {/* oq tava */}
                  {/* {!file.uploaded && !file.error && (
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
                  )} */}

                  {/* teste */}
                  {/* {file.uploaded ? (
                    <CircularProgress
                      size="24px"
                      style={{ color: "#ffffff" }}
                    />
                  ) : (
                    "carregado"
                  )} */}
                  {file.url && (
                    <a href="#" target="_blank" rel="">
                      <MdLink
                        style={{ marginRight: 8 }}
                        size={24}
                        color="#222"
                      />
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
      </Box>
    </Box>
  );
}

export default AddAttachment;
