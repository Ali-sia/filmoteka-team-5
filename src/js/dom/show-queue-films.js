// відмалювати фільми з списку "Queue"
import { resetMarkup } from './show-popular-films';
import { appendPopularMarkup } from './show-popular-films';
import QueueFilmsStorage from '../storage/add-to-queue';

export const queueFilmsStorage = new QueueFilmsStorage;
export function onQueueLibClick() {
    const queueList = queueFilmsStorage.getQueueFilmsList();
    resetMarkup();
    appendPopularMarkup(queueList);
}