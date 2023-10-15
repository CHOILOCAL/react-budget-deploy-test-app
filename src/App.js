import { useState } from 'react';
import './App.css'
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';

function App() {

  const [id, setId] = useState('');
  const [edit, setEdit] = useState(false);

  const [alert, setAlert] = useState({show : false});

  const [initialExpenses, setInitialExpenses] = useState([
    {id: 1, charge: "렌트비", amount: 1600},
    {id: 2, charge: "교통비", amount: 400},
    {id: 3, charge: "식비", amount: 1200},
  ])
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState(0);

// 삭제
const handleDelete = (id) => {
  const newExpense = initialExpenses.filter(expense => 
    expense.id !== id
  )
  setInitialExpenses(newExpense);
  handleAlert({type: 'danger', text: "아이템이 삭제되었습니다."}); 
}

// 추가
const handleCharge = (e) => {
  setCharge(e.target.value);
}

const handleAmount = (e) => {
  setAmount(e.target.valueAsNumber)
}

// 제출
const handleSubmit = (e) => {
  e.preventDefault(); // 기본 이벤트 (새로고침) 중지
  if (charge !== '' && amount > 0) {
    if (edit) {
      // 수정이라면
      const newExpenses = initialExpenses.map(item => {
        return item.id === id ? {...item, charge, amount} : item;
      });
      setInitialExpenses(newExpenses);
      setEdit(false);
      handleAlert({type: "success", text: "아이템이 수정되었습니다. "})
    } else {
      // 새로운 객체가 맞다면
      const newExpense = {id: crypto.randomUUID(), charge, amount};
      const newExpenses = [...initialExpenses, newExpense]; // 불변성을 지켜주기 위해
      setInitialExpenses(newExpenses) 
      handleAlert({type: "success", text: "아이템이 생성되었습니다!"})
    }
    setCharge('');
    setAmount(0);
  } else {
    console.log('error !!!')
    handleAlert({type: "danger", text: "charge는 빈 값일 수 없으며 amount 값은 0보다 커야 합니다."})
  }
}

const handleAlert = ({type, text}) => {
  setAlert({ show: true, type, text});
  setTimeout(() => {
    setAlert({show: false});
  }, 7000)
};

// 수정
const handleEdit = (id) => {
  const expense = initialExpenses.find(item => item.id === id);
  const { charge, amount } = expense;
  setId(id);
  setCharge(charge);
  setAmount(amount);
  setEdit(true);
}

// 목록지우기 
const clearItems = () => {
  setInitialExpenses([]);
}

  return (
    <main className="main-container">
      
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}

      <h1>예산 계산기</h1>
      
       <div style={{backgroundColor: 'white', width: '100%', padding: '1rem'}}>
        {/* Expense Form */}
        <ExpenseForm handleSubmit={handleSubmit} handleCharge={handleCharge} charge={charge} handleAmount={handleAmount} amount={amount} edit={edit} />
      </div>
      <div style={{backgroundColor: 'white', width: '100%', padding: '1rem'}}>
        {/* Expense List */}
        <ExpenseList initialExpenses={initialExpenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems} />
      </div>

      <div style={{display: 'flex', justifyContent: 'end', marginTop: '1rem'}}>
        <p style={{fontSize: '2rem'}}>
          총지출 :
          <span>
            {initialExpenses.reduce((acc, curr) => {
              return (acc += curr.amount)
            }, 0)}
            원</span>
        </p>
      </div>
    </main >
  );
}

export default App;
