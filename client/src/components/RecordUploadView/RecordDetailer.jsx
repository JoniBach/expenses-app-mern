import React, { useState, useEffect, useContext } from "react";
import {
  InputLabel,
  InputAdornment,
  FormControl,
  Input,
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { UploadContext } from "../../contexts/UploadContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
}));

export default function RecordDetailer(props) {
  const classes = useStyles();
  const [uploadData, setUploadData] = useContext(UploadContext);
  const handleChange = (prop) => (event) => {
    setUploadData({
      ...uploadData,
      [prop]: event.target.value,
      isComplete: true,
    });
    if (uploadData.storeName && uploadData.totalAmount) {
      setUploadData({
        ...uploadData,
        [prop]: event.target.value,
        isComplete: true,
      });
    } else {
      setUploadData({
        ...uploadData,
        [prop]: event.target.value,
        isComplete: false,
      });
    }
  };
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="on">
        <div>
          <FormControl
            required
            className={clsx(classes.margin, classes.textField)}
          >
            <InputLabel htmlFor="standard-adornment-TotalAmount">
              Shop Name
            </InputLabel>
            <Input
              type={uploadData.storeName ? "text" : "Store Name"}
              value={uploadData.storeName}
              onChange={handleChange("storeName")}
            />
          </FormControl>
        </div>
        <div>
          <FormControl
            required
            className={clsx(classes.margin, classes.textField)}
          >
            <InputLabel htmlFor="standard-adornment-TotalAmount">
              Total Amount
            </InputLabel>
            <Input
              type={uploadData.totalAmount ? "number" : "Total Amount"}
              value={uploadData.totalAmount}
              onChange={handleChange("totalAmount")}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </div>
      </form>
    </div>
  );
}
