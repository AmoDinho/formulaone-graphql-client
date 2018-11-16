import React, {Component, Fragment} from 'react';
import Driver from '../components/Driver';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {LINKS_PER_PAGE} from '../constants';
import Circuit from '../components/Circuit';
import '../styles/CircuitList.css';


export const TRACK_QUERY =gql`
  query TRACK_QUERY($first:Int, $skip:Int, $orderBy: CircuitOrderByInput){
      tracks(first:$first,skip:$skip,orderBy: $orderBy){
         circuits{
            id
          name
          country
          trackImage
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
                    <div className="circuit_list" >
                  {circuitsToRender.map(circuit => (
                  <Link className="Link black" to={`/circuit/${circuit.id}`} key={circuit.id}>
                  <Circuit key={circuit.id} circuit={circuit}/>
                </Link>
                
                ))}

                    </div>
                 )

                }}
                
                </Query>
            </div>
            
        )
    }
}

export default CircuitList