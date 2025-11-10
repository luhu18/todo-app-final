// import { taskList } from './dom.js';


export const savedTasks = (taskList) => {
    const currentTasks =Array.from( taskList.querySelectorAll('.task-item'));

    const taskData = currentTasks.map( item =>{
        return {
             text: item.querySelector('.task-text').innerText,
             status: item.getAttribute('data-filter'),
             isComplete: item.classList.contains('completed'),
        };
    });

    const jsonString = JSON.stringify(taskData);
    localStorage.setItem('tasks', jsonString);
};

export const loadsTasks = (createNewTask) => {
    const jsonString = localStorage.getItem('tasks');

    if(jsonString){
        const savedTask = Array.from(JSON.parse(jsonString));
        savedTask.forEach(taskData => {
             createNewTask(taskData.text, taskData.isComplete);
        });
    }
};