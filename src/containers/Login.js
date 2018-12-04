import React, {Component} from 'react';
import {AUTH_TOKEN} from '../constants';
import {Mutation} from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import '../styles/Login.css';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';


export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!){
      signup(email:$email, password: $password, name: $name){
          token
      }
  }
`


export const LOGIN_MUTATION = gql`
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
        isLoading: false
      
    }

  
    }


    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = name => event =>{
        this.setState({
            [name]: event.target.value
        });
    } 

    render(){
        const {
            login, 
            email, 
            password, 
            name,
            isLoading
         
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
                onChange={this.handleChange('name')}
                type="text"
                placeholder="Your Name"
                />
                            </label>

            )}

        <label htmlFor="email"> Email

            <input 
            value={this.state.email}
            onChange={this.handleChange('email')}
            type="email"
            placeholder="name@example.io"
            />
            </label>

      <label htmlFor="password"> Password
            <input 
            value={this.state.password}
            onChange={this.handleChange('password')}
            type="password"
            required
            placeholder="Choose a safe password"
            />
            </label>
            
            </div>
            <Mutation
              mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
              variables={{email,password, name}}
              onCompleted={data => this._confirm(data)}>
             {(mutation,{error}) => (
                 <div>
            {login &&(
                   <Link to="/requestReset" className="mr7 grow dtc underline ">
                   <p>Forgot Password</p>
                      </Link>
            )}
               <div>
                {error && 
                <p>
                {error.message.replace('GraphQL error:','')}
                </p>
                }
               </div>
                
            <div className="flex mt3">
           
            
             
             
                 <PrimaryButton
                 className="pointer mr2 "
                 onClick={mutation}
               disabled={!this.validateForm()}
              login={this.state.login}
              text={!login ? 'Sign Up' : ''}
               />
            

            
              
            
            <SecondaryButton
            className="pointer secondary_button"
            login={this.state.login}
            onClick={() => this.setState({login: !login})}
            text={!login ? 'Have an Account?': ''}
            />

            </div>
            </div>
             )}
             
            </Mutation>
            </div>

        )
    }

    _confirm = async data => {
        const {token} = this.state.login ? data.login : data.signup
        this.setState({isLoading: true})
        this._saveUserData(token)
        this.props.history.push(`/`)

    }
    
    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN,token)
    }
}



export default Login;
