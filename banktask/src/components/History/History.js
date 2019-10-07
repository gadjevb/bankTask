import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const History = ({history, 'data-testid': dataTestId}) => {

  const rows = history.map((row, index) => {
    return (
      <tr key={index}>
        <td className='date'>{row.date}</td>
        <td className='debit'>{row.debit}</td>
        <td className='credit'>{row.credit}</td>
      </tr>
    )
  })
  
  return (
    <div className='container' data-testid={`${dataTestId} Primitive`}>
      <table data-testid='Table Primitive'>
        <thead data-testid='Table Head Primitive'>
          <td data-testid='Date Column Header'>Date</td>
          <td data-testid='Deposit Column Header'>Debit</td>
          <td data-testid='Withdraw Column Header'>Credit</td>
        </thead>

        <tbody data-testid='Table Body Primitive'>
         {rows}
        </tbody>
      </table>
    </div>
  )
}

History.propTypes = {
  history: PropTypes.array.isRequired,
  'data-testid': PropTypes.string.isRequired
};

export default History;