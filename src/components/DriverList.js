import React, {Component} from 'react';
import Driver from './Driver';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';


export const FEED_QUERY = gql`
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
            <Driver 
            key={driver.id} 
            driver={driver} 
            index={index}
            updateStoreAfterBoost={this._updateCacheAfterVote}
            />
            ))}

            </div>
      )}}
            </Query>

   )
        
    }

    _updateCacheAfterBoost = (store, createBoost, driverId) => {
        const data = store.readQuery({query: FEED_QUERY})

        const boostedDriver = data.feed.drivers.find(driver => driver.id === driverId)
        boostedDriver.boosts = createBoost.driver.boosts
        
        store.writeQuery({query: FEED_QUERY,data})
    }





}

export default DriverList;