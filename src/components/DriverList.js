import React, {Component} from 'react';
import Driver from './Driver';

class DriverList extends Component {
    render(){
        const driversToRender = [
            {
                id: '1',
                name: 'Lonely',
                team: 'Apple'
            },
            {
                id: '2',
                name: 'Happy',
                team: 'Genius'
            }
        ]

        return(
        <div>{driversToRender.map(driver => <Driver key={driver.id} driver={driver}/>)}</div>
        )
    }
}

export default DriverList;