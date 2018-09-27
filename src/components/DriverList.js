import React, {Component} from 'react';
import Driver from './Driver';
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

                            { driversToRender.map(driver => <Driver key={driver.id} driver={driver}/>)}

            </div>
      )
    }}
            </Query>

   )
        
    }
}

export default DriverList;