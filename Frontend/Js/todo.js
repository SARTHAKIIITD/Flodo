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
      // alert('Unable to make contact with the server');
      console.log(err);
    }
}

// Display todos
async function displayList(){
  await getList();
  const todoList = JSON.parse(localStorage.getItem('todoList'));
  const listDisplay = document.querySelector('.list-display');
  listDisplay.innerHTML = ``;
  if(todoList.length > 0){
    for(let i = 0; i< todoList.length; i++){
      listDisplay.innerHTML +=`
      <div class= 'item-container' data-id = "${todoList[i].id}">
        <div class = 'item-name-container'>
        <input type="checkbox">
        <span>${todoList[i].todo}</span>
        </div>
        <div class = 'item-action-container'>
        <button class = "edit-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen preview-icon"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg></button> 
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

// Remove and edit an item from todo
document.querySelector('.list-display').addEventListener('click', async(e) => {
  const container = e.target.closest('.item-container');
  if(!container) return;
  const todoId = container.dataset.id;
  // Edit button
  if(e.target.closest('.edit-btn')){
    console.log(`edit button was clicked with id ${todoId}`);
  }
  // Remove button
  if(e.target.closest('.remv-btn')){
    console.log(`remove button was clicked with id ${todoId}`);
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
  }
  displayList();
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