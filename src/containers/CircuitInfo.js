import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import '../styles/CircuitInfo.css';
import {Tab,Tabs,TabList, TabPanel} from 'react-tabs';
//import 'react-tabs/style/react-tabs.css';
import GoogleMapReact from 'google-map-react';
import * as Icon from 'react-feather';




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
   state={
       zoom: 16
   }
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
                        const {longitude,latitude} = data.circuit
                      console.log(circuit.flyAway)
                      const position = [latitude,longitude]
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
                                <Icon.Activity/> Number of Laps: {circuit.numOfLaps}
                                </div>
                                <div className="circuit_Info_container_inner_card">
                                <Icon.Watch/> Lap Record: {circuit.lapRecord}
                                </div>

                                <div className="circuit_Info_container_inner_card">
                                 <Icon.Home/> Address : {circuit.address}
                                </div>
                                 
                                <div className="circuit_Info_container_inner_card">
                                <p>{circuit.raceDistance}</p> 
                                </div>

                                 <div className="circuit_Info_container_inner_card">
                                 <p>{circuit.circuitLength}</p> 
                                </div>

                                 <div className="circuit_Info_container_inner_card">
                                 {circuit.flyAway ? (
                                    <span className="circuit_Info_container"><Icon.Calendar/> Fly-Away</span>
                                 ):(<span className="circuit_Info_container"><Icon.Calendar/>European Race</span>)}
                                </div>

                                </div>
                                <div className="circuit_Info_container">
                                     <h3>All About {circuit.name}</h3>
                                    <p >{circuit.description}</p>
                                </div>
                                </div>
                               </TabPanel>



                               <TabPanel>
                                   <h1>Map!</h1>
                                   <div style={{height: '100vh',width:'100%'}}>
                                        <GoogleMapReact
                                        bootstrapURLKeys={{
                                            key: process.env.REACT_APP_MAP_KEY,
                                        language: 'gb',
                                        region: 'gb'}}
                                        defaultCenter={position}
                                        defaultZoom={this.state.zoom}
                                        >
                                     <span>
                                   <Icon.MapPin 
                                    lat={latitude}
                                    lng={longitude}
                                    style={{color:'#cc0001'}}
                                   /> <h3 className="black">{circuit.name}</h3>
                                 </span>
                                          
                 
                                        </GoogleMapReact>    
                                  </div>

                    
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