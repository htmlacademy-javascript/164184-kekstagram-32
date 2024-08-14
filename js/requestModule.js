import { renderGallery } from './gallery';
import {showingDownloadError, showingSuccess, showingError} from './util.js';


const requestDate = () => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((date) => renderGallery(date))
    .catch(() => {
      showingDownloadError();
    });
};

const sendingData = (imgUploadForm) => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      //mode: 'no-cors',
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
    })
    .catch(() => {
      showingError();
    });
};

export {requestDate, sendingData};

