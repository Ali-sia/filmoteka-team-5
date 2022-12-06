import {filmsApiServise} from '../../index';
import { getElement } from './getElement';
import { resetMarkup } from './show-popular-films';
import { appendPopularMarkup } from './show-popular-films';

export function pagination() {
    document.querySelector('.pagination').addEventListener('click', onClick);
}

async function onClick(event) {
    event.preventDefault();
    console.log(event.target.tagName)

    //Защита от клика не в кнопку
    if (event.target.tagName != "A" && !event.target.classList.contains("pagination__img")) {
        return;
    }

    //Определение номера страницы назначения
    let targetPage = filmsApiServise.getPage();
    if (event.target.classList.contains("pagination__button--button1") || event.target.classList.contains("pagination__img1")) {
        document.querySelector('.pagination__button--button1').blur();
        targetPage -= 1;
    } else if (event.target.classList.contains("pagination__button--button8") || event.target.classList.contains("pagination__img2")) {
        document.querySelector('.pagination__button--button8').blur();
        targetPage += 1;
    } else {
        targetPage = Number(event.target.textContent);
    }
    
    //Установка целевой страницы
    filmsApiServise.setPage(targetPage);

    //Очистка разметки секции карточек
    resetMarkup();
    event.target.blur();
    getElement(".pagination__container").style.display = "none";

    //Подготовка к разметке страницы
    let response = {};

    //Определение запроса
    if (filmsApiServise.getIsPopular()) {
        response = await filmsApiServise.fetchPopularFilms();
    } else {
        response = await filmsApiServise.getFilmByName();
    }

    //Разметка страницы и перерисовка пагинации
    appendPopularMarkup(response);
}