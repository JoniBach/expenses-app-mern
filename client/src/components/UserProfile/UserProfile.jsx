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
  Paper, Table, TableBody, TableCell, TableContainer, TableRow
} from "@material-ui/core";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { config } from "../../config";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { registerUser } from "../../actions/authActions";
import { compose } from "redux";

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

function UserProfile(props) {
  const  {user}  = props.auth;
  console.log('sName: ',user)
  const classes = useStyles();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: user.name,
    sName: user.sName,
    email: user.email,
    avatar: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    dob: user.dob,
    mob: user.mob,
  });
  const [prvUserDetails, setPrvUserDetails] = useState({
    name: user.name,
    sName: user.sName,
    email: user.email,
    avatar: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    dob: user.dob,
    mob: user.mob,
  });
  const handleChange = (prop) => (event) => {
    setPrvUserDetails({ ...prvUserDetails, [prop]: event.target.value });
  };
  const handleSubmit = (prop) => (event) => {
    setIsEditProfile(false);
    // setUserDetails({ ...userDetails, [prop]: event.target.value });
  };
  const onAvatarChange = (prop) => (event) => {
    setUserDetails({ ...userDetails, avatar: event.target.files });
  }
  const onSubmit = (prop) => (event)  => {
    event.preventDefault();
    setUserDetails({ 
      ...userDetails,
      name: prvUserDetails.name,
      sName: prvUserDetails.sName,
      dob: prvUserDetails.dob,
      mob: prvUserDetails.mob,
      email: prvUserDetails.email,
    })
    setIsEditProfile(false);
    // TODO: create props.updateUser()
    // props.registerUser(userDetails, props.history);
  };
  const onCancel = (prop) => (event)  => {
    event.preventDefault();
    setPrvUserDetails({ 
      ...prvUserDetails,
      name: userDetails.name,
      sName: userDetails.sName,
      dob: userDetails.dob,
      mob: userDetails.mob,
      email: userDetails.email,
    })
    setIsEditProfile(false);
    // TODO: create props.updateUser()
    // props.registerUser(userDetails, props.history);
  };

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
          <form noValidate autoComplete="off" className={classes.item} 
          // onSubmit={() => handleSubmit()}
          >
            {config.userProfile.userDetailsForm.map((d, i) =>
              isEditProfile ? (
                <TextField
                  label={d.label}
                  value={prvUserDetails[d.key]}
                  onChange={handleChange(d.key)}
                  fullWidth
                  className={classes.textField}
                />
              ) : (
                <Grid container>
                      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="user-profile-content">
        <TableBody>
            <TableRow key={d.key}>
              <TableCell component="th" scope="row">
                {d.label}
              </TableCell>
              <TableCell align="right">{prvUserDetails[d.key]}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                </Grid>
              )
            )}
          
          {isEditProfile ? (
            <div>
            <Button
              onClick={onSubmit()}
              variant="contained"
              color="primary"
              // type="submit"
            >
              {" "}
              Submit
            </Button>
            <Button
              onClick={onCancel()}
              variant="outlined"
              color="secondary"
              // type="submit"
            >
              {" "}
              Cancel
            </Button>
            </div>

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
          </form>
        </Box>
      </Paper>
    // </div>
  );
}

UserProfile.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default compose(
  connect(mapStateToProps, { registerUser })
  // withStyles(styles)
)(UserProfile);
