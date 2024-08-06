import { generateThumbnails } from './thumbnail.js';
import { displayBigPicture } from './fullSizeImage.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find((item) => item.id === +thumbnail.dataset.thumbnailId);
    displayBigPicture(picture);
  });

  generateThumbnails(pictures, container);
};

export {renderGallery};
