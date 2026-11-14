async function getKanban(){
   try{
    const response = await fetch(`/kanban/get/${user.id}`);
    const data = await response.json(); 
    if(!response.ok){
      alert(data.message);
      throw new Error(data.message || 'Something went wrong');
    }
    localStorage.setItem('kanban',JSON.stringify(data.kanban) || '[]');
  }
    catch(err){
      console.log(err);
    }
}

const dropAreas = document.querySelectorAll("#todo-drp-area, #in-progress-drp-area, #done-drp-area");

async function displayKanban(){
  await getKanban();
  const kanban = JSON.parse(localStorage.getItem('kanban')) || [];
  dropAreas.forEach(area => {
    area.innerHTML = ``;
  });
  for(let i = 0; i < kanban.length; i++){
    const newItem = `<div class="kan-task" draggable="true" data-id="${kanban[i].id}">
      ${kanban[i].name}
      </div>`;

    if(kanban[i].status == 'todo'){
      document.querySelector('#todo-drp-area').innerHTML += newItem;
    }
    else if(kanban[i].status == 'in-progress'){
      document.querySelector('#todo-drp-area').innerHTML += newItem;
    }
    else{
      document.querySelector('#done-drp-area').innerHTML += newItem;
    }
    
  }
};

displayKanban();
const kanbanForm = document.querySelector("#kanban-board .task-input-container");
const kanbanInput = document.querySelector("#kanban-board .task-input-container input");

kanbanForm.addEventListener("submit", async(e) => {
  e.preventDefault();
  const taskText = kanbanInput.value.trim();
  if (taskText === "") return;
  
  try{
    const response = await fetch(`/kanban/post/${user.id}`, {
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        taskText
      })
    });
    const data = await response.json();
    if(!response.ok){
      throw new Error('Something went wrong' || data.message);
    }
    console.log("task added:", taskText);
    document.querySelector('#todo-drp-area').innerHTML +=`
    <div class="kan-task" draggable="true" id=${taskText}>
    ${taskText}
    </div>
    `;
    kanbanInput.value = "";
  }
  catch(err){
    console.log(`unable to send data!`);
  }
});


document.addEventListener("dragstart", (e) => {

    if (e.target.classList.contains("kan-task")) {
        e.dataTransfer.setData("text", e.target.id);
    }

});


dropAreas.forEach(area => {

    area.addEventListener("dragover", function(e) {
        e.preventDefault();
    });

    area.addEventListener("drop", function(e) {
        e.preventDefault();

        const cardId = e.dataTransfer.getData("text");
        const draggedCard = document.getElementById(cardId);

        area.appendChild(draggedCard);
    });

});