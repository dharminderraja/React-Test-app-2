import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import StepFour from '../order/StepFour';

describe('Step Three', () => {
  it('should be defined', () => {
    expect(StepFour).toBeDefined();
  });

  it('should render correctly', () => {
    const component = renderer.create(<StepFour />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show values correctly', () => {
    const order = {
      stepOne: {
        meal: 'lunch',
        number: 2
      },
      stepTwo: {
        restaurant: 'Mc Donalds'
      },
      stepThree: {
        dishes: [
          {
            dish: 'Chicken Burger',
            number: 4
          }
        ]
      }
    };
    const tree = shallow(
      <StepFour
        data={order}
        prevTab={() => { }}
        submit={() => { }}
      />
    );

    expect(tree.find('.step-detail .review-value').children()).toHaveLength(3);
  });
});