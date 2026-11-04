// Dark theme 
document.querySelector('#dark-mode-btn').addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});

// Menu action
document.querySelectorAll('.btn-container button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.page').forEach(pg => {
      pg.classList.remove('active-page');
    });
  if(button.id === 'dash-btn') document.querySelector('#dashboard').classList.add('active-page');
  else if(button.id === 'todo-btn') document.querySelector('#todo-list').classList.add('active-page');
  else if(button.id === 'kanban-btn') document.querySelector('#kanban-board').classList.add('active-page');
  });
});

const user = JSON.parse(localStorage.getItem('user'));
// console.log(user);

