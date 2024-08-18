import { renderGallery } from './gallery.js';
import {showingDownloadError, showingSuccess, showingError} from './util.js';
import {blockFormSubmitButton} from './form.js';


const requestDate = () => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((date) => renderGallery(date))
    .catch(() => showingDownloadError());
};

const sendingData = (imgUploadForm) => {
  blockFormSubmitButton(true);
  fetch('https://32.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body: new FormData(imgUploadForm),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then(() => {
      showingSuccess();
      blockFormSubmitButton(false);
    })
    .catch(() => {
      showingError();
      blockFormSubmitButton(false);
    });
};

export {requestDate, sendingData};
