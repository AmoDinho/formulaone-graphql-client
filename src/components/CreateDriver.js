import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

const DRIVER_MUTATION = gql`
 mutation 
 DriverMutation(
 $name:String!,
 $team:String!,
 $points:Int!,
 $pictureURL:String!,
 $country:String!,
 $podiums:Int!,
 $championshipWins:Int!){
     driver(
         name:$name,
         team:$team,
         points: $points,
         pictureURL: $pictureURL,
         country:$country, 
         podiums: $podiums,
         championshipWins: $championshipWins
         ){
            id
            name
            team
            points
            pictureURL
            country
            podiums
            championshipWins
     }
 }
`


class CreateDriver extends Component {
    state= {
        
        name: '',
        team: '',
        points: null,
        pictureURL: '',
        country:'',
        podiums:null,
        championshipWins: null
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
            country,
            podiums,
            championshipWins
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
            valiables={{
            name,
            team,
            points,
            pictureURL,
            country,
            podiums,
            championshipWins}}>

            {driverMutation =>
                <button onClick={driverMutation}>
                Submit
                </button> 
            }
                
                </Mutation>
            </div>
        )
    }
}


export default CreateDriver;