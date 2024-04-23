import React from "react";
import '../styles/header.css';
import { GoogleLogin } from '@react-oauth/google';
import Modal from 'react-modal';

import jwt_decode from "jwt-decode";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor : 'antiquewhite',
      border :'solid 1px brown',
      width : '400px',
      textAlign : 'center'
    },
  };
class Header extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            backgroundColor : '',
            display : 'none',
            loginModalIsOpen : false,
            isLoggedIn :false,
            loggedInUser : undefined
        }
    }

    navigate = (path) =>
    {
        this.props.history.push(path);
    }

    componentDidMount()
    {
        const path = this.props.history.location.pathname;
        this.setAttributes(path);
    }

    responseGoogle = (response) =>
    {
        this.setState({isLoggedIn:true, loggedInUser: response.given_name, loginModalIsOpen: false});
        console.log(response);
    }

    credentialResponse = (credentialResponse) => 
    {
        console.log(credentialResponse.credential);
         // eslint-disable-next-line
         var decoded = jwt_decode(credentialResponse.credential);
         console.log(decoded)
         this.responseGoogle(decoded)
    }

    handleLogout = () =>
    {
        this.setState({isLoggedIn: false, loggedInUser: undefined})
    }
    
    setAttributes = (path) => 
    {
        let bg,display;
        // eslint-disable-next-line
        if (path == '/')
        {
            bg = '#deb3bb';
            display = 'none';
        }
        // eslint-disable-next-line
       else if (path == '/details')
        {
            bg = '#ccc8c5';
            display = 'none';
        }

        else
        {
            bg = 'red';
            display = 'inline-block';
        }
        this.setState({backgroundColor :  bg, display : display});
    }

    

    handleLogin = () =>
        {
            this.setState ({loginModalIsOpen :true});
        } 

    

    handleCancel = () =>
        {
            this.setState ({loginModalIsOpen :false});
        } 


    render()
    {
        const {backgroundColor, display, loginModalIsOpen,loggedInUser,isLoggedIn} = this.state;
        return(
            <div>
                  <div className="logo"  style={{borderRadius:"90%",display:display}}>
                     <p className="logo_name" onClick={() => this.navigate('/')}>e!</p>
                  </div>
                  <div id="two" style={{background : backgroundColor}}>
                    {!isLoggedIn ?
                     <div className ="three" >
                        <button className="new1" onClick={this.handleLogin}>Login</button>
                        <button className="new2">Create Account</button>
                    </div>
                     :
                    <div className ="three" >
                        <button className="new1" >{loggedInUser}</button>
                        <button className="new2" onClick={this.handleLogout}>Logout</button>
                    </div>
                        }
                    
                 </div>

                  <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                    
                    >
                    <div>
                        <h2>Login</h2>
                        <input className="box_1" type="text" placeholder ='Email'/>
                        <br/><br/>
                        <input className="box_2" type="text" placeholder ='Password'/>
                        <br/><br/>
                        <div>
                            <button className="btn_1">Login</button>&nbsp;&nbsp;&nbsp;
                            <button className="btn_2" onClick={this.handleCancel}>Cancel</button>
                        </div>
                        <br/>
                        <div>
                         <GoogleLogin
                            onSuccess={this.credentialResponse}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            />
                        </div>
                    </div>
                            
                   </Modal>

            </div>
        )
    }
}
export default Header;