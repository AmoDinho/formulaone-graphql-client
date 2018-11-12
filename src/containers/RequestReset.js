import React,{Component} from 'react'
import gql from 'graphql-tag';
import { Mutation} from 'react-apollo';
import PrimaryButton from "../components/PrimaryButton"

export const REQUEST_RESET_MUTATION = gql`
 mutation REQUEST_RESET_MUTATION($email:String!){
     requestReset(email:$email){
        message
     }
 }
`

class RequestReset extends Component{
  state = {
      email: ''
  };

  //e => this.setState({email: e.target.value})

  saveToState = event => {
      this.setState({
          [event.target.name]: event.target.value
      });
    }

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
               onChange={e => this.setState({email: e.target.value})}
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

export default RequestReset;