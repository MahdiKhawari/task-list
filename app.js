// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


// Load all event listener
loadEventListeners();

function loadEventListeners() {
  // DOM Load event 
  document.addEventListener('DOMContentLoaded', getTasks)
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks event
  filter.addEventListener('keyup', filterTasks)
}

//get tasks from ls
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task) => {
      //create li element
      const li = document.createElement("li");
      //add class
      li.className = "collection-item";
      //create text node and append child
      li.appendChild(document.createTextNode(task));
      //create new link element
      const link = document.createElement("a");
      //add class
      link.className = "delete-item secondary-content";
      //add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      //append the link to li
      li.appendChild(link);

      //append li to ul
      taskList.appendChild(li);
    })
}

// add task
function addTask(e) {
if(taskInput.value === '') {
  alert('Add a task');
}

//create li element
const li = document.createElement('li');
//add class
li.className = 'collection-item';
//create text node and append child
li.appendChild(document.createTextNode(taskInput.value))
//create new link element
const link = document.createElement('a');
//add class
link.className ='delete-item secondary-content';
//add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';
//append the link to li
li.appendChild(link);

//append li to ul
taskList.appendChild(li);

//store in local storage
storeTaskInLocalStorage(taskInput.value);

//clear input
taskInput.value ='';


  e.preventDefault();
} 

//store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks))
}


function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      //remove from local storage
      removeTAskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  
}

//remove from local storage function 
function removeTAskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task, index) => {
      if(taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks(e) {
  // if(confirm('Are you sure to delet all tasks?')){
  //   taskList.innerHTML = '';
  // }
  
  //faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}


//clear tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach((task) => {
 const item = task.firstChild.textContent;
 if(item.toLocaleLowerCase().indexOf(text) != -1){
   task.style.display = 'block';
 }else {task.style.display = 'none';}
  })

  console.log()
}