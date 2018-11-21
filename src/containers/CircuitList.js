import React, {Component, Fragment} from 'react';
import Driver from '../components/Driver';
import {Query, ApolloConsumer,withApollo} from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {LINKS_PER_PAGE} from '../constants';
import Circuit from '../components/Circuit';
import Downshift from 'downshift';
import '../styles/CircuitList.css';


export const TRACK_QUERY =gql`
  query TRACK_QUERY($first:Int, $skip:Int, $orderBy: CircuitOrderByInput){
      tracks(first:$first,skip:$skip,orderBy: $orderBy){
         circuits{
            id
          name
          country
          trackImage
         }
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


class CircuitList extends Component {

    state={
   filter: '',
   circuits:[],
   loading:false
    };

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


                


                <Query query={TRACK_QUERY}>
                {({loading, error, data }) =>{
                 if (loading) return <div>Fetching...</div>
                 if (error) return <div>Something went wrong</div>

                 const circuitsToRender = data.tracks.circuits
                 
                 return (
                    <div className="circuit_list" >
                  {circuitsToRender.map(circuit => (
                  <Link className="Link black" to={`/circuit/${circuit.id}`} key={circuit.id}>
                  <Circuit key={circuit.id} circuit={circuit}/>
                </Link>
                
                ))}

                    </div>
                 )

                }}
                
                </Query>
            </div>
            
        )
    }

  
}



export default withApollo(CircuitList)