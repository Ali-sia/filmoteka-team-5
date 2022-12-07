import { btnScroll } from '../refs';

window.addEventListener('scroll', onWindowScroll);

function onWindowScroll() {
  if (scrollY > 200) {
    btnScroll.style.display = 'flex';
  } else {
    btnScroll.style.display = 'none';
  }
}
