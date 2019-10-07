import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './styles.scss';
import { createAccount } from '../../redux/modules/account/actions';

const CreateAccount = ({history}) => {

  const dispatch = useDispatch();
  const [iban, setIban] = useState('');
  const [currency, setCurrency] = useState('');
  const [addAccountWarning, setAddAccountWarning] = useState('');
  const accounts = useSelector((state) => state.accounts);

  const currencyOptions = ['BGN', 'USD', 'EUR'];

  let ibanIsFree = true;

  const handleAddAccount = (iban, currency) => {
    let ibanPatternTest = (/^BG\d{2}BUIN\d{14}$/).test(iban);
    let currencyPatternTest = (/^(BGN)$|^(USD)$|^(EUR)$/).test(currency);
    
    Object.values(accounts).forEach((value) => {
      if(value.iban === iban) {
        ibanIsFree = false;
      }
    });

    if(ibanPatternTest && currencyPatternTest && ibanIsFree) {
      dispatch(createAccount(iban, currency));
      setAddAccountWarning('');
      setIban('');
      setCurrency('');
      history.push('/');
    }
    else {
      if(ibanIsFree === false) { setAddAccountWarning('This account IBAN is already taken!'); }
      else { setAddAccountWarning('Please fill in the form correctly!'); }
    }
  }

  return (
    <div data-test='Create Account Component'>
      <InputField
        type='text'
        className='account-name-input'
        value={iban}
        onChange={(event) => setIban(event.target.value)}
        data-testid='Account IBAN field'
        placeholder='Choose an IBAN' />
        <p className='account-explanation' data-testid='Example IBAN paragraph'>Example: BG23BUIN45678901234567</p>
      <Dropdown
        className='currency-dropdown'
        value={currency}
        options={currencyOptions}
        onChange={(event) => setCurrency(event.value)}
        placeholder="Select a currency"
        data-testid='Currency Selector' />
      <Button buttonText='Add' onClick={() => handleAddAccount(iban, currency)} data-testid='Create Page Add Account Button'/>
      <Link className="back" to="/"><Button buttonText='Back' data-testid='Create_Back Button'/></Link>
      <p className='validation-warning' data-testid='validation-warning'>{addAccountWarning}</p>
    </div>
  )
}

export default withRouter(CreateAccount);