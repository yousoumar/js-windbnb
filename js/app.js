"use strict";
const cards = document.querySelector('#cards');
const stays = [];
fetch('js/stays.json')
.then(response => {
    return response.json();
})
.then(data => {
    data.forEach(element => {
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
                              </div>
                              <h2 class ="title">${element.title}</h2>`

        }else{
            card.innerHTML = `<div class = "img">
                                <img src = ${element.photo} />
                              </div>
                              <div class ="details">
                                <div class ="type">${element.type} ${element.beds == null ? "" : `. ${element.beds} lits`  }</div>
                                <div class ="rating"><i class="fas fa-star"></i> ${element.rating}</div>
                              </div>
                              <h2 class ="title">${element.title}</h2>`
        }
    });
});

/* header interactin*/
const myForm = document.querySelector('form');
const myHeader = document.querySelector('header');
const toggle = document.querySelector('#toggle');
let toggleCliked = false 
window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 30){
        myHeader.style.boxShadow = "0 0 3px rgba(0, 0, 0, 0.3)";
    }else{
        myHeader.style.boxShadow = "none";
    }
});


toggle.addEventListener('click', ()=>{
    if(!toggleCliked){
        myForm.style.display = "flex";
        toggle.innerText = "X";
        toggleCliked = true;
    }else{
        myForm.style.display = "none";
        toggle.innerHTML = `<i class="fas fa-search"></i>`
        toggleCliked = false;
        
    }
   
});