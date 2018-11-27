import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
const wait = require('waait');
import {mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localStorage from './localStorage';

import 
DriverInfo, 
{DRIVER_QUERY, UPDATE_DRIVER_MUTATION,DELETE_DRIVER_MUTATION} from "../containers/DriverInfo";
import { wrap } from 'module';

//Configure Enzyme Adpater
configure({adapter: new Adapter()});

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
    match: {params: {id:1234}},
};

describe('<DriverInfo/>', () => {

beforeEach(() => localStorage.setItem('foo','bar'));


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

window.localStorage = localStorage;

it('should update the driver successfully', () =>{

    const updateDriver = { 
     id: 1234, 
     name: 'Amo',
     team: 'Torro Rosso',
     points: 20,
     pictureURL: 'www.cdn.example/drivername',
     podiums: 5,
     championshipWins: 2,
     country: 'South Africa'
    };

     const mocks = [
         {
             request: {
                 query: UPDATE_DRIVER_MUTATION,
                 variables: {
                     name: 'Amo',
                     team: 'Torro Rosso',
                     points: 20,
                     pictureURL: 'www.cdn.example/drivername',
                     podiums: 1,
                    championshipWins: 0,
                    country: 'South Africa'
                 }
             },
             result: {data: {updateDriver}},
         }
     ];
 
 
     //Need to set a more serious token.
    const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
        <DriverInfo {...defaultProps}/>

       </MockedProvider>
    );
    
    expect(wrapper.find('Modal'));
    wrapper.find('#modal_form');
    wrapper.find('#name').simulate('change',{target:{value:updateDriver.name, name: 'title'}});
    //expect(wrapper.text()).toContain('Updated');
    console.log(wrapper.debug());
 });


 it('deletes the driver', ()=>{
    const deletedDriver = { 
        id: 1234, 
        name: 'Amo',
        team: 'Torro Rosso',
        points: 20,
        pictureURL: 'www.cdn.example/drivername',
        podiums: 5,
        championshipWins: 2,
        country: 'South Africa'
       };


       const mocks = [
        {
            request: {
                query: DELETE_DRIVER_MUTATION,
                variables: {
                    name: 'Amo',
                    team: 'Torro Rosso',
                    points: 20,
                    pictureURL: 'www.cdn.example/drivername',
                    podiums: 1,
                   championshipWins: 0,
                   country: 'South Africa'
                }
            },
            result: {data: {deletedDriver}},
        }
    ];

    const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
        <DriverInfo {...defaultProps}/>

       </MockedProvider>
    );

    expect(wrapper.find('ModalPopUp'));
    expect(wrapper.find('PrimaryButton').simulate('click'));


    
 });
})
