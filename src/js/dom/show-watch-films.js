// відмалювати фільми з списку "watched"
import { resetMarkup } from './show-popular-films';
import { appendPopularMarkup } from './show-popular-films';
import { createPopularMarkup } from './show-popular-films';
import WatchedFilmsStorage from '../storage/add-to-watced';
import { getElement } from './getElement';

if (getElement('.header__libraryWatchBtn')) {
  getElement('.header__libraryWatchBtn').addEventListener(
    'click',
    onWatchedLibClick
  );
}

const watchedFilmsStorage = new WatchedFilmsStorage();
const watchedList = watchedFilmsStorage.getWathedFilmsList();

// const watchedBtnLib = document.querySelector('.header__libraryWatchBtn');
// console.log(watchedBtnLib);

// watchedBtnLib.addEventListener('click', onWatchedLibClick);

function onWatchedLibClick() {
  console.log(watchedList);
  resetMarkup();
  createPopularMarkup(watchedList);
  appendPopularMarkup(watchedList);
}
