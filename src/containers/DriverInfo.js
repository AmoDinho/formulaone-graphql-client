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
mutation UPDATE_DRIVER_MUTATION($id: ID!,$name:String!,$team:String!,$points:Int!,
 $pictureURL:String!,$podiums:Int!,$championshipWins:Int!,$country:String!){
     updateDriver(id:$id,name:$name,team:$team,points:$points,pictureURL:$pictureURL,
     podiums:$podiums, championshipWins:$championshipWins,country:$country){
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
        country:''
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


    handleChange = e => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]:val});
    };


    validateForm(){
        return this.state.name.length > 0 
        && this.state.team.length > 0 
        && this.state.points > 0
        && this.state.pictureURL.length > 0
        && this.state.podiums > 0
        && this.state.championshipWins > 0
        && this.state.country.length > 0;

        
    }

 



  
    
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
            country
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
                    <img src={driver.pictureURL} alt="driver picture"/>

                    </div>


                      <div className="driver_info">
                      <h2>{driver.name}</h2>
                      <p>Team: {driver.team}</p>
                      <p>Points:  {driver.points}</p>
                     <p>Podiums:  {driver.podiums} </p>
                     <p>Championships: {driver.championshipWins}</p>
                      <p>Country:{driver.country} </p>
                      {authToken &&(
                        
                         <section>
                           <Icon.Edit className="pointer" onClick={this.showModal}/> Edit Driver
                           |
                           <Icon.Trash className="pointer" onClick={this.showModalPopUp}/> Delete Driver
                         </section>
       

                        )}
                      </div>
                      
                        
                    </div>
                         
                    <Modal  show={this.state.show}
                        handleClose={this.hideModal}
                        >

                        <Mutation mutation={UPDATE_DRIVER_MUTATION} key={id}>
                        {(updateDriver,{data}) =>{
                        
                        if (data) return <p>Updated!</p>;

                        return (
                            <div>
                            <form className="modal_form" onSubmit={e => {
                                e.preventDefault();
                                updateDriver({
                                    variables: 
                                    {id,
                                    team,
                                    name,
                                    points,
                                    pictureURL,
                                    podiums,
                                    championshipWins,
                                    country
                                    }
                                    
                                });
                              
                                   
                            }}>
    
                            <label htmlFor="name">Name: 
                                <input 
                                defaultValue={driver.name}
                                onChange={e => this.setState({ name: e.target.value })}
                                />
                                </label>
                                <label htmlFor="team">Team: 
                                <input 
                                defaultValue={driver.team}
                                onChange={e => this.setState({ team: e.target.value })}
                                /></label>
    
                                <label htmlFor="points">Points: 
                                    <input 
                                defaultValue={driver.points}
                                onChange={e => this.setState({ points: e.target.value })}
    
                                /></label>
    
                                <label htmlFor="pictureURL">Picture (URL): 
                                  <input 
                                defaultValue={driver.pictureURL}
                                onChange={e => this.setState({ pictureURL: e.target.value })}
    
                                /></label>
    
    
                              <label htmlFor="podiums">Podiums: 
                                  <input 
                                defaultValue={driver.podiums}
                                onChange={e => this.setState({ podiums: e.target.value })}
    
                                /></label>
    
                                <label htmlFor="championshipWins">ChampionshipWins:
                                
                                
                                  <input 
                                defaultValue={driver.championshipWins}
                                onChange={e => this.setState({ championshipWins: e.target.value })}
    
                                />
                                </label>
    
                                 <label htmlFor="country">Country:
                                  <input 
                                defaultValue={driver.country}
                                onChange={e => this.setState({ country: e.target.value })}
    
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
                             <Mutation key={id}  mutation={DELETE_DRIVER_MUTATION}>
                                {(deleteDriver) =>{
                                    return(
                                        <PrimaryButton
                                        onClick={ ()=> {
                                            deleteDriver({
                                            variables:{id}})
                                            this.props.history.push('/new/1')
                                        }}
                                        text="Delete Driver"
                                    />
                                    
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




export default DriverInfo;