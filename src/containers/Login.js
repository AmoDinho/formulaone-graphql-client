import React, {Component} from 'react';
import {AUTH_TOKEN} from '../constants';
import {Mutation} from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import '../styles/Login.css';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';


const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!){
      signup(email:$email, password: $password, name: $name){
          token
      }
  }
`


const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!){
      login(email:$email, password:$password){
          token
      }
  }
`


class Login extends Component {
    constructor(props) {
        super(props);

    this.state = {
        login: true,
        email: '',
        password: '',
        name:'',
      
    }

  
    }


    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }
    render(){
        const {
            login, 
            email, 
            password, 
            name,
         
        } =this.state
        return(
            <div className="login">
            <h2 className="mv3 mr7 heading">{login ? 'Welcome Back!' : 'Sign Up'}</h2>
            <div className=" login_form flex flex-column">
            {!login && (
            <label htmlFor="name"> Name

                <input 
                className="name_input"
                value={this.state.name}
                onChange={e => this.setState({name: e.target.value})}
                type="text"
                placeholder="Your Name"
                />
                            </label>

            )}

        <label htmlFor="email"> Email

            <input 
            value={this.state.email}
            onChange={e => this.setState({email: e.target.value})}
            type="email"
            placeholder="name@example.io"
            />
            </label>

      <label htmlFor="password"> Password
            <input 
            value={this.state.password}
            onChange={e => this.setState({password: e.target.value})}
            type="password"
            required
            placeholder="Choose a safe password"
            />
            </label>
            
            </div>
            {login &&(
                   <Link to="/requestReset" className="mr7 grow dtc underline ">
                   <a>Forgot Password</a>
                      </Link>
            )}
           
            <div className="flex mt3">
           
            
            <Mutation
              mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
              variables={{email,password, name}}
              onCompleted={data => this._confirm(data)}>
             {mutation => (

                 <PrimaryButton
                 className="pointer mr2 "
                 onClick={mutation}
               disabled={!this.validateForm()}
              login={this.state.login}
              text={!login ? 'Sign Up' : ''}
               />

             )}
              
            </Mutation>
            <SecondaryButton
            className="pointer secondary_button"
            login={this.state.login}
            onClick={() => this.setState({login: !login})}
            text={!login ? 'Have an Account?': ''}
            />

            </div>
            </div>

        )
    }

    _confirm = async data => {
        const {token} = this.state.login ? data.login : data.signup
        this._saveUserData(token)
        this.props.history.push(`/`)

    }
    
    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN,token)
    }
}



export default Login;
