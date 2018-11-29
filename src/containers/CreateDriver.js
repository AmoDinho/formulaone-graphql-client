import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {FEED_QUERY} from './DriverList';
import {LINKS_PER_PAGE} from '../constants';
import PropTypes from 'prop-types';
import '../styles/CreateDriver.css';


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
        return(
            <div>
                
                <div >
                    <h1  >Create a new Driver</h1>
                <form className="mt3  container">
                <div className="form_row">
                 <label htmlFor="name">Name:
                <input 
                  className=""
                  value={name}
                  onChange={this.handleChange('name')}
                  type="text"
                  required
                  placeholder="Name of your driver"
                  /></label>
                      </div>

                                 <div className="form_row">
                  <label htmlFor="team"> Team:
                   <input 
                  className=""
                  value={team}
                  required
                  onChange={this.handleChange('team')}
                  type="text"
                  placeholder="Name of the driver's team"
                  /></label>
                  </div>

            <div className="form_row_points ">
                  <label htmlFor="points">Points:
                   <input 
                  className="points  "
                  value={points}
                  required
                  onChange={this.handleChange('points')}
                  type="text"
                  placeholder="1"
                  min="0"
                  /></label>
                    </div>
                    <div className="form_row_number ">
                  <label htmlFor="number">Race Number:
                   <input 
                  className="number  "
                  value={number}
                  required
                  onChange={this.handleChange('number')}
                  type="text"
                  placeholder="1"
                  min="0"
                  /></label>
                    </div>

                <div className="form_row">
                  <label htmlFor="picture">Picture:
                    <input 
                  className=""
                  value={pictureURL}
                  required
                  onChange={this.handleChange('pictureURL')}
                  type="text"
                  placeholder="picture url"
                  /></label>
                   </div>

                <div className="form_row">
                   <label htmlFor="country">Country:
                   <input 
                  className=""
                  value={country}
                  required
                  onChange={this.handleChange('country')}
                  type="text"
                  placeholder="Origin Country"
                  /></label>
                  </div>

                <div className="form_row">
                <label htmlFor="podiums">Podiums:
                  <input 
                  className="podiums"
                  value={podiums}
                  required
                  onChange={this.handleChange('podiums')}
                  type="text"
                  placeholder="1"
                  min="0"
                  /></label>
                  </div>

                <div className="form_row">
                  <label htmlFor="championships">Championships:
                  <input 
                  className="championshipWins"
                  value={championshipWins}
                  onChange={this.handleChange('championshipWins')}
                  type="text"
                  required
                  placeholder="1"
                  min="0"
                  /></label>
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
                <button 
                className="primary_create mt5"
                onClick={driverMutation}
                disabled={!this.validateForm()}
                >
                Create New Driver
                </button> 
            }
                
                </Mutation>
            </div>
        )
    }
}

CreateDriver.propTypes = propTypes;
export default CreateDriver;