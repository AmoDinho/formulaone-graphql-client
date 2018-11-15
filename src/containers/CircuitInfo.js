import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';


export const CIRCUIT_QUERY = gql`
  query CIRCUIT_QUERY($id:ID!){
      circuit(id:$id){
          id
          name
        
    country
    numOfLaps
    description
    raceDistance
    circuitLength
    lapRecord
    address
    longitude
    latitude
    flyAway
    trackMap
    trackImage
      }
  }
`


class CircuitInfo extends Component{
    render(){
        const id = this.props.match.params.id;
        return(
            <div>
                <Query
                query={CIRCUIT_QUERY}
                variables={{
                    id
                }}
                >
                    
                    {({error,loading,data}) =>{
                        if (loading) return <div>Fetching</div>
                        if (error) return <div>Error</div>;

                        const circuit = data.circuit;

                        return(
                            <div>
                                <p>{circuit.name}</p>

                                <img src={circuit.trackMap} alt="circuit" />
                                <img src={circuit.trackImage} alt="circuit" />
                                <p>{circuit.country}</p>
                                <p>{circuit.description}</p>
                            <p>{circuit.numOfLaps}</p>
                              <p>{circuit.raceDistance}</p> 
                              <p>{circuit.circuitLength}</p> 
                            <p>{circuit.lapRecord}</p>
                            <p>{circuit.address}</p>
                             <p>{circuit.longitude}</p>
                             <p>{circuit.latitude}</p>
                              <p>{circuit.flyAway}</p>
    
                            </div>
                        )
                    }}
                </Query>
              
            </div>
        )
    }
}

export default CircuitInfo