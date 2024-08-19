import { firstStart } from './thumbnail.js';
import { displayBigPicture } from './full-size-image.js';

const container = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');


const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    const picture = pictures.find((item) => item.id === +thumbnail.dataset.thumbnailId);
    displayBigPicture(picture);
  });

  imgFilters.classList.remove('img-filters--inactive');
  firstStart(pictures, container);
};

export {renderGallery};
