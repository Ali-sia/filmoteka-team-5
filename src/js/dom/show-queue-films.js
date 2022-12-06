// відмалювати фільми з списку "Queue"
import { resetMarkup } from './show-popular-films';
import { appendPopularMarkup } from './show-popular-films';
import { createPopularMarkup } from './show-popular-films';
import QueueFilmsStorage from '../storage/add-to-queue';
import { getElement } from "./getElement";

    if (getElement(".header__libraryQueueBtn")) {
        getElement(".header__libraryQueueBtn").addEventListener('click', onQueueLibClick);
    }


const queueFilmsStorage = new QueueFilmsStorage;
const queueList = queueFilmsStorage.getQueueFilmsList();


// const queueBtnLib = document.querySelector('.header__libraryQueueBtn');
// console.log(queueBtnLib);
// queueBtnLib.addEventListener('click', onQueueLibClick);

function onQueueLibClick(event) {
    console.log(queueList);
    resetMarkup();
    createPopularMarkup(queueList);
    appendPopularMarkup(queueList);
}