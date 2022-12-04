//сюди всі змінні
const refs = {
    exampleEl: document.querySelector('.example'),
    list: document.querySelector('.films__list'),
    backdrop: document.querySelector('.backdrop'),
    modalCloseBtn: document.querySelector(".modal-close-btn")
};

export const {
    exampleEl,
    list,
    backdrop,
    modalCloseBtn,
} = refs;

// тоді при import пишемо просто
// import {exampleEl} from './refs'