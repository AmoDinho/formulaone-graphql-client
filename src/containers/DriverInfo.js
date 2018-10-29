import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
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

const UPDATE_DRIVER_MUTATION =gql`
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

class DriverInfo extends Component {
    state = {
        show: false,
        
    }

    showModal = () =>{
        this.setState({show:true});
    }

    hideModal = () =>{
        this.setState({show:false});
    }


    handleChange = e => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]:val});
    };

    /*
    updateDriver = async (e, updateItemMutation) => {
        e.preventDefault();

        const res = await updateItemMutation({
            variables:{
                id: this.props.id,
                ...this.state
            }
        });
    }
*/
  
    
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
                let input;
                return(
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
                      </div>
                        <Modal  show={this.state.show}
                        handleClose={this.hideModal}
                        >

                        <Mutation mutation={UPDATE_DRIVER_MUTATION} key={id}>
                        {updateDriver =>(



                        
                        
                        <form onSubmit={e => {
                            e.preventDefault();
                            updateDriver({
                                variables: 
                                {id,
                                team: input.team,
                                name: input.name,
                                points: input.points,
                                pictureURL: input.pictureURL,
                                podiums: input.podiums,
                                championshipWins: input.championshipWins,
                                country: input.country
                                }
                                
                            });
                            input.team = "";
                            input.name = "";
                            input.points = 0;
                            input.pictureURL = "";
                            input.podiums = 0;
                            input.championshipWins=0;
                            input.country="";
                               
                        }}>
                            <input 
                            defaultValue={driver.name}
                            ref={node =>{
                                input = node;
                            }}
                            />
                            <input 
                            defaultValue={driver.team}
                            ref={node =>{
                                input = node;
                            }}
                            />
                                <input 
                            defaultValue={driver.points}
                            ref={node =>{
                                input = node;
                            }}
                            />
                              <input 
                            defaultValue={driver.pictureURL}
                            ref={node =>{
                                input = node;
                            }}
                            />

                              <input 
                            defaultValue={driver.podiums}
                            ref={node =>{
                                input = node;
                            }}
                            />
                              <input 
                            defaultValue={driver.championshipWins}
                            ref={node =>{
                                input = node;
                            }}
                            />
                              <input 
                            defaultValue={driver.country}
                            ref={node =>{
                                input = node;
                            }}
                            />

                               <button type="submit">Submit</button>
                        </form>
                        )}
                        </Mutation>

                        </Modal>
                        <button
                        onClick={this.showModal}
                        >
                            Update Driver
                        </button>
                    </div>
                  
                );
            }}
            </Query>
        )
    }
}


const Modal = ({handleClose,show,children}) => {
    const showHideClassName = show ? 'modal display-block':'model display-none';

    return(
        <div className={showHideClassName}>
        <section className='modal-main'>
        {children}
        <button onClick={handleClose}>
            close
        </button>
        </section>
        </div>
    )
}
export default DriverInfo;