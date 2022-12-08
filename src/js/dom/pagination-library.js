import { filmsApiServise } from '../../index';
import { getElement } from './getElement';
import { resetMarkup } from './show-popular-films';
import { appendPopularMarkup } from './show-popular-films';
import WatchedFilmsStorage from '../storage/add-to-watced';
import QueueFilmsStorage from '../storage/add-to-queue';

export const watchedFilmsStorage = new WatchedFilmsStorage();
export const queueFilmsStorage = new QueueFilmsStorage();

export function paginationLibrary() {
  document.querySelector('.pagination').addEventListener('click', onClick);
}

async function onClick(event) {
  event.preventDefault();
  console.log(event.target.tagName);
  const watchedList = watchedFilmsStorage.getWathedFilmsList();
  //Защита от клика не в кнопку
  if (
    event.target.tagName != 'A' &&
    !event.target.classList.contains('pagination__img')
  ) {
    return;
  }

  //Определение номера страницы назначения
  let targetPage = filmsApiServise.getPage();
  let startArraySlice = 0;
  let endArraySlice = 0;
  if (
    event.target.classList.contains('pagination__button--button1') ||
    event.target.classList.contains('pagination__img1')
  ) {
    document.querySelector('.pagination__button--button1').blur();
    targetPage -= 1;
  } else if (
    event.target.classList.contains('pagination__button--button8') ||
    event.target.classList.contains('pagination__img2')
  ) {
    document.querySelector('.pagination__button--button8').blur();
    targetPage += 1;
  } else {
    targetPage = Number(event.target.textContent);
  }
  startArraySlice = (targetPage - 1) * 20;
  endArraySlice = targetPage * 20;
  //Установка целевой страницы
  filmsApiServise.setPage(targetPage);

  //Очистка разметки секции карточек
  resetMarkup();
  event.target.blur();
  getElement('.pagination__container').style.display = 'none';

  //Подготовка к разметке страницы
  let response = {};

  //Определение запроса
  if (
    filmsApiServise.isWatchedOpen === 1 ||
    filmsApiServise.isQueueOpen === 1
  ) {
    let pages = filmsApiServise.getTotalPages();
    if (targetPage < pages) {
      response = watchedList.slice(startArraySlice, endArraySlice);
    } else if (targetPage === pages) {
      response = watchedList.slice(startArraySlice);
    }
  } else {
    response = await filmsApiServise.getFilmByName();
  }
  //Разметка страницы и перерисовка пагинации
  appendPopularMarkup(response);
}
