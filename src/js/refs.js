//сюди всі змінні
const refs = {
    exampleEl: document.querySelector('.example'),
};

export const {exampleEl} = refs;

// тоді при import пишемо просто
// import {exampleEl} from './refs'