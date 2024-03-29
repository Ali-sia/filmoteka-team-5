// відмалювати фільми з списку "Queue"
import { resetMarkup, appendEmptyStorageMessage } from './show-popular-films';
import { appendPopularMarkup } from './show-popular-films';
import { filmsApiServise } from '../../index';
import QueueFilmsStorage from '../storage/add-to-queue';

export const queueFilmsStorage = new QueueFilmsStorage();
export function onQueueLibClick() {
  filmsApiServise.setPage(1);
  filmsApiServise.setQueueOpen();
  const queueList = queueFilmsStorage.getQueueFilmsList();

  resetMarkup();

  if (!queueList) {
    appendEmptyStorageMessage();
    document.querySelector('.pagination__container').style.display = 'none';
    return;
  }

  const totalItems = queueList.length;
  const totalPages = Math.ceil(totalItems / 20);

  filmsApiServise.setTotalPages(totalPages);

  let response = [];
  if (totalPages > 1) {
    response = queueList.slice(0, 20);
  } else {
    response = queueList;
  }

  appendPopularMarkup(response);
}
