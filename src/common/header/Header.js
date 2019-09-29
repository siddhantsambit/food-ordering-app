import React, {Component} from 'react';
import './Header.css';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
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


const TabContainer = function(props){
    return(
        <Typography component="div" style={{padding: 0, textAlign: 'center'}}>
            {props.children}
        </Typography>

    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

const styles = theme => ({
    searchStyle : {
        color: '#fff',
        width: '300px',
        "&::after":{borderBottom: "1px solid white" }
    }
});

class Header extends Component{
    constructor()
    {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            contactNo: "",
            password: "",
            firstName: "",
            email: "",
            signUpPwd: "",
            usrContactNo: "",
            contactnoRequired: "dispNone",
            passwordRequired: "dispNone",
            firstNameRequired: "dispNone",
            emailRequired: "dispNone",
            signUpPwdRequired: "dispNone",
            usrContactNoRequired: "dispNone"

        };
    }
    
    openModalHandler = () => {
        this.setState({modalIsOpen: true})
        
    }

    closeModalHandler = () => {
        this.setState({modalIsOpen: false})
    }

    tabChangeHandler = (event,value) => {
        this.setState({value})

    }

    loginClickHandler = () => {
        this.state.contactNo === "" ? this.setState({contactnoRequired: "dispBlock"}) : this.setState({contactnoRequired: "dispNone"});
        this.state.password === "" ? this.setState({passwordRequired: "dispBlock"}) : this.setState({passwordRequired: "dispNone"});
        this.state.firstName === "" ? this.setState({firstNameRequired: "dispBlock"}) : this.setState({firstNameRequired: "dispNone"});
        this.state.email === "" ? this.setState({emailRequired: "dispBlock"}) : this.setState({emailRequired: "dispNone"});
        this.state.signUpPwd === "" ? this.setState({signUpPwdRequired: "dispBlock"}) : this.setState({signUpPwdRequired: "dispNone"});
        this.state.usrContactNo === "" ? this.setState({usrContactNoRequired: "dispBlock"}) : this.setState({usrContactNoRequired: "dispNone"});
    }

    inputcontactNoChangeHandler = (e) => {
        this.setState({contactNo: e.target.value})
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value})
    }

    firstNameChangeHandler = (e) => {
        this.setState({firstName: e.target.value})
    }

    emailChangeHandler = (e) => {
        this.setState({email: e.target.value})
    }

    signUpPwdChangeHandler = (e) => {
        this.setState({signUpPwd: e.target.value})
    }

    usrContactNoChangeHandler = (e) => {
        this.setState({usrContactNo: e.target.value})
    }

    render(){
        const { classes } = this.props;
        return(
            <div className="header"> 
         <div className="headerItem"> 
         <FastfoodIcon>Logo</FastfoodIcon>
         </div>
         <div className="headerItem">
         <Input
         className={classes.searchStyle}
          placeholder="Search by Restaurant Name"
          startAdornment={
            <InputAdornment position="start" style={{ color:'#fff'}}> 
              <SearchIcon />
            </InputAdornment>
          }
        /> 
             
         </div>
         <div className="headerItem">
             
         <Button variant="contained" color="default" onClick={this.openModalHandler}><AccountCircleIcon style={{paddingRight:5}}></AccountCircleIcon>Login</Button>
         </div>
         <Modal 
            ariaHideApp={false} 
            isOpen={this.state.modalIsOpen} 
            contentLabel="Login" 
            onRequestClose={this.closeModalHandler}
            style = {customStyles}
            >
             <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                 <Tab label="Login" />
                 <Tab label="Signup" />
             </Tabs>
             {this.state.value === 0 &&
             <TabContainer>
                <FormControl required>
                    <InputLabel htmlFor="contactNo">Contact No.</InputLabel>
                    <Input id="contactNo" type="number" contactNo={this.state.contactNo} onChange={this.inputcontactNoChangeHandler}/>
                    <FormHelperText className={this.state.contactnoRequired}><span className="red">required</span></FormHelperText>
                </FormControl><br /><br />
                <FormControl required>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler}/>
                    <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                </FormControl><br /><br />
                <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
             </TabContainer>}
             {this.state.value === 1 &&
             <TabContainer>
                 <FormControl required>
                 <InputLabel htmlFor="firstName">First Name</InputLabel>
                 <Input id="firstName" type="text" firstName={this.state.firstName} onChange={this.firstNameChangeHandler}/>
                 <FormHelperText className={this.state.firstNameRequired}><span className="red">required</span></FormHelperText>
                 </FormControl><br /><br />
                 <FormControl>
                     <InputLabel htmlFor="lastName">Last Name</InputLabel>
                     <Input id="lastName" type="text" />
                 </FormControl><br /><br />
                 <FormControl required>
                     <InputLabel htmlFor="email">Email</InputLabel>
                     <Input id="email" type="email" email={this.state.email} onChange={this.emailChangeHandler}/>
                     <FormHelperText className={this.state.emailRequired}><span className="red">required</span></FormHelperText>
                 </FormControl><br /><br />
                 <FormControl required>
                     <InputLabel htmlFor="signUpPwd">Password</InputLabel>
                     <Input id="signUpPwd" type="password" signUpPwd={this.state.signUpPwd} onChange={this.signUpPwdChangeHandler}/>
                     <FormHelperText className={this.state.signUpPwdRequired}><span className="red">required</span></FormHelperText>
                 </FormControl><br /><br />
                 <FormControl required>
                     <InputLabel htmlFor="usrContactNo">Contact No</InputLabel>
                     <Input id="usrContactNo" type="number" usrContactNo={this.state.usrContactNo} onChange={this.usrContactNoChangeHandler}/>
                     <FormHelperText className={this.state.usrContactNoRequired}><span className="red">required</span></FormHelperText>
                 </FormControl><br /><br />
                 <Button variant="contained" color="primary" onClick={this.loginClickHandler}>SIGNUP</Button>

             </TabContainer>

             }

         </Modal>
         </div>
        )
    }
}

export default withStyles(styles)(Header);