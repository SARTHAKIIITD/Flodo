// const user = JSON.parse(localStorage.getItem("user"));

// const { error } = require("node:console");

// let todoList =[];

// const clearAllbtn = document.querySelector('#clear-all-btn');

// async function displayTodos(){
//   document.querySelector('.list-display').innerHTML =``;
//   try{
//     const response = await fetch(`/todo/get/${user.id}`);
//     const data = await response.json();
//     if(!response.ok){
//       throw new Error('Unable to get your todo list');
//     }
//     todoList = data.todoList;
//     console.log(todoList);
//   }
//   catch(err){
//     console.error(err);
//   }

  // if(todoList.length > 0){
  //   for(let i = 0; i< todoList.length; i++){
  //     document.querySelector('.list-display').innerHTML +=`
  //     <div class= 'item-container'>
  //       <div class = 'item-name-container'>
  //       <input type="checkbox">
  //       <span>${todoList[i]}</span>
  //       </div>
  //       <div class = 'item-action-container'>
  //       <button data-index = "${i}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen preview-icon"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg></button> 
  //       <button data-index = "${i}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x preview-icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button> 
  //       </div>
  //     </div>
  //     `;
  //   }

//     document.querySelectorAll('.add-item-container').forEach(button => {
//       button.addEventListener('click', async() => {
//         const index = Number(button.dataset.index);
//         const remvItem = JSON.stringify(todoList[index]);
//         try{
//           const response = await fetch(`todo/delete/${user.id}/${encodeURIComponent(remvItem)}`, {
//             method: 'DELETE',
//           });
//           const data = await response.json();
//           if(!response.ok){
//             throw new Error('Failed to delete all todos');
//           }
//           await displayTodos();
//         } catch(err){
//           console.error(err);
//         }
//       });
//     });
//   }
// }

// clearAllbtn.addEventListener('click', async() => {
//     try{
//       console.log('clicked');
//       const response = await fetch(`/todo/delete/all/${user.id}`,{
//         method: 'DELETE'
//       });

//       console.log('step 2 completed');
//       if(!response.ok){
//         throw new Error('Failed to delete all todos');
//       }
//       await displayTodos();
//     }
//     catch(err){
//       console.log(err);
//     }
//   });

// document.querySelector('#add-btn').addEventListener('click', async() => {
//   const taskInput = document.querySelector('#task-input');
//   const itemName = taskInput.value;

//   try{
//     const response = await fetch(`/todo/post/${user.id}`,{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         itemName,
//       })
//     });
//     const data = await response.json();
//     if(!response.ok){
//       throw new Error("Unable to add new todo\n", data.message);
//     }
//     await displayTodos();
//   }catch(err){
//     console.error(err);
//   }
//   taskInput.value = ``;
// });

// document.querySelector('#logout-btn').addEventListener('click', () => {
//   console.log('logout button was clicked');
//   localStorage.clear();
//   window.location.href = '/';
// });

// displayTodos();


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
  getList();
  const todoList = JSON.parse(localStorage.getItem('todoList'));
  const listDisplay = document.querySelector('.list-display');
  listDisplay.innerHTML = ``;
  if(todoList.length > 0){
    for(let i = 0; i< todoList.length; i++){
      listDisplay.innerHTML +=`
      <div class= 'item-container'>
        <div class = 'item-name-container'>
        <input type="checkbox">
        <span>${todoList[i].todo}</span>
        </div>
        <div class = 'item-action-container'>
        <button data-index = "${todoList[i].id}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen preview-icon"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg></button> 
        <button data-index = "${todoList[i].id}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x preview-icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button> 
        </div>
      </div>
      `;
    }
  }
}

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
    alert(data.message);
    taskInput.value = ``;
  } 
  catch(err){
    console.log('Unable to send data');
  }
});


displayList();