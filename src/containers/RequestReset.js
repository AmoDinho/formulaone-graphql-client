import React from 'react'
import gql from 'graphql-tag';
import { Mutation} from 'react-apollo';
import PrimaryButton from "../components/PrimaryButton"

export const REQUEST_RESET_MUTATION = gql`
 mutation REQUEST_RESET_MUTATION($email:String!){
     requestReset(email:$email){
        SuccessMessage
     }
 }
`

class RequestReset extends React.Component{
  state = {
      email: ''
  };

  saveToState = e => {
      this.setState({[e.target.name]: e.target.value});
  };

    render(){
        return(
            <div>
            <h1>Request Password Reset</h1>
            <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
              {(reset, {error,loading,called}) => (
               <form method="post"
               >
               {!error && !loading && called && <p>Check your email for a link!</p>}
               
               {error && <h1>That email does not exist on our side.</h1>}
               <label htmlFor="email">
               Email
               <input
               type="email"
               placeholder="email"
               value={this.state.email}
               onChange={this.saveToState}
               />
               </label>
             

              <PrimaryButton
            text="Send Email"
            onClick={async e => {
                e.preventDefault();
                await reset();
                this.setState({email: ''});
            }}
            />
               </form>

              )}

           

            </Mutation>

            </div>
          )

    }
    

}

export default RequestReset