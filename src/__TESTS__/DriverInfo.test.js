import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
const wait = require('waait');

import 
DriverInfo, 
{DRIVER_QUERY} from "../containers/DriverInfo";
import { WSAEINVALIDPROCTABLE } from 'constants';

const mocks = [
    {
        request: {
            query: DRIVER_QUERY,
            variables: {
                id: 12345
            },

        },
        result: {
            data:{
                driver : 
                {
                id: 1234, 
                name: 'Amo',
                team: 'Torro Rosso',
                points: 20,
                pictureURL: 'www.cdn.example/drivername',
                podiums: 1,
                championshipWins: 0,
                country: 'South Africa'
            }
            }
        }
    }
];

const defaultProps = {
    match: {params: {id:1234}}
};


it('renders without error', () =>{
    renderer.create(
        <MockedProvider mocks={[]} >
        <DriverInfo {...defaultProps} />
        </MockedProvider>
    )
})


it('renders the data without errors', () => {
    renderer.create(
        <MockedProvider mocks={mocks} >
        <DriverInfo {...defaultProps} />
        </MockedProvider>
    );
});

it('should render loading state initially', () =>{
 const component = renderer.create(
     <MockedProvider mocks={[]}>
             <DriverInfo {...defaultProps} />

     </MockedProvider>
 );

 const tree = component.toJSON();
 expect(tree.children).toContain("Fetching");
});

/* 

To do once I have added more components:

it('should render the drivers attributes', async () => {
    const component = renderer.create(
        <MockedProvider mocks={mocks}>
                <DriverInfo {...defaultProps} />
   
        </MockedProvider>
    );
   
    await wait(0);

    const src = component.root.findByType('src');
    expect(src.children).toContain("www.cdn.example/drivername");
})

*/


it('should show error ui', async () => {
    const driverMock ={
        request: {
            query: DRIVER_QUERY,
            variables: {id: 1234}
        },
        error: new Error('aw, mayn'),
    };

    const component = renderer.create(
        <MockedProvider mocks={[driverMock]} addTypename={false}>
        <DriverInfo {...defaultProps}/>
        </MockedProvider>,
    );

    await wait(0);

    const tree = component.toJSON();
    expect(tree.children).toContain('Error');
});