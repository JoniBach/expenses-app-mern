import React, { useState, createRef, useEffect, useContext } from "react";
import { createWorker } from "tesseract.js";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";
import { UploadContext } from "../../contexts/UploadContext";
import { Box, LinearProgress, Typography } from "@material-ui/core";

registerPlugin(FilePondPluginImagePreview);

export default function OcrConverter() {
  const [isProcessing, setIsProcessing] = useState();
  const [ocrText, setOcrText] = useState();
  const [pctg, setPctg] = useState();
  const [uploadData, setUploadData] = useContext(UploadContext);
  var pond = createRef();
  var worker = createRef();
  async function handleOcr(file) {
    setIsProcessing(true);
    setOcrText("");
    setPctg("0.00");
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(file.file);
    setIsProcessing(false);
    setOcrText(text);
    setUploadData({
      ...uploadData,
      uploadedFile: file,
      processedText: text,
      isComplete: true,
    });
  }
  const handleRemoveFile = () => {
    setOcrText("");
    setUploadData({
      ...uploadData,
      uploadedFile: {},
      processedText: "",
      isComplete: false,
    });
  };
  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  function updateProgressAndLog(m) {
    var MAX_PARCENTAGE = 1;
    var DECIMAL_COUNT = 2;
    if (m.status === "recognizing text") {
      var pctg = (m.progress / MAX_PARCENTAGE) * 100;
      setPctg(pctg.toFixed(DECIMAL_COUNT));
    }
  }
  useEffect(() => {
    worker = createWorker({
      logger: (m) => updateProgressAndLog(m),
    });
  });
  return (
    <div>
      <FilePond
        ref={(ref) => (pond = ref)}
        labelIdle='Drag & Drop your receipt or <span class="filepond--label-action">Browse</span>'
        onaddfile={(err, file) => {
          handleOcr(file);
        }}
        onremovefile={(err, file) => {
          handleRemoveFile();
        }}
      />
      <h5>
        <span>
          {isProcessing ? <LinearProgressWithLabel value={pctg} /> : <div />}
        </span>
      </h5>
      <p>
        {isProcessing ? (
          <Box fontWeight="fontWeightBold" color="primary">
            <span>Processing file, Please wait...</span>
          </Box>
        ) : (
          <Box color="primary">
            <span>{ocrText}</span>
          </Box>
        )}
      </p>
    </div>
  );
}
