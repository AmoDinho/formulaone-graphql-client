import React,{Component} from 'react'
import gql from 'graphql-tag';
import { Mutation} from 'react-apollo';
import PrimaryButton from "../components/PrimaryButton"
import '../styles/RequestReset.css';


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

    validateForm(){
        return this.state.email.length > 0;
    }

    render(){
        return(
            <div>
            <h1>Request Password Reset</h1>
            <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
              {(reset, {error,loading,called}) => (
               <form method="post"
              className="reset_form"
               >
               {!error && !loading && called && 
              <div className="form_alert mr7">
              <p className="mt4">Check your email for a link!</p>
           </div>
               }
               
               {error && 
               <div className="form_error">
                   
               <p id="error">That email does not exist on our side.</p>
               </div>
               }

            
               
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
            className="ml5"
            disabled={!this.validateForm()}
            />
               </form>

              )}

           

            </Mutation>

            </div>
          )

    }
    

}

export default RequestReset;