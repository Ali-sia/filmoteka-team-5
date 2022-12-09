import { appendPopularMarkup, resetMarkup } from './show-popular-films';
// import { filmsApiGenres } from '../api/getting-films-by-genres';
import { filmsApiServise } from '../../index';
import { showErrorMessage } from './show-search-films';
import { getElement } from './getElement';

export function searchGenres() {
    const genresBtnsList = getElement('.header__genres-list');
    if (!genresBtnsList) {
        return;
    }

    
    genresBtnsList.addEventListener('click', onGenresBtnClick);

}

function onGenresBtnClick(event) {
    filmsApiServise.setPage(1);
    filmsApiServise.setIsPopular(false);
    filmsApiServise.setIsFilmSearch(false);
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    let searchGenre = event.target.innerText.toLowerCase();

    if (!searchGenre) {
    showErrorMessage();
    return;
    }

    filmsApiServise.setSearchGenre(searchGenre);
    showFilmsByGenre()
}

async function showFilmsByGenre() {
        let filmsByGenre = {};
        try {
            filmsByGenre = await filmsApiServise.fetchFilmsByGenres();
            // console.log('filmByGenre', filmsByGenre);
        } catch (error) {
            showErrorMessage();
            return;
        }

    resetMarkup();
    appendPopularMarkup(filmsByGenre);
    
    }