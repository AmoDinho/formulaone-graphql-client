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


//Import components and queries/mutations

const mocks = []

it('loads the page',() =>{

});

it('renders the loading page',() =>{

});


it('renders the circuits',() =>{

});

it('renders an error UI',() =>{

});