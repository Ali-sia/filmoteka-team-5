import { getElement } from "./getElement";

export function activePage() {
    if (getElement(".header__container--is-home")) {
        isActivePage('[data-ref="home"]');
        return;
    }

    isActivePage('[data-ref="library"]');
}

function isActivePage(selector) {
    getElement(selector).classList.add("header__nav-item--is-active");
}