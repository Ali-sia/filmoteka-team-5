// функції відкриття та закриття з modal.js
// + рендер карток фільмів

import { filmsApiServise } from "../../index";
import { list, backdrop } from "../refs";

list.addEventListener("click", createModal);

function createModal(e) {
    e.preventDefault();
    const filmCard = e.target.closest(".films__film-card");
   
    if (!filmCard) {
        return;
    }

    const filmID = Number(filmCard.dataset.filmsId);
    const filmData = filmsApiServise.getFilmById(filmID) 
    makeSingleFilmMarkup(filmData);
}

function makeSingleFilmMarkup(filmData) {
    const { poster_path,
            title,
            vote_average,
            vote_count,
            popularity,
            original_title,
            overview,
          } = filmData;
    const modalEl = `<div class="modal-wrapper">
                        <div class="filmcard">
                            <div class="filmcard__img-thumb">
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
                                            <div class="filmcard__vote">${vote_average}</div>
                                        </td>
                                        <td>/</td>
                                        <td>
                                            <div class="filmcard__votes">${vote_count}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Popularity</td>
                                        <td colspan="3">${popularity}</td>
                                    </tr>
                                    <tr>
                                        <td>Original Title</td>
                                        <td colspan="3" class="touppercace">${original_title}</td>
                                    </tr>
                                    <tr>
                                        <td>Genre</td>
                                        <td colspan="3">Western</td>
                                    </tr>
                                </table>
                                <h2 class="filmcard__about touppercace">About</h2>
                                <p class="filmcard__text">
                                    ${overview}
                                </p>
                            </div>
                            <div>
                                <button class="filmcard__button button--orange">add to Watched</button>
                                <button class="filmcard__button button--white">add to queue</button>
                            </div>
                        </div>
                        <button class="modal-close-btn" data-modal-close>x
                        </button>
                    </div>`;
    console.log(modalEl);
    backdrop.insertAdjacentHTML("afterbegin", modalEl);
}