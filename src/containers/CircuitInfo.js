import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import '../styles/CircuitInfo.css';
import {Tab,Tabs,TabList, TabPanel} from 'react-tabs';
//import 'react-tabs/style/react-tabs.css';
import {AUTH_TOKEN} from '../constants';
import GoogleMapReact from 'google-map-react';
import Select from 'react-select';
import {countries} from '../constants';
import * as Icon from 'react-feather';
import PrimaryButton from '../components/PrimaryButton';




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

export const UPDATE_CIRCUIT_MUTATION = gql`
 mutation 
 UPDATE_CIRCUIT_MUTATION(
     $id:ID!,
    $name:String!,
    $description: String!,
    $raceDistance: Float!,
    $country: String!,
    $numOfLaps:Int!,
    $circuitLength:Float!,
    $lapRecord: Float!,
    $address: String!,
    $longitude:Float!, 
    $latitude:Float! ,
    $flyAway: Boolean!,
    $trackMap:String!,
    $trackImage:String!
 ){
     updateCircuit(
    id:$id,
    name:$name,
    description: $description,
    raceDistance: $raceDistance,
    country:$country,
    numOfLaps:$numOfLaps,
    circuitLength:$circuitLength,
    lapRecord:$lapRecord ,
    address:$address,
    longitude:$longitude, 
    latitude:$latitude ,
    flyAway:$flyAway ,
    trackMap:$trackMap,
    trackImage:$trackImage
     ){
          id
     }
 }
`


class CircuitInfo extends Component{
   state={
    zoom: 16,
    name:'',
    description: '',
    raceDistance: 0,
    country: null,
    numOfLaps:0,
    circuitLength:0,
    lapRecord:0 ,
    address:'',
    longitude:0, 
    latitude:0 ,
    flyAway:false ,
    trackMap:'',
    trackImage:'',
   }

   handleCountryChange = (country) => {
    this.setState({country: country.value });
    console.log(`option:`, country.value);
}


handleFlyChange = (flyAway) => {
    this.setState({flyAway});
    console.log(`option:`,flyAway);
}

validateForm(){
    return this.state.name.length > 0  
    && this.state.description.length > 0
    && this.state.raceDistance >0
    && this.state.country.length > 0
    && this.state.numOfLaps > 0
    && this.state.circuitLength>0
    && this.state.lapRecord >0
    && this.state.address.length > 0
    && this.state.longitude >0
    && this.state.latitude >0
    && this.state.flyAway > 0
    && this.state.trackMap.length > 0
    && this.state.trackImage.length > 0;
}

    render(){
        const id = this.props.match.params.id;
        const authToken = localStorage.getItem(AUTH_TOKEN)
        Object.keys(countries).map(
            (object) => {
             countries[object]['label'] = `${countries[object].value}`;
            }) 

        const options = countries;
        
        const flyAwayOptions = [
            {value: true,label:'Yes'},
            {value: false,label:'No'}
        ]
        const {
            name,
            description,
            raceDistance,
            country,
            numOfLaps,
            circuitLength,
            lapRecord ,
            address,
            longitude, 
            latitude,
            flyAway,
            trackMap,
            trackImage
            
           } = this.state
        return(
            <div>
                <Query
                query={CIRCUIT_QUERY}
                variables={{
                    id,
                    name,
                    description,
                    raceDistance,
                    country,
                    numOfLaps,
                    circuitLength,
                    lapRecord ,
                    address,
                    longitude, 
                    latitude,
                    flyAway,
                    trackMap,
                    trackImage
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
                                   {authToken &&(
                                      <Tab>Update</Tab>
                                   )}
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
                                   <h1>Update {circuit.name}</h1>
                                   <form className="update__circuit-form">

<div className="update__circuit-form_row">
<label htmlFor="name">
Name:  </label><input 
type="text"
onChange={e => this.setState({name: e.target.value})}

defaultValue={circuit.name}
placeholder="Name of the circuit"/>

</div>

<div className="update__circuit-form_row">
 <label htmlFor="country">
 Country:</label>
 <Select 
 options={options}  
 defaultValue={circuit.country}
 classNamePrefix="select"
 onChange={this.handleCountryChange}
/>
 
</div>

     <div className="update__circuit-form_row">
     <label htmlFor="numOfLaps">
     Number of Laps: 
     </label>
     <input 
     type="number"
     placeholder="Laps"
     className="create__nummber-input"
     defaultValue={circuit.numOfLaps}
     onChange={e => this.setState({numOfLaps: e.target.value})}
     />

     
     </div>

     <div className="update__circuit-form_row">
     <label htmlFor="description">
     Description:</label>
     <textarea 
 defaultValue={circuit.description}
className="create__textbox"
     placeholder="Describe the track"
     onChange={e => this.setState({description:e.target.value})}
     />
     </div>

     <div className="update__circuit-form_row">
     <label htmlFor="raceDistance">
     Race Distance: </label>
     <input 
     type="number"
     defaultValue={circuit.raceDistance}
     placeholder="eg: 140.987 secs:mill secs"
     onChange={e => this.setState({raceDistance:e.target.value})}
     />
     </div>

    <div className="update__circuit-form_row">
     <label html="lapRecord"> Lap Record:
     </label>
     <input 
 defaultValue={circuit.lapRecord}
 type="number"
     placeholder="eg: 103.764 secs:mill secs"
     onChange={e => this.setState({lapRecord:e.target.value})}
     />
     </div>


     <div className="update__circuit-form_row">
     <label html="circuitLength"> 
     Circuit Length
     </label>
     <input 
     type="number"
     defaultValue={circuit.circuitLength}
     placeholder="How long is it in kms?"
     onChange={e => this.setState({circuitLength:e.target.value})}
     />
     </div>

     <div className="update__circuit-form_row">
     <label htmlFor="address">
     Address:
     </label>
     <textarea 
 defaultValue={circuit.address}
 className="create__textbox"
     placeholder="Street Address"
     onChange={e => this.setState({address:e.target.value})}
     />
     </div>


     <div className="update__circuit-form_row">
     <label html="latitude"> Latitude:
     </label>
     <input 
 defaultValue={circuit.latitude}
 type="number"
     placeholder="eg: 47.219722"
     onChange={e => this.setState({latitude:e.target.value})}
     />
     </div>

     <div className="update__circuit-form_row">
     <label html="longitude"> Longitude:
     </label>
     <input 
 defaultValue={circuit.longitude}
 type="number"
     placeholder="eg: 14.764722"
     onChange={e => this.setState({longitude:e.target.value})}
     />
     </div>

   

     <div className="update__circuit-form_row">
     <label htmlFor="country">
Fly Away Race:</label>
 <Select className="select" 
 defaultValue={circuit.flyAway}
 options={flyAwayOptions} 
onChange={this.handleFlyChange}
/>
 
     </div>


     <div className="update__circuit-form_row">
     <label html="trackMap"> Track Map:
     </label>
     <input 
 defaultValue={circuit.trackMap}
 type="text"
     placeholder="Image URL"
     onChange={e => this.setState({trackMap:e.target.value})}
     />
     </div>

     <div className="update__circuit-form_row">
     <label html="trackImage"> Track Iamge:
     </label>
     <input 
 defaultValue={circuit.trackImage}
 type="text"
     placeholder="Image URL"
     onChange={e => this.setState({trackImage:e.target.value})}
     />
     </div>

    





</form>
<Mutation
mutation={UPDATE_CIRCUIT_MUTATION}
variables={{
    id,
    name,
    description,
    raceDistance,
    country,
    numOfLaps,
    circuitLength,
    lapRecord ,
    address,
    longitude, 
    latitude,
    flyAway,
    trackMap,
    trackImage
}}
onCompleted={()=> this.props.history.push('/circuits')}
>
    {circuitMutation  => 
  
       <PrimaryButton
       text="Update Circuit"
       className="update-circuit__primary"
       onClick={circuitMutation}
       />
    
   }
        
    
    
</Mutation>
                                   
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