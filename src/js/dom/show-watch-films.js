// відмалювати фільми з списку "watched"// відмалювати фільми з списку "watched"
import { getElement } from "./getElement";
const refs = {
    btnWatched: document.querySelector('.watched'),
    btnQueue: document.querySelector('.queue'),
    libraryGallery: document.querySelector('.films__list'),
  };

  if (getElement(".header__libraryWatchBtn")) {
    getElement(".header__libraryWatchBtn").addEventListener('click', onWatchedLibClick);
    // refs.btnWatched.addEventListener('click', onWatchedButtonClick);
    // refs.btnQueue.addEventListener('click', onQueueButtonClick);
}

  const watchedMovies = JSON.parse(localStorage.getItem('watched-films'));
  const queueMovies = JSON.parse(localStorage.getItem('queue-films'));
  console.log(watchedMovies);
  // =====================================================================================




  refs.btnWatched.addEventListener('click', onWatchedButtonClick);
  refs.btnQueue.addEventListener('clic k', onQueueButtonClick);

  // =====================================

  function onWatchedButtonClick(event) {
    console.log(event);
    if (event.target.classList === 'watched') {
      refs.btnWatched.classList.add('header__libraryButton--isActive');
      refs.btnQueue.classList.remove('header__libraryButton--isActive');
    }
    createLibraryGalleryMarkup(watchedMovies);

  }

  function onQueueButtonClick(event) {
    if (event.target.classList === 'queue') {
      refs.btnQueue.classList.add('header__libraryButton--isActive');
      refs.btnWatched.classList.remove('header__libraryButton--isActive');
    }
    createLibraryGalleryMarkup(queueMovies);
  }

  function createLibraryGalleryMarkup(imagesArray) {
    console.log(imagesArray);
    refs.libraryGallery.innerHTML = imagesArray
    .map(
        obj => `<article class="films__film-card" data-films-id="${obj.id}">
            <img
              class="films__img"
              srcset="
                https://image.tmdb.org/t/p/w300/${obj.poster_path}   300w,
                https://image.tmdb.org/t/p/w500/${obj.poster_path}   500w,
                https://image.tmdb.org/t/p/w780/${obj.poster_path}   780w,
                https://image.tmdb.org/t/p/w1280/${obj.poster_path}   1280w,
                https://image.tmdb.org/t/p/original/${obj.poster_path} 2000w
              "
              loading="lazy"
              src="https://image.tmdb.org/t/p/w300/${obj.poster_path}"
              alt="Poster of the film ${obj.title}",
              sizes="(max-width: 320px) 280px,
                (max-width: 768px) 340px,
                400px"
            />
            <div class="films__info">
              <h2 class="films__title">${obj.title}</h2>
            </div>
          </article>
          `
      )
      .join('');
  }