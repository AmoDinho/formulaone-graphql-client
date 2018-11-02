import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import Driver from '../components/Driver';
import PropTypes from 'prop-types'


const propTypes = {
    _executeSearch: PropTypes.func
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

class Search extends Component {
    state = {
        drivers: [],
        filter: ''
    }

    render(){
        return (
            <div>
                <div >
                    Search
                    <input
                    type="text"
                    onChange={e => this.setState({filter: e.target.value})}
                    />
                    <button onClick={() => this._executeSearch()}>OK</button>
                </div>
                {this.state.drivers.map((driver, index) => (
                    <Driver key={driver.id} driver={driver} index={index}/>
                ))}
            </div>
        )
    }

    _executeSearch = async () => {
        const {filter} = this.state
        const result = await this.props.client.query({
            query: FEED_SEARCH_QUERY,
            variables: {filter},
        })
        const drivers = result.data.feed.drivers
        this.setState({drivers})

    }
}

Search.propTypes = propTypes;
export default withApollo(Search);