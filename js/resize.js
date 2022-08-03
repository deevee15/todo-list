document.addEventListener("DOMContentLoaded", function(){
    /**
        * При нажатии кнопкой мыши на @param {element} list запускается функция изменения ширины списка наименований
        * При отпускании ЛКМ останавливается функция изменения ширины
        */
    let list = document.querySelector('.list');
    document.querySelector('.list-resize').addEventListener('mousedown', startResize, false);
    function blockResize(e){
        list.style.width = (e.clientX - list.offsetLeft) + 'px';
    }
    function startResize(){
        window.addEventListener("mousemove", blockResize, false);
        window.addEventListener("mouseup", stopResize, false);  
    }
    function stopResize(){
        window.removeEventListener("mousemove", blockResize, false);
        window.removeEventListener("mouseup", stopResize, false);  
    }
});