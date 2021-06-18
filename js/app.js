"use strict";
const cards = document.querySelector('#cards');
const filterDetails = document.querySelectorAll('#filterDetails div');
const myHeader = document.querySelector('header');

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
                                <div class ="text">
                                    <p >
                                        Oups, nous n'en avons pas encore un qui correspond à ces critères. Mais on en construit tous les jours.
                                    </p>
                                    <p> 
                                        En attendant, sachez que nous avons
                                        des logements à Paris, Nantes, Toulouse, et Nice.
                                    </p>
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







/* search */
const myForm = document.querySelector('form');

const myInput = document.querySelector('input');

myForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    let filtredStays=[];
    let city = myInput.value.trim().toLocaleLowerCase();
    document.documentElement.scrollTop = 0;
    myHeader.classList.remove("hamburger-activated");
    if (city === "" ){
        filterDetails[0].innerText = "France";
        filterDetails[1].innerText =`+ ${stays.length}`;
        createCard(stays);
        return;
    }else{
        console.log(city);
        filtredStays = stays.filter(stay => stay.city.toLowerCase() === city);
    }
    
    if(filtredStays.length ===0){
        filterDetails[0].innerText = "";
        filterDetails[1].innerText = "";
    }else{
        
        filterDetails[1].innerText = `+ ${filtredStays.length}`;
        filterDetails[0].innerText = city.charAt(0).toUpperCase() + city.slice(1) ;
    }
    
    createCard(filtredStays);
   
    
});

/* header interactin*/

window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 30){
        myHeader.style.boxShadow = "0 0 3px rgba(0, 0, 0, 0.3)";
    }else{
        myHeader.style.boxShadow = "none";
    }
});

const hamburger = document.querySelector('#hamburger-button');
hamburger.addEventListener('click', () => {
    
    myHeader.classList.toggle("hamburger-activated");
    
});



/* loader */
window.addEventListener('load', ()=>{
    setTimeout(()=>{
        document.querySelector('.loader').style.display = "none";
    }, 2000);
});