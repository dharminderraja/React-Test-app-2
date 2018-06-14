import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import StepTwo from '../order/StepTwo';

describe('Step Two', () => {
  it('should be defined', () => {
    expect(StepTwo).toBeDefined();
  });

  it('should render correctly', () => {
    const component = renderer.create(<StepTwo />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show values correctly', () => {
    const tree = shallow(
      <StepTwo
        restaurants={['Mc Donalds', 'Taco Bell', 'BBQ Hut']}
        data={{ restaurant: 'Mc Donalds' }}
        prevTab={() => { }} />
    );

    expect(tree.find('.step-detail .meal').children()).toHaveLength(4);
    expect(tree.find('.step-detail .meal').getElement().props.value).toEqual('Mc Donalds');
  });
});