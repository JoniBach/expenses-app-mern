import React, { useState, useEffect, useContext } from "react";
import { Button, Paper, Stepper, Step, StepLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { UploadContext } from "../../contexts/UploadContext";
import RecordDetailer from "./RecordDetailer";
import OcrConverter from "./OcrConverter";
import PreUploadSummaryViewer from "./PreUploadSummaryViewer";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
}));

function getSteps() {
  return ["Upload Receipt", "Enter Shop Details", "Review & Submit"];
}

export default function RecordUploadView() {
  const classes = useStyles();
  const [uploadData, setUploadData] = useContext(UploadContext);
  const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    async function fetchURL() {
      const response = await fetch(url).then(function (response) {
        return response.json();
      });
      setData(response);
      setLoaded(true);
    }
    useEffect(() => {
      fetchURL();
    }, []);
    return [data];
  };
  const fetchUploadData = useFetch("http://localhost:4000/api");
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("uploadedData", uploadData);
    axios
      .post("http://localhost:4000/api/user-profile", formData, {})
      .then((res) => {
        console.log(res);
      })
      .then(fetchUploadData);
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setUploadData({
      ...uploadData,
      isComplete: false,
    });
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <OcrConverter />;
      case 1:
        return <RecordDetailer />;
      case 2:
        return <PreUploadSummaryViewer />;
      case 3:
        return;
      default:
        return "Unknown stepIndex";
    }
  }
  return (
    <Paper className={classes.paper}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
      <div>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {uploadData.isComplete || activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Upload" : "Next"}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={true}
          >
            {activeStep === steps.length - 1 ? "Upload" : "Next"}
          </Button>
        )}
        <Button onClick={onSubmit}>test</Button>
      </div>
    </Paper>
  );
}
