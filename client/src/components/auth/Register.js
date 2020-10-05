import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import "./LoginView.css";
import classnames from "classnames";
import {
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Input,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { compose } from "redux";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    marginTop: theme.spacing(5),
  },
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    margin: theme.spacing(1),
    justify: "centre",
    position: "absolute",
    padding: theme.spacing(8),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  link: {
    textAlign: "right",
  },
});
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      sName: "",
      dob: "",
      mob: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      sName: this.state.sName,
      dob: this.state.dob,
      dob: this.state.dob,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };
  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  handleClickShowPassword2 = () => {
    this.setState({ showPassword2: !this.state.showPassword2 });
  };

  handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <Box className="page" justifyContent="center">
        <Paper className={classes.paper}>
          <Typography variant="h5" align="center">
            Sign Up
          </Typography>
          <form noValidate onSubmit={this.onSubmit}>
            <TextField
            required
              id="name"
              label="Name"
              className={clsx(classes.margin, classes.textField)}
              // value={this.state.name}
              // helperText={errors.name || errors.namenotfound}
              // error={errors.name || errors.namenotfound ? true : false}
              onChange={this.handleChange("name")}
            />
            <br />
            <TextField
            required
            id="sName"
              label="Surname"
              className={clsx(classes.margin, classes.textField)}
              // value={this.state.name}
              // helperText={errors.name || errors.namenotfound}
              // error={errors.name || errors.namenotfound ? true : false}
              onChange={this.handleChange("sName")}
            />
            <br />
            <TextField
            required
            id="email"
              label="Email"
              className={clsx(classes.margin, classes.textField)}
              // value={this.state.email}
              helperText={errors.email || errors.emailnotfound}
              error={errors.email || errors.emailnotfound ? true : false}
              onChange={this.handleChange("email")}
            />
            <br />
            <FormControl 
            required
            
            className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="password"
                error={errors.password ? true : false}
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                helperText={errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{errors.password}</FormHelperText>
            </FormControl>
            <br />
            <FormControl 
            required
            
            className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Re enter Password
              </InputLabel>
              <Input
                id="password2"
                error={errors.password ? true : false}
                type={this.state.showPassword2 ? "text" : "password"}
                value={this.state.password2}
                onChange={this.handleChange("password2")}
                helperText={errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword2}
                      onMouseDown={this.handleMouseDownPassword2}
                    >
                      {this.state.showPassword2 ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{errors.password2}</FormHelperText>
            </FormControl>
            <br />
            <TextField
              id="dob"
              label="Date of Birth"
              className={clsx(classes.margin, classes.textField)}
              // value={this.state.name}
              // helperText={errors.name || errors.namenotfound}
              // error={errors.name || errors.namenotfound ? true : false}
              onChange={this.handleChange("dob")}
            />
            <br />
            <TextField
              id="mob"
              label="Mobile Number"
              className={clsx(classes.margin, classes.textField)}
              // value={this.state.name}
              // helperText={errors.name || errors.namenotfound}
              // error={errors.name || errors.namenotfound ? true : false}
              onChange={this.handleChange("mob")}
            />
            <br />
            
            {this.state.email &&
            this.state.password &&
            this.state.name &&
            this.state.sName &&
            this.state.password &&
            this.state.password2 ? (
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            ) : (
              <Link to="/login">
                <Button color="primary">or return to login</Button>{" "}
              </Link>
            )}
            <br />
          </form>
        </Paper>
      </Box>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default compose(
  connect(mapStateToProps, { registerUser }),
  withStyles(styles)
)(Register);
