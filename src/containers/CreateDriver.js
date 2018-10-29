import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {FEED_QUERY} from './DriverList';
import {LINKS_PER_PAGE} from '../constants';
import '../styles/CreateDriver.css';

const DRIVER_MUTATION = gql`
 mutation 
 DriverMutation(
 $name: String!,
 $team: String!,
 $points: Int!,
 $pictureURL: String!,
 $podiums: Int!,
 $championshipWins: Int!,
 $country: String!) {
     driver(
         name:  $name,
         team: $team,
         points: $points,
         pictureURL: $pictureURL,
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
        country:''
    }

    /*
    onChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    } */

    render (){

        const {
            name,
            team,
            points,
            pictureURL,
            podiums,
            championshipWins,
            country
        } = this.state

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
                  onChange={e => this.setState({ name: e.target.value })}
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
                  onChange={e => this.setState({ team: e.target.value })}
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
                  onChange={e => this.setState({ points: e.target.value })}
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
                  onChange={e => this.setState({ pictureURL: e.target.value })}
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
                  onChange={e => this.setState({ country: e.target.value })}
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
                  onChange={e => this.setState({ podiums: e.target.value })}
                  type="text"
                  placeholder="1"
                  min="0"
                  /></label>
                  </div>

                <div className="form_row">
                  <label htmlFor="championships">Championships:
                  <input 
                  className="championshipWins"
                  required
                  value={championshipWins}
                  onChange={e => this.setState({ championshipWins: e.target.value })}
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
            country}}
            onCompleted={() => this.props.history.push('/new/1')}
            update={(store,{data:{driver}}) =>{
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
            }}
            >

            {driverMutation =>
                <button 
                className="primary_create mt5"
                onClick={driverMutation}>
                Create New Driver
                </button> 
            }
                
                </Mutation>
            </div>
        )
    }
}


export default CreateDriver;