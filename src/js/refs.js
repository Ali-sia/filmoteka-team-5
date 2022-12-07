//сюди всі змінні
const refs = {
  exampleEl: document.querySelector('.example'),
  list: document.querySelector('.films__list'),
  libraryList: document.querySelector('.films__library'),
  backdrop: document.querySelector('.backdrop'),
  filmcard: document.querySelector('.filmcard'),
  modalCloseBtn: document.querySelector('.modal-close-btn'),
  modalTeamBtn: document.querySelector('.footer__button'),
  backdropModalTeam: document.querySelector('.backdrop[data-modal-team]'),
  modalCloseBtnTeam: document.querySelector(
    '.modal-close-btn[data-modal-close-team]'
  ),
};

export const {
  exampleEl,
  list,
  backdrop,
  filmcard,
  modalCloseBtn,
  modalTeamBtn,
  backdropModalTeam,
  modalCloseBtnTeam,
} = refs;

// тоді при import пишемо просто
// import {exampleEl} from './refs'
