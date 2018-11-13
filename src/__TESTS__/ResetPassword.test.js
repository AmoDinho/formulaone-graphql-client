import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import {MemoryRouter } from "react-router-dom";
const wait = require('waait');
import {mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {wrap} from 'module';
import ResetPassword, {RESET_PASSWORD_MUTATION} from '../containers/ResetPassword';


configure({adapter: new Adapter()});


const mocks = [
    {
        request: {
            query: RESET_PASSWORD_MUTATION,
            variables: {
                resetToken: "1234",
                password: 'S0ny!',
                confirmPassword:'S0ny!'
            }
        }
    }
]


it('loads the page',() =>{

});


it('has a valid reset token',() =>{

});


it('updates the users password',() =>{

});


it('errors out when passwords do not match',() =>{

});
