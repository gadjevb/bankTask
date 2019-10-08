import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './styles.scss';
import { deleteAccount, updateAccount } from '../../redux/modules/account/actions';
import History from '../../components/History/History';

const Transaction = () => {

  const dispatch = useDispatch();
  const [id, setId] = useState(''); 
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [warning, setWarning] = useState('');
  const [submitWarning, setSubmitWarning] = useState('');
  const accounts = useSelector((state) => state.accounts);
  
  const accountOptions = Object.keys(accounts).map((key) => {return {value: key, label: accounts[key]['iban']}});

  const transactionOptions = ['Deposit', 'Withdraw'];
  
  const moneyInput = (input) => {
    const pattern = /^[0-9]+([.,][0-9]{0,2})?$/;
    if(pattern.test(input)) {
      setAmount(input);
      setWarning('');
    }
    else {
      if(input === '') { setAmount(''); }
      setWarning('Please follow the specified format!')
    }
  }

  const handleSubmit = (id, amount, transactionType) => {
    let idPatternTest = (/_\w{9}/).test(id);
    let amountPatternTest = (/^[0-9]+([.,][0-9]{0,2})?$/).test(amount);
    let transactionTypePatternTest = (/^(Deposit)$|^(Withdraw)$/).test(transactionType);
    if(idPatternTest && amountPatternTest && transactionTypePatternTest) {
      dispatch(updateAccount(id, amount, transactionType));
      setAmount('');
      setTransactionType('');
      setSubmitWarning('');
    }
    else {
      setSubmitWarning('Please fill all the form fields correctly!');
    }
  }

  const onDeleteClick = () => {
    if(!(/_\w{9}/).test(id)) {
      setSubmitWarning('Please select an account to delete!')
    }
    else {
      if(window.confirm('Do you really want to remove this bank account?')) {
        dispatch(deleteAccount(id));
        setSubmitWarning('');
        setId('');
      }
    }
  }

  const balanceLabel = (id) => {
    if((/_\w{9}/).test(id)) {
      return `${accounts[id].currency} ${accounts[id].balance}`;
    }
    else {
      return '';
    }
  }

  return (
        <div data-testid='transactionComponent'>
            <Dropdown
              className='accounts-dropdown'
              options={accountOptions} value={(/_\w{9}/).test(id) ? accounts[id]['id'] : ''}
              onChange={(event) => {
                setId(event.value);
                }}
              placeholder="Select an account"
              data-testid='Account Selector' />
            <InputField
              type='text'
              className='money-input'
              value={amount}
              onChange={(event) => moneyInput(event.target.value)}
              data-testid='Money Input field'
              placeholder='Format: 500.00'
              data-testid='Money Amount Input' />
            <div className='warning' data-testid='Amount Warning Paragraph'>{warning}</div>
            <Dropdown
              className='transaction-dropdown'
              value={transactionType}
              options={transactionOptions}
              onChange={(event) => setTransactionType(event.value)}
              placeholder="Type"
              data-testid='Transaction Selector' />
            <Button
              onClick={() => handleSubmit(id, amount, transactionType)}
              data-testid='buttonComponentParent'
              buttonText='Submit' />
            <Link className="addAccount" to="/create" data-testid='Add account page link'>
              <Button
                data-testid='Add Button'
                buttonText='Add an account' />
            </Link>
            <Button 
              onClick={onDeleteClick}
              data-testid='deleteButtonComponent'
              buttonText='Delete Account'/>
            <p className='balance-section' data-testid='currentBalance'>Current balance: {balanceLabel(id)} </p>
            <p className='submit-warning' data-testid='submitWarning'>{submitWarning}</p>
            <History history={(/_\w{9}/).test(id) ? accounts[id].history : []} data-testid='History Component'/>
        </div>
    );
}

export default Transaction;