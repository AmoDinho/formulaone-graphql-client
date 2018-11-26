import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {TRACK_QUERY} from './CircuitList';
import {LINKS_PER_PAGE} from '../constants';
import Select from 'react-select';
import {countries} from '../constants';
//import 'react-select/dist/react-select.css';
import '../styles/CreateCircuit.css';
import PrimaryButton from '../components/PrimaryButton';

export const CREATE_CIRCUIT_MUTATION = gql`
 mutation 
 CREATE_CIRCUIT_MUTATION(
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
     createCircuit(
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




class CreateCircuit extends Component {
   state = {
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
    value:''
   }
    
   handleCountryChange = (country,options) => {
    this.setState({country: country.value });
    console.log(`option:`, country.value);
}


handleFlyChange = (flyAway) => {
    this.setState({flyAway});
    console.log(`option:`,flyAway);
}

validateForm(){
    return 
     this.state.name.length > 0  
    && this.state.description.length > 0
    && this.state.raceDistance>0
    && this.state.country.length > 0
    && this.state.numOfLaps>0
    && this.state.circuitLength>0
    && this.state.lapRecord >0
    && this.state.address.length > 0
    && this.state.longitude>0
    && this.state.latitude>0
    && this.state.flyAway > 0
    && this.state.trackMap.length > 0
    && this.state.trackImage.length > 0;
}


    render(){

        
            Object.keys(countries).map(
               (object) => {
                countries[object]['label'] = `${countries[object].value}`;
               }) 

           const options = countries;
           console.log(options);
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
            trackImage,
            values
           } = this.state
         
          
         
        return(
            
            <div>
             <h1>Create a Circuit </h1>
             <form className="create__circuit-form">

             <div className="create__circuit-form_row">
             <label htmlFor="name">
             Name:  </label><input 
             type="text"
             onChange={e => this.setState({name: e.target.value})}
             value={name}
             placeholder="Name of the circuit"/>
           
             </div>

             <div className="create__circuit-form_row">
              <label htmlFor="country">
              Country:</label>
              <Select 
              options={options}  
              value={country}
              classNamePrefix="select"
              onChange={this.handleCountryChange}
            />
              
             </div>

                  <div className="create__circuit-form_row">
                  <label htmlFor="numOfLaps">
                  Number of Laps: 
                  </label>
                  <input 
                  type="number"
                  placeholder="Laps"
                  min="0"
                  className="create__nummber-input"
                  value={numOfLaps}
                  onChange={e => this.setState({numOfLaps: e.target.value})}
                  />
  
                  
                  </div>

                  <div className="create__circuit-form_row">
                  <label htmlFor="description">
                  Description:</label>
                  <textarea 
                  value={description}
                  className="create__textbox"
                  placeholder="Describe the track"
                  onChange={e => this.setState({description:e.target.value})}
                  />
                  </div>

                  <div className="create__circuit-form_row">
                  <label htmlFor="raceDistance">
                  Race Distance: </label>
                  <input 
                  type="number"
                  value={raceDistance}
                  min="0"
                  placeholder="eg: 140.987 secs:mill secs"
                  onChange={e => this.setState({raceDistance:e.target.value})}
                  />
                  </div>

                 <div className="create__circuit-form_row">
                  <label html="lapRecord"> Lap Record:
                  </label>
                  <input 
                  value={lapRecord}
                  min="0"
                  type="number"
                  placeholder="eg: 103.764 secs:mill secs"
                  onChange={e => this.setState({lapRecord:e.target.value})}
                  />
                  </div>


                  <div className="create__circuit-form_row">
                  <label html="circuitLength"> 
                  Circuit Length
                  </label>
                  <input 
                  type="number"
                  min="0"
                  value={circuitLength}
                  placeholder="How long is it in kms?"
                  onChange={e => this.setState({circuitLength:e.target.value})}
                  />
                  </div>

                  <div className="create__circuit-form_row">
                  <label htmlFor="address">
                  Address:
                  </label>
                  <textarea 
                  value={address}
                  className="create__textbox"
                  placeholder="Street Address"
                  onChange={e => this.setState({address:e.target.value})}
                  />
                  </div>


                  <div className="create__circuit-form_row">
                  <label html="latitude"> Latitude:
                  </label>
                  <input 
                  value={latitude}
                  type="number"
                  placeholder="eg: 47.219722"
                  onChange={e => this.setState({latitude:e.target.value})}
                  />
                  </div>

                  <div className="create__circuit-form_row">
                  <label html="longitude"> Longitude:
                  </label>
                  <input 
                  value={longitude}
                  type="number"
                  placeholder="eg: 14.764722"
                  onChange={e => this.setState({longitude:e.target.value})}
                  />
                  </div>

                

                  <div className="create__circuit-form_row">
                  <label htmlFor="country">
            Fly Away Race:</label>
              <Select 
              value={flyAway}
            options={flyAwayOptions} 
            classNamePrefix="select"
            onChange={this.handleFlyChange}
            />
              
                  </div>


                  <div className="create__circuit-form_row">
                  <label html="trackMap"> Track Map:
                  </label>
                  <input 
                  value={trackMap}
                  type="text"
                  placeholder="Image URL"
                  onChange={e => this.setState({trackMap:e.target.value})}
                  />
                  </div>

                  <div className="create__circuit-form_row">
                  <label html="trackImage"> Track Image:
                  </label>
                  <input 
                  value={trackImage}
                  type="text"
                  placeholder="Image URL"
                  onChange={e => this.setState({trackImage:e.target.value})}
                  />
                  </div>

                 


             

             
             </form>
             <Mutation
             mutation={CREATE_CIRCUIT_MUTATION}
             variables={this.state}
             onCompleted={()=> this.props.history.push('/circuits')}
             >
                 {({circuitMutation, error}) => 
                 {
                    if (error) return <p>{error}</p>
                 
                 return(
                    <PrimaryButton
                    text="Create"
                    className="create-circuit__primary"
                    disabled={!this.validateForm()}
                    onClick={circuitMutation}
                    />
                 )
                }
                     
                 }
                 
             </Mutation>
            
            </div>
            
        )
    }
    
}

export default CreateCircuit;