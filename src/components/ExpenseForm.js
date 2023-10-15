import React from 'react'
import './ExpenseFrom.css'
import {MdSend} from 'react-icons/md'

function ExpenseForm({handleSubmit, amount, charge, handleCharge, handleAmount, edit}) {
  return (
    <form onSubmit={handleSubmit}>
        <div className="form-center">
            <div className="form-group">
                <label htmlFor='charge'>지출 항목</label>
                <input type="text"
                className="form-control"
                id="charge" name="charge"
                placeholder="예) 렌트비"
                value={charge}
                onChange={handleCharge} />
            </div>
            <div className="form-group">
            <label htmlFor='amount'>비용</label>
                <input type="number"
                value={amount}
                onChange={handleAmount}
                className="form-control" id="amount" name="amount" placeholder="예) 100" />

            </div>
        </div>
        <button type="submit" className="btn">
            {edit ? "수정" : "제출"} <MdSend className="btn-icon"/>
        </button>
    </form>
  )
}

export default ExpenseForm
