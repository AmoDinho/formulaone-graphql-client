import React, {Component} from 'react';
import Driver from './Driver';
import { Link } from "react-router-dom";
import {Query} from 'react-apollo';
import gql from 'graphql-tag';


const FEED_QUERY = gql`
  {
      feed{
          drivers{
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
  }
`

class DriverList extends Component {
    render(){
        
   return(
    <Query query={FEED_QUERY}>
    {({loading, error, data}) => {
        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        const driversToRender = data.feed.drivers

        return(
            <div>

                            { driversToRender.map(driver => 
                            
                            <Link to={`/driver/${driver.id}`} key={driver.id} >
                               

                            {driver.name} ({driver.team})
                            {driver.points} 
                            <img src={driver.pictureURL} />
                            {driver.country}
                            {driver.podiums}
                            {driver.championshipWins} 
                                
                           
                            
                         
                            </Link>
                        )}

                        <Link to="/driver" >

                        Driver
                        </Link>

            </div>
      )
    }}
            </Query>

   )
        
    }
}

export default DriverList;   

{/*
    <Driver key={driver.id} driver={driver}/>

*/}
