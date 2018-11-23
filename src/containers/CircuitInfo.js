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
                                   <Tab>Update</Tab>
                               </TabList>
                               <TabPanel>
                              
                                <div className="circuit_Info_container">
                                <img className="circuit_Info_container_Image" src={circuit.trackMap} alt="circuit" />
                                
                                <div className="circuit_Info_container_inner">
                               
                                <div className="circuit_Info_container_inner_card">
                                <div>
                                <Icon.Activity size={48}/>
                                </div>
                                 Number of Laps: {circuit.numOfLaps}
                                </div>
                                <div className="circuit_Info_container_inner_card">
                                <div>
                                <Icon.Watch size={48}/>
                                </div>
                                 Lap Record: {circuit.lapRecord}
                                </div>

                                <div className="circuit_Info_container_inner_card">
                                 <div>
                                 <Icon.Home size={48}/>
                                 </div>
                                 Address : {circuit.address}
                                </div>
                                 
                                <div className="circuit_Info_container_inner_card">
                                <div>
                                    <Icon.Clock size={48}/>
                                </div>
                                <p>Race Distance: {circuit.raceDistance}</p> 
                                </div>

                                 <div className="circuit_Info_container_inner_card">
                                 <div>
                                     <Icon.Compass size={48}/>
                                 </div>
                                 <p>Circuit Length: {circuit.circuitLength}</p> 
                                </div>

                                 <div className="circuit_Info_container_inner_card">
                                 <div>
                                 {circuit.flyAway ? (
                                     <span>
                                    <Icon.Calendar className="icon" size={48}/> Fly-Away</span>
                                 ):(<span ><Icon.Calendar size={48}/>European Race</span>)}
                                </div>
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
                               <TabPanel>
                                   
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