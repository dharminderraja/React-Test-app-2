import React, { Component } from 'react';

const MAX = 10;

class StepOne extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      meal: '',
      number: 1,
      errors: {}
    };
  }

  componentWillMount() {
    const { number, meal } = this.props.data || {};
    if (number && meal) {
      this.setState({ number, meal });
    }
  }

  onChange(property, value) {
    this.setState({ [property]: value });
  }

  validate() {
    let { errors, meal, number } = this.state;

    errors['meal'] = !meal ? 'Please select meal' : '';
    errors['number'] = number > 10 || number < 1 ? 'Please input number in range from 1 to 10' : '';
    this.setState({ errors })

    return Object.keys(errors).every(k => !errors[k]);
  }

  nextStep() {
    const { updateData, nextTab, disableTabs } = this.props;
    const { number, meal } = this.state;

    if (this.validate()) {
      updateData({ number, meal });
      nextTab();
    } else {
      disableTabs(['tabTwo', 'tabThree', 'tabFour']);
    }
  }

  render() {
    const { meals } = this.props;
    const { number, meal, errors } = this.state;

    return (
      <div className='step-detail'>
        <div>
          <span className='title'>Please select a meal</span>
          <select className='meal' value={meal || ''} onChange={evt => this.onChange('meal', evt.target.value)}>
            <option value=''>...</option>
            {(meals || []).map((i, idx) => (<option key={idx} value={i}>{i}</option>))}
          </select>
          {errors['meal'] && <span className='alert-warning'>{errors['meal']}</span>}
        </div>
        <div>
          <span className='title'>Please Enter Number of people</span>
          <input className='number-meal' value={number} onChange={evt => this.onChange('number', evt.target.value)} type='number' min='1' max={MAX} />
          {errors['number'] && <span className='alert-warning'>{errors['number']}</span>}
        </div>
        <div className='nav-step'>
          <button className='next' onClick={() => this.nextStep()}>Next</button>
        </div>
      </div>
    );
  }
}

export default StepOne;
