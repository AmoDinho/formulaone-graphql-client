import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import {MemoryRouter } from "react-router-dom";
const wait = require('waait');
import {mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {wrap} from 'module';
require('jest-localstorage-mock');
configure({adapter: new Adapter()});
import CircuitList, {TRACK_QUERY} from '../containers/CircuitList';


//Import components and queries/mutations

const mocks = []

it('loads the page',() =>{
renderer.create(
    <MockedProvider  mocks={[]}>
      <CircuitList/>
    </MockedProvider>
)
});

it('renders the loading page',() =>{
    const component = renderer.create(
        <MockedProvider  mocks={[]}>
    <CircuitList/>
  </MockedProvider>
    );

    const tree = component.toJSON();
    expect(tree.children).toContain("Fetching...")
});



it('renders the circuits',() =>{
    

});

it('renders an error UI',() =>{

});