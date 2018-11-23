import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation} from 'react-apollo';
import PrimaryButton from "../components/PrimaryButton";
import {AUTH_TOKEN} from '../constants'
const jwt = require('jsonwebtoken');


export const DELETE_USER_MUTATION = gql`
 mutation DELETE_USER_MUTATION($id:ID!,$password:String!){
     deleteUser(id:$id,password:$password){
         id
     }
 }
`


class DeactivateAcc extends Component {
    state = {
        password: ''
    }


    validateForm(){
        return this.state.password.length > 0;
    }

    componentWillUnmount(){
        this.setState({password: ''});
        localStorage.removeItem(AUTH_TOKEN);
    }
    


    render(){
        
        const authToken = localStorage.getItem(AUTH_TOKEN)
        const secert = process.env.REACT_APP_SECRET_CODE
        const {userId} = jwt.verify(authToken,secert)
        
        return(
            <div>
              <h1>Deactivate Account</h1>

              <p>Please be advised that once you delete your account it cannot be recovered!</p>

              <p>To continue Please enter your password.</p>
               <Mutation
                mutation={DELETE_USER_MUTATION}
                variables={{
                password:this.state.password,
                id:userId
                }}
                onCompleted={() => this.props.history.push('/')}
                >
                {(deactivate, {error, loading, called}) => (
                    <form
                    method="post"
                    >
                      <label htmlFor="email">
               Password
               <input
               type="password"
               placeholder="password"
               value={this.state.password}
               className="ml7"
               onChange={e => this.setState({password: e.target.value})}
               />
               </label>



                 <PrimaryButton
            text="Deactivate Account"
            className="form_submit"
            onClick={async e => {
                e.preventDefault();
                
                await deactivate();
                
            }}
            disabled={!this.validateForm()}
            />
                    </form>
                )}

                </Mutation>
            </div>
            


        )
    }
}


export default DeactivateAcc;