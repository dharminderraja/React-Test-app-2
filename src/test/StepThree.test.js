import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import StepThree from '../order/StepThree';

describe('Step Three', () => {
  it('should be defined', () => {
    expect(StepThree).toBeDefined();
  });

  it('should render correctly', () => {
    const component = renderer.create(<StepThree />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show values correctly', () => {
    const dishes = [
      {
        "id": 1,
        "name": "Chicken Burger",
        "restaurant": "Mc Donalds",
        "availableMeals": ["lunch", "dinner"]
      },
      {
        "id": 2,
        "name": "Ham Burger",
        "restaurant": "Mc Donalds",
        "availableMeals": ["lunch", "dinner"]
      },
      {
        "id": 3,
        "name": "Cheese Burger",
        "restaurant": "Mc Donalds",
        "availableMeals": ["lunch", "dinner"]
      },
      {
        "id": 4,
        "name": "Fries",
        "restaurant": "Mc Donalds",
        "availableMeals": ["lunch", "dinner"]
      }
    ];

    const tree = shallow(
      <StepThree
        dishes={dishes}
        data={{ dishes: [{ dish: 'Chicken Burger', number: 2 }] }}
        prevTab={() => { }} />
    );

    expect(tree.find('.step-detail .meal').children()).toHaveLength(5);
    expect(tree.find('.step-detail .meal').getElement().props.value).toEqual('Chicken Burger');
  });
});