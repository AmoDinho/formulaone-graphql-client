import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import {MemoryRouter } from "react-router-dom";
const wait = require('waait');

import DriverList,{FEED_QUERY} from '../containers/DriverList';

const mocks = [
    {
        request: {
            query: FEED_QUERY,
            variables: {
                first:1,
                skip:1,
                orderBy: 'createdAt_DESC'
            }
        },
        result: {
            data: {
                driver : {
                    id: 1234, 
                name: 'Amo',
                team: 'Torro Rosso',
                points: 20,
                pictureURL: 'www.cdn.example/drivername',
                podiums: 1,
                championshipWins: 0,
                country: 'South Africa'
                },
                driver:
                {
                    id: 2345, 
                name: 'Stephan',
                team: 'Force India',
                points: 50,
                pictureURL: 'www.cdn.example/drivername',
                podiums: 4,
                championshipWins: 0,
                country: 'Jamaica'
                }
            }
        }
    }
]

const defaultProps = {
    location: {pathname: 'new'},
    match: {params: {page: 10 }}
    
   

}

it('renders the page', () => {
    renderer.create(
        <MockedProvider mocks={[]}>
        <DriverList {...defaultProps}/>
        </MockedProvider>
    )
})


it('should render loading state initially', () => {
    const component = renderer.create(
        <MockedProvider mocks={[]}>
        <DriverList {...defaultProps}/>
        </MockedProvider>
    );

    const tree = component.toJSON();
    expect(tree.children).toContain("Fetching");
});

it('renders all the drivers', ()=>{
    <MockedProvider mocks={[mocks]}>
    <DriverList {...defaultProps}/>
    </MockedProvider>

})


it('should show error UI', async () => {

    const driverMocks = [
        {
            request: {
                query: FEED_QUERY,
                variables: {
                    first:1,
                    skip:1,
                    orderBy: 'createdAt_DESC'
                }
            },
            result: {
                data: {
                    driver : {
                        id: 1234, 
                    name: 'Amo',
                    team: 'Torro Rosso',
                    points: 20,
                    pictureURL: 'www.cdn.example/drivername',
                    podiums: 1,
                    championshipWins: 0,
                    country: 'South Africa'
                    },
                    driver:
                    {
                        id: 2345, 
                    name: 'Stephan',
                    team: 'Force India',
                    points: 50,
                    pictureURL: 'www.cdn.example/drivername',
                    podiums: 4,
                    championshipWins: 0,
                    country: 'Jamaica'
                    }
                }
            },
            error: new Error('aw, mayn'),

        }
        
    ]

 

    const component = renderer.create(
        <MockedProvider mocks={driverMocks} addTypename={false}>
        <DriverList {...defaultProps}/>
        </MockedProvider>,
    );

    await wait(0);

    const tree = component.toJSON();
    expect(tree.children).toContain('Error');
});





/* 
TO-D0:
Subscriptions
pagination
*/