import React from 'react';
import {MockedProvider} from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import {MemoryRouter } from "react-router-dom";
const wait = require('waait');
import {mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {wrap} from 'module';
import RequestReset, {REQUEST_RESET_MUTATION} from '../containers/RequestReset';


//configure enzyme adpater
configure({adapter: new Adapter()});

const mocks = [
    {
        request: {
            query: REQUEST_RESET_MUTATION,
            variables: {email: 'hans@interstellar.io'}
        },
        result: {
            data: 
            {
            RequestReset: {message:'success', _typename: 'Message'},
        }
      }
    }
];

const mocksError = [
    {
        request: {
            query: REQUEST_RESET_MUTATION,
            variables: {email: 'baz@interstellar.io'}
        },
        result: {
            data: 
            {
            RequestReset:{message:'failure',_typename:'Message'}
        }
      }
    }
];

it('loads the page',() =>{
  renderer.create(
      <MockedProvider mocks={[]}>
        <RequestReset />
      </MockedProvider>
  )
});


it('successfully sends a reset', async () =>{
  const wrapper = mount(
      <MockedProvider mocks={mocks}>
       <RequestReset/>
      </MockedProvider>
  );

  wrapper
  .find('input')
  .simulate('change',{target: {name:'email',value:'hans@interstellar.io'}});
          
  wrapper.find('PrimaryButton').simulate('click');
  await wait();
  wrapper.update();
  expect(wrapper.find('p').text()).toContain('Check your email for a link!');        
});

it('it does not send email if the email does not exist', async () =>{
    const wrapper_error = mount(
        <MockedProvider mocks={mocksError}>
         <RequestReset/>
        </MockedProvider>
    );
 
    wrapper_error
  .find('input')
  .simulate('change',{target: {name:'email',value:'baz@interstellar.io'}});

  wrapper_error.find('PrimaryButton').simulate('click');
  await wait();
  wrapper_error.update();
  expect(wrapper_error.find('h1').text()).toMatch('That email does not exist on our side.');

});



