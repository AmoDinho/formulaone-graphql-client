import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import "../styles/DriverInfo.css";

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
                    <div className="center mt5">
                    <div>
                    <img src={driver.pictureURL} alt="driver picture"/>

                    </div>


                      <div className="driver_info">
                      <h2>{driver.name}</h2>
                      <p>Team: {driver.team}</p>
                      <p>Points:  {driver.points}</p>
                     <p>Podiums:  {driver.podiums} </p>
                     <p>Championships: {driver.championshipWins}</p>
                      <p>Country:{driver.country} </p>
                      </div>
                        
                    </div>
                  
                );
            }}
            </Query>
        )
    }
}

export default DriverInfo;