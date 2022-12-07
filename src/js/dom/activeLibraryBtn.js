import { getElement } from "./getElement";
import { filmsApiServise } from "../../index";
import { watchedFilmsStorage, onWatchedLibClick } from './show-watch-films';
import { queueFilmsStorage, onQueueLibClick } from './show-queue-films';

export function activeLibraryBtn() {
    if (getElement(".header__libraryListBunnon")) {
        getElement(".header__libraryListBunnon").addEventListener('click', onClick);
    }
}

function onClick(event) {
    if (event.target.disabled || event.target.tagName != "BUTTON") {
        return;
    }

    const className = "header__libraryButton--isActive";

    if (getElement(`.${className}`)) {
        getElement(`.${className}`).disabled = false;
        getElement(`.${className}`).classList.toggle(className);
    };
        
    event.target.disabled = true;
    event.target.classList.add(className);
    
    if (event.target.innerText === "WATCHED") { 
        filmsApiServise.setWathedOpen();
    filmsApiServise.setData(watchedFilmsStorage.getWathedFilmsList());
        onWatchedLibClick();
    }
    
    if (event.target.innerText === "QUEUE") {
        filmsApiServise.setQueueOpen()
    filmsApiServise.setData(queueFilmsStorage.getQueueFilmsList());
        onQueueLibClick();
    }
}