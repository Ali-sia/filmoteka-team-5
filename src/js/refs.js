//сюди всі змінні
const refs = {
    exampleEl: document.querySelector('.example'),
    list: document.querySelector('.films__list'),
    backdrop: document.querySelector('.backdrop'),
};

export const {
    exampleEl,
    list,
    backdrop,
} = refs;

// тоді при import пишемо просто
// import {exampleEl} from './refs'