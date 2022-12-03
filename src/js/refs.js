//сюди всі змінні
const refs = {
    exampleEl: document.querySelector('.example'),
    list: document.querySelector('.films__list'),
};

export const {exampleEl, list} = refs;

// тоді при import пишемо просто
// import {exampleEl} from './refs'