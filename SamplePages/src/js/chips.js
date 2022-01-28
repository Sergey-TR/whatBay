let chipsInput = document.querySelectorAll('.item-of-list-participants');
chipsInput.forEach(element => {
    //console.log(element);
    element.size = element.value.length;
});