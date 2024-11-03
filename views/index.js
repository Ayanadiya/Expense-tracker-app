const form=document.getElementById('expense');
const expenselist=document.querySelector('ul');
let editing=null;

window.addEventListener('DOMContentLoaded', () =>{
  axios.get('http://127.0.0.1:3000/expenses')
  .then(result => {
    const expenses=result.data
    expenselist.innerHTML='';
    expenses.forEach(expense => {
      updatelist(expense);
    })
  })
  .catch(err => console.log(err))
});

form.addEventListener("submit",function(event){
    event.preventDefault();
    const expenseEvent=event.target.expenseevent.value;
    const amount=event.target.amount.value;
    const type=event.target.expensetype.value;
    if (!expenseEvent || !amount || !type)
       {
        alert("Please fill in all fields.");
        return;
      }
    let Expensedetails={
        expenseEvent,
        amount,
        type
      };
      console.log(Expensedetails);
      if(editing)
      {
        axios.put(`http://127.0.0.1:3000/expenses/edit-expense/${editing}`,Expensedetails)
        .then(result => {
          const expense=result.data;
          location.reload();
        })
        .catch(err => console.log(err))
        editing=null;
      }
      else
      {
        axios.post(`http://127.0.0.1:3000/expenses/add-expense`, Expensedetails)
      .then(result => {
        if(result)
        {
          location.reload();
        }
      })
      .catch(err => console.log(err))
      }
      
      document.getElementById('expenseevent').value = '';
      document.getElementById('amount').value = '';
      document.getElementById('expensetype').selectedIndex = 0; 
})

function deleteexpense(id, expense){
  axios.delete(`http://127.0.0.1:3000/expenses/delete-expense/${id}`)
  .then(res =>{
    if(res.status===204)
    {
      location.reload();
    }
  })
  .catch(err => console.log(err));
};

function editexpense(id, expense){
  editing=id;
  document.getElementById('expenseevent').value=expense.expense;
  document.getElementById('amount').value=expense.amount;
  document.getElementById('expensetype').value=expense.category;
};

function updatelist(expense){
  const newli=document.createElement('li');
        newli.className="list-group-item";
        newli.textContent=`${expense.expense}-${expense.amount}-${expense.category}`
        const dltbtn=document.createElement('button');
        dltbtn.type="button"
        dltbtn.className='delete-btn';
        dltbtn.textContent="Delete";
        dltbtn.onclick= () => deleteexpense(expense.id, expense);
        const editbtn=document.createElement('button');
        editbtn.type="button"
        editbtn.textContent="Edit";
        editbtn.onclick= () => editexpense(expense.id, expense);
        newli.appendChild(editbtn);
        newli.appendChild(dltbtn);
        expenselist.appendChild(newli);
}