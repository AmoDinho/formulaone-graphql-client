import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

export const DRIVER_QUERY = gql`
 query DRIVER_QUERY($id:ID!){
     driver(id: $id){
         id
         name
         team
         points
         pictureURL
         podiums
         championshipWins
         country
     }
 }
`

class DriverInfo extends Component {
    render(){
        const id = this.props.match.params.id;
        return (
            <Query
            query={DRIVER_QUERY}
            variables={{
                id
            }}>
            { ({error,loading,data}) =>{
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>;

                const driver = data.driver;
                return(
                    <div>


                          {driver.name}
                    {driver.team}
                    {driver.points}
                    <img src={driver.pictureURL} alt="driver picture"/>
                    {driver.podiums}
                    {driver.championshipWins}
                    {driver.country}
                    </div>
                  
                );
            }}
            </Query>
        )
    }
}

export default DriverInfo;