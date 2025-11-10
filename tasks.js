export const createNewTask = (taskList, taskText, itemsLeft,applyFilter,saveAndRefresh, isLoadedCompleted) =>{
    if(!taskText || taskText.trim() === ''){
        alert('Invalid Task please Enter a valid task');
        return;
    }

    const taskItem = document.createElement('li');
    let currentFilter = 'active';

    if(isLoadedCompleted === true || isLoadedCompleted === 'true'){
        taskItem.classList.add('completed');
        taskItem.setAttribute('data-filter', 'completed');
    }

    taskItem.classList.add('task-item');
    taskItem.setAttribute('data-filter', currentFilter);
    taskItem.setAttribute('data-visible', 'true');
    taskItem.setAttribute('draggable', 'true');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isLoadedCompleted === true || isLoadedCompleted === 'true';
    checkbox.classList.add('checkbox-input');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'X';

    const createTaskEl = document.createElement('span');
    createTaskEl.classList.add('task-text');
    createTaskEl.innerText = taskText;

    //################ Task dragging logics ##################

    taskItem.addEventListener('dragstart', (event)=>{
        event.dataTransfer.setData('text/plain', taskText);
        taskItem.classList.add('dragging');
    });

    taskItem.addEventListener('dragend', ()=>{
        taskItem.classList.remove('dragging');
    });

    taskItem.addEventListener('dragover', (event)=>{

        event.preventDefault();
        taskItem.classList.add('drag-over');

    });

    taskItem.addEventListener('dragleave', ()=>{
        taskItem.classList.remove('drag-over');
    });

    taskItem.addEventListener('drop', (event) => {
        event.stopPropagation();
        taskItem.classList.remove('drag-over');
    });


    checkbox.addEventListener('change', function (){
        if(this.checked){
            taskItem.classList.add('completed');
            taskItem.setAttribute('data-filter', 'completed');
        }else{
            taskItem.classList.remove('completed');
            taskItem.setAttribute('data-filter', currentFilter);
        }
        const activeFilterBtn = document.querySelector('.filter-tab.active').getAttribute('data-filter');
        applyFilter(activeFilterBtn);
       saveAndRefresh();
    });

    deleteBtn.addEventListener('click', function () {
        taskItem.remove(); 

       saveAndRefresh();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(createTaskEl);
    taskItem.appendChild(deleteBtn);

    taskList.prepend(taskItem);
};