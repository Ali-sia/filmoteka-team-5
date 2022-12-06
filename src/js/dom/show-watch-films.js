// відмалювати фільми з списку "watched"
import {list} from '../refs'
import { getElement } from "./getElement";
import { createPopularMarkup } from './show-popular-films';
import { filmsApiServise } from "../../index";
import { appendPopularMarkup } from './show-popular-films';
import { getWathedFilmsList } from '../storage/add-to-watced';
import { QueueFilmsStorage } from '../storage/add-to-queue';

// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import "notiflix/dist/notiflix-3.2.5.min.css";
// export const localStorageAPI = {
//      save,    load,  };
// function save(key, value) {
//     try {
//         const serializedState = JSON.stringify(value);
//         localStorage.setItem(key, serializedState);
//     } catch (error) {
//         Notify.failure("Local storage error");
//     }  }    function load(key) {
//         try {
//             const serializedState = localStorage.getItem(key);
//             return serializedState === null ? {watched: [], queue: []} : JSON.parse(serializedState);
//         } catch (error) {      Notify.failure("Local storage error");
//     }  }


// const STORAGE_WATCHED_KEY = 'watched-films';
// const STORAGE_QUEUE_KEY = 'queue-films';
// watchedBtn.addEventListener('click', showWatchedFilms);
// queueBtn.addEventListener('click', showFilmsInQueue);

function innerLibraryList(e = {}) {
  const section = e.target?.id === 'btn-watched' ? 'watched' : 'queue';

  selectSection(section);
  createPopularMarkup({
    data: getWathedFilmsList(${section}Result),
    elementRef: document.querySelector(list),
    isLibrary: true,
  });

  return section;
}
innerLibraryList();

function selectSection(section) {
  const watchedButton = document.getElementById('btn-watched');
  const queueButton = document.getElementById('btn-queue');

  if (section === 'queue') {
    watchedButton.classList.remove('header__libraryButton--isActive');
    queueButton.classList.add('header__libraryButton--isActive');
  } else {
    watchedButton.classList.add('header__libraryButton--isActive');
    queueButton.classList.remove('header__libraryButton--isActive');
  }
}