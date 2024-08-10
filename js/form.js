const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancelBottun = document.querySelector('.img-upload__cancel');
const textHashtagsInput = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    evt.target.submit();
  }
  pristine.validate();
});

const validateHashtagFormat = (value) => {
  if (value.trim() === '') {
    return true;
  } // Поле валидно, если оно пустое
  const hashtags = value.trim().split(/\s+/);
  const hashtagRegex = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/;
  return hashtags.every((tag) => hashtagRegex.test(tag));
};

const validateHashtagUnique = (value) => {
  if (value.trim() === '') {
    return true;
  } // Поле валидно, если оно пустое
  const hashtags = value.trim().split(/\s+/);
  const lowerCasedHashtags = hashtags.map((tag) => tag.toLowerCase());
  return new Set(lowerCasedHashtags).size === lowerCasedHashtags.length;
};

const validateHashtagCount = (value) => {
  if (value.trim() === '') {
    return true;
  } // Поле валидно, если оно пустое
  const hashtags = value.trim().split(/\s+/);
  return hashtags.length <= 5;
};

pristine.addValidator(textHashtagsInput, validateHashtagFormat, 'Введены недопустимые символы');
pristine.addValidator(textHashtagsInput, validateHashtagUnique, 'Выявлены повторяющиеся хэштеги');
pristine.addValidator(textHashtagsInput, validateHashtagCount, 'Максимум 5 хэштегов');

imgUploadInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});

const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';
};

imgUploadCancelBottun.addEventListener('click', () => {
  closeImgUploadOverlay();
});

document.addEventListener('keydown', (evn) => {
  if(evn.key === 'Escape') {
    closeImgUploadOverlay();
  }
});

textHashtagsInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.stopPropagation(); // Останавливаем закрытие формы при нажатии Esc
  }
});

textDescription.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.stopPropagation(); // Останавливаем закрытие формы при нажатии Esc
  }
});
