import React, { Component } from 'react';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

import dataJson from '../data/dishes.json';

import './Order.css';

class FormOrder extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      tabCurrent: 'tabOne',
      meals: this.getMeals(dataJson.dishes || []),
      restaurants: [],
      dishes: [],
      order: {},
      tabsValid: {
        tabOne: true
      }
    };
  }

  getMeals(dishes) {
    return dishes.reduce((acc, i) => {
      const availableMeals = i.availableMeals || [];
      availableMeals.forEach(m => {
        if (acc.indexOf(m) === -1) acc.push(m);
      });

      return acc;
    }, []);
  }

  getRestaurant(meal, dishes) {
    let restaurants = dishes.filter(d => {
      return (d.availableMeals || []).indexOf(meal) !== -1;
    }).map(d => d.restaurant);

    return (restaurants || []).filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  }

  getDishes(meal, restaurant, dishes) {
    return dishes.filter(d => d.restaurant === restaurant && d.availableMeals.indexOf(meal) !== -1)
  }

  selectTab(selectedTab) {
    const { tabsValid } = this.state;
    if (tabsValid[selectedTab]) this.setState({ tabCurrent: selectedTab });
  }

  nextTab(selectedTab) {
    const { tabsValid } = this.state;
    tabsValid[selectedTab] = true;

    this.setState({ tabCurrent: selectedTab, tabsValid });
  }

  disableTabs(tabs) {
    const { tabsValid } = this.state;
    tabs.forEach(tab => {
      tabsValid[tab] = false;
    })

    this.setState({ tabsValid });
  }

  updateData(key, data) {
    const { order } = this.state;
    order[key] = Object.assign({}, data);

    switch (key) {
      case 'stepOne':
        let restaurants = this.getRestaurant(data.meal, dataJson.dishes || []);
        this.setState({ restaurants });
        break;
      case 'stepTwo':
        const meal = order['stepOne'].meal;
        let dishes = this.getDishes(meal, data.restaurant, dataJson.dishes || []);
        this.setState({ dishes });
        break;
      default:
    }

    this.setState({ order });
  }

  submit() {
    const { order } = this.state;
    const { stepOne, stepTwo, stepThree } = order;

    const data = {
      meal: stepOne.meal,
      numberPeople: stepOne.number,
      restaurant: stepTwo.restaurant,
      dishes: stepThree.dishes
    }

    console.log('==== submit ==== with data : ', data);
  }

  render() {
    const { tabCurrent, meals, restaurants, dishes, order } = this.state;

    return (
      <div className='order'>
        <div className='tabs'>
          <div className={tabCurrent === 'tabOne' ? 'active' : ''} onClick={() => this.selectTab('tabOne')}>Step 1</div>
          <div className={tabCurrent === 'tabTwo' ? 'active' : ''} onClick={() => this.selectTab('tabTwo')}>Step 2</div>
          <div className={tabCurrent === 'tabThree' ? 'active' : ''} onClick={() => this.selectTab('tabThree')}>Step 3</div>
          <div className={tabCurrent === 'tabFour' ? 'active' : ''} onClick={() => this.selectTab('tabFour')}>Review</div>
        </div>

        <div className='steps'>
          {tabCurrent === 'tabOne' && <StepOne
            meals={meals}
            data={order.stepOne || {}}
            updateData={(data) => this.updateData('stepOne', data)}
            nextTab={() => this.nextTab('tabTwo')}
            disableTabs={(tabs) => this.disableTabs(tabs)} />}

          {tabCurrent === 'tabTwo' && <StepTwo
            restaurants={restaurants}
            data={order.stepTwo || {}}
            updateData={(data) => this.updateData('stepTwo', data)}
            nextTab={() => this.nextTab('tabThree')}
            prevTab={() => this.selectTab('tabOne')}
            disableTabs={(tabs) => this.disableTabs(tabs)} />}

          {tabCurrent === 'tabThree' && <StepThree
            dishes={dishes}
            data={order.stepThree || {}}
            updateData={(data) => this.updateData('stepThree', data)}
            nextTab={() => this.nextTab('tabFour')}
            prevTab={() => this.selectTab('tabTwo')}
            disableTabs={(tabs) => this.disableTabs(tabs)} />}

          {tabCurrent === 'tabFour' && <StepFour
            data={order}
            prevTab={() => this.selectTab('tabThree')}
            submit={() => this.submit()} />}
        </div>
      </div>
    );
  }
}

export default FormOrder;
