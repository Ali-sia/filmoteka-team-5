// Подключение лоадера
import './js/dom/loader';
//Подчеркивание текущей страницы в хедере
import { activePage } from './js/dom/activePage';
//Активация кнопки в хедере страницы библиотеки
import { activeLibraryBtn } from './js/dom/activeLibraryBtn';
import { activeGenreBtn } from './js/dom/activeGenresBtn';
//Пошук за назвою
import { searchFilms } from './js/dom/show-search-films';
import { searchGenres } from './js/dom/searchByGenres';
import FilmsApiService from './js/api/api-server';
import {
  appendPopularMarkup,
  appendErrorMessage,
  appendEmptyStorageMessage
} from './js/dom/show-popular-films';

import './js/dom/modal';
//модальне вікно команди
import './js/dom/modal-team';

import './js/dom/scroll-btn';
import './js/dom/searchByGenres';

import './js/dom/show-watch-films';
import './js/dom/show-queue-films';
import { onWatchedLibClick } from './js/dom/show-watch-films';
import { pagination } from './js/dom/pagination';
import { watchedFilmsStorage } from './js/dom/show-watch-films';
import { paginationLibrary } from './js/dom/pagination-library';

export const filmsApiServise = new FilmsApiService();

activePage();
activeLibraryBtn();
activeGenreBtn()
searchFilms();
searchGenres();
pagination();
loadPage();

function loadPage() {
   if (document.querySelector(".header__container--is-home")) {
     firstLoadPage();
}
    
if (document.querySelector(".header__container--is-library")) {
  paginationLibrary();
  onWatchedLibClick();
}
}

export async function firstLoadPage() {
  try {
    //зберігаємо жанри в LocalStorage
    const saveGenresLocalStorage = await filmsApiServise.fetchGenres();
    localStorage.setItem('genres', JSON.stringify(saveGenresLocalStorage));

    //робимо запит за популярними фільмами
    filmsApiServise.setPage(1);
    filmsApiServise.setIsPopular(true);
    const response = await filmsApiServise.fetchPopularFilms();

    //робимо розмітку з популярних фільмів
    appendPopularMarkup(response);
  } catch (error) {
    console.log(error.message);
    appendErrorMessage();
  }
}