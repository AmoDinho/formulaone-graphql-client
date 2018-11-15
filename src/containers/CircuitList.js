import React, {Component, Fragment} from 'react';
import Driver from '../components/Driver';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {LINKS_PER_PAGE} from '../constants';
import Circuit from '../components/Circuit';



export const TRACK_QUERY =gql`
  query TRACK_QUERY($first:Int, $skip:Int, $orderBy: CircuitOrderByInput){
      tracks(first:$first,skip:$skip,orderBy: $orderBy){
         circuits{
            id
          name
          country
         }
      }
  }
`

class CircuitList extends Component {
    render(){

        return(
           
            <div>
                <Query query={TRACK_QUERY}>
                {({loading, error, data }) =>{
                 if (loading) return <div>Fetching...</div>
                 if (error) return <div>Something went wrong</div>

                 const circuitsToRender = data.tracks.circuits
                 console.log(circuitsToRender)
                 return (
                    <div>
                                         {circuitsToRender.map(circuit => <Circuit key={circuit.id} circuit={circuit}/>)}

                    </div>
                 )

                }}
                
                </Query>
            </div>
            
        )
    }
}

export default CircuitList