import React, {Component} from 'react';
import gql from 'graphql-tag'
import { Query, graphql } from 'react-apollo'



const QUERY = gql`
  query DriverInfo($id:String){
      driverInfo(id: $id){         
    name       
    team
    points
    pictureURL
    country
    podiums
    championshipWins
        }
      }
  
`


const Driver = () =>{

    //const id = this.props.match.params.id

    return(
        <Query query={QUERY} >
        {
     (({loading, error, data}) =>{
        if(loading) return <div>loading</div>
        if(error) return <div>error </div>

      // const driver = data.feed.drivers
        return (
            <div>
            <div>
               
                <h1>{data.driver.name}</h1>
                 ({data.driver.team})
                {data.driver.points} 
                <img src={data.driver.pictureURL} />
                {data.driver.country}
                {data.driver.podiums}
                {data.driver.championshipWins} 

                 ) )}
                
            </div>
        </div>
        )
     })
        
        }
    </Query>
    )
}

     
 
export default Driver;

{/**/}
