// відмалювати фільми з списку "watched"
import { resetMarkup } from './show-popular-films';
import { appendPopularMarkup } from './show-popular-films';
import WatchedFilmsStorage from '../storage/add-to-watced';
import { filmsApiServise } from '../../index';
import {paginationLibrary} from "./pagination-library";

export const watchedFilmsStorage = new WatchedFilmsStorage;
export function onWatchedLibClick() {
    filmsApiServise.setPage(1);
    filmsApiServise.setWathedOpen();
    const watchedList = watchedFilmsStorage.getWathedFilmsList();
    resetMarkup();
    //console.log('to check', watchedList);
    const totalItems = watchedFilmsStorage.getWathedFilmsList().length;
    //console.log('items number', totalItems);
    //console.log('length of the part of the object array', objectPart.length);
    const totalPages = Math.ceil(totalItems / 20);
    // console.log('pages number', totalPages);
    filmsApiServise.setTotalPages(totalPages);
    let response = [];
    if (totalPages > 1) {
        response = watchedList.slice(0, 20);
      } else {
        response = watchedList;
        }
    
        appendPopularMarkup(response);
  }