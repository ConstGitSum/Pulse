process.env.NODE_ENV = 'test';

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils';
import { expect } from 'chai';
import axios from 'axios';

import { Home } from '../../client/components/Home';

const mockStore = configureStore([])({});

describe('Home Component', () => {

  it('should render a facebook login link when logged out', () => {
    let logState = false;
    const fetchLogState = () => logState = false;
    const component = renderIntoDocument(
      <Provider store={mockStore}>
        <Home 
          pulse={1} 
          logState={logState}
          fetchLogState={fetchLogState} />
      </Provider>
    );
    const links = scryRenderedDOMComponentsWithTag(component, 'a');

    expect(links.length).to.equal(1);
    expect(links[0].textContent).to.equal('facebook!');
  })

  it.only('should render a logout button when logged in',() => {
    let logState = true;
    const fetchLogState = () => logState = true;
    const component = renderIntoDocument(
      <Provider store={mockStore}>
        <Home 
          pulse={1} 
          logState={logState}
          fetchLogState={fetchLogState} />
      </Provider>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const links = scryRenderedDOMComponentsWithTag(component, 'a');
    expect(buttons.length).to.equal(2);
    expect(links.length).to.equal(0);
    expect(buttons[0].textContent).to.equal('Pulse it');
    expect(buttons[1].textContent).to.equal('Log Out');
  })

  xit('it logs out when you click Log Out',() => {
    let logState = true;
    const logOutState = (state) => logState = state;
    const component = renderIntoDocument(<Home pulse={1} logState={true} fetchPulse={logOutState}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[1]);
    expect(logState).to.equal(false);
  })
})
