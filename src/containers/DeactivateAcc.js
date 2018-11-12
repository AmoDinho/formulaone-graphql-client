import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation} from 'react-apollo';
import PrimaryButton from "../components/PrimaryButton";

export const DELETE_USER_MUTATION = gql`
 mutation DELETE_USER_MUTATION($id:String!,$password:String!){
     deleteUser(id:$id,password:$password){
         id
     }
 }
`


class DeactivateAcc extends Component {
    state={
        password: ''
    }


    validateForm(){
        return this.state.password.length > 0 && this.state.confirmPassword.length > 0;
    }

    


    render(){
        
        return(
            <div>
              <h1>Deactivate Account</h1>

              <p>Please be advised that once you delete your account it cannot be recovered!</p>

              <p>To continue Please enter your password.</p>
               <Mutation
                mutation={DELETE_USER_MUTATION}
                variables={ this.state}
                
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
                this.setState({email: ''});
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