import React, {Component, Fragment} from 'react';
import Driver from './Driver';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {LINKS_PER_PAGE} from '../constants';


export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: DriverOrderByInput){
    
    feed (first: $first, skip: $skip,orderBy: $orderBy){

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
count
}

  }
`

const NEW_DRIVERS_SUBSCRIPTION = gql`
 subscription {
     newDriver {
         node {
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
              boosts {
                  id
                  user {
                      id
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
       const isNewPage = this.props.location.pathname.includes('new');
       const page = parseInt(this.props.match.params.page, 10)

       const skip = isNewPage ? (page -1) * LINKS_PER_PAGE : 0
       const first = isNewPage ? LINKS_PER_PAGE : 100 
       const orderBy = isNewPage ? 'createdAt_DESC': null

      
        const data = store.readQuery({
            query: FEED_QUERY,
            variables: {first,skip,orderBy}
        })



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

//This gives us arguments to put into the variable prop 
//to implement the pagination
_getQueryVariables = () => {
    const isNewPage = this.props.location.pathname.includes('new')
    const page = parseInt(this.props.match.params.page, 10)

    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE: 0 
    const first = isNewPage ? LINKS_PER_PAGE : 100
    const orderBy = isNewPage ? 'createdAt_DESC' : null
    return {first, skip, orderBy}
}   



//This method will help us get the drivers to render
_getDriversToRender = data => {
    const isNewPage = this.props.location.pathname.includes('new');
    if (isNewPage){
        return data.feed.drivers
    }

    const rankedDrivers = data.feed.drivers.slice()
    rankedDrivers.sort((l1, l2) => l2.boosts.length - l1.boosts.length)
    return rankedDrivers
}


/*the following to methods help us go to 
the next/previous pages */
_nextPage = data => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page <= data.feed.count / LINKS_PER_PAGE){
        const nextPage = page + 1
        this.props.history.push(`/new/${nextPage}`)
    }
}

_previousPage = () => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page > 1){
        const previousPage = page - 1
        this.props.history.push(`/new/${previousPage}`)
    }
}


    render(){
        
   return(
   <Query 
   query={FEED_QUERY}
   variables={this._getQueryVariables()}
   >
    {({loading, error, data, subscribeToMore}) => {
        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        this._subscribeToNewDrivers(subscribeToMore)
        this._subscribeToNewBoosts(subscribeToMore)

        const driversToRender = this._getDriversToRender(data)
        const isNewPage = this.props.location.pathname.includes('new');
        const pageIndex = this.props.match.params.page
           ? (this.props.match.params.page -1) * LINKS_PER_PAGE
           : 0 
       
        return(
            <Fragment>
          
            { driversToRender.map((driver,index) => (
            <Driver 
            key={driver.id} 
            driver={driver} 
            index={index + pageIndex}
            updateStoreAfterBoost={this._updateCacheAfterBoost}
            />
            ))}
            {isNewPage && (
               <div className="flex ml4 mv3 gray">
               <div className="pointer mr2" onClick={this._previousPage}>
                 Previous
               </div>
               <div className="pointer" onClick={() => this._nextPage(data)}>
                 Next
              </div> 
               </div>
            )}

            </Fragment>
      )}}
            </Query>

   )
        
    }






}

export default DriverList;