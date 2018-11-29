import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import {AUTH_TOKEN} from '../constants';
import * as Icon from 'react-feather';
import Modal from '../components/Modal';
import PrimaryButton from '../components/PrimaryButton';
import "../styles/DriverInfo.css";
import ModalPopUp from '../components/ModalPopUp';
import {FEED_QUERY} from '../containers/DriverList';
import {LINKS_PER_PAGE} from '../constants';
import PropTypes from 'prop-types';

const propTypes = {
    driver: PropTypes.shape({
        name: PropTypes.string,
        team: PropTypes.string,
        podiums: PropTypes.number,
        pictureURL: PropTypes.string,
        points: PropTypes.number,
        number: PropTypes.number,
        championshipWins: PropTypes.number,
        country: PropTypes.string
    })
}


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

export const UPDATE_DRIVER_MUTATION =gql`
mutation UPDATE_DRIVER_MUTATION($id: ID!,
$name:String!,
$team:String!,
$points:Int!,
 $pictureURL:String!,
 $number:Int!,
 $podiums:Int!,
 $championshipWins:Int!,
 $country:String!){
     updateDriver(id:$id,
     name:$name,
     team:$team,
     points:$points,
     number:$number,
     pictureURL:$pictureURL,
     podiums:$podiums, 
     championshipWins:$championshipWins,
     country:$country){
        id
         name
         team
         points
         pictureURL
         podiums
         championshipWins
         country
         number
     }
 }
`

export const DELETE_DRIVER_MUTATION =gql`
  mutation DELETE_DRIVER_MUTATION($id:ID!){
      deleteDriver(id:$id){
          id
      }
  }
`



class DriverInfo extends Component {
    state = {
        show: false,
        showPop:false,
        name: '',
        team: '',
        points: 0,
        pictureURL: '',
        podiums:0,
        championshipWins: 0,
        country:'',
        number:0
    }

    showModal = () =>{
        this.setState({show:true});
    }

    hideModal = () =>{
        this.setState({show:false});
    }

    showModalPopUp = () =>{
        this.setState({showPop:true});
    }

    hideModalPopUp = () =>{
        this.setState({showPop:false});
    }


    handleChange = name => event =>{
        this.setState({
            [name]: event.target.value
        });
    } 


    validateForm(){
        return this.state.name.length > 0 
        && this.state.team.length > 0 
        && this.state.points > 0
        && this.state.pictureURL.length > 0
        && this.state.number.length > 0
        && this.state.podiums > 0
        && this.state.championshipWins > 0
        && this.state.country.length > 0;

        
    }

 
     update = (cache, payload) => {
         //Update the cache on the client to match the server
         //1. Read the cache for drivers we want
         const first = LINKS_PER_PAGE
         const skip = 0
        const orderBy = 'createdAt_DESC'
         const data = cache.readQuery({
             query: FEED_QUERY,
             variables:{first,skip,orderBy}
            });
         console.log(data, payload);
         //filter deleted driver out of the page
         data.feed.drivers = data.feed.drivers.filter(driver => driver.id !== payload.data.deleteDriver.id);
         //put the drivers back
         cache.writeQuery({
             query: FEED_QUERY,
             data,
             variables:{first,skip,orderBy}}
            );
        };


  
    
    render(){
        const id = this.props.match.params.id;
        const authToken = localStorage.getItem(AUTH_TOKEN);
        
        const {
            name,
            team,
            points,
            pictureURL,
            podiums,
            championshipWins,
            country,
            number
        } = this.state
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
                    <div className="driverInfo_container mt5">
                    <div>
                    <img className="pictureURL" src={driver.pictureURL} alt={`${driver.name}`}/>

                    </div>


                      <div className="driverInfo_container_content">
                      <div className="driverInfo_container_content_text" >
                      <h2>{driver.name}</h2>
                      <p><strong>Team:</strong> {driver.team}</p>
                      <p><strong>Points:</strong>  {driver.points}</p>
                     <p><strong>Podiums: </strong> {driver.podiums} </p>
                     <p><strong>Championships:</strong> {driver.championshipWins}</p>
                      <p><strong>Country:</strong> {driver.country} </p>
                      {authToken &&(
                        
                         <section>
                           <Icon.Edit className="pointer edit" onClick={this.showModal}/> Edit Driver
                           |
                           <Icon.Trash className="pointer delete" onClick={this.showModalPopUp}/> Delete Driver
                         </section>
       
  
                        )}
                      </div>
                   
                      </div>
                      
                        
                    </div>
                         
                    <Modal  
                    show={this.state.show}
                    handleClose={this.hideModal}
                    >

                    <Mutation 
                    mutation={UPDATE_DRIVER_MUTATION} 
                    key={id}>
                    {(updateDriver,{data}) =>{
                        
                    if (data) return <p>Updated!</p>;

                        return (
                            <div>
                            <form 
                            id="modal_form" 
                            className="modal_form"
                             onSubmit={e => {
                                e.preventDefault();
                                updateDriver({
                                    variables: 
                                    {
                                    id,
                                    team,
                                    name,
                                    points,
                                    pictureURL,
                                    podiums,
                                    championshipWins,
                                    country,
                                    number
                                    }
                                    
                                });
                              
                                   
                            }}>
    
                            <label htmlFor="name">Name: 
                                <input 
                                id="name"
                               defaultValue={driver.name}
                               onChange={this.handleChange('name')}
                               />
                                </label>
                                <label htmlFor="team">Team: 
                                <input 
                                id="team"
                                defaultValue={driver.team}
                                onChange={this.handleChange('team')}
                                /></label>
    
                                <label htmlFor="points">Points: 
                                    <input
                                    id="points" 
                                defaultValue={driver.points}
                                onChange={this.handleChange('points')}
    
                                /></label>
                                <label htmlFor="number">Race Number:
                                <input 
                                 defaultValue={driver.number}
                                 required
                                 onChange={this.handleChange('number')}
                                 type="text"
                                 placeholder="1"
                                 min="0"
                                 /></label>
                                <label htmlFor="pictureURL">Picture (URL): 
                                  <input 
                                  id="pictureURL"
                                defaultValue={driver.pictureURL}
                                onChange={this.handleChange('pictureURL')}
    
                                /></label>
    
    
                              <label htmlFor="podiums">Podiums: 
                                  <input 
                                  id="podiums"
                                defaultValue={driver.podiums}
                                onChange={this.handleChange('podiums')}
    
                                /></label>
    
                                <label htmlFor="championshipWins">ChampionshipWins:
                                
                                
                                  <input 
                                  id="championshipWins"
                                defaultValue={driver.championshipWins}
                                onChange={this.handleChange('championshipWins')}
    
                                />
                                </label>
    
                                 <label htmlFor="country">Country:
                                  <input 
                                  id="country"
                                defaultValue={driver.country}
                                onChange={this.handleChange('country')}
    
                                /></label>
                                <PrimaryButton
                             className="modal_button"
                            // disabled={this.validateForm()}
                             text="Update Driver"
                             />
                               </form>
    
                              
                                    
    
                             
                               </div>
                       
                                )
                            
                            
                         } }

                                </Mutation>
                              
                               
                        
                      

                        </Modal>
                       

                       <ModalPopUp
                       show={this.state.showPop}
                       handleClose={this.hideModalPopUp}>
                             <p>Are you sure you want to delete {driver.name}?</p>
                             <Mutation 
                              
                             mutation={DELETE_DRIVER_MUTATION}
                             update={this.update}
                             errorPolicy="all"
                             variables={{id}}
                             onCompleted={() => this.props.history.push('/new/1')}
                             >
                                {(deleteDriver, {error}) =>{
                                    return(
                                        <div>
                                        <pre>
                                        {error && <p>{error.message.replace('GraphQL error:', '')}</p>
                                        }
                                        </pre>
                                        <PrimaryButton
                                        onClick={deleteDriver }
                                        text="Delete Driver"
                                    />
                                        </div>
                                    
                                )
                                }}
                             </Mutation>

                           
                       </ModalPopUp>
                       
                  </div>
                );
            }}
            </Query>
        )
    }
}

DriverInfo.propTypes = propTypes;


export default DriverInfo;