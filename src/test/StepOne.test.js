import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import StepOne from '../order/StepOne';

describe('Step One', () => {
  it('should be defined', () => {
    expect(StepOne).toBeDefined();
  });

  it('should render correctly', () => {
    const component = renderer.create(<StepOne />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show values correctly', () => {
    const tree = shallow(
      <StepOne
        meals={['breakfast', 'lunch', 'dinner']}
        data={{ meal: 'lunch', number: 2 }} />
    );

    expect(tree.find('.step-detail .meal').children()).toHaveLength(4);
    expect(tree.find('.step-detail .meal').getElement().props.value).toEqual('lunch');
    expect(tree.find('.step-detail .number-meal').getElement().props.value).toEqual(2);
  });
});