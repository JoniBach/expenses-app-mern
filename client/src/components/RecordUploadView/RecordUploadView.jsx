import React, { useState, useEffect, useContext } from "react";
import { Button, Paper, Stepper, Step, StepLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { UploadContext } from "../../contexts/UploadContext";
import RecordDetailer from "./RecordDetailer";
import OcrConverter from "./OcrConverter";
import PreUploadSummaryViewer from "./PreUploadSummaryViewer";
import PropTypes from "prop-types";
import store from "../../store";
import { logoutUser, loginUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { upload } from "../../actions/authActions";

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

function RecordUploadView(props) {
  const { user } = props.auth;
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
  // const onSubmit = () => {
  //   const formData = new FormData();
  //   formData.append("uploadedData", uploadData);
  //   axios
  //     .post("http://localhost:4000/api/user-profile", formData, {})
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .then(fetchUploadData);
  // };
//   const onSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('myfile',uploadData);
//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     };
//     axios.post("http://localhost:4000/api/upload",formData,config)
//         .then((response) => {
//             alert("The data has been successfully uploaded");
//         }).catch((error) => {
//     });
// }
const [complete, setComplete] = useState(false)
console.log('complete',setComplete)
const onSubmit = (event) => {
  setUploadData({
    ...uploadData,
    _id: user._id,
  });
    event.preventDefault();
    setComplete(true);
  };
  useEffect(() => {
    if (complete) {
      props.upload(uploadData, props.history);
      console.log('uploading data', uploadData);
    // store.dispatch(logoutUser());

    }
  }, [complete]);


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
          <Button variant="contained" color="primary" 
          onClick={
         handleNext
          }
          >
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

RecordUploadView.propTypes = {
  upload: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default 
  connect(mapStateToProps, { upload })(RecordUploadView);

