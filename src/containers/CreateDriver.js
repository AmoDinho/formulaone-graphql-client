import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {FEED_QUERY} from './DriverList';
import {LINKS_PER_PAGE,countries} from '../constants';
import PropTypes from 'prop-types';
import '../styles/CreateDriver.css';
import Select from 'react-select';
import PrimaryButton from '../components/PrimaryButton';



const propTypes = {
    driver: PropTypes.shape({
        name: PropTypes.string,
        team: PropTypes.string,
        podiums: PropTypes.number,
        pictureURL: PropTypes.string,
        points: PropTypes.number,
        championshipWins: PropTypes.number,
        country: PropTypes.string
    })
}

const DRIVER_MUTATION = gql`
 mutation 
 DriverMutation(
 $name: String!,
 $team: String!,
 $points: Int!,
 $pictureURL: String!,
 $number: Int!,
 $podiums: Int!,
 $championshipWins: Int!,
 $country: String!) {
     driver(
         name:  $name,
         team: $team,
         points: $points,
         pictureURL: $pictureURL,
         number: $number,
         podiums: $podiums,
         championshipWins: $championshipWins,
         country:$country
         ){
            id
            createdAt
            name
            team
            points
            pictureURL
            number
            podiums
            championshipWins
            country
            
     }
 }
`;


class CreateDriver extends Component {
    state= {
        
        name: '',
        team: '',
        points: 0,
        pictureURL: '',
        podiums:0,
        championshipWins: 0,
        country:'',
        number:0
    }

    handleCountryChange = (country,options) => {
        this.setState({country: country.value });
        console.log(`option:`, country.value);
    }
    
    
    
    
    handleChange = name => event =>{
        this.setState({
            [name]: event.target.value
        });
    } 


    validateForm(){
        return this.state.name.length > 0 
        && this.state.team.length > 0 
        && this.state.points > 0
        && this.state.pictureURL.length > 0
        && this.state.number.length > 0
        && this.state.podiums > 0
        && this.state.championshipWins > 0
        && this.state.country.length > 0;
    }

    update = (store, {data:{driver}}) =>{


        const first = LINKS_PER_PAGE
        const skip = 0
        const orderBy = 'createdAt_DESC'

        const data = store.readQuery({
            query: FEED_QUERY,
        variables: {first, skip, orderBy}})
        data.feed.drivers.unshift(driver)
        store.writeQuery({
            query: FEED_QUERY,
            data,
            variables: {first, skip, orderBy}
        })
    }



    render (){

        const {
            name,
            team,
            points,
            pictureURL,
            podiums,
            championshipWins,
            country,
            number
        } = this.state
      console.log(this.state)
      Object.keys(countries).map(
        (object) => {
         countries[object]['label'] = `${countries[object].value}`;
         return countries;
        }) 

    const options = countries;
        return(
            <div>
                
                <div >
                    <h1  >Create a new Driver</h1>
                <form className="mt3  container">
                <div className="form_row">
                 <label htmlFor="name">Name:</label>
                <input 
                  className=""
                  value={name}
                  onChange={this.handleChange('name')}
                  type="text"
                  required
                  placeholder="Name of your driver"
                  />
                      </div>

                  <div className="form_row">
                  <label htmlFor="team"> Team:</label>
                   <input 
                  className=""
                  value={team}
                  required
                  onChange={this.handleChange('team')}
                  type="text"
                  placeholder="Name of the driver's team"
                  />
                  </div>

            <div className="form_row_points ">
                  <label 
                  className="label-points"
                  htmlFor="points">
                  Points:
                  </label>
                   <input 
                  className="points  "
                  value={points}
                  required
                  onChange={this.handleChange('points')}
                  type="text"
                  placeholder="1"
                  min="0"
                  />
                    </div>
                    <div className="form_row_number ">
                  <label htmlFor="number">Race Number:</label>
                   <input 
                  className="number  "
                  value={number}
                  required
                  onChange={this.handleChange('number')}
                  type="text"
                  placeholder="1"
                  min="0"
                  />
                    </div>

                <div className="form_row">
                  <label htmlFor="picture">Picture:</label>
                    <input 
                  className=""
                  value={pictureURL}
                  required
                  onChange={this.handleChange('pictureURL')}
                  type="text"
                  placeholder="picture url"
                  />
                   </div>

                   <label htmlFor="country">Country: </label>
                   <Select 
                   options={options}  
                   value={country}
                   classNamePrefix="select"
                   onChange={this.handleCountryChange}
                   />
                 
                

                <div className="form_row">
                <label htmlFor="podiums">Podiums:</label>
                  <input 
                  className="podiums"
                  value={podiums}
                  required
                  onChange={this.handleChange('podiums')}
                  type="text"
                  placeholder="1"
                  min="0"
                  />
                  </div>

                <div className="form_row">
                  <label htmlFor="championships">Championships:</label>
                  <input 
                  className="championshipWins"
                  value={championshipWins}
                  onChange={this.handleChange('championshipWins')}
                  type="text"
                  required
                  placeholder="1"
                  min="0"
                  />
                  </div>

                  </form>
                </div>


                <Mutation 
            mutation={DRIVER_MUTATION} 
            variables={{
            name,
            team,
            points,
            pictureURL,
            podiums,
            championshipWins,
            country,
            number
           }}
            onCompleted={() => this.props.history.push('/new/1')}
            update={this.update}
            >

            {driverMutation =>
               
                <PrimaryButton
                onClick={driverMutation}
                //disabled={!this.validateForm()}
                className="create_primary"
                text="Create Driver"
                />
            }
                g
                </Mutation>
            </div>
        )
    }
}

CreateDriver.propTypes = propTypes;
export default CreateDriver;