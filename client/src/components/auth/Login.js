import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { loginUser } from "../../actions/authActions";
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
import clsx from "clsx";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      showPassword: false,
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
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

  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
        <Box className="page" justifyContent="center">
          <Paper className={classes.paper}>
            <Typography variant="h5" align="center">
              Log In
            </Typography>
            <form noValidate onSubmit={this.onSubmit}>

            <TextField
              id="email"
              label="Email"
              className={clsx(classes.margin, classes.textField)}
              // value={this.state.email}
              helperText={errors.email || errors.emailnotfound}
              error={errors.email || errors.emailnotfound ? true : false}
              onChange={this.handleChange("email")}
            />
                        <span className="red-text">

            </span>
            <br />
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              
              <Input
                id="password"
                error={errors.email || errors.emailnotfound ? true : false}
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                helperText={errors.email || errors.emailnotfound}
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
              <FormHelperText >
                {errors.password || errors.passwordincorrect}
              </FormHelperText>
            </FormControl>
            <br />
            {/* <Link href="#" variant="body2" align="right"> */}
            {/* <Typography align="right">{"Sign Up"}</Typography> */}
            {this.state.email && this.state.password ? (
              <Button variant="contained" color="primary" type="submit" >
                Submit
              </Button>
            ) : (
              

              <Link to="/register"><Button color="primary">or sign up</Button> </Link>

            )}
            {/* </Link> */}
            <br />
            </form>
          </Paper>
        </Box>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default compose(
  connect(mapStateToProps, { loginUser }),
  withStyles(styles)
)(Login);
