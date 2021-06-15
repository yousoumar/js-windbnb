"use strict";

const cityButton = document.querySelector('.city button');

cityButton.addEventListener('click', (e)=>{
    e.preventDefault();
    e.currentTarget.parentElement.parentElement.classList.add('clicked');
});