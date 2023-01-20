import { getElement } from './getElement';
import { filmsApiServise } from '../../index';
import { watchedFilmsStorage, onWatchedLibClick } from './show-watch-films';
import { queueFilmsStorage, onQueueLibClick } from './show-queue-films';

export function activeGenreBtn() {
  if (getElement('.header__genres-list')) {
    getElement('.header__genres-list').addEventListener('click', onGenreClick);
  }
}

function onGenreClick(event) {
  if (event.target.disabled || event.target.tagName != 'BUTTON') {
    return;
  }

  const genreClassName = 'header__genres-btn--isActive';

  if (getElement(`.${genreClassName}`)) {
    getElement(`.${genreClassName}`).disabled = false;
    getElement(`.${genreClassName}`).classList.toggle(genreClassName);
  }

  event.target.disabled = true;
  event.target.classList.add(genreClassName);
}
