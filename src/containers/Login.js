import React, {Component} from 'react';
import {AUTH_TOKEN} from '../constants';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import * as Yup from "yup";
import { withFormik } from "formik";


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

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email Address")
          .required("Email is required"),
        password: Yup.string()
           .min(5,"Invalid Password")
           .required("Password has to be longer than 5 characters"),
        name: Yup.string()
         .required("Name is required")
        
    })
})


class Login extends Component {
    state = {
        login: true,
        email: '',
        password: '',
        name:'',
        values: '',
        touched:'',
       
        errors:''

    }

    render(){
        const {login, 
            email, 
            password, 
            name,
            values,
            touched,
            dirty,
            errors
        } =this.state
        return(
            <div>
            <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
            <div className="flex flex-column">
            {!login && (
                <input 
                value={values.name}
                onChange={e => this.setState({name: e.target.value})}
                type="text"
                placeholder="Your Name"
                />
                
            )}
           
            <input 
            value={values.email}
            onChange={e => this.setState({email: e.target.value})}
            type="email"
            placeholder="Your email"
            />
            
            <input 
            value={password}
            onChange={e => this.setState({password: e.target.value})}
            type="password"
            placeholder="Choose a safe password"
            />
            
            </div>
            <div className="flex mt3">
            <Mutation
              mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
              variables={{email,password, name}}
              onCompleted={data => this._confirm(data)}>
             {mutation => (
                <div className="pointer mr2 button" onClick={mutation}>
                 {login ? 'login' : 'create an account'}
              </div>
             )}
             
                 
            
            

            </Mutation>
            <div 
            className="pointer button"
            onClick={() => this.setState({login: !login})}
            >
            {login
                   ? 'need to create an account?'
                   : 'already have an account?'             
             }
            </div>


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


const MyEnhanchedForm = formikEnhancer(Login);
export default MyEnhanchedForm;
