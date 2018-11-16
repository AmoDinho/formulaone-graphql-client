import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import '../styles/CircuitInfo.css';
import {Tab,Tabs,TabList, TabPanel} from 'react-tabs';
//import 'react-tabs/style/react-tabs.css';

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
                            <div className="circuit_Info">
                          <div className="circuit_Info_Header" style={{backgroundImage:`url(${circuit.trackImage})`}}>
                            <h1 className="black circuit_Info_Header_Title">{circuit.name}</h1>
                            <h3 className="circuit_Info_Header_Sub_Title">{circuit.country}</h3>
                            </div>
                           <Tabs>

                               <TabList>
                                   <Tab>Info</Tab>
                                   <Tab>Map</Tab>
                               </TabList>
                               <TabPanel>
                              
                                <div className="circuit_Info_container">
                                <img className="circuit_Info_container_Image" src={circuit.trackMap} alt="circuit" />
                                
                                <div className="circuit_Info_container_inner">
                               
                                <div className="circuit_Info_container_inner_card">
                                <p>{circuit.numOfLaps}</p>
                                </div>
                                <div className="circuit_Info_container_inner_card">
                                </div>
                            
                              <p>{circuit.raceDistance}</p> 
                              <p>{circuit.circuitLength}</p> 
                            <p>{circuit.lapRecord}</p>
                            <p>{circuit.address}</p>
                             
                              <p>{circuit.flyAway}</p>
                                
                                </div>
                                <p >{circuit.description}</p>
                                </div>
                               </TabPanel>
                               <TabPanel>
                                   <h1>Map!</h1>
                               </TabPanel>
                           </Tabs>

                             
    
                            </div>
                        )
                    }}
                </Query>
              
            </div>
        )
    }
}

export default CircuitInfo