// Get todos
async function getList() {
  try{
    const response = await fetch(`/todo/get/${user.id}`);
    const data = await response.json(); 
    if(!response.ok){
      alert(data.message);
      throw new Error(data.message || 'Something went wrong');
    }
    localStorage.setItem('todoList',JSON.stringify(data.todoList) || '[]');
  }
    catch(err){
      console.log(err);
    }
}

// Display todos
async function displayList(refresh = true){
  if(refresh) await getList();
  const todoList = JSON.parse(localStorage.getItem('todoList'));
  const listDisplay = document.querySelector('.list-display');
  listDisplay.innerHTML = ``;
  if(todoList.length > 0){
    for(let i = 0; i< todoList.length; i++){
      listDisplay.innerHTML +=`
      <div class= 'item-container' data-id = "${todoList[i].id}">
      <input class="item-checkbox" type="checkbox" ${todoList[i].completed === 1 ? 'checked' : ''}>
        <div class = 'item-name-container'>
        <span>${todoList[i].todo}</span>
        <button class = "edit-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen preview-icon"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg></button> 
        </div>
        <div class = 'item-action-container'>
        <button class = "remv-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x preview-icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button> 
        </div>
      </div>
      `;
    }
  }
}

displayList();

// Add item to todos 
document.querySelector('.add-item-container').addEventListener('submit', async(e) => {
  e.preventDefault();
  const taskInput = document.querySelector('#task-input');
  const item = taskInput.value.trim();
// Empty input
  if(!item) return;

  try{
    const response = await fetch(`/todo/post/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item,
      })
    });
    const data = await response.json();

    if(!response.ok){
      // throw new Error("Unable to add new todo\n", data.message);
      alert(data.message || 'something went wrong');
      return;
    }
    console.log(data.message);
    taskInput.value = ``;
  } 
  catch(err){
    console.log('Unable to send data');
  }
  displayList();
});

// Actions on Item
document.querySelector('.list-display').addEventListener('click', async(e) => {
  const container = e.target.closest('.item-container');
  if(!container) return;
  const todoId = container.dataset.id;
  // Edit button
  if(e.target.closest('.edit-btn')){
    const itemNameContainer = container.querySelector('.item-name-container');
    const item = itemNameContainer.querySelector('span').textContent;
    itemNameContainer.innerHTML = `
    <form>
    <input type="text" placeholder="${item}" value="${item}">
    <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check preview-icon"><path d="M20 6 9 17l-5-5"/></svg></button>
    </form>
    `;
    const editInput = itemNameContainer.querySelector('input');
    editInput.focus();
    editInput.select();
    itemNameContainer.querySelector('form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const newItem = e.target.querySelector('input').value;
      if(newItem === item){
        displayList(false);
        return;
      }
      try{
        const response = await fetch(`/todo/patch/item/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            todoId,
            newItem,
          })
        });
        const data = await response.json();
        if(!response.ok){
          throw new Error(data.message || `Something Went Wrong`);
        }
        displayList();
      }
      catch(err){
        console.error(err);
        displayList();
      }
    });
  }
  // Remove button
  else if(e.target.closest('.remv-btn')){
    try{
      const response = await fetch(`/todo/delete/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todoId,
        })
      });
      const data = await response.json();
      if(!response.ok){
        alert(data.message || 'something went wrong');
        throw new Error(data.message);
      }
    }
    catch(err){
      console.log(err);
    }
     displayList();
  }

  // Check box
  else if(e.target.closest('.item-checkbox')){
    const isCompleted = e.target.checked;
    try{
      const response = await fetch(`todo/patch/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          todoId,
          isCompleted,
        })
      });
      const data = await response.json();
      if(!response.ok){
        alert(data.message || 'Something went wrong');
        throw new Error(data.message || 'Something went wrong');
      }
    }
    catch(err){
      console.log(err);
    }
     displayList();
  }
});

// Delete all todos
document.querySelector('#clear-all-btn').addEventListener('click', async () => {
  try{

    const response = await fetch(`todo/delete/all/${user.id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if(!response.ok){
      alert(data.message);
      throw new Error(data.message || 'Something went wrong');
    }
  }
  catch(err){
    console.log(err);
  }
  displayList();
});