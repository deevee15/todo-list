<head>
    <title>TODO-list</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="todo-list">
        <div class="list">
            <div class="list-resize"></div>
            <div class="list-search">
                <input type="text" placeholder="Введите имя задачи...">
            </div>
            <div class="all-tasks"></div>
        </div>
        <div class="edit">
            <div class="edit__add-form">
                <div>Добавление задачи:</div>
                <textarea placeholder="Текст задачи..."></textarea>
                <button>Добавить</button>
            </div>
            <div class="edit__task-edit">
                <p class="edit__title">Изменить задачу: </p>
                <div class="edit__task-show">
                    <p>fafhafayfaf</p>
                    <div class="edit__button">
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px">
                            <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M42.948 12.532L10.489 44.99 3 47 5.009 39.511 37.468 7.052"/>
                            <path d="M45.749 11.134c-.005.004.824-.825.824-.825 1.901-1.901 1.901-4.983.002-6.883-1.903-1.902-4.984-1.9-6.885 0 0 0-.83.83-.825.825L45.749 11.134zM5.191 39.328L10.672 44.809 3.474 46.526z"/>
                        </svg>
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10"></textarea><br>
                <select name="" id="">
                    <option value="wait">ожидает</option>
                    <option value="processing">в процессе</option>
                    <option value="done">выполнена</option>
                </select><br>
                <button class="edit-ok">Изменить</button>
                <button class="edit-cancel">Отмена</button>
            </div>
        </div>
    </div>
    <script src="js/main.js"></script>
    <script src="js/resize.js"></script>
</body>