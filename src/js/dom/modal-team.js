import { modalTeamBtn, backdropModalTeam, modalCloseBtnTeam } from '../refs';

modalTeamBtn.addEventListener('click', openModalTeam);

function openModalTeam() {
  console.log('---open');
  backdropModalTeam.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  modalCloseBtnTeam.addEventListener('click', closeModal);
  document.addEventListener('click', closeModalByOutBackdropClick);
  document.addEventListener('keydown', closeModalByEsc);
}

function closeModal() {
  backdropModalTeam.classList.add('is-hidden');
  document.body.style.overflow = 'overlay';
  modalCloseBtnTeam.removeEventListener('click', closeModal);
  document.removeEventListener('click', closeModalByOutBackdropClick);
  document.removeEventListener('keydown', closeModalByEsc);
}

function closeModalByOutBackdropClick(e) {
  if (e.target === backdropModalTeam) {
    closeModal();
  }
}

function closeModalByEsc(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}
