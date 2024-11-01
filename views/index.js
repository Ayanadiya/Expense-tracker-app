const form=document.getElementById('expense');
form.addEventListener("submit",function(event){
    event.preventDefault();
    const list=document.querySelector('ul');
    const newli=document.createElement('li');
    newli.className="list-group-item";
    const expenseEvent=event.target.expenseevent.value;
    const amount=event.target.amount.value;
    const type=event.target.expensetype.value;
    let Expensedetails={
        expenseEvent,
        amount,
        type,
      };
        let Expensedetails_serialized=JSON.stringify(Expensedetails);
      localStorage.setItem("ExpenseDetails",Expensedetails_serialized);
    newli.textContent=expenseEvent+"-"+amount+"-"+type
    const dltbtn=document.createElement('button')
    dltbtn.type="button"
    dltbtn.className='delete-btn';
    dltbtn.textContent="Delete";
    dltbtn.onclick=()=>{
        localStorage.removeItem("ExpenseDetails");
        list.removeChild(newli);
      }
    newli.appendChild(dltbtn);
    const editbtn=document.createElement('button');
    editbtn.type="button"
    editbtn.textContent="Edit";
    editbtn.onclick=()=>{
        document.getElementById('expenseevent').value=Expensedetails.expenseEvent;
        document.getElementById('amount').value=Expensedetails.amount;
        document.getElementById('expensetype').value=Expensedetails.type;
        localStorage.removeItem(event.expenseEvent);
        list.removeChild(newli);
      }
    newli.appendChild(editbtn);
    list.appendChild(newli);
    document.getElementById('expenseevent').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('expensetype').selectedIndex = 0;
  
})