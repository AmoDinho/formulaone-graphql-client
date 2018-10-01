import React, {Component} from 'react';
import Driver from './Driver';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';


const FEED_QUERY = gql`
  {
      feed{
          drivers{
              id
              createdAt
              name
              team
              points
              pictureURL
              country
              podiums
              championshipWins
              postedBy{
                  id
                  name
              }
              boosts{
                  id
                  user{
                      id
                  }
              }
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

            { driversToRender.map((driver,index) => (
            <Driver key={driver.id} driver={driver} index={index}/>
            ))}

            </div>
      )}}
            </Query>

   )
        
    }
}

export default DriverList;