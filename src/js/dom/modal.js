// функції відкриття та закриття з modal.js
// + рендер карток фільмів

import { filmsApiServise } from "../../index";
import { list, backdrop, filmcard } from "../refs";
import TrailerApiService from "../api/getting-trailer";

import { watchedFilmsStorage, onWatchedLibClick } from './show-watch-films';
import { queueFilmsStorage, onQueueLibClick } from './show-queue-films';

let addToWatchedBtn;
let addToQueueBtn;
let removeFromWatchedBtn;
let removeFromQueueBtn;
let backdropImg;
let modalCloseBtn;
let youTubeBtn;
let currentFilm = {};
// const watchedFilmsStorage = new WatchedFilmsStorage();
// const queueFilmsStorage = new QueueFilmsStorage();
const trailerApiService = new TrailerApiService();

// function findCurrentFilm(id) {
//   const filmsSet = getMoviesToLocalhost();
//   currentFilm = filmsSet.find(film => film.id === id);
//   return currentFilm;
// }

list.addEventListener("click", onCardsListClick);

function createModal(e) {

    e.preventDefault();
    const filmCard = e.target.closest(".films__film-card");

    if (!filmCard) {
        return;
    }

    let filmData = null;
    const filmID = Number(filmCard.dataset.filmsId);

    if (filmsApiServise.isWatchedOpen) {
        watchedFilmsStorage.getWathedFilmsList().map(film => {
            if (film.id === filmID) {
                filmData = film;
            }
        });
    } else if (filmsApiServise.isQueueOpen) {
        queueFilmsStorage.getQueueFilmsList().map(film => {
            if (film.id === filmID) {
                filmData = film;
            }
        });
    } else {
        filmData = filmsApiServise.getFilmById(filmID);
    } 

    let filmGenresNames = "unknown";
    if (filmData.genre_ids) {
        filmGenresNames = getFilmGenresNames(filmData.genre_ids); 
    }
    makeFilmcardMarkup(filmData, filmGenresNames);
    openModal();

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
    

    if (watchedFilmsStorage.checkFilmInWatchedLocStor(currentFilm)) {
        addToWatchedBtn.classList.add('is-hidden');
        removeFromWatchedBtn.classList.remove('is-hidden');
    }
    if (queueFilmsStorage.checkFilmInQueueLocStor(currentFilm)) {
        addToQueueBtn.classList.add('is-hidden');
        removeFromQueueBtn.classList.remove('is-hidden');
    }

}

function getFilmGenresNames(filmGenresID) {
  const arrGenres = JSON.parse(localStorage.getItem('genres'));
  if (!arrGenres) {
    return 'unknown';
  }

  return filmGenresID
    .map(genreID => arrGenres.find(genre => genre.id === genreID).name)
    .join(', ');
}

function makeFilmcardMarkup(filmData, filmGenresNames) {

  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    overview,
    id,
    backdrop_path,
  } = filmData;

  let poster300 = `https://image.tmdb.org/t/p/w300/${poster_path}`;
  let poster500 = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  let poster780 = `https://image.tmdb.org/t/p/w780/${poster_path}`;
  let poster1280 = `https://image.tmdb.org/t/p/w1280/${poster_path}`;
  let poster2000 = `https://image.tmdb.org/t/p/original/${poster_path}`;
  if (poster_path === null) {
    poster300 = `https://media.istockphoto.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=0&k=20&c=JN4E5qJgcq3qm89rSc2BIJT6AZ80MvRJie__r3OENY8=`;
    poster500 = `https://media.istockphoto.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=0&k=20&c=JN4E5qJgcq3qm89rSc2BIJT6AZ80MvRJie__r3OENY8=`;
    poster780 = `https://media.istockphoto.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=0&k=20&c=JN4E5qJgcq3qm89rSc2BIJT6AZ80MvRJie__r3OENY8=`;
    poster1280 = `https://media.istockphoto.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=0&k=20&c=JN4E5qJgcq3qm89rSc2BIJT6AZ80MvRJie__r3OENY8=`;
    poster2000 = `https://media.istockphoto.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=0&k=20&c=JN4E5qJgcq3qm89rSc2BIJT6AZ80MvRJie__r3OENY8=`;
  }

  const backdropEl = `

                    <div class='backdrop__img' 
                        style="background-image:
                            linear-gradient(to right, rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)),
                            url('https://image.tmdb.org/t/p//w780/${backdrop_path}');
                        ">
                    </div>
                    <div class="modal-wrapper">
                        <div class="filmcard">
                            <div class="filmcard__img-thumb">
                                <div>
                                    <button class="youtube-btn" data-id="${id}">  
                                        <div class="youtube-btn__icon"></div>                          
                                        <div class="youtube-btn__overlay-wrapper">
                                            <div class="youtube-btn__overlay">
                                                <p class="youtube-btn__title">
                                                    watch trailer
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <img class="filmcard__img"  

                                srcset="
                                ${poster300}   300w,
                                ${poster500}   500w,
                                ${poster780}   780w,
                                ${poster1280}   1280w,
                                ${poster2000} 2000w
                                
                            "
                            loading="lazy"
                            src="${poster300}"
                            alt="Poster of the film ${title}"
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
                                    <button class="filmcard__button filmcard__button--position btn__modal-add">add to Watched</button>
                                    <button class="filmcard__button filmcard__button--position btn__modal-r-watched is-hidden">remove from Watched</button>
                                    
                                    <button class="filmcard__button btn__modal-queue">add to queue</button>
                                    <button class="filmcard__button btn__modal-r-queue is-hidden">remove from queue</button>
                                </div>
                            </div>
                        </div>
                        <button class="modal-close-btn" data-modal-close>
                        <svg class="modal-btn__icon" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg"><path d="M24.956 8.929l-1.885-1.885-7.071 7.071-7.071-7.071-1.885 1.885 7.071 7.071-7.071 7.071 1.885 1.885 7.071-7.071 7.071 7.071 1.885-1.885-7.071-7.071z"></svg>
                        </button>
                    </div>`;

           
    backdrop.innerHTML = backdropEl;
}

function openModal () {
    backdrop.classList.remove("is-hidden");
    document.body.style.overflow = 'hidden';
    backdropImg = document.querySelector('.backdrop__img');
    modalCloseBtn = document.querySelector('.modal-close-btn');
    youTubeBtn = document.querySelector('.youtube-btn');


  modalCloseBtn.addEventListener('click', closeModal);
  document.addEventListener('click', closeModalByOutBackdropClick);
  document.addEventListener('keydown', closeModalByEsc);
  youTubeBtn.addEventListener('click', onYouTubeBtnClick);
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = 'scroll';

  modalCloseBtn.removeEventListener('click', closeModal);
  document.removeEventListener('click', closeModalByOutBackdropClick);
  document.removeEventListener('keydown', closeModalByEsc);
  youTubeBtn.removeEventListener('click', onYouTubeBtnClick);
}

function closeModalByOutBackdropClick(e) {

    if (e.target === backdropImg || e.target === backdrop ) {
        closeModal();
    }

}

function closeModalByEsc(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function onYouTubeBtnClick(e) {
  trailerApiService.filmID = Number(e.currentTarget.dataset.id);
  trailerApiService.showTrailer();
}

//функціонал для ЛС
function addToWatchedLS() {
  watchedFilmsStorage.refreshData();
  watchedFilmsStorage.addToWatchedFilms(currentFilm);
  watchedFilmsStorage.saveWatchedFilms();

  addToWatchedBtn.classList.add('is-hidden');
  removeFromWatchedBtn.classList.remove('is-hidden');
  if (filmsApiServise.isWatchedOpen) {
    onWatchedLibClick();
  }
}

function addToQueueLS() {
  queueFilmsStorage.myAddToQueueFilms(currentFilm);

  addToQueueBtn.classList.add('is-hidden');
  removeFromQueueBtn.classList.remove('is-hidden');
  if (filmsApiServise.isQueueOpen) {
    onQueueLibClick();
  }
}

function removeFromWatchedLS() {
  addToWatchedBtn.classList.remove('is-hidden');
  removeFromWatchedBtn.classList.add('is-hidden');

  watchedFilmsStorage.removeFromWatched(currentFilm);
  if (filmsApiServise.isWatchedOpen) {
    onWatchedLibClick();
  }
}

function removeFromQueueLS() {
  addToQueueBtn.classList.remove('is-hidden');
  removeFromQueueBtn.classList.add('is-hidden');

  queueFilmsStorage.removeFromQueue(currentFilm);
  if (filmsApiServise.isQueueOpen) {
    onQueueLibClick();
  }

}

function onCardsListClick(e) {
    if (e.target.classList.contains("films__overlay")) {
          return 
    };
    if (e.target.nodeName === 'BUTTON') {

    if (e.target.dataset.type === "w-add") {
        addToWatchedLS();

    } else if (e.target.dataset.type === "q-add") {
        addToQueueLS();
        
    } else if (e.target.dataset.type === "w-remove") {
        removeFromWatchedLS();

    } else if (e.target.dataset.type === "q-remove") {
       removeFromQueueLS();
    } return
    }
    createModal(e);
};

export function checkButtonsOnHover(e) {
      const filmCard = e.target.closest(".films__film-card");
    if (!filmCard) {
        return;
    }

    const filmID = Number(filmCard.dataset.filmsId);
    const filmData = filmsApiServise.getFilmById(filmID);

    currentFilm = filmData;
    addToWatchedBtn = filmCard.querySelector('.btn__card-add');
    addToQueueBtn = filmCard.querySelector('.btn__card-queue');
    removeFromQueueBtn = filmCard.querySelector('.btn__card-r-queue');
    removeFromWatchedBtn = filmCard.querySelector('.btn__card-r-watched');

    if (watchedFilmsStorage.checkFilmInWatchedLocStor(currentFilm)) {
        addToWatchedBtn.classList.add('is-hidden');
        removeFromWatchedBtn.classList.remove('is-hidden');
    } else {
         addToWatchedBtn.classList.remove('is-hidden');
        removeFromWatchedBtn.classList.add('is-hidden');
    }
    if (queueFilmsStorage.checkFilmInQueueLocStor(currentFilm)) {
        addToQueueBtn.classList.add('is-hidden');
        removeFromQueueBtn.classList.remove('is-hidden');
    } else {
        addToQueueBtn.classList.remove('is-hidden');
        removeFromQueueBtn.classList.add('is-hidden');
    }
}