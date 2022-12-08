// відмалювати фільми з списку "Queue"
import { filmsApiServise } from '../../index';
import { resetMarkup } from './show-popular-films';
import { appendPopularMarkup } from './show-popular-films';
import { paginationLibrary } from './pagination-library';
import QueueFilmsStorage from '../storage/add-to-queue';

export const queueFilmsStorage = new QueueFilmsStorage();
export function onQueueLibClick() {
  const totalItems = queueFilmsStorage.getQueueFilmsList().length;
  resetMarkup();
  // appendPopularMarkup(queueList);
  const totalPages = Math.ceil(totalItems / 20);
  //console.log('pages number', totalPages);
  filmsApiServise.setPage(1);
  filmsApiServise.setTotalPages(totalPages);
  filmsApiServise.setWathedOpen();
  //filmsApiServise.setData(watchedList);
  paginationLibrary();
}
