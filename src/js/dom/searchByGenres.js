import { appendPopularMarkup, resetMarkup } from './show-popular-films';
// import { filmsApiGenres } from '../api/getting-films-by-genres';
import { filmsApiServise } from '../../index';
import { showErrorMessage } from './show-search-films';
import { getElement } from './getElement';

// const filmsApiGenres = new GenresApiService;

//   if (getElement('.header__genres-list')) {
//     getElement('.header__genres-list').addEventListener('submit', onGenresBtnClick);
//   }
export function searchGenres() {
    const genresBtnsList = getElement('.header__genres-list');
    if (!genresBtnsList) {
        return;
    }
    genresBtnsList.addEventListener('click', onGenresBtnClick);

}
// let searchGenre;


function onGenresBtnClick(event) {
    filmsApiServise.setPage(1);
    filmsApiServise.setIsPopular(false);
    let searchGenre = event.target.innerText.toLowerCase();
    // console.log(searchGenre);

    if (!searchGenre) {
    showErrorMessage();
    return;
    }

    filmsApiServise.setSearchGenre(searchGenre);
    showFilmsByGenre()
}

async function showFilmsByGenre() {
        let response = {};
        try {
            response = await filmsApiServise.fetchFilmsByGenres();
            // console.log(response);
        } catch (error) {
            showErrorMessage();
            return;
        }
        // console.log('Return showFilmsByGenre', response);
        // return response;
    }
    // console.log('showFilmsByGenre: ', response)
    resetMarkup();
    appendPopularMarkup(gresponse);