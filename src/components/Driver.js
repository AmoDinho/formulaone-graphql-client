import React, {Component} from 'react';
import { AUTH_TOKEN } from '../constants';
import {timeDifferenceForDate} from '../utils';
import {Mutation} from 'react-apollo';
import * as Icon from 'react-feather';
import gql from 'graphql-tag';
import '../styles/Driver.css';

const VOTE_MUTATION = gql`
   mutation BoostMutation($driverId: ID!){
       boost(driverId: $driverId){
           id
           driver{
               boosts{
                   id
                   user{
                       id
                   }
               }
           }

           user{
               id
           }
       }
   }
`

class Driver extends Component {
    render(){
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return(
            <div>


                <div className="flex mt2 items-start">
                  <div className="flex items-center">
                   <span className="gray">{this.props.index +1}</span>
                  
                  
                  </div>
                  <div className="ml1 center ">
                   <div className="card " style={{backgroundImage:`url(${this.props.driver.pictureURL})`}}>
                   <div className="card_info mt6 ml3">
                   <div className="number ml2 mt5"> <span>{this.props.driver.points}</span></div>
                  <div className="name ml2 mt3"><span>{this.props.driver.name}</span>
                  
                  {authToken &&(

                       <Mutation 
                       mutation={VOTE_MUTATION} 
                       variables={{driverId:this.props.driver.id}}
                       /*we are updating the cache here*/
                       update={(store, {data: {boost}}) =>
                          this.props.updateStoreAfterBoost(store, boost, this.props.driver.id)
                       }
                       >
                        {voteMutation => (
                        <span  onClick={voteMutation}
                        className=" ml5 pointer white">
                        <Icon.Zap/> {this.props.driver.boosts.length}
                        </span>
                         )}
                      
                      </Mutation>
                  )}
                  
                   
                   
                   </div>




                  <div className="team ml2 mt3"> <span>{this.props.driver.team}</span></div>
                    
                   </div>
                   
                   
                   
                   
                    
                    
     
                    
                   </div>
                  
                </div>

                </div>
               
            </div>
        )
    }
}

export default Driver;