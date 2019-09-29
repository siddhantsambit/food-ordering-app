import React, { Component } from "react";
import "./Header.css";
import * as Utils from "../../common/Utils";
import Button from "@material-ui/core/Button";
import { SvgIcon, withStyles } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Fastfood from "@material-ui/icons/Fastfood";
import Search from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link ,Redirect} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

const styles = {
  root: {
    color: "#fff",
    width: "320px",
    fontSize: 15,
    "&:after": {
      // The MUI source seems to use this but it doesn't work
      borderBottom: "1px solid white"
    }
  },
  button: {
    color: "#fff",
    textTransform: "none"
  },
  formControl: {
    width: "80%"
  },
  loginButton: {
    marginTop: 30
  },
  menuItems: {
    marginTop: 30
  }
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const TabContainer = function(props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class Header extends Component {
  constructor() {
    super();
    this.baseUrl = "http://localhost:8080/api/";
    this.state = {
      modalIsOpen: false,
      value: 0,
      contactNoRequired: "dispNone",
      contactno: "",
      passwordRequired: "dispNone",
      password: "",
      firstnameRequired: "dispNone",
      firstname: "",
      lastnameRequired: "dispNone",
      lastname: "",
      emailRequired: "dispNone",
      email: "",
      validEmail: false,
      validPassword: false,
      validContactNo: false,
      open: false,
      signupErrorMsg: "",
      loginErrorMsg: "",
      successMessage: "",
      username: "",
      showUserProfileDropDown: false,
      anchorEl: null,
      redirectToHome:false
    };
  }

  componentDidMount() {
}
  openModalHandler = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModalHandler = () => {
    this.setState({ modalIsOpen: false });
    // Login
    this.setState({ contactNoRequired: "dispNone" });
    this.setState({ passwordRequired: "dispNone" });
    this.setState({ value: 0 });
    // Signup
    this.setState({ emailRequired: "dispNone" });
    this.setState({ firstnameRequired: "dispNone" });
    this.setState({ signupErrorMsg: "" });
    this.setState({ loginErrorMsg: "" });
  };
  tabChangeHandler = (event, value) => {
    this.setState({ value });
    // this.setState({ contactNoRequired: "dispNone" });
    // this.setState({ passwordRequired: "dispNone" });
    // this.setState({ emailRequired: "dispNone" });
    // this.setState({ firstnameRequired: "dispNone" });
    // this.setState({ contactno: "" });
    // this.setState({ password: "" });
    // this.setState({ email: "" });
    // this.setState({ firstname: "" });
    // this.setState({ signupErrorMsg: "" });
    // this.setState({ loginErrorMsg: "" });
  };
  loginClickHandler = () => {
    this.state.password === ""
      ? this.setState({ passwordRequired: "dispBlock" })
      : this.setState({ passwordRequired: "dispNone" });
    let isValidContactNo = this.contactnoFieldValidation();
    this.setState({
      loginErrorMsg: ""
    });
    if (isValidContactNo === true && this.state.password !== "") {
      this.callApiForLogin();
    }
  };

  //call the login api for the signup
  callApiForLogin = () => {
    let xhrPosts = new XMLHttpRequest();
    let that = this;

    let param = window.btoa(this.state.contactno + ":" + this.state.password);
    xhrPosts.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        var data = JSON.parse(this.responseText);
        if (this.status === 200) {
          that.setState({
            open: true,
            successMessage: "Logged in successfully!",
            username: data.first_name
          });
          sessionStorage.setItem(
            "access-token",
             this.getResponseHeader("access-token")
         
          );

          sessionStorage.setItem(
            "username",
       data.first_name
         
          );
          that.closeModalHandler();
        } else if (this.status === 401) {
          that.setState({
            loginErrorMsg: data.message
          });
        }
      }
    });
    xhrPosts.open("POST", this.baseUrl + "/customer/login");
    xhrPosts.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrPosts.setRequestHeader("authorization", "Basic " + param);
    xhrPosts.send();
  };

  //signupClickHandler will perform the validation and if the validation are passed then the signup api will be called
  signupClickHandler = () => {
    // Validate first Name ....
    this.state.firstname === ""
      ? this.setState({ firstnameRequired: "dispBlock" })
      : this.setState({ firstnameRequired: "dispNone" });
    // Validate Email
    let isValidEmail = this.emailFieldValidation();
    // Validate Password
    let isValidPassword = this.passwordFieldValidation();
    // Validate Contact No.
    let isValidContactNo = this.contactnoFieldValidation();

    this.setState({ signupErrorMsg: "" });
    if (
      isValidEmail === true &&
      isValidPassword === true &&
      isValidContactNo === true
    ) {
      this.callApiForSignup();
    }
  };
  
  //callApiForSignup will make a api call to the signup api 
  callApiForSignup = () => {
    let data = {
      contact_number: this.state.contactno,
      email_address: this.state.email,
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      password: this.state.password
    };
    let xhrPosts = new XMLHttpRequest();
    let that = this;

    xhrPosts.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        //response status is 201  then the user is registered.
        var data = JSON.parse(this.responseText);
        if (this.status === 201) {
          that.setState({
            open: true,
            successMessage: "Registered successfully! Please login now!"
          });
          that.tabChangeHandler("", 0);
        } else if (this.status === 400) {
          that.setState({
            signupErrorMsg: data.message
          });
        }
      }
    });
    xhrPosts.open("POST", this.baseUrl + "/customer/signup");
    xhrPosts.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrPosts.send(JSON.stringify(data));
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  //emailFieldValidation will check the enetered email is valid or not.
  emailFieldValidation = () => {
    let isValidEmail = false;
    if (this.state.email === "") {
      this.setState({
        emailRequired: "dispBlock",
        validEmail: true
      });
    } else {
      // Check for Valid email
      var pattern = new RegExp(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      ).test(this.state.email);
      this.setState({ validEmail: pattern });
      pattern === false
        ? this.setState({ emailRequired: "dispBlock" })
        : this.setState({ emailRequired: "dispNone" });
      isValidEmail = pattern;
    }
    return isValidEmail;
  };

  //passwordFieldValidation will check the enetered password is valid or not.
  passwordFieldValidation = () => {
    let isValidPassword = false;
    if (this.state.password === "") {
      this.setState({
        passwordRequired: "dispBlock",
        validPassword: true
      });
    } else {
      // Check for Valid Password with A valid password is the one that contains at least a capital letter, a small letter, a number and a special character
      // ^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$
      var pattern = new RegExp(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/).test(
        this.state.password
      );
      this.setState({ validPassword: pattern });
      pattern === false
        ? this.setState({ passwordRequired: "dispBlock" })
        : this.setState({ passwordRequired: "dispNone" });
      isValidPassword = pattern;
    }
    return isValidPassword;
  };

  //contactnoFieldValidation will check the enetered contact no. is valid or not.
  contactnoFieldValidation = () => {
    let isValidContactNo = false;
    if (this.state.contactno === "") {
      this.setState({
        contactNoRequired: "dispBlock",
        validContactNo: true
      });
    } else {
      // Check for Valid mobile no ...
      var pattern = new RegExp(/^\d{10}$/).test(this.state.contactno);
      if (this.state.contactno.length === 10 && pattern === true) {
        isValidContactNo = true;
        this.setState({
          validContactNo: true,
          contactNoRequired: "dispNone"
        });
      } else {
        this.setState({
          validContactNo: false,
          contactNoRequired: "dispBlock"
        });
      }
    }
    return isValidContactNo;
  };

// all input of the signup form are assigned to their respective state
  inputContactnoChangeHandler = e => {
    this.setState({
      contactno: e.target.value
    });
  };

  inputPasswordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  inputFirstnameChangeHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };

  inputLastnameChangeHandler = e => {
    this.setState({
      lastname: e.target.value
    });
  };

  inputEmailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  openMenuItemsHandler = event => {
    this.setState({
      showUserProfileDropDown: true
    });
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenuItemsHandler = () => {
    this.setState({
      showUserProfileDropDown: false
    });
    this.setState({ anchorEl: null });
  };

  openProfilePageHandler = () => {
    this.props.history.push("/profile");

    this.closeMenuItemsHandler();
    // this.props.history.push({
    //     pathname: "/profile"
    //   });
  };

  logoutHandler = () => {
    this.closeMenuItemsHandler();
    this.setState({
      showUserProfileDropDown: false,
      username: ""
    });
    this.callApiForLogout();
  };

  inputChangeHandler = e => {
    sessionStorage.removeItem("query");
    sessionStorage.setItem("query", e.target.value);
    this.setState({
      query: e.target.value
    });
    this.props.searchHandler(e.target.value);
  };

  //callApiForLogout will call the logout api and will unset the session token 
  callApiForLogout = () => {
    let xhrPosts = new XMLHttpRequest();
    let that = this;

    xhrPosts.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        var data = JSON.parse(this.responseText);
        if (this.status === 200) {
          sessionStorage.removeItem("access-token");
          sessionStorage.removeItem("username");
          that.setState({redirectToHome:true})
        } else if (this.status === 401) {
          that.setState({
            loginErrorMsg: data.message
          });
        }
      }
    });
    xhrPosts.open("POST", this.baseUrl + "customer/logout");
    xhrPosts.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrPosts.setRequestHeader(
      "authorization","Bearer "+
      sessionStorage.getItem("access-token")
    );
    xhrPosts.send();
  };
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <header className="navbar">
        <Toolbar>
        <Grid
          justify="space-between" // Add it here :)
          container
          style={{ alignItems: "center" }}
          spacing={24}
        >
        <Grid item>
          <div className="food_app_logo">
            <SvgIcon className="app-logo">
              <Fastfood />
            </SvgIcon>
          </div>
          </Grid>
          {this.props.showSearchBox === "true" && (
            <Grid item>
            <div className="search-bar-container" >
              <Input
                className={classes.root}
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start" className="search">
                    <SvgIcon>
                      <Search />
                    </SvgIcon>
                  </InputAdornment>
                }
                onChange={this.inputChangeHandler}
                placeholder="Search by Restaurant Name"
              />
            </div>
            </Grid>
          )}
          <Grid item>
          <div className="login-button">
            {sessionStorage.getItem("username") !== null&& (
              <Button
                onClick={this.openMenuItemsHandler}
                className={classes.button}
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
              >
                <SvgIcon>
                  <AccountCircle />
                </SvgIcon>
                
                <span className="login-spacing"> { sessionStorage.getItem("username")} </span>
              </Button>
            )}
            {sessionStorage.getItem("username") === null && (
              <Button
                variant="contained"
                color="default"
                onClick={this.openModalHandler}
              >
                <SvgIcon>
                  <AccountCircle />
                </SvgIcon>
                <span className="login-spacing"> LOGIN </span>
              </Button>
            )}
            {this.state.showUserProfileDropDown ? (
              <Menu
                className={classes.menuItems}
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.closeMenuItemsHandler}
              >
                <Link to={"/profile"}>
                  <MenuItem onClick={this.closeMenuItemsHandler}>
                    My Profile
                  </MenuItem>
                </Link>
                <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
              </Menu>
            ) : null}
          </div>
          </Grid>
          </Grid>
          </Toolbar>
        </header>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandler}
          style={customStyles}
        >
          <Tabs
            className="tabs"
            value={this.state.value}
            onChange={this.tabChangeHandler}
          >
            <Tab label="LOGIN" />
            <Tab label="SIGNUP" />
          </Tabs>
          {this.state.value === 0 && (
            <TabContainer>
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="contactno"> Contact No.</InputLabel>
                <Input
                  id="contactno"
                  type="text"
                  contactno={this.state.contactno}
                  defaultValue={this.state.contactno}
                  onChange={this.inputContactnoChangeHandler}
                />
                <FormHelperText className={this.state.contactNoRequired}>
                  {this.state.validContactNo === true && (
                    <span className="red">required</span>
                  )}
                  {this.state.validContactNo === false && (
                    <span className="red">Invalid Contact</span>
                  )}
                </FormHelperText>
              </FormControl>{" "}
              <br /> <br />
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="password"> Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  password={this.state.password}
                  defaultValue={this.state.password}
                  onChange={this.inputPasswordChangeHandler}
                />
                <FormHelperText className={this.state.passwordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>{" "}
              <br /> <br />
              {Utils.isUndefinedOrNullOrEmpty(
                this.state.loginErrorMsg
              ) ? null : (
                <div className="error-msg">{this.state.loginErrorMsg}</div>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
                className={classes.loginButton}
              >
                {" "}
                LOGIN
              </Button>
            </TabContainer>
          )}
          {this.state.value === 1 && (
            <TabContainer>
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="firstname"> First Name </InputLabel>
                <Input
                  id="firstname"
                  type="text"
                  firstname={this.state.firstname}
                  defaultValue={this.state.firstname}
                  onChange={this.inputFirstnameChangeHandler}
                />
                <FormHelperText className={this.state.firstnameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>{" "}
              <br /> <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="lastname"> Last Name </InputLabel>
                <Input
                  id="lastname"
                  type="text"
                  lastname={this.state.lastname}
                  defaultValue={this.state.lastname}
                  onChange={this.inputLastnameChangeHandler}
                />
              </FormControl>{" "}
              <br /> <br />
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="email"> Email </InputLabel>
                <Input
                  id="email"
                  type="text"
                  lastname={this.state.email}
                  defaultValue={this.state.email}
                  onChange={this.inputEmailChangeHandler}
                />
                <FormHelperText className={this.state.emailRequired}>
                  {this.state.validEmail === true && (
                    <span className="red">required</span>
                  )}
                  {this.state.validEmail === false && (
                    <span className="red">Invalid Email</span>
                  )}
                </FormHelperText>
              </FormControl>{" "}
              <br /> <br />
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="contactno"> Contact No.</InputLabel>
                <Input
                  id="contactno"
                  type="text"
                  contactno={this.state.contactno}
                  defaultValue={this.state.contactno}
                  onChange={this.inputContactnoChangeHandler}
                />
                <FormHelperText className={this.state.contactNoRequired}>
                  {this.state.validContactNo === true && (
                    <span className="red">required</span>
                  )}
                  {this.state.validContactNo === false && (
                    <span className="red">
                      Contact No. must contain only numbers and must be 10
                      digits long
                    </span>
                  )}
                </FormHelperText>
              </FormControl>{" "}
              <br /> <br />
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="password"> Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  password={this.state.password}
                  defaultValue={this.state.password}
                  onChange={this.inputPasswordChangeHandler}
                />
                <FormHelperText className={this.state.passwordRequired}>
                  {this.state.validPassword === true && (
                    <span className="red">required</span>
                  )}
                  {this.state.validPassword === false && (
                    <span className="red">
                      Password must contain at least one capital letter, one
                      small letter, one number, and one special character
                    </span>
                  )}
                </FormHelperText>
              </FormControl>{" "}
              <br /> <br />
              {Utils.isUndefinedOrNullOrEmpty(
                this.state.signupErrorMsg
              ) ? null : (
                <div className="error-msg">{this.state.signupErrorMsg}</div>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={this.signupClickHandler}
                className={classes.loginButton}
              >
                {" "}
                SIGNUP
              </Button>
            </TabContainer>
          )}
        </Modal>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={6000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id"> {this.state.successMessage}</span>}
        />

        {this.state.redirectToHome &&<Redirect to='/'></Redirect>}
      </div>
    );
  }
}

export default withStyles(styles)(Header);
