/**
   * Выполняется только при полной загрузке HTML
*/
document.addEventListener("DOMContentLoaded", function(){
    document.querySelector('.edit__task-edit').style.display = 'none';
    /** 
        * Создается массив @param {Array} tasks, где будут содержаться или уже содержатся задачи
        * Если в веб-хранилище уже есть задачи, то они парсятся из JSON, передаются в массив tasks и выводятся в левый угол через getActualTasks()
    */
    let tasks = [];
    if(localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'));
        getActualTasks();
    }
    document.querySelector('.edit__add-form button').addEventListener('click', ()=>{
        let getAddTaskValue = document.querySelector('.edit__add-form textarea').value;
        addTask(getAddTaskValue);
        document.querySelector('.edit__add-form textarea').value = '';
    });
    document.querySelector('.list-search input').addEventListener('keyup', ()=>{
        let searchValue = document.querySelector('.list-search input').value;
        searchTask(searchValue);
    });
    let getTaskId;
    function editItemsHide(){
        document.querySelector('.edit__task-show').style.display = '';
        document.querySelector('.edit__task-edit textarea').style.display = 'none'; 
        document.querySelector('.edit__task-edit select').style.display = 'none'; 
        document.querySelector('.edit-ok').style.display = 'none'; 
        document.querySelector('.edit-cancel').style.display = 'none';
    } 
    /**
        * Взаимодействие с задачей. Для оптимизации кода используется делегирование событий
        * При клике на имя задачи, задача открывается справа в большем размере, где есть возможность её отредактировать, изменить статус
        * При клике на кнопку удаления задача удаляется и, если была открыта справа, закрывается
        * При клике на чекбокс задача переходит в статус "выполнена"
        * В каждом событии клика используются функции реализации действия, которые будут описаны ниже
     */
    function openTask(){
        for(const t of document.querySelectorAll('.task')){
            t.querySelector('.task__name').addEventListener('click', ()=>{
                if(document.querySelector('.selected')) {document.querySelector('.selected').classList.remove('selected');}
                t.classList.add('selected');
                document.querySelector('.edit__task-edit').style.display = 'block';
                getTaskId = t.getAttribute('task_id');
                getTaskId = getTaskId - 1;
                editItemsHide();
                document.querySelector('.edit__task-show p').textContent = tasks[getTaskId].text;
                document.querySelector('.edit__button').addEventListener('click', ()=>{
                    document.querySelector('.edit__task-edit textarea').style.display = ''; 
                    document.querySelector('.edit__task-edit select').style.display = ''; 
                    document.querySelector('.edit-ok').style.display = ''; 
                    document.querySelector('.edit-cancel').style.display = '';
                    document.querySelector('.edit__task-show').style.display = 'none';
                    document.querySelector('.edit__task-edit textarea').value = tasks[getTaskId].text;
                    document.querySelector('.edit-ok').addEventListener('click', ()=>{
                        editTask(getTaskId);
                        document.querySelector('.edit__task-edit').style.display = 'none';
                    });
                    document.querySelector('.edit-cancel').addEventListener('click', ()=>{
                        editItemsHide();
                    });
                });
            });
            t.querySelector('.task__delete-button').addEventListener('click', ()=>{
                getTaskId = t.getAttribute('task_id');
                getTaskId = getTaskId - 1;
                deleteTask(getTaskId);
                document.querySelector('.edit__task-edit').style.display = 'none';
                getActualTasks();
            });
            t.querySelector('.task__checkbox').addEventListener('click', ()=>{
                getTaskId = t.getAttribute('task_id');
                getTaskId = getTaskId - 1;
                tasks[getTaskId].status = t.querySelector('.task__checkbox').checked == true ? 'processing' : 'done';
                t.querySelector('.task__checkbox').checked == true ? false : true;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                getActualTasks();
            });
        }
    }
    /**
        *  Удаление: 
        *  Удаляется 1 элемент массива начиная с @param {number} getTaskId 
        *  Перебирается весь массив @param {Array} tasks и устанавливаются новые значения ключа @param {number} id, учитывая удаление одного элемента
     */
    function deleteTask(deletedId){
        tasks.splice(getTaskId, 1);
        for(key in tasks){tasks[key].id = parseInt(key)+1;}
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    /**
        * Добавление нового элемента:
        * Создается массив @param {Array} newTask и добавляется в конец уже существующего @param {Array} tasks
        * Обновленный @param {Array} tasks преобразовывается в JSON и передается в веб-хранилище
     */
    function addTask(text){
        let getTasksLength = tasks.length;
        let date = new Date(); let month = date.getMonth(); month = month+1;
        let fullDate =  (date.getDate()<10?'0':'') + date.getDate() + '.' + month + '.' + date.getFullYear() + '/' + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes();
        let newTask = {
            "id": getTasksLength+1,
            "text": text,
            "status": "wait",
            "date": fullDate,
        }
        tasks.push(newTask);
        getActualTasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    /**
         * Редактирование:
         * Меняется ключ @param {string} text массива @param {number} id на значение @param {string} editedText
         * Измененный @param {Array} tasks преобразовывается в JSON и передается в веб-хранилище
     */
    function editTask(id){
        let editedText = document.querySelector('.edit__task-edit textarea').value;
        let editedStatus = document.querySelector('.edit__task-edit select').value;
        tasks[id].text = editedText, tasks[id].status = editedStatus;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        getActualTasks();
    }
    /**
        * Передаваемый в функцию текст и текст всех задач преобразовываются в текст нижнего регистра
        * Те задачи, где не содержится введенный текст, скрываются, остальные - остаются
        * При пустом поле ввода выводятся все задачи
     */
    function searchTask(input){
        for(const someTask of document.querySelectorAll('.task')){
            someTask.style.display = '';
            if(someTask.querySelector('.task__name').textContent.toLowerCase().includes(input.toLowerCase()) == false){
                someTask.style.display = 'none';
            }
            else if(input == ''){someTask.style.display = '';}
        }
    }
    /**
        * В цикле перебирается @param {Array} tasks и каждая итерация выводит по одной задаче в @param {element} .all-tasks
        * @param {element} .all-tasks скроллится вниз к самой последней задаче
     */
    function getActualTasks(){
        document.querySelector('.all-tasks').innerHTML = '';
        for(const c in tasks){
            let status;
            switch(tasks[c].status){
                case 'wait': status = 'ожидает'; 
                break;
                case 'processing': status ='в процессе';
                break;
                case 'done': status = 'выполнена';
                break;
            }
            document.querySelector('.all-tasks').innerHTML += `
            <div class="task t${tasks[c].id}" task_id="${tasks[c].id}">
                <div class="task__name">${tasks[c].text}</div>
                <div class="task__status ${tasks[c].status}">${status}</div>
                <div class="task__delete-button" task_id="${tasks[c].id}">
                    <span></span>
                    <span></span>
                </div>
                <div class="task__checkbox"><input type="checkbox" ${tasks[c].status =='done' ? 'checked' : ''}></div>
            </div>
            `;
        }
        let getPos = document.querySelector('.t'+tasks[tasks.length-1].id).offsetTop;
        document.querySelector('.all-tasks').scrollTo({top: getPos, behavior: "smooth"});
        openTask();
    }
});