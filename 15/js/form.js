import { sendingData } from './requestModule.js';

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const textHashtagsInput = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
let currentScale = 1;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    sendingData(imgUploadForm);
    //evt.target.submit();
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
  textHashtagsInput.value = '';
  textDescription.value = '';
  slider.noUiSlider.updateOptions({start:100});
};

imgUploadCancelButton.addEventListener('click', () => {
  closeImgUploadOverlay();
});

document.addEventListener('keydown', (evn) => {
  const success = document.querySelector('.success');
  if(evn.key === 'Escape' && success) {
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

const updateScale = (scale) => {
  currentScale = scale;
  scaleValueInput.value = `${Math.round(currentScale * 100)}%`;
  previewImage.style.transform = `scale(${currentScale})`;
};

smallerButton.addEventListener('click', () => {
  if (currentScale > 0.25) {
    updateScale(currentScale - 0.25);
  }
});

biggerButton.addEventListener('click', () => {
  if (currentScale < 1) {
    updateScale(currentScale + 0.25);
  }
});

updateScale(currentScale);

noUiSlider.create(slider, {
  start: 100, // Начальное значение
  step: 1,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  }
});

const effectLevelValue = document.querySelector('.effect-level__value');
const effectsRadioButtons = document.querySelectorAll('.effects__radio');
let currentEffect = 'none';

const updateImageFilter = (sliderValue) => {
  switch (currentEffect) {
    case 'chrome':
      imgUploadEffectLevel.style.display = 'block';
      effectLevelValue.value = sliderValue / 100;
      previewImage.style.filter = `grayscale(${sliderValue / 100})`;
      break;
    case 'sepia':
      imgUploadEffectLevel.style.display = 'block';
      effectLevelValue.value = sliderValue / 100;
      previewImage.style.filter = `sepia(${sliderValue / 100})`;
      break;
    case 'marvin':
      imgUploadEffectLevel.style.display = 'block';
      effectLevelValue.value = sliderValue;
      previewImage.style.filter = `invert(${sliderValue}%)`;
      break;
    case 'phobos':
      imgUploadEffectLevel.style.display = 'block';
      effectLevelValue.value = sliderValue / 100 * 3;
      previewImage.style.filter = `blur(${sliderValue / 100 * 3}px)`;
      break;
    case 'heat':
      imgUploadEffectLevel.style.display = 'block';
      effectLevelValue.value = `${1 + (sliderValue / 100 * 2)}`;
      previewImage.style.filter = `brightness(${1 + (sliderValue / 100 * 2)})`;
      break;
    default:
      imgUploadEffectLevel.style.display = 'none';
      previewImage.style.filter = '';
      break;
  }

  effectLevelValue.value = sliderValue;
};

slider.noUiSlider.on('update', () => {
  updateImageFilter(slider.noUiSlider.get());
});

effectsRadioButtons.forEach((button) => {
  button.addEventListener('change', (event) => {
    currentEffect = event.target.value;

    switch (currentEffect) {
      case 'chrome':
      case 'sepia':
      case 'marvin':
      case 'phobos':
      case 'heat':
        slider.noUiSlider.updateOptions({
          range: {
            'min': 0,
            'max': 100
          },
          start: 100,
          step: 1
        });
        break;
      case 'none':
      default:
        slider.noUiSlider.updateOptions({
          range: {
            'min': 0,
            'max': 100
          },
          start: 100,
          step: 1
        });
        previewImage.style.filter = '';
        break;
    }

    updateImageFilter();
  });
});

export {closeImgUploadOverlay};
