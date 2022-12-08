// відмалювати фільми з списку "watched"
import { resetMarkup } from './show-popular-films';
import { filmsApiServise } from '../../index';
import { appendPopularMarkup } from './show-popular-films';
import { paginationLibrary } from './pagination-library';
import WatchedFilmsStorage from '../storage/add-to-watced';

export const watchedFilmsStorage = new WatchedFilmsStorage();
export function onWatchedLibClick() {
  //const watchedList = watchedFilmsStorage.getWathedFilmsList();
  resetMarkup();
  //console.log('to check', watchedList);
  const totalItems = watchedFilmsStorage.getWathedFilmsList().length;
  //console.log('items number', totalItems);
  //console.log('length of the part of the object array', objectPart.length);
  const totalPages = Math.ceil(totalItems / 20);
  //console.log('pages number', totalPages);
  filmsApiServise.setPage(1);
  filmsApiServise.setTotalPages(totalPages);
  filmsApiServise.setWathedOpen();
  //filmsApiServise.setData(watchedList);
  //appendPopularMarkup(watchedList);
  paginationLibrary();
}
