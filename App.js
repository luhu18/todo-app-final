import { savedTasks,loadsTasks } from './localStorage.js';
import { createNewTask } from './tasks.js';

import { taskList, itemsLeft,filterBtn,clearCompleted,newTaskInput,toggleButton, applyFilter,updateUI } from './dom.js';

const createTaskWithDependcies = (taskText, isLoadedCompleted = false) =>{
       createNewTask(
         taskList,
         taskText,
         itemsLeft,
         applyFilter,
         saveAndRefresh,
         isLoadedCompleted
       );
};

const initializeApp = () =>{
     
    loadsTasks(createTaskWithDependcies);
    updateUI(taskList,itemsLeft);

    const activeFilterBtn = document.querySelector('.filter-tab.active')?.getAttribute('data-filter') || 'all';
    applyFilter(activeFilterBtn);
};

const saveAndRefresh = () => {
    updateUI(taskList,itemsLeft);
    savedTasks(taskList);
};

filterBtn.forEach(button => {
    button.addEventListener('click', function (e) {
        const currentActiveBtn = document.querySelector('.filter-tab.active');
        if(currentActiveBtn){
        
            currentActiveBtn.classList.remove('active');

        }
        e.target.classList.add('active');

        const activeFilter = e.target.getAttribute('data-filter');
        applyFilter(activeFilter);
    });
});

const clearCompletdTasks = () => {
    const tasks = taskList.querySelectorAll('.task-item.completed');

    tasks.forEach( task =>{
        task.remove();
    });

     saveAndRefresh();
};

clearCompleted.addEventListener('click', clearCompletdTasks);


newTaskInput.addEventListener('keypress', function (e){
    if(e.key === 'Enter'){
        e.preventDefault();
        createTaskWithDependcies(newTaskInput.value);
             newTaskInput.value = '';

        saveAndRefresh();
  
    }
});


// Temp working on drag logicgi

const getDragAfterElement = (container, y) => {
    const draggableElement = [...container.querySelectorAll('.task-item:not(.dragging)')];

    return draggableElement.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if(offset < 0 && offset > closest.offset){
            return {offset: offset, element: child};
        }else{
            return closest;
        }
    }, {offset: -Infinity}).element;
};

taskList.addEventListener('dragover', e => {
    e.preventDefault();

    const afterElement = getDragAfterElement(taskList, e.clientY);
    const draggable = document.querySelector('.dragging');

    taskList.querySelectorAll('.task-item.drag-over').forEach(item => {
        item.classList.add('drag-over');
    });

    if(afterElement == null){
        taskList.appendChild(draggable);
    }else {
        taskList.insertBefore(draggable,afterElement);
        afterElement.classList.remove('drag-over');
    }

});

taskList.addEventListener('drop', () => {
    const activeFilterBtn = document.querySelector('.filter-tab.active').getAttribute('data-filter');
    savedTasks(taskList);
    applyFilter(activeFilterBtn);
});

toggleButton.addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');

    localStorage.setItem('theme', isDark ? 'dark': 'light');
    toggleButton.setAttribute('aria-pressed', String(isDark));
});

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('theme') === 'dark'){
        document.body.classList.add('dark-theme');
        toggleButton.setAttribute('aria-pressed', 'true');
    }

    initializeApp();
});