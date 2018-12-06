import React, {Component, Fragment} from 'react';
import Driver from '../components/Driver';
import {Query, ApolloConsumer,withApollo} from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {LINKS_PER_PAGE} from '../constants';
import '../styles/DriverList.css';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import Spinner from '../components/Spinner';
import Empty from '../components/Empty';

const propTypes = {
    _updateCacheAfterBoost: PropTypes.func, 
    _subscribeToNewDrivers: PropTypes.func,
    _subscribeToNewBoosts: PropTypes.func,
    _getQueryVariables: PropTypes.func,
    _getDriversToRender: PropTypes.func,
    _nextPage: PropTypes.func,
    _previousPage: PropTypes.func

}

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!){
      feed(filter: $filter){
          drivers{
            id
            createdAt
            name
            team
            points
            pictureURL
            podiums
            championshipWins
            country
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

export const NEW_DRIVERS_SUBSCRIPTION = gql`
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

export const NEW_BOOSTS_SUBCRIPTION = gql`
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
    state = {
        drivers: [],
        filter: '',
        loading: false
    }

    
    //Updating the cache after a fan has voted for a driver.
    _updateCacheAfterBoost = (store, createBoost, driverId) => {
       const isNewPage = this.props.location.pathname.includes('new');
       const page = parseInt(this.props.match.params.page, 10)
        
       //this is the start index
       const skip = isNewPage ? (page -1) * LINKS_PER_PAGE : 0
       //this is the limit, which grabbs the 1st x elements  after skip
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

//search
_search = async (e, client) => {
    const {filter} = this.state
    this.setState({loading:true});

    const result = await this.props.client.query({
        query: FEED_SEARCH_QUERY,
        variables: {filter: e.target.value}
    });

    console.log(result);
     this.setState({
         drivers: result.data.feed.drivers,
        loading:false,
     });
}

    render(){

        
   return(
       <div>

            <Downshift
                 onChange={Selection => alert(`${Selection.value}`)}
                 itemToString={item => (item ? item.name : '')}
                 >
                 {({
                     getInputProps,
                     getItemProps,
                     isOpen,
                     inputValue,
                     highlightedIndex

                 }) =>
                <div className="circuit_list_search">
                    <ApolloConsumer>
                        {client => (
                             <input
                            {...getInputProps({
                                type: "search",
                            placeholder: 'Search for a Driver',
                            id: 'search',
                            className: this.state.loading ? 'loading search_input': 'search_input',

                            onChange: e => {
                                e.persist();
                                this._search(e,client);
                            }
                            })

                            }
                            />

                        )}
                    </ApolloConsumer>
                    {isOpen && (
                    <ul className="search_dropdown">
                        {this.state.drivers.map((item,index) => (
                             <li
                             {...getItemProps({
                                 key:item.id,
                                 index,
                                 item,
                                 className: 'search_dropdown_item'
                                 

                             })}
                            
                             > 
                             
                             <Link
                             className="Link black"
                              to={`/driver/${item.id}`} 
                              key={item.id}
                             >
                                 {item.name}
                                 </Link>
                               
                             </li>
                        ))}
                   
                    </ul>
                    )}
                </div>
                
                
                }


                 </Downshift>
    
   <Query 
   query={FEED_QUERY}
   variables={this._getQueryVariables()}
   >
    {({loading, error, data, subscribeToMore}) => {
        if (loading) return <Spinner/>
        if (error) return <div>Error</div>

        this._subscribeToNewDrivers(subscribeToMore)
        this._subscribeToNewBoosts(subscribeToMore)

        const driversToRender = this._getDriversToRender(data)
        const isNewPage = this.props.location.pathname.includes('new');
        const pageIndex = this.props.match.params.page
           ? (this.props.match.params.page -1) * LINKS_PER_PAGE
           : 0 

        if(!driversToRender.length){
            return <Empty
            to='/create-driver'
            text='drivers'
            />
        } else {
       
        return(
            <Fragment>
                <div className="driver_list">
            { driversToRender.map((driver,index) => (
                <Link className="Link" to={`/driver/${driver.id}`}  key={driver.id} >
            <Driver 
            key={driver.id} 
            driver={driver} 
            index={index + pageIndex}
            updateStoreAfterBoost={this._updateCacheAfterBoost}
            />
            </Link>
            ))}
         
            </div>
            {isNewPage && (
               <div className="flex ml4 mv3 center gray pagination_container">
             

              

             <SecondaryButton
              onClick={() => this._previousPage()}
              text="Previous"
              className="pointer"
             />
               
              <PrimaryButton
              className="pointer ml2"
              text="Next"
                onClick={() => this._nextPage(data)}
              />

             
               </div>
            )}
            </Fragment>
      )}}}
            </Query>
            </div>

   )
        
    }






}

DriverList.propTypes = propTypes;
export default withApollo(DriverList);