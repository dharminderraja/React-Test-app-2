import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import FormOrder from '../order/FormOrder';

describe('form order', () => {
  it('should be defined', () => {
    expect(FormOrder).toBeDefined();
  });

  it('should render correctly', () => {
    const component = renderer.create(<FormOrder />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('when initial, tabOne should be actived', () => {
    const tree = shallow(<FormOrder />);

    expect(tree.find('.tabs .active').text()).toEqual('Step 1');
    expect(tree.find('.steps').children()).toHaveLength(1);
  });
});