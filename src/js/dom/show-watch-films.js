// відмалювати фільми з списку "watched"
import { resetMarkup } from './show-popular-films';
import { appendPopularMarkup } from './show-popular-films';
import WatchedFilmsStorage from '../storage/add-to-watced';

export const watchedFilmsStorage = new WatchedFilmsStorage;
export function onWatchedLibClick() {
    const watchedList = watchedFilmsStorage.getWathedFilmsList();
    resetMarkup();
    appendPopularMarkup(watchedList);
}