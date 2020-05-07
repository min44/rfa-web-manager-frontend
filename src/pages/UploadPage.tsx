import React from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import SnackAlert from "../components/SnackAlert";
import { useStores } from "../hooks/strores.hook";
import { Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import { fromPromise } from "mobx-utils";
import { DropzoneArea } from "material-ui-dropzone";


const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: "0px",
    borderRadius: "12px",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
    backgroundColor: "#222222",
  },
  dropzoneParagraph: {
    paddingTop: "30px",
    flexGrow: 1,
    fontWeight: 1,
    marginBottom: "20px",
  },
  uploadIcon: {
    width: 80,
    height: 80,
    color: "#909090",
    marginBottom: "30px",
  },
}));

export const UploadPage: React.FC = () => {
  const classes = useStyles();
  const { forgeStore } = useStores();
  const [filesState, setFilesState] = useState([] as any);
  const [snackIsOpen, setSnackIsOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleClose = (e: React.ChangeEvent<HTMLInputElement>, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackIsOpen(false);
  };

  const handleUpload = async () => {
    if (filesState.length > 0) {
      const data = new FormData();
      filesState.forEach((file: any) => data.append("files", file));
      fromPromise(forgeStore.uploadFile(data).then(() => setIsUploaded(true)));
      setFilesState([]);
    } else {
      setSnackIsOpen(true);
    }
  };

  return isUploaded ? (
    <Redirect to="/datamanagement" />
  ) : (
    <Container maxWidth="md">
      <CssBaseline />
      {forgeStore.uploading ? (
        <Loader />
      ) : (
        <div style={{ paddingTop: "30px" }}>
          <div>
            <DropzoneArea
              dropzoneLabelsStyle={filesState.length > 0 ? { display: "none" } : {}}
              dropzoneClass={classes.dropzone}
              dropzoneParagraphClass={classes.dropzoneParagraph}
              uploadIconClass={classes.uploadIcon}
              dropzoneText={"Drag and drop revit family file here or click"}
              acceptedFiles={[".rfa", ".rvt", "*.*", ".", ".jpg", ".jpeg"]}
              showFileNames={true}
              onChange={(files) => setFilesState(files)}
              maxFileSize={10000000}
              filesLimit={6}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <label htmlFor="contained-button-file">
              <Button color="primary" variant="contained" component="span" fullWidth={true} onClick={handleUpload}>
                Upload
              </Button>
            </label>
          </div>
        </div>
      )}
      <SnackAlert
        messageText={"No one file has been attached"}
        open={snackIsOpen}
        handleClick={() => setSnackIsOpen(true)}
        handleClose={handleClose}
      />
    </Container>
  );
};
