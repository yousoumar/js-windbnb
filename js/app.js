"use strict";
const cards = document.querySelector('#cards');
const filterDetails = document.querySelectorAll('#filterDetails div');

const stays = [];
fetch('js/stays.json')
.then(response => {
    return response.json();
})
.then(data => {
    data.forEach(element => {
        stays.push(element);
        
    });
    filterDetails[0].innerText = "France";
    filterDetails[1].innerText =`+ ${stays.length}`;
    createCard(stays);
});

function createCard(array){
    cards.innerText ="";
    
    if(array.length === 0){
        cards.innerHTML = ` <div class ="error">
                                <div >
                                    Oups, nous n'avons pas encore un logement qui correspond à ces critères. Mais on en construit tous les jours.
                                </div>
                                <div> 
                                     Et en attendant, sachez que nous avons uniquement
                                    des logements pour <strong>une</strong> ou <strong>deux</strong> personnes, et cela à <strong>Paris</strong>, <strong>Orléans</strong>, <strong>Toulouse</strong>, et <strong>Nice</strong>.
                                </div>
                                <img src = "images/building.svg"/>
                            </div>`;
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
    let filtredStays;
    if (myInupts[0].value==="" && myInupts[1].value === ""){
        filterDetails[0].innerText = "France";
        filterDetails[1].innerText =`+ ${stays.length}`;
        createCard(stays);
        return;
    }
    if (myInupts[0].value !== ""){
        let city = myInupts[0].value.trim().toLowerCase();
        filtredStays = stays.filter(stay => stay.city.toLowerCase() === city);
        filterDetails[0].innerText = city.charAt(0).toUpperCase() + city.slice(1) ;
        if (myInupts[1].value !== ""){
            let gestsNubmbre  = parseInt(myInupts[1].value, 10) ;
            filtredStays = filtredStays.filter(stay => stay.guests === gestsNubmbre );
        }
        
    }else if (myInupts[1].value !== ""){
        filtredStays = stays.filter(stay => stay.guests === gestsNubmbre );
    }
    if(filtredStays.length ===0){
        filterDetails[0].innerText = "";
        filterDetails[1].innerText ="";
    }else{
        
        filterDetails[1].innerText = `+ ${filtredStays.length}`;
    }
    
    createCard(filtredStays);
   
    
});

formBtn.addEventListener('click', ()=>{
    document.documentElement.scrollTop = 0;
    myForm.style.display = "none";
    toggle.innerHTML = `<i class="fas fa-search"></i>`;
    toggleCliked = false;
});

window.addEventListener('load', ()=>{
    setTimeout(()=>{
        document.querySelector('.loader').style.display = "none";
    }, 2000);
});