import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";


import DriverInfo, {DRIVER_QUERY} from "../containers/DriverInfo";

const mocks = [
    {
        request: {
            query: DRIVER_QUERY,
            variables: {
                id: '12345'
            },

        },
        result: {
            data:{
                driver : 
                {
                id: '1234', 
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


it('renders without error', () =>{
    renderer.create(
        <MockedProvider mocks={[]} addTypename={false}>
        <DriverInfo id={10}/>
        </MockedProvider>
    )
})