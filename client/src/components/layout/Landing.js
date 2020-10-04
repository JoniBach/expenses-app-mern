import React, { Component, useState, useRef, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { textIntro } from "./Animate";
import Menu from "./Menu";
import "../../App.scss";
import { config } from "../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Landing({ history }) {
  const classes = useStyles();

  let logo = useRef(null);
  // State of our Menu
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu",
  });
  // State of our button
  const [disabled, setDisabled] = useState(false);

  //When the component mounts
  useEffect(() => {
    textIntro(logo);
    //Listening for page changes.
    history.listen(() => {
      setState({ clicked: false, menuName: "Menu" });
    });
  }, [history]);

  //toggle menu
  const handleMenu = () => {
    disableMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: "Close",
      });
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuName: "Menu",
      });
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuName: "Close",
      });
    }
  };

  // check if out button is disabled
  const disableMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <div className="container">
          <header>
            <div className="wrapper">
              <div className="inner-header">
                <div className="logo" ref={(el) => (logo = el)}>
                  <Link to="/dashboard">
                    {config.appID.displayName}
                  </Link>
                 
                </div>
                <Typography>by {config.appID.author}</Typography>
                <Toolbar>
                  <div className="menu">
                    <Button
                      disabled={disabled}
                      color="inherit"
                      onClick={handleMenu}
                    >
                      {state.menuName}
                    </Button>
                  </div>
                </Toolbar>
              </div>
            </div>
            <Menu state={state} />
          </header>
        </div>
      </AppBar>
    </div>
  );
}
