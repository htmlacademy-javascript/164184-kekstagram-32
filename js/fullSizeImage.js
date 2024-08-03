const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsBlock = bigPicture.querySelector('.social__comments');
const body = document.querySelector('body');

const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const fragmentComment = document.createDocumentFragment();

const createSocialComment = ({avatar, message, name}) => {
  const socialComment = socialCommentTemplate.cloneNode(true);
  socialComment.querySelector('.social__picture').src = avatar;
  socialComment.querySelector('.social__picture').alt = name;
  socialComment.querySelector('.social__text').textContent = message;
  fragmentComment.append(socialComment);
};

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

const displayBigPicture = ({description, url, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  socialCommentsBlock.innerHTML = '';
  comments.forEach(createSocialComment);
  socialCommentsBlock.append(fragmentComment);

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', (evn) => {
    if(evn.key === 'Escape') {
      evn.preventDefault();
      closeBigPicture();
      document.removeEventListener('keydown');
    }
  });
};

bigPictureCancel.addEventListener('click', closeBigPicture);

export {displayBigPicture};
