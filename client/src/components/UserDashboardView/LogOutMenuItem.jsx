import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { ExitToApp } from "@material-ui/icons";
import { List, ListItemText, ListItem, ListItemIcon } from "@material-ui/core";
class LogOutMeniItem extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
   
              <List>
              <ListItem
                button
                // onMouseOver={handleDrawerOpen}
                // onMouseOut={handleDrawerClose}
                key="log-out"
                // component={(props) => (<LogOutMenuItem />)}
                onClick={this.onLogoutClick}
              >
                <ListItemIcon><ExitToApp color="secondary"/></ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>
          </List>
    );
  }
}
LogOutMeniItem.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(LogOutMeniItem);
