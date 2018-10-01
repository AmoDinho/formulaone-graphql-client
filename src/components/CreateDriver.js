import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {FEED_QUERY} from './DriverList';

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
                <div className="flex flex-column mt3">
                <input 
                  className="mb2"
                  value={name}
                  onChange={e => this.setState({ name: e.target.value })}
                  type="text"
                  placeholder="Name of your driver"
                  />
                   <input 
                  className="mb2"
                  value={team}
                  onChange={e => this.setState({ team: e.target.value })}
                  type="text"
                  placeholder="Name of the driver's team"
                  />
                   <input 
                  className="mb2"
                  value={points}
                  onChange={e => this.setState({ points: e.target.value })}
                  type="number"
                  placeholder="1"
                  />
                    <input 
                  className="mb2"
                  value={pictureURL}
                  onChange={e => this.setState({ pictureURL: e.target.value })}
                  type="text"
                  placeholder="picture url"
                  />

                   <input 
                  className="mb2"
                  value={country}
                  onChange={e => this.setState({ country: e.target.value })}
                  type="text"
                  placeholder="Origin Country"
                  />

                  <input 
                  className="mb2"
                  value={podiums}
                  onChange={e => this.setState({ podiums: e.target.value })}
                  type="number"
                  placeholder="1"
                  />

                  
                  <input 
                  className="mb2"
                  value={championshipWins}
                  onChange={e => this.setState({ championshipWins: e.target.value })}
                  type="number"
                  placeholder="1"
                  />
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
            onCompleted={() => this.props.history.push('/')}
            update={(store,{data:{driver}}) =>{
                const data = store.readQuery({query: FEED_QUERY})
                data.feed.drivers.unshift(driver)
                store.writeQuery({
                    query: FEED_QUERY,
                    data
                })
            }}
            >

            {driverMutation =>
                <button 
                onClick={driverMutation}>
                Submit
                </button> 
            }
                
                </Mutation>
            </div>
        )
    }
}


export default CreateDriver;