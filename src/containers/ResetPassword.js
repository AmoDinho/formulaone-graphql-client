import React from 'react';
import gql from 'graphql-tag';
import { Mutation} from 'react-apollo';
import PrimaryButton from "../components/PrimaryButton"
import {AUTH_TOKEN } from "../constants";
const queryString = require('query-string');

export const RESET_PASSWORD_MUTATION = gql`
 mutation RESET_PASSWORD_MUTATION($resetToken:String!, $password:String!,$confirmPassword:String!){
    resetPassword(resetToken:$resetToken,password:$password,confirmPassword:$confirmPassword){
         id
         email
         name
     }
 }
`


class ResetPassword extends React.Component {

    state={
        password: '',
        confirmPassword: '',
        resetToken: ''
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value});
    };



    

    saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    }

    componentDidMount(){
        let resetToken = queryString.parse(this.props.location.search).resetToken;
        if(resetToken){
            this.setState({
                resetToken: resetToken
            })
        };
    }

    
    render(){
        return(
            <div>
                <h1>Reset Password</h1>

                <Mutation
                mutation={RESET_PASSWORD_MUTATION}
                variables={{
                    resetToken: this.state.resetToken,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                }}
                onCompleted={token => this.saveUserData(token)}
                >
                {(reset, {error, loading, called}) => (
                    <form
                    method="post"
                    >
                      <label htmlFor="email">
               Password
               <input
               type="password"
               placeholder="password"
               value={this.state.password}
               onChange={e => this.setState({password: e.target.value})}
               />
               </label>

                <label htmlFor="email">
              Confirm Password
               <input
               type="password"
               placeholder="Confirm Password"
               value={this.state.confirmPassword}
               onChange={e => this.setState({confirmPassword: e.target.value})}
               />
               </label>


                 <PrimaryButton
            text="Reset Password"
            onClick={async e => {
                e.preventDefault();
                if (this.state.password !== this.state.confirmPassword){
                    return <p>Your passwords do not match</p>
                }
        
                await reset();
                this.setState({email: '',confirmPassword:''});
            }}
            />
                    </form>
                )}

                </Mutation>
            </div>
        )
    }
}

export default ResetPassword;