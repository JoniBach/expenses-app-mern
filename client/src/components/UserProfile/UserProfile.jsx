import React, { useContext, useState } from "react";
import {
  Box,
  Avatar,
  TextField,
  Typography,
  Button,
  Link,
  Card,
  Grid,
  Divider,
  Paper,
} from "@material-ui/core";
import { config } from "../../config";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    padding: theme.spacing(3),
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  textField: {
    paddingBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fName: "James",
    sName: "Crook",
    email: "jamescrook@email.com",
    avatar: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    password: "password",
    oldPassword: "",
    newPassowrd: "",
    dob: "01/02/2003",
    mob: "07123456789",
  });
  const handleChange = (prop) => (event) => {
    setUserDetails({ ...userDetails, [prop]: event.target.value });
  };
  const handleSubmit = (prop) => (event) => {
    setIsEditProfile(false);
    setUserDetails({ ...userDetails, [prop]: event.target.value });
  };
  const onAvatarChange = (prop) => (event) => {
    setUserDetails({ ...userDetails, avatar: event.target.files });
  }
  return (
    // <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {!isEditProfile ? (
            <Avatar className={classes.avatar} src={userDetails.avatar} />
          ) : (
            <>
              <Avatar className={classes.avatar} src={userDetails.avatar}  />
              <Link>Change Profile Picture</Link>
              <input
        type="file"
        onChange={handleChange('avatar')}
      />
            </>
          )}
          <form noValidate autoComplete="off" className={classes.item}>
            {config.userProfile.userDetailsForm.map((d, i) =>
              isEditProfile ? (
                <TextField
                  label={d.label}
                  value={userDetails[d.key]}
                  onChange={handleChange(d.key)}
                  fullWidth
                  className={classes.textField}
                />
              ) : (
                <Grid container>
                    <Grid item xs={6} className={classes.item}><Typography align="right">{d.label} </Typography></Grid>
                    <Grid item xs={6} className={classes.item}><Typography>{userDetails[d.key]}</Typography></Grid>
                </Grid>
              )
            )}
          </form>
          {isEditProfile ? (
            <Button
              onClick={handleSubmit()}
              variant="contained"
              color="primary"
            >
              {" "}
              Submit
            </Button>
          ) : (
            <Button
              onClick={() => setIsEditProfile(true)}
              variant="outlined"
              color="primary"
            >
              {" "}
              Edit
            </Button>
          )}
        </Box>
      </Paper>
    // </div>
  );
}
