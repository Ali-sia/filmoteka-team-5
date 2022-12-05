// функції відкриття та закриття з modal.js
// + рендер карток фільмів

import { filmsApiServise } from "../../index";
import { list, backdrop, filmcard, modalCloseBtn } from "../refs";

import WatchedFilmsStorage from '../storage/add-to-watced';
import QueueFilmsStorage from '../storage/add-to-queue';
let addToWatchedBtn;
let addToQueueBtn;
let removeFromWatchedBtn;
let removeFromQueueBtn;
let currentFilm = {};
const watchedStorage = new WatchedFilmsStorage();
const queueStorage = new QueueFilmsStorage();

// function findCurrentFilm(id) {
//   const filmsSet = getMoviesToLocalhost();
//   currentFilm = filmsSet.find(film => film.id === id);
//   return currentFilm;
// }

list.addEventListener("click", createModal);

function createModal(e) {
    e.preventDefault();
    const filmCard = e.target.closest(".films__film-card");
    console.log('filmCard:', filmCard);
    if (!filmCard) {
        return;
    }

    const filmID = Number(filmCard.dataset.filmsId);
    const filmData = filmsApiServise.getFilmById(filmID) 

    let filmGenresNames = "unknown";
    if (filmData.genre_ids) {
        filmGenresNames = getFilmGenresNames(filmData.genre_ids); 
    }
    makeFilmcardMarkup(filmData, filmGenresNames);

//-----Для кнопок
    currentFilm = filmData;
    addToWatchedBtn = document.querySelector('.btn__modal-add');
    addToQueueBtn = document.querySelector('.btn__modal-queue');
    removeFromQueueBtn = document.querySelector('.btn__modal-r-queue');
    removeFromWatchedBtn = document.querySelector('.btn__modal-r-watched');

    addToWatchedBtn.addEventListener('click', addToWatchedLS);
    removeFromWatchedBtn.addEventListener('click', removeFromWatchedLS);
    addToQueueBtn.addEventListener('click', addToQueueLS);
    removeFromQueueBtn.addEventListener('click', removeFromQueueLS);

    if (watchedStorage.checkFilmInWatchedLocStor(currentFilm)) {
        addToWatchedBtn.classList.add('is-hidden');
        removeFromWatchedBtn.classList.remove('is-hidden');
    }
    if (queueStorage.checkFilmInQueueLocStor(currentFilm)) {
        addToQueueBtn.classList.add('is-hidden');
        removeFromQueueBtn.classList.remove('is-hidden');
    }
}

function getFilmGenresNames (filmGenresID) {
    const arrGenres = JSON.parse(localStorage.getItem('genres'));
    if (!arrGenres) {
        return "unknown";
    }

    return filmGenresID.map(genreID => arrGenres.find(genre => genre.id === genreID).name).join(", ");
}

function makeFilmcardMarkup(filmData, filmGenresNames) {
    const { poster_path,
            title,
            vote_average,
            vote_count,
            popularity,
            original_title,
            overview,
        } = filmData;
    
     const modalEl = `<div class="filmcard__img-thumb">
                        <img class="filmcard__img"  
                            srcset="
                                https://image.tmdb.org/t/p/w300/${poster_path}   300w,
                                https://image.tmdb.org/t/p/w500/${poster_path}   500w,
                                https://image.tmdb.org/t/p/w780/${poster_path}   780w,
                                https://image.tmdb.org/t/p/w1280/${poster_path}   1280w,
                                https://image.tmdb.org/t/p/original/${poster_path} 2000w
                                
                            "
                            loading="lazy"
                            src="https://image.tmdb.org/t/p/w300/${poster_path}"
                            alt="#"
                            sizes="(max-width: 320px) 280px,
                                (max-width: 768px) 340px,
                                400px"/>
                    </div>
                    <div class="filmcard__thumb">
                        <table class="filmcard__table">
                            <caption class="filmcard__title">
                                ${title}
                            </caption>
                            <tr>
                                <td>Vote / Votes</td>
                                <td>                                   
                                    <div class="filmcard__votes"><span class="filmcard__vote">${vote_average.toFixed(1)}</span> / ${vote_count}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>Popularity</td>
                                <td colspan="3">${popularity.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>Original Title</td>
                                <td colspan="3" class="touppercace">${original_title}</td>
                            </tr>
                            <tr>
                                <td>Genre</td>
                                <td colspan="3">${filmGenresNames}</td>
                            </tr>
                        </table>
                        <h2 class="filmcard__about touppercace">About</h2>
                        <p class="filmcard__text">
                            ${overview}
                        </p>
                        <div class="filmcard__buttons-thumb">
                            <button class="filmcard__button button--orange touppercace btn__modal-add">add to Watched</button>
                            <button class="filmcard__button button--orange touppercace btn__modal-r-watched is-hidden">remove from Watched</button>
                            
                            <button class="filmcard__button button--white touppercace btn__modal-queue">add to queue</button>
                            <button class="filmcard__button button--white touppercace btn__modal-r-queue is-hidden">remove from queue</button>
                        </div>
                    </div>`;
           
    filmcard.innerHTML = modalEl;
    openModal();
}

function openModal () {
    backdrop.classList.remove("is-hidden");
    document.body.style.overflow = 'hidden';
    modalCloseBtn.addEventListener("click", closeModal);
    document.addEventListener("click", closeModalByOutBackdropClick);
    document.addEventListener("keydown", closeModalByEsc);
}

function closeModal() {
    backdrop.classList.add("is-hidden");
    document.body.style.overflow = 'overlay';
    modalCloseBtn.removeEventListener("click", closeModal);
    document.removeEventListener("click", closeModalByOutBackdropClick);
    document.removeEventListener("keydown", closeModalByEsc);
}

function closeModalByOutBackdropClick(e) {
    if (e.target === backdrop) {
        closeModal();
    }
}

function closeModalByEsc(e) {
    if (e.code === "Escape") {
        closeModal();
    }
}

//функціонал для ЛС
function addToWatchedLS() {
  watchedStorage.refreshData();

  watchedStorage.addToWatchedFilms(currentFilm);
  watchedStorage.saveWatchedFilms();

  addToWatchedBtn.classList.add('is-hidden');
  removeFromWatchedBtn.classList.remove('is-hidden');
}

function addToQueueLS() {
  queueStorage.myAddToQueueFilms(currentFilm);

  addToQueueBtn.classList.add('is-hidden');
  removeFromQueueBtn.classList.remove('is-hidden');
}

function removeFromWatchedLS() {
  addToWatchedBtn.classList.remove('is-hidden');
  removeFromWatchedBtn.classList.add('is-hidden');

  watchedStorage.removeFromWatched(currentFilm);
}

function removeFromQueueLS() {
  addToQueueBtn.classList.remove('is-hidden');
  removeFromQueueBtn.classList.add('is-hidden');

  queueStorage.removeFromQueue(currentFilm);
}