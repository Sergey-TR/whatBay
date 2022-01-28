console.clear();
let allCountsLists = document.querySelectorAll('.count_of_lists_here');
//console.log(allCountsLists);
allCountsLists.forEach(element =>  {
    //console.log(element, element.nextSibling);
    let count = Number(element.textContent);
    //console.log(count % 10, count % 100);
    if (count % 10 === 1 && count %100 !== 11) {
        element.nextSibling.data = ' список';
    }

    else if((count % 10 >= 5 && count % 10 <= 9)
            || (count % 100 >= 5 && count % 100 < 20)
            || (count %10 === 0)) {
        element.nextSibling.data = ' списков';
    }

    else if(count % 10 >1 && count % 10 <5) {
        element.nextSibling.data = ' списка';
    }

});
