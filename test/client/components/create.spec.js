import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { expect } from 'chai';

import { Create } from '../../../client/components/Create';

var chai = require('chai');

describe("Create Component", () => {

  describe('Display form', () => {
    it('should display title, description, location, time, duration, category, guests', () => {
      const component = renderIntoDocument(<Create 
          currentUser={{id:1}} 
          eventFormData={{
            title: 'myTitle',
            description: 'myDescription',
            created_by: 1,
            location: 'location',
            time: 5,
            duration: 5,
            max_guests: 9,
            privacy: false,
            group_visibility: null}}
          validationErrors={{}}
      />)
      const labels = scryRenderedDOMComponentsWithTag(component, 'label')
      expect(labels[0].textContent).to.equal('Title*')
      expect(labels[1].textContent).to.equal('Description*')
      expect(labels[2].textContent).to.equal('Location*')
      expect(labels[3].textContent).to.equal('Time*')
      expect(labels[4].textContent).to.equal('Duration')
      expect(labels[5].textContent).to.equal('Category')
      expect(labels[6].textContent).to.equal('Guests')
    })

    it('should display privacy and visibility', () => {
      const component = renderIntoDocument(<Create 
        currentUser={{id:1}} 
        eventFormData={{
          title: 'myTitle',
          description: 'myDescription',
          created_by: 1,
          location: 'location',
          time: 5,
          duration: 5,
          max_guests: 9,
          privacy: false,
          group_visibility: null}}
        validationErrors={{}}
      />)
      const labels = scryRenderedDOMComponentsWithTag(component, 'label')
      expect(labels[7].textContent).to.equal('Privacy')
      expect(labels[10].textContent).to.equal('Visibility')
    })
  })

  describe('Display Button', () => {
    it('should display Clear Values and Create buttons', () => {
      const component = renderIntoDocument(<Create 
        currentUser={{id:1}} 
        eventFormData={{
          title: 'myTitle',
          description: 'myDescription',
          created_by: 1,
          location: 'location',
          time: 5,
          duration: 5,
          max_guests: 9,
          privacy: false,
          group_visibility: null}}
        validationErrors={{}}
      />)
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
      expect(buttons.length).to.equal(2);
      expect(buttons[0].textContent).to.equal('Clear Values')
      expect(buttons[1].textContent).to.equal('Create')
    })
  })
})