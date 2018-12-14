import React, {Component, Fragment} from 'react';
import {Query, ApolloConsumer,withApollo} from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {LINKS_PER_PAGE} from '../constants';
import Circuit from '../components/Circuit';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Downshift from 'downshift';
import Empty from '../components/Empty';
import Spinner from '../components/Spinner';
import '../styles/CircuitList.css';
import Error from '../components/Error';


export const TRACK_QUERY =gql`
  query TRACK_QUERY($first:Int, $skip:Int, $orderBy: CircuitOrderByInput){
      tracks(first:$first,skip:$skip,orderBy: $orderBy){
         circuits{
            id
          name
          country
          trackImage
         }
         count
      }
  }
`

export const TRACK_SEARCH_QUERY = gql`
 query TRACK_SEARCH_QUERY($filter:String!){
     tracks(filter:$filter){
        circuits{
          id
          name
          country
          trackImage
     }
     }
 }
`

export const NEW_CIRCUIT_SUBSCRIPTION = gql`
 subscription{
    newCircuit{
    node{
      id
      name
      country
      postedBy{
        id
        name
      }
    }
    
  }
 }
` 


class CircuitList extends Component {

    state={
   filter: '',
   circuits:[],
   loading:false
    }

    _search = async (e, client) => {
        const {filter} = this.state
        this.setState({loading:true});

        const result = await this.props.client.query({
            query: TRACK_SEARCH_QUERY,
            variables: {filter: e.target.value}
        });

        console.log(result);
         this.setState({
             circuits: result.data.tracks.circuits,
            loading:false,
         });
    }

    //This lets us listen to new circuits
    _subscribeToNewCircuits = subscribeToMore => {
        subscribeToMore({
            document: NEW_CIRCUIT_SUBSCRIPTION,
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) return prev 
                const newCircuit = subscriptionData.data.newCircuit.node

                return Object.assign({},prev, {
                    tracks:{
                        circuits: [newCircuit, ...prev.feed.drivers],
                        count: prev.feed.drivers.length +1,
                        __typename: prev.feed.__typename
                    }
                })
            }
        })
    }


    //the query variables that allow for pagination
    _getQueryVariables = () => {
        const isNewPage = this.props.location.pathname.includes('circuits')
        const page = parseInt(this.props.match.params.page, 10)
        console.log(`many ${page}`)
        const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
        const first = isNewPage ? LINKS_PER_PAGE : 100
        const orderBy = isNewPage ? 'createdAt_DESC' : null 
        return {first,skip,orderBy}   
    }

    _getCircuitsToRender = data => {
        const isCircuitPage = this.props.location.pathname.includes('circuits');
        if (isCircuitPage){
            return data.tracks.circuits
        }
    }

    /*the following to methods help us go to 
the next/previous pages */
_nextPage = data => {
    const page = parseInt(this.props.match.params.page, 10)
    console.log(page)
    if (page <= data.tracks.count / LINKS_PER_PAGE){
        const nextPage = page + 1
        this.props.history.push(`/circuits/${nextPage}`)
    }
}

_previousPage = () => {
    const page = parseInt(this.props.match.params.page, 10)
    console.log(page)
    if (page > 1){
        const previousPage = page - 1
        this.props.history.push(`/circuits/${previousPage}`)
    }
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
                            placeholder: 'Search for a Cirucit',
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
                        {this.state.circuits.map((item,index) => (
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
                              to={`/circuit/${item.id}`} 
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
                query={TRACK_QUERY}
                variables={this._getQueryVariables()}
                >
                {({loading, error, data, subscribeToMore }) =>{
                 if (loading) return <Spinner/>
                 if (error) return <Error/>
                 
                 this._subscribeToNewCircuits(subscribeToMore)

                 const circuitsToRender = this._getCircuitsToRender(data)
                 const isCircuitPage = this.props.location.pathname.includes('circuits')
                 console.log(isCircuitPage)
                 const pageIndex = this.props.match.params.page
                   ? (this.props.match.params.page -1) * LINKS_PER_PAGE : 0
                 console.log(`this is ${pageIndex}`)
                 if(!circuitsToRender.length){
                    return <Empty
                            to='/create-circuit'
                            text='circuits'
                            />
                } else {
                   return (
                    <div className="circuit_list" >
                    <Fragment>
                  {circuitsToRender.map((circuit,index) => (
                
                  <Link 
                  className="Link black"
                   to={`/circuit/${circuit.id}`} 
                   key={circuit.id}>
                  <Circuit 
                  key={circuit.id} 
                  circuit={circuit}
                  index={index + pageIndex}
                  />
                </Link>
                
                ))}
                    {isCircuitPage && (
               <div className="flex ml4 mv3 center gray pagination_container">
             <SecondaryButton
              onClick={this._previousPage}
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
                    </div>
                 
                    
                    
                 )}}}
                
                </Query>
            
            </div>
            
        )
    }

  
}



export default withApollo(CircuitList)