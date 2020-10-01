import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import RecordUploadView from "../RecordUploadView/RecordUploadView";
import RecordViewer from "../RecordViewer/RecordViewer";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  MoveToInbox,
  Mail,
  Menu,
} from "@material-ui/icons";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { config } from "../../config";
import StatisticsViewer from "../StatisticesViewer/StatisticsViewer";
// import ReceiptUploader from "../ReceiptUploader/ReceiptUploader";
// import ReceiptView from "../ReceiptView/ReceiptView";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // flexGrow: 1,
    // padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  input: {
    display: "none",
  },
}));

 function Dashboard({ match }) {
  const useFetch = (url) => {
    // const { user } = props.auth;

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
    return [data, loaded];
  };

  const recieptData = useFetch("http://localhost:4000/");

  console.log("receipt data: ", recieptData);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [UserMenuOpen, setUserMenuOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setUserMenuOpen(false);
    }
  }

  const prevUserMenuOpen = React.useRef(UserMenuOpen);
  React.useEffect(() => {
    if (prevUserMenuOpen.current === true && UserMenuOpen === false) {
      anchorRef.current.focus();
    }

    prevUserMenuOpen.current = UserMenuOpen;
  }, [UserMenuOpen]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {config.appID.displayName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {config.menus.mainMenu.map((d, i) => (
            <ListItem
              button
              onMouseOver={handleDrawerOpen}
              onMouseOut={handleDrawerClose}
              key={i}
              component={(props) => (
                <Link {...props} to={`${match.url}/${d.path}`} />
              )}
            >
              <ListItemIcon>{d.icon}</ListItemIcon>
              <ListItemText primary={d.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {config.menus.userMenu.map((d, i) => (
            <ListItem
              button
              onMouseOver={handleDrawerOpen}
              onMouseOut={handleDrawerClose}
              key={i}
              component={(props) => (
                d.path 
                ?  <Link {...props} to={`${match.url}/${d.path}`} />
                : <a {...props} href={`${d.href}`} />
              )}
            >
              <ListItemIcon>{d.icon}</ListItemIcon>
              <ListItemText primary={d.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {config.menus.miscMenu.map((d, i) => (
            <ListItem
              button
              onMouseOver={handleDrawerOpen}
              onMouseOut={handleDrawerClose}
              key={i}
              component={(props) => (
                <Link {...props} to={`${match.url}/${d.path}`} />
              )}
            >
              <ListItemIcon>{d.icon}</ListItemIcon>
              <ListItemText primary={d.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Box>
            {config.menus.mainMenu.map((d, i) => (
              <Route
                path={`${match.path}/${d.path}`}
                render={() => d.component}
              />
            ))}
          </Box>
          <Box>
            {config.menus.userMenu.map((d, i) => (
              <Route
                path={`${match.path}/${d.path}`}
                render={() => d.component}
              />
            ))}
          </Box>
          <Box>
            {config.menus.miscMenu.map((d, i) => (
              <Route
                path={`${match.path}/${d.path}`}
                render={() => d.component}
              />
            ))}
          </Box>
        </main>
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { Dashboard }
)(Dashboard);

