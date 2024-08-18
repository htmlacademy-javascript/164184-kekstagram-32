const thumbNailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesTitle = document.querySelector('.pictures__title');
const imgUpload = document.querySelector('.img-upload');
const filterDefaultButton = document.getElementById('filter-default');
const filterDiscussedButton = document.getElementById('filter-discussed');
const filterRandomButton = document.getElementById('filter-random');

let containerGallery = null;
let originalArrPictures = [];

const createThumbnail = ({url, description, likes, comments, id}) => {
  const thumbnail = thumbNailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const generateThumbnails = (pictures, container) => {
  container.innerHTML = '';
  container.append(picturesTitle);
  container.append(imgUpload);
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

const firstStart = (pictures, container) => {
  originalArrPictures = [...pictures];
  containerGallery = container;
  generateThumbnails(pictures, container);
};

const sortDiscussed = (pictures, container) => {
  const picturesSort = [...pictures].sort((a, b) => b.comments.length - a.comments.length);
  generateThumbnails(picturesSort, container);
};

const showDefault = (pictures, container) => {
  generateThumbnails(pictures, container);
};

const getRandomPictures = (pictures, count) => {
  const shuffled = [...pictures].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const showRandomThumbnails = (pictures, container) => {
  const randomPictures = getRandomPictures(pictures, 10);
  generateThumbnails(randomPictures, container);
};

let timeout;
const debounce = (func, delay) => (...args) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => func.apply(this, args), delay);
};

const RERENDER_DELAY = 500;
const debouncedShowDefault = debounce(() => showDefault(originalArrPictures, containerGallery), RERENDER_DELAY);
const debouncedSortDiscussed = debounce(() => sortDiscussed(originalArrPictures, containerGallery), RERENDER_DELAY);
const debouncedShowRandomThumbnails = debounce(() => showRandomThumbnails(originalArrPictures, containerGallery), RERENDER_DELAY);

const updateActiveFilterClass = (activeButton) => {
  filterDefaultButton.classList.remove('img-filters__button--active');
  filterDiscussedButton.classList.remove('img-filters__button--active');
  filterRandomButton.classList.remove('img-filters__button--active');
  activeButton.classList.add('img-filters__button--active');
};

filterDefaultButton.addEventListener('click', () => {
  updateActiveFilterClass(filterDefaultButton);
  debouncedShowDefault();
});

filterDiscussedButton.addEventListener('click', () => {
  updateActiveFilterClass(filterDiscussedButton);
  debouncedSortDiscussed();
});

filterRandomButton.addEventListener('click', () => {
  updateActiveFilterClass(filterRandomButton);
  debouncedShowRandomThumbnails();
});

export {firstStart};


