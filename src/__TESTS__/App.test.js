import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App';
import {withRouter,BrowserRouter} from 'react-router-dom';

jest.mock('react-router-dom');




it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
