import React, {Component} from 'react';

class Driver extends Component {
    render(){
        return(
            <div>
                <div>
                    {this.props.driver.name} ({this.props.driver.team})
                </div>
            </div>
        )
    }
}

export default Driver;