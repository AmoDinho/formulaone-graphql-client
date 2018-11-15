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

import Login, {SIGNUP_MUTATION,LOGIN_MUTATION} from '../containers/Login';

const mocks = [

]

it('loads the page',() =>{

});

it('Successfully Logs the user in',() =>{

});


it('Successfully signs the user up',() =>{

});


it('does not Sign up the user  with an invalid email',() =>{

});

it('does not login the user  with an invalid email',() =>{

});

it('does not login the user with an invalid password',() =>{

});


