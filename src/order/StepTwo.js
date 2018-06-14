import React, { Component } from 'react';

class StepTwo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      restaurant: '',
      errors: {}
    };
  }

  componentWillMount() {
    const { restaurant } = this.props.data || {};
    if (restaurant) {
      this.setState({ restaurant });
    }
  }

  onChange(property, value) {
    this.setState({ [property]: value });
  }

  validate() {
    let { errors, restaurant } = this.state;

    errors['restaurant'] = !restaurant ? 'Please select restaurant' : '';
    this.setState({ errors })

    return Object.keys(errors).every(k => !errors[k]);
  }

  nextStep() {
    const { updateData, nextTab, disableTabs } = this.props;
    const { restaurant } = this.state;

    if (this.validate()) {
      updateData({ restaurant });
      nextTab();
    } else {
      disableTabs(['tabThree', 'tabFour']);
    }
  }

  render() {
    const { restaurants, prevTab } = this.props;
    const { restaurant, errors } = this.state;

    return (
      <div className='step-detail'>
        <div>
          <span className='title'>Please select a Restaurant</span>
          <select className='meal' value={restaurant || ''} onChange={evt => this.onChange('restaurant', evt.target.value)}>
            <option value=''>...</option>
            {(restaurants || []).map((i, idx) => (<option key={idx} value={i}>{i}</option>))}
          </select>
          {errors['restaurant'] && <span className='alert-warning'>{errors['restaurant']}</span>}
        </div>
        <div className='nav-step'>
          <button className='prev' onClick={() => prevTab()}>Previous</button>
          <button className='next' onClick={() => this.nextStep()}>Next</button>
        </div>
      </div>
    );
  }
}

export default StepTwo;
