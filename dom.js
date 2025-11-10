export const taskList = document.getElementById('task-list');
export const newTaskInput = document.getElementById('new-task-input');
export const toggleButton = document.getElementById('toggle-theme');
export const itemsLeft = document.getElementById('items-left');
export const clearCompleted = document.getElementById('clear-completed');
export const filterBtn = document.querySelectorAll('.filter-tab');

export const updateUI = (taskList, itemsLeft) => {
    const currentTasks = taskList.querySelectorAll('.task-item');

    const ActiveTasks = Array.from(currentTasks).filter(task => {
        return !task.classList.contains('completed');
    });

    const count = ActiveTasks.length;

    const itemword = count <= 1 ? 'item' : 'items';
    itemsLeft.innerText = `${count} ${itemword} left`;

    const placeHolder = taskList.querySelector('.placeholder');

    placeHolder.style.display = count === 0 ? 'block': 'none';
};

export const applyFilter = (filterValue) => {

    
    const currentTasks = Array.from(document.querySelectorAll('.task-item'));
    
    currentTasks.forEach(task =>{

        const taskStatus = task.getAttribute('data-filter');
        let shouldShow = (filterValue === 'all' || taskStatus === filterValue);

        task.setAttribute('data-visible', shouldShow ? 'true': 'false');
    
    });

};