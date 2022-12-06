// відмалювати фільми за азпитом користувача
import { getElement } from "./getElement";
import { resetMarkup } from './show-popular-films';
import { filmsApiServise } from "../../index";
import { appendPopularMarkup } from './show-popular-films';

export function searchFilms() {
    if (getElement("#searchForm")) {
        getElement("#searchForm").reset();
        getElement("#searchForm").addEventListener('submit', onSearch);
    }
}

function onSearch(event) {
    event.preventDefault();

    filmsApiServise.setPage(1);
    filmsApiServise.setIsPopular(false);

    let nameFilm = event.currentTarget.elements.input.value.trim();
    
    if (!nameFilm) {
        showErrorMessage();
        return;
    }

    filmsApiServise.setNameFilm(nameFilm.replaceAll(" ", "+"));
    showFilms();
}

function showErrorMessage() {
    let messageDisplayRef = getElement('[data-alarmMessage=""]');

    if (messageDisplayRef.style.display === "block") {
        return;
    }

    messageDisplayRef.style.display = "block";
    
    setTimeout(()=>{
        messageDisplayRef.style.display = "none";
    }, 5000);
}

async function showFilms() {

    let response = {};
    try {
        response = await filmsApiServise.getFilmByName();
    } catch(error) {
        showErrorMessage();
        return;
    }

    resetMarkup();
    appendPopularMarkup(response);
}