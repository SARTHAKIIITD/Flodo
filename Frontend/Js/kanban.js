const kanbanForm = document.querySelector("#kanban-board .task-input-container");
const kanbanInput = document.querySelector("#kanban-board .task-input-container input");

kanbanForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = kanbanInput.value.trim();
  if (taskText === "") return;
  
  console.log("Adding task:", taskText);
  document.querySelector('#todo-drp-area').innerHTML +=`
  <div class="kan-task" draggable="true" id=${taskText}>
  ${taskText}
  </div>
  `;
  kanbanInput.value = "";
});


document.addEventListener("dragstart", (e) => {

    if (e.target.classList.contains("kan-task")) {
        e.dataTransfer.setData("text", e.target.id);
    }

});

const dropAreas = document.querySelectorAll("#todo-drp-area, #in-progress-drp-area, #done-drp-area");

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