import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {TRACK_QUERY} from './CircuitList';
import {LINKS_PER_PAGE} from '../constants';
import Select from 'react-select';
import {countries,emojis} from '../constants';

export const CREATE_CIRCUIT_MUTATION = gql`
 mutation CREATE_CIRCUIT_MUTATION(
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
     circuit(
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
     )
 }
`




class CreateCircuit extends Component {
   state = {
    name:'',
    description: '',
    raceDistance: 0,
    country: '',
    numOfLaps:0,
    circuitLength:0,
    lapRecord:0 ,
    address:'',
    longitude:0, 
    latitude:0 ,
    flyAway:false ,
    trackMap:'',
    trackImage:''
   }
    

    render(){

        
            Object.keys(countries).map(
               (object) => {
                countries[object]['label'] = `${countries[object].value}`;
               })

           const options = countries;
           const flyOptions = [
               {value: true,label:'Yes'},
               {value: false,label:'No'}
           ]
    
  
        return(
            
            <div>
             <h1>Create a Circuit </h1>
            <Select className="select" options={options} />
            </div>
        )
    }
    
}

export default CreateCircuit;