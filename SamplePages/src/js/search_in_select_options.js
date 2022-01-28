let searchInput = document.getElementById('elastic');
let elasticBlock = document.querySelector('.form-select-store');
let elasticItems = document.querySelectorAll('.fss-option'); //нам не нужен сам список, нам нужны элементы списка
let buttonRow = document.querySelector('.button-row');
let shim = document.querySelector('.shim');
searchInput.oninput = function () {
    let val = this.value.trim().toLowerCase(); //обрезаем пробелы чтобы поиск работал корректно
    //console.log(val);
    if(val !== ''){
        //elasticBlock.classList.remove('display-none');
        //совпадает ли вводимое значение с строками списка
        elasticItems.forEach(function(elem){
            //ф-я search ищет подстроку в строке. Если есть - возвращает номер подстроки. Если нет, то возвратит -1.
            if(elem.innerText.toLowerCase().search(val) === -1 ){
                elem.classList.add('display-none');
            }
            else elem.classList.remove('display-none');
        });
    } else elasticItems.forEach(function(elem){
        elem.classList.remove('display-none');
        //elasticBlock.classList.add('display-none');
    });
}

elasticItems.forEach(function(element){
    element.addEventListener('click', function(){
        console.log(element.text);
        searchInput.value = element.text;
        elasticBlock.classList.add('display-none');
        shim.classList.add('display-none');
    })
});

buttonRow.addEventListener('click', function(){
    //console.log('click-buttonRow');
    elasticBlock.classList.toggle('display-none');
    shim.classList.toggle('display-none');
});

searchInput.addEventListener('focus', function(){
    //console.log('ficus-input');
    elasticBlock.classList.remove('display-none');
    shim.classList.remove('display-none');
});

shim.addEventListener('click', function(){
    //console.log(event.target);
    elasticBlock.classList.add('display-none');
    shim.classList.add('display-none');
});