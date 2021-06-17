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
        
    });
    createCard(stays);
});

function createCard(array){
    cards.innerText ="";
    array.forEach(element => {
        
        let card = document.createElement('div');
        card.classList.add('card');
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
        cards.appendChild(card);
    });
   
}
/* header interactin*/

const myForm = document.querySelector('form');
const myHeader = document.querySelector('header');
const toggle = document.querySelector('#toggle');
let toggleCliked = false; 
const myInupts = document.querySelectorAll('input');
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

/* search */
const formBtn = document.querySelector('form button');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let city = myInupts[0].value.trim().toLowerCase();
    let GestsNubmbre = myInupts[1].value.trim().toLowerCase();
    let filtredStays;
    if (city.length===0 && GestsNubmbre.length===0){
        createCard(stays);
        return;
    }
    if (city.length!==0){
        filtredStays = stays.filter(stay => stay.city.toLowerCase() == city);
        
        if (GestsNubmbre.length !== 0){
            filtredStays = filtredStays.filter(stay => stay.maxGuests.toString().toLowerCase() === GestsNubmbre);
        }
        createCard(filtredStays);
    }else if (GestsNubmbre.length !== 0){
        
    }
   
    
});

formBtn.addEventListener('click', ()=>{
    myForm.style.display = "none";
    toggle.innerHTML = `<i class="fas fa-search"></i>`;
    toggleCliked = false;
});

window.addEventListener('load', ()=>{
    setTimeout(()=>{
        console.log(document.querySelector('.loader'))
        document.querySelector('.loader').style.display = "none";
    }, 2000);
});