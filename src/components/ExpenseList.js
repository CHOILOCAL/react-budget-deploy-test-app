import React from 'react'
import './ExpenseList.css'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'

function ExpenseList({initialExpenses, handleDelete, handleEdit, clearItems}) {

  return (
    <>
    <ul className='list'>
        {/* Expnse Item */}
        {initialExpenses.map((expense) => {
            return (
                <ExpenseItem expense={expense} key={expense.id} handleDelete={handleDelete} handleEdit={handleEdit} />
            )
        })}
    </ul>
    {initialExpenses.length > 0 && (
    <button className="btn" onClick={clearItems}>
        목록 지우기
        <MdDelete className='btn-icon'/>
    </button>
    )}
    </>
  )
}

export default ExpenseList
