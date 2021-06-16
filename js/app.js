"use strict";
const cards = document.querySelector('#cards');
const stays = [];
fetch('js/stays.json')
.then(response => {
    return response.json();
})
.then(data => {
    data.forEach(element => {
        console.log(element)
        stays.push(element);
        let card = document.createElement('div');
        card.classList.add('card')
        cards.appendChild(card);
        if(element.superHost){
            card.innerHTML = `<div class = "img">
                                <img src = ${element.photo} />
                              </div>
                              <div class ="details">
                                <div class = "superhost"> SUPER HOST</div>
                                <div class ="type">${element.type} ${element.beds == null ? "" : `. ${element.beds} lits`  }</div>
                                <div class ="rating"><i class="fas fa-star"></i> ${element.rating}</div>
                              </div>`

        }else{
            card.innerHTML = `<div class = "img">
                                <img src = ${element.photo} />
                              </div>
                              <div class ="details">
                                <div class ="type">${element.type} ${element.beds == null ? "" : `. ${element.beds} lits`  }</div>
                                <div class ="rating"><i class="fas fa-star"></i> ${element.rating}</div>
                              </div>`
        }
    });
});

