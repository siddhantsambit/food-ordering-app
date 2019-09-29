import React, { Component } from 'react';
import './Header.css';
import { makeStyles } from '@material-ui/core/styles';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { whileStatement } from '@babel/types';
import { withStyles } from '@material-ui/core/styles';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'

    }
}


const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>

    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

const styles = theme => ({
    searchStyle: {
        color: '#fff',
        width: '300px',
        "&::after": { borderBottom: "1px solid white" }
    }
});

class Header extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            contactno: "",
            password: "",
            firstname: "",
            lastname: "",
            email: "",
            signupwd: "",
            usrcontactno: "",
            restaurantName: "",
            contactnoRequired: "dispNone",
            passwordRequired: "dispNone",
            firstNameRequired: "dispNone",
            emailRequired: "dispNone",
            signUpPwdRequired: "dispNone",
            usrContactNoRequired: "dispNone",
            signupcode: "",
            signupstatus: ""

        };
    }

    openModalHandler = () => {
        this.setState({ modalIsOpen: true })

    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false })
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value })

    }

    loginClickHandler = () => {
        this.state.contactno === "" ? this.setState({ contactnoRequired: "dispBlock" }) : this.setState({ contactnoRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

    }

    signUpClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstNameRequired: "dispBlock" }) : this.setState({ firstNameRequired: "dispNone" });
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.state.signupwd === "" ? this.setState({ signUpPwdRequired: "dispBlock" }) : this.setState({ signUpPwdRequired: "dispNone" });
        this.state.usrcontactno === "" ? this.setState({ usrContactNoRequired: "dispBlock" }) : this.setState({ usrContactNoRequired: "dispNone" });

        let that = this;
        let datasignUP = JSON.stringify({
            "contact_number": this.state.usrcontactno,
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "password": this.state.signupwd
        })

        let xhrSignUp = new XMLHttpRequest();
        xhrSignUp.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                // that.setState({signupcode: true})
                that.setState({ signupcode: JSON.parse(this.responseText).code });
                that.setState({ signupstatus: JSON.parse(this.responseText).status });
            }
        })


        xhrSignUp.open("POST", this.props.baseUrl + "customer/signup")
        xhrSignUp.setRequestHeader("Content-Type", "application/json")
        xhrSignUp.setRequestHeader("cache-Control", "no-cache");
        xhrSignUp.send(datasignUP);
    }

    inputcontactNoChangeHandler = (e) => {
        this.setState({ contactno: e.target.value })
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    firstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value })
    }

    emailChangeHandler = (e) => {
        this.setState({ email: e.target.value })
    }

    signUpPwdChangeHandler = (e) => {
        this.setState({ signupwd: e.target.value })
    }

    usrContactNoChangeHandler = (e) => {
        this.setState({ usrcontactno: e.target.value })
    }

    restaurantChangeHandler = event => {
        this.setState({ restaurantName: event.target.value });
        console.log(this.state.restaurantName);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="header">
                <div className="headerItem">
                    <FastfoodIcon>Logo</FastfoodIcon>
                </div>
                <div className="headerItem">
                    <Input
                        id="restaurantName"
                        className={classes.searchStyle}
                        placeholder="Search by Restaurant Name"
                        onChange={this.restaurantChangeHandler}
                        startAdornment={
                            <InputAdornment position="start" style={{ color: '#fff' }}>
                                <SearchIcon />

                            </InputAdornment>
                        }
                    />

                </div>
                <div className="headerItem">

                    <Button variant="contained" color="default" onClick={this.openModalHandler}><AccountCircleIcon style={{ paddingRight: 5 }}></AccountCircleIcon>Login</Button>
                </div>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Signup" />
                    </Tabs>
                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="contactno">Contact No.</InputLabel>
                                <Input id="contactno" type="number" contactno={this.state.contactno} onChange={this.inputcontactNoChangeHandler} />
                                <FormHelperText className={this.state.contactnoRequired}><span className="red">required</span></FormHelperText>
                            </FormControl><br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                            </FormControl><br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>}
                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.firstNameChangeHandler} />
                                <FormHelperText className={this.state.firstNameRequired}><span className="red">required</span></FormHelperText>
                            </FormControl><br /><br />
                            <FormControl>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" />
                            </FormControl><br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="email" email={this.state.email} onChange={this.emailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}><span className="red">required</span></FormHelperText>
                            </FormControl>
                            {this.state.signupcode === "SGR-002" &&
                                <FormControl >
                                    <br />
                                    <span className="codemsg"> Invalid Email </span>
                                </FormControl>}<br />
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="signupwd">Password</InputLabel>
                                <Input id="signupwd" type="password" signupwd={this.state.signupwd} onChange={this.signUpPwdChangeHandler} />
                                <FormHelperText className={this.state.signUpPwdRequired}><span className="red">required</span></FormHelperText>
                            </FormControl>
                            <br />
                            {this.state.signupcode === "SGR-004" &&
                                <FormControl >
                                    <span className="codemsg">  Password must contain at least one capital letter,one small letter,one number, and one special character </span>
                                    {/* <FormHelperText>Password must contain at least one capital letter,one small letter,one number, and one special character</FormHelperText> */}
                                </FormControl>}
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="usrcontactno">Contact No</InputLabel>
                                <Input id="usrcontactno" type="number" usrcontactno={this.state.usrcontactno} onChange={this.usrContactNoChangeHandler} />
                                <FormHelperText className={this.state.usrContactNoRequired}><span className="red">required</span></FormHelperText>
                            </FormControl>
                            {this.state.signupcode === "SGR-003" &&
                                <FormControl >
                                    <br />
                                    <span className="codemsg">Contact No. must contain only numbers <br />and must be 10 digits long </span>
                                </FormControl>}
                            <br /><br />
                            {this.state.signupstatus === "CUSTOMER SUCCESSFULLY REGISTERED" &&
                                <div className="registered">
                                    <span> Registered Successfully. Please login now! </span>
                                </div>}<br />
                            {this.state.signupcode === "SGR-001" &&
                                <FormControl >
                                    {/* <span className="codemsg"> The Contact number is alredy registered! Try other contact number. </span> */}
                                    <FormHelperText>The Contact number is alredy registered! Try other contact number.</FormHelperText>
                                </FormControl>}<br />
                            <Button variant="contained" color="primary" onClick={this.signUpClickHandler}>SIGNUP</Button>

                        </TabContainer>

                    }

                </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(Header);