import React, {Component} from 'react';
import { AUTH_TOKEN } from '../constants';
import {timeDifferenceForDate} from '../utils';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

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
                   {authToken && (

                       <Mutation 
                       mutation={VOTE_MUTATION} 
                       variables={{driverId:this.props.driver.id}}
                       /*we are updating the cache her*/
                       update={(store, {data: {boost}}) =>
                          this.props.updateStoreAfterBoost(store, boost, this.props.driver.id)
                       }
                       >
                      {voteMutation => (
                       <div className="ml1 gray f11" 
                       onClick={voteMutation}>
                        ▲
                        </div>
                      )}
                      
                        </Mutation>
                   )}
                  
                  </div>
                  <div className="ml1">
                   <div>
                   {this.props.driver.name} ({this.props.driver.team})
                    {this.props.driver.points} 
                    <img alt={this.props.driver.name} src={this.props.driver.pictureURL} />
                    {this.props.driver.country}
                    {this.props.driver.podiums}
                    {this.props.driver.championshipWins} 
                   </div>
                   <div className="f6 lh-copy gray">
                   {this.props.driver.boosts.length} boosts | by{' '}
                   {this.props.driver.postedBy
                   ? this.props.driver.postedBy.name
                  : 'Unknown'}{' '}
                  {timeDifferenceForDate(this.props.driver.createdAt)}
                   </div>
                </div>

                </div>
               
            </div>
        )
    }
}

export default Driver;