import React, {Component, Fragment} from 'react';
import Driver from '../components/Driver';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {LINKS_PER_PAGE} from '../constants';
import Circuit from '../components/Circuit';
import {withApollo} from 'react-apollo';
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
     circuits{
          id
          name
          country
          trackImage
     }
 }
`


class CircuitList extends Component {

    state={
   filter: '',
   circuitsToRender: []
    }
    render(){

        return(
           
            <div>
                <div>
                    Search <input
                    type="text"
                    onChange={e => this.setState({filter: e.target.value})}
                    />
                    <button onClick={() => this._search()}>Ok</button>
                </div>
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

    _search = async () => {
        const {filter} = this.state
        const result = await this.props.client.query({
            query: TRACK_SEARCH_QUERY,
            variables: {filter}
        })
        const circuitsToRender = result.data.tracks.circuits
        this.setState({circuitsToRender})
    }
}



export default withApollo(CircuitList)