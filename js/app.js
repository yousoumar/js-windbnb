"use strict";
const cards = document.querySelector('#cards');
const filteredTtems = document.querySelectorAll('#filtered-items div');

const stays = [];
fetch('js/stays.json')
.then(response => {
    return response.json();
})
.then(data => {
    data.forEach(element => {
        stays.push(element);
        
    });
    filteredTtems[0].innerText = "France";
    filteredTtems[1].innerText =`+ ${stays.length}`;
    createCard(stays);
});

function createCard(array){
    cards.innerText ="";
    
    if(array.length === 0){
        cards.innerHTML = ` <div class ="error">
                                <div >Oups, nous n'avons pas un logement qui correspond à ces critères</div>
                                <div> Mais on en construit tous les jours.</div>
                                <img src = "images/building.svg"/>
                            </div>`
        return;
    }
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
    let gestsNubmbre  = parseInt(myInupts[1].value, 10) ;
    let filtredStays;
    if (city.length===0 && !gestsNubmbre){
        filteredTtems[0].innerText = "France";
        filteredTtems[1].innerText =`+ ${stays.length}`;
        createCard(stays);
        return;
    }
    if (city.length!==0){
        filtredStays = stays.filter(stay => stay.city.toLowerCase() === city);
        if (gestsNubmbre || gestsNubmbre === 0){
            filtredStays = filtredStays.filter(stay => stay.guests === gestsNubmbre );
        }
        
    }else if (gestsNubmbre || gestsNubmbre === 0){
        filtredStays = stays.filter(stay => stay.guests === gestsNubmbre );
    }
    if(filtredStays.length ===0){
        filteredTtems[0].innerText = "";
        filteredTtems[1].innerText ="";
    }else{
        filteredTtems[0].innerText = city.length == 0 ? 'France' : city.charAt(0).toUpperCase() + city.slice(1) ;
        filteredTtems[1].innerText = `+ ${filtredStays.length}`;
    }
    
    createCard(filtredStays);
   
    
});

formBtn.addEventListener('click', ()=>{
    myForm.style.display = "none";
    toggle.innerHTML = `<i class="fas fa-search"></i>`;
    toggleCliked = false;
});

window.addEventListener('load', ()=>{
    setTimeout(()=>{
        document.querySelector('.loader').style.display = "none";
    }, 2000);
});