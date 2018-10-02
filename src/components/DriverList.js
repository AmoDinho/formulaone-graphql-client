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

const NEW_DRIVERS_SUBSCRIPTION = gql`
  subscription {
      newDriver{
          node {
              id
              driver{
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
  }
`

const NEW_BOOSTS_SUBCRIPTION = gql`
 subscription{
    newBoost{
          node {
              id
             driver{
            id
              createdAt
              name
              team
              points
              pictureURL
              country
              podiums
              championshipWins
              postedBy {
                  id
                  name
            
              }
              boosts {
                  id
                  user{
                      id
                  }
              }
             }
            user{
                id

            }
          }
        }
     }
`

class DriverList extends Component {
   

    //Updating the cache after a fan has voted for a driver.
    _updateCacheAfterBoost = (store, createBoost, driverId) => {
        const data = store.readQuery({query: FEED_QUERY})

        const boostedDriver = data.feed.drivers.find(driver => driver.id === driverId)
        boostedDriver.boosts = createBoost.driver.boosts
        
        store.writeQuery({query: FEED_QUERY,data})
    }

   
   
   /*This code lets the user subscribe to new boosts. 
   We are hooking up the component a new websocket 
   connection is linked to the subscription server.


*/

_subscribeToNewDrivers = subscribeToMore => {
    subscribeToMore({
        //This is the GraphQL query
        document: NEW_DRIVERS_SUBSCRIPTION,
        //This is a reducer function that can determine 
        //how the store must be updated
        updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) return prev
            const newDriver = subscriptionData.data.newDriver.node

            return Object.assign({}, prev, {
                feed: {
                 drivers: [newDriver, ...prev.feed.drivers],
                 count: prev.feed.drivers.length + 1,
                 __typename: prev.feed.__typename
                }
            })
        }
    })
}


//THIS Lets us subscribe to more boosts for Drivers:

_subscribeToNewBoosts = subscribeToMore => {
    subscribeToMore({
        document: NEW_BOOSTS_SUBCRIPTION
    })
}
   
    render(){
        
   return(
    <Query query={FEED_QUERY}>
    {({loading, error, data, subscribeToMore}) => {
        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        this._subscribeToNewDrivers(subscribeToMore)
        this._subscribeToNewBoosts(subscribeToMore)
        const driversToRender = data.feed.drivers
       
        return(
            <div>

            { driversToRender.map((driver,index) => (
            <Driver 
            key={driver.id} 
            driver={driver} 
            index={index}
            updateStoreAfterBoost={this._updateCacheAfterBoost}
            />
            ))}

            </div>
      )}}
            </Query>

   )
        
    }






}

export default DriverList;