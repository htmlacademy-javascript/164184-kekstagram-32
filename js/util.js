import {closeImgUploadOverlay} from './form';

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const templateErrorContainer = document.querySelector('#data-error').content.cloneNode(true);
const errorContainer = templateErrorContainer.querySelector('.data-error');
const hideDownloadError = () => {
  errorContainer.remove();
};

const showingDownloadError = () => {
  document.body.appendChild(errorContainer);
  setTimeout(hideDownloadError, 5000);
};

const templateSuccess = document.querySelector('#success').content.cloneNode(true);
const successContainer = templateSuccess.querySelector('.success');
const successButtonClose = successContainer.querySelector('.success__button');
const successInner = successContainer.querySelector('.success__inner');
const showingSuccess = () => {
  document.body.appendChild(successContainer);
};

const successContainerClose = () => {
  successContainer.remove();
  closeImgUploadOverlay();
};

successButtonClose.addEventListener('click', () => {
  successContainerClose();
});

document.addEventListener('keydown', (evn) => {
  if(evn.key === 'Escape') {
    successContainer.remove();
  }
});

successContainer.addEventListener('click', (event) => {
  if (!successInner.contains(event.target)) {
    successContainer.remove(); // Удаляем блок section.success
  }
});

const templateError = document.querySelector('#error').content.cloneNode(true);
const errorContainerInner = templateError.querySelector('.error');
const errorButtonClose = errorContainerInner.querySelector('.error__button');
const errorInner = errorContainerInner.querySelector('.error__inner');

const showingError = () => {
  document.body.appendChild(errorContainerInner);
};

const errorContainerClose = () => {
  errorContainerInner.remove();
};

errorButtonClose.addEventListener('click', () => {
  errorContainerClose();
});

document.addEventListener('keydown', (evn) => {
  const errorContainerInnerP = document.querySelector('.error');
  if(evn.key === 'Escape' && errorContainerInnerP) {
    errorContainerClose();
  } else if(evn.key === 'Escape') {
    closeImgUploadOverlay();
  }
});

errorContainerInner.addEventListener('click', (event) => {
  if (!errorInner.contains(event.target)) {
    errorContainerClose(); // Удаляем блок section.success
  }
});

export {getRandomInteger, isEscapeKey, showingDownloadError, showingSuccess, showingError};
