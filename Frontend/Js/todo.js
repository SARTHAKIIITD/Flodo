const user = JSON.parse(localStorage.getItem("user"));

let todoList =[];

const clearAllbtnContainer = document.querySelector('.clear-all-btn-container');
const clearAllbtn = document.querySelector('#clear-all-btn');

async function displayTodos(){
  document.querySelector('.list-display').innerHTML =``;
  try{
    const response = await fetch(`/todo/get/${user.id}`);
    const data = await response.json();
    if(!response.ok){
      throw new Error('Unable to get your todo list');
    }
    todoList = data.todoList;
    console.log(todoList);
  }
  catch(err){
    console.error(err);
  }

  if(todoList.length > 0){
    for(let i = 0; i< todoList.length; i++){
      document.querySelector('.list-display').innerHTML +=`
      <div class= 'item-container'>
      <span>${todoList[i]}</span>
      <button data-index = "${i}">delete</button> 
      </div>
      `;
    }
    clearAllbtnContainer.classList.add('active-clear-all-btn-container');

    document.querySelectorAll('.item-container button').forEach(button => {
      button.addEventListener('click', async() => {
        const index = Number(button.dataset.index);
        const remvItem = JSON.stringify(todoList[index]);
        try{
          const response = await fetch(`todo/delete/${user.id}/${encodeURIComponent(remvItem)}`, {
            method: 'DELETE',
          });
          const data = await response.json();
          if(!response.ok){
            throw new Error('Failed to delete all todos');
          }
          await displayTodos();
        } catch(err){
          console.error(err);
        }
      });
    });
  }
  else {
    if (clearAllbtnContainer.classList.contains('active-clear-all-btn-container')) {
        clearAllbtnContainer.classList.remove('active-clear-all-btn-container');
      }
  }
}

clearAllbtn.addEventListener('click', async() => {
    try{
      console.log('clicked');
      const response = await fetch(`/todo/delete/all/${user.id}`,{
        method: 'DELETE'
      });

      console.log('step 2 completed');
      if(!response.ok){
        throw new Error('Failed to delete all todos');
      }
    
      if (clearAllbtnContainer.classList.contains('active-clear-all-btn-container')) {
        clearAllbtnContainer.classList.remove('active-clear-all-btn-container');
      }
      await displayTodos();
    }
    catch(err){
      console.log(err);
    }
  });

document.querySelector('#add-btn').addEventListener('click', async() => {
  const taskInput = document.querySelector('#task-input');
  const itemName = taskInput.value;

  try{
    const response = await fetch(`/todo/post/${user.id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemName,
      })
    });
    const data = await response.json();
    if(!response.ok){
      throw new Error("Unable to add new todo\n", data.message);
    }
    await displayTodos();
  }catch(err){
    console.error(err);
  }
  taskInput.value = ``;
});

document.querySelector('#logout-btn').addEventListener('click', () => {
  console.log('logout button was clicked');
  localStorage.clear();
  window.location.href = '/';
});

displayTodos();