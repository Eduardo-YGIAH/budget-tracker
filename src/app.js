import { subtract, add, valuesTotal } from './calculations';
import { balanceEl, expenseEl, expensesListEl, expensesChart, priceEl, submitBtn, resetBtn } from './elements';
import { depValueEl, depositEl, depositListEl, addDepositBtn, clearDepositsBtn } from './depositElements';
import { updateChart, resetChart } from './expenseChart';
import { postData, getData, deleteData } from './api';

const expenseInputError = document.querySelector('.expense-errors');
const depositInputError = document.querySelector('.deposit-errors');
const total = 2000;
window.addEventListener('load', event => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }

  balanceEl.innerText = total;
  depositEl.value = '';
  depValueEl.value = '';
  depositListEl.innerHTML = '';
  expensesListEl.innerHTML = '';
  expenseEl.value = '';
  priceEl.value = '';
  resetChart(expensesChart);
  getData('/api/data')
    .then(data => {
      const expenses = data.expenses;
      const deposits = data.deposits;
      expenses.forEach(expense => {
        addToList(expense.name, expense.value / 100);
        updateChart(expensesChart, expense.name, expense.value / 100);
      });
      deposits.forEach(deposit => {
        addToDepositsList(deposit.name, deposit.value / 100);
      });
      const expTotal = valuesTotal(expenses);
      const depTotal = valuesTotal(deposits);
      console.log('TOTAL EXPENSES:', expTotal);
      console.log('TOTAL DEPOSITS:', depTotal);
      balanceEl.innerText = total - expTotal + depTotal;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function addToList(name, price) {
  expensesListEl.innerHTML += `<li class="list-group-item">Name: ${name}
    <span class="ml-4">Price: ${price}</span></li>`;
}

function submit(e) {
  e.preventDefault();
  postData('/api/expense', { name: expenseEl.value, value: priceEl.value })
    .then(expense => {
      console.log(expense);
      if (expense.errors) {
        const alert = document.createElement('DIV');
        alert.innerText = expense.message;
        alert.classList.add('alert', 'alert-danger');
        alert.setAttribute('role', 'alert');
        expenseInputError.appendChild(alert);
        clearErrorMessg(expenseInputError, alert);
      } else {
        const cost = expense.value / 100;
        const total = subtract(Number(balanceEl.innerText), cost);
        balanceEl.innerText = total;
        addToList(expense.name, cost);
        updateChart(expensesChart, expense.name, cost);
        expenseEl.value = '';
        priceEl.value = '';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

async function reset(e) {
  e.preventDefault();
  try {
    await deleteData('/api/expense');
    depositEl.value = '';
    depValueEl.value = '';
    depositListEl.innerHTML = '';
    expensesListEl.innerHTML = '';
    expenseEl.value = '';
    priceEl.value = '';
    resetChart(expensesChart);
    balanceEl.innerText = 0;
    const data = await getData('/api/data');
    const expenses = data.expenses;
    const deposits = data.deposits;
    expenses.forEach(expense => {
      addToList(expense.name, expense.value / 100);
      updateChart(expensesChart, expense.name, expense.value / 100);
    });
    deposits.forEach(deposit => {
      addToDepositsList(deposit.name, deposit.value / 100);
    });
    const expTotal = valuesTotal(expenses);
    const depTotal = valuesTotal(deposits);
    balanceEl.innerText = total - expTotal + depTotal;
  } catch (e) {
    console.error(e);
  }
}

submitBtn.onclick = submit;
resetBtn.onclick = reset;

function addToDepositsList(name, price) {
  depositListEl.innerHTML += `<li class="list-group-item">Name: ${name}
    <span class="ml-4">Value: ${price}</span></li>`;
}

function addDeposit(e) {
  e.preventDefault();
  postData('/api/deposit', { name: depositEl.value, value: depValueEl.value })
    .then(deposit => {
      console.log(deposit);
      if (deposit.errors) {
        const alert = document.createElement('DIV');
        alert.innerText = deposit.message;
        alert.classList.add('alert', 'alert-danger');
        alert.setAttribute('role', 'alert');
        depositInputError.appendChild(alert);
        clearErrorMessg(depositInputError, alert);
      } else {
        const value = deposit.value / 100;
        const total = add(balanceEl.innerText, value);
        balanceEl.innerText = total;
        addToDepositsList(depositEl.value, value);
        depositEl.value = '';
        depValueEl.value = '';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

async function clearDeposits(e) {
  e.preventDefault();
  try {
    await deleteData('/api/deposit');
    depositEl.value = '';
    depValueEl.value = '';
    depositListEl.innerHTML = '';
    expensesListEl.innerHTML = '';
    expenseEl.value = '';
    priceEl.value = '';
    resetChart(expensesChart);
    balanceEl.innerText = 0;
    const data = await getData('/api/data');
    const expenses = data.expenses;
    const deposits = data.deposits;
    expenses.forEach(expense => {
      addToList(expense.name, expense.value / 100);
      updateChart(expensesChart, expense.name, expense.value / 100);
    });
    deposits.forEach(deposit => {
      addToDepositsList(deposit.name, deposit.value / 100);
    });
    const expTotal = valuesTotal(expenses);
    const depTotal = valuesTotal(deposits);
    balanceEl.innerText = total - expTotal + depTotal;
  } catch (e) {
    console.error(e);
  }
}

function clearErrorMessg(parent, child) {
  setTimeout(function() {
    parent.style.opacity = '0';
    parent.removeChild(child);
  }, 4000);
}

addDepositBtn.onclick = addDeposit;
clearDepositsBtn.onclick = clearDeposits;

//   if (response.status === 204) {
//     balanceEl.innerText = total;
//     expensesListEl.innerHTML = '';
//     expenseEl.value = '';
//     priceEl.value = '';
//     resetChart(expensesChart);
//   } else if (response.errors) {
//     const alert = document.createElement('DIV');
//     alert.innerText = response.message;
//     alert.classList.add('alert', 'alert-danger');
//     alert.setAttribute('role', 'alert');
//     expenseInputError.appendChild(alert);
//     clearErrorMessg(expenseInputError, alert);
//   } else {
//     const alert = document.createElement('DIV');
//     alert.innerText = 'Something went wrong! Please refresh the page and try again. ';
//     alert.classList.add('alert', 'alert-danger');
//     alert.setAttribute('role', 'alert');
//     expenseInputError.appendChild(alert);
//     clearErrorMessg(expenseInputError, alert);
//   }
