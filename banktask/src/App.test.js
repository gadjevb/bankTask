import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import App from './App';
import { Provider } from 'react-redux';
import { findByTestAttribute, testStore } from './utils';

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = mount(<Provider store={store}><MemoryRouter><App /></MemoryRouter></Provider>); // Mount insdead of shallow with Provider arround solves the problem.
  return wrapper;
}

describe('App component', () => {
    
  let wrapper;
  beforeEach(() => {
    const initialState = {
      accounts: {
        _u70nyuzcq: {
          id: '_u70nyuzcq',
          iban: 'BG12BUIN12341234567891',
          currency: 'BGN',
          balance: '5678.00',
          history: [
            {
              date: '05.01.2018',
              debit: '500.00',
              credit: ''
            },
            {
              date: '05.02.2018',
              debit: '500.00',
              credit: ''
            },
            {
              date: '05.03.2018',
              debit: '500.00',
              credit: ''
            },
            {
              date: '05.04.2018',
              debit: '500.00',
              credit: ''
            },
            {
              date: '05.05.2018',
              debit: '500.00',
              credit: ''
            },
            {
              date: '05.06.2018',
              debit: '500.00',
              credit: ''
            },
            {
              date: '05.07.2018',
              debit: '500.00',
              credit: ''
            },
            {
              date: '05.08.2018',
              debit: '500.00',
              credit: ''
            },
            {
              date: '05.09.2018',
              debit: '500.00',
              credit: ''
            },
            {
              date: '05.10.2018',
              debit: '500.00',
              credit: ''
            }
          ]
        },
        _wi2ozmsx9: {
          id: '_wi2ozmsx9',
          iban: 'BG12BUIN12341234567892',
          currency: 'USD',
          balance: '3456.00',
          history: [
            {
              date: '05.01.2019',
              debit: '500.00',
              credit: ''
            },
            {
              date: '06.01.2019',
              debit: '',
              credit: '500.00'
            },
            {
              date: '05.02.2019',
              debit: '500.00',
              credit: ''
            },
            {
              date: '06.02.2019',
              debit: '',
              credit: '500.00'
            },
            {
              date: '05.03.2019',
              debit: '500.00',
              credit: ''
            },
          ]
        },
        _bousuqei6: { id: '_bousuqei6', iban: 'BG12BUIN12341234567893', currency: 'EUR', balance: '2345.00', history: [] }
      }
    };
    wrapper = setUp(initialState);
  });

  it('Should render a transaction section router component', () => {
    const transactionRouter = findByTestAttribute(wrapper, 'Transaction Page Route');
    expect(transactionRouter.length).toBe(1);
  });

  it('Should render a create account page router component', () => {
    const createAccountRouter = findByTestAttribute(wrapper, 'Create Account Page Route');
    expect(createAccountRouter.length).toBe(1);
  });
});