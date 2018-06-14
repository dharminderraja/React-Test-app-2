import React, { Component } from 'react';
import NoteAdd from '@material-ui/icons/NoteAdd';

class StepThree extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dishes: [{ dish: '', number: 1 }],
      errors: []
    };
  }

  componentWillMount() {
    const { dishes } = this.props.data || [];
    if (dishes && dishes.length > 0) {
      this.setState({ dishes });
    }
  }

  addDish() {
    let { dishes } = this.state;
    dishes.push({ dish: '', number: 1 });
    this.setState({ dishes });
  }

  onChange(i, property, value) {
    let { dishes } = this.state;

    dishes[i] = dishes[i] || {};
    dishes[i][property] = value;

    this.setState({ dishes });
  }

  validate() {
    let { errors, dishes } = this.state;

    dishes.forEach((dish, i) => {
      errors[i] = errors[i] || {};
      errors[i]['dish'] = !dish['dish'] ? 'Please select a dish' : '';
      errors[i]['number'] = dish['number'] < 1 ? 'Please enter a valid number' : '';
    })
    this.setState({ errors });

    let flag = true;
    errors.forEach(err => {
      if (!Object.keys(err).every(k => !err[k])) {
        flag = false;
      }
    })

    return flag;
  }

  nextStep() {
    const { updateData, nextTab, disableTabs } = this.props;
    const { dishes } = this.state;

    if (this.validate()) {
      updateData({ dishes });
      nextTab();
    } else {
      disableTabs(['tabFour']);
    }
  }

  render() {
    const { prevTab } = this.props;
    const list = this.props.dishes || [];
    const { dishes, errors } = this.state;

    return (
      <div className='step-detail'>
        {dishes.map((item, idx) => (
          <div key={idx} className='pick-dish'>
            <div className='left'>
              <span className='title'>Please select a Dish</span>
              <select className='meal' value={item.dish || ''} onChange={evt => this.onChange(idx, 'dish', evt.target.value)}>
                <option value=''>...</option>
                {(list || []).filter(i => {
                  return !dishes.find(k => k.dish !== item.dish && k.dish === i.name)
                }).map((i, idx) => (<option key={idx} value={i.name}>{i.name}</option>))}
              </select>
              {errors[idx] && errors[idx]['dish'] && <span className='alert-warning'>{errors[idx]['dish']}</span>}
            </div>
            <div className='right'>
              <span className='title'>Please enter no of servings</span>
              <input className='number-meal' value={item.number} onChange={evt => this.onChange(idx, 'number', evt.target.value)} type='number' />
              {errors[idx] && errors[idx]['number'] && <span className='alert-warning'>{errors[idx]['number']}</span>}
            </div>
            <div className='clear' />
          </div>
        ))}

        <div className='add-dish' onClick={() => this.addDish()}><NoteAdd/></div>

        <div className='nav-step'>
          <button className='prev' onClick={() => prevTab()}>Previous</button>
          <button className='next' onClick={() => this.nextStep()}>Next</button>
        </div>
      </div>
    );
  }
}

export default StepThree;
