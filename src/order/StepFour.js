import React, { Component } from 'react';

class StepFour extends Component {
  render() {
    const { data, submit, prevTab } = this.props;
    const { stepOne, stepTwo, stepThree } = data || {};

    return (
      <div className='step-detail'>
        <div>
          <span className='review-title'>Meal</span>
          <span className='review-value'>{stepOne ? stepOne.meal : ''}</span>
        </div>
        <div>
          <span className='review-title'>No of People</span>
          <span className='review-value'>{stepOne ? stepOne.number : ''}</span>
        </div>
        <div>
          <span className='review-title'>Restaurant</span>
          <span className='review-value'>{stepTwo ? stepTwo.restaurant : ''}</span>
        </div>
        <div>
          <span className='review-title'>Dishes</span>
          <div className='review-dishes'>
            {(stepThree ? stepThree.dishes : []).map((i, idx) => (
              <span className='dish-item' key={idx}>{`${i.dish} - ${i.number}`}</span>
            ))}
          </div>
        </div>
        <div className='nav-step'>
          <button className='prev' onClick={() => prevTab()}>Previous</button>
          <button className='next' onClick={() => submit()}>Submit</button>
        </div>
      </div>
    );
  }
}

export default StepFour;
