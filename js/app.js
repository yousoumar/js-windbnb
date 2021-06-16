"use strict";
const cards = document.querySelector('#cards');
console.log(cards)
fetch('js/stays.json')
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
    data.forEach(element => {
        let card = document.createElement('div');
        card.classList.add('card')
        card.innerHTML = `<div class = "img"><img src = ${element.photo} /></div>`
        cards.appendChild(card);
    });
});