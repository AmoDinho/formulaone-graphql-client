import React, {Component} from 'react';

class Driver extends Component {
    render(){
        return(
            <div>
                <div>
                    {this.props.driver.name} ({this.props.driver.team})
                    {this.props.driver.points} 
                    <img src={this.props.driver.pictureURL} />
                    {this.props.driver.country}
                    {this.props.driver.podiums}
                    {this.props.driver.championshipWins} 
                </div>
            </div>
        )
    }
}

export default Driver;