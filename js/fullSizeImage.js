const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsBlock = bigPicture.querySelector('.social__comments');
const body = document.querySelector('body');

const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const fragmentComment = document.createDocumentFragment();
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');

let commentsShow = 0;
let currentComments = [];

const createSocialComment = ({avatar, message, name}) => {
  const socialComment = socialCommentTemplate.cloneNode(true);
  socialComment.querySelector('.social__picture').src = avatar;
  socialComment.querySelector('.social__picture').alt = name;
  socialComment.querySelector('.social__text').textContent = message;
  fragmentComment.append(socialComment);
};

const renderComments = (comments) => {
  commentsShow += COMMENTS_PER_PORTION;
  let counterCommentShown = 0;

  for(let i = 0; i < commentsShow; i++) {
    if(i < comments.length) {
      createSocialComment(comments[i]);
      counterCommentShown++;
    } else {
      break;
    }
  }

  if (counterCommentShown === comments.length) {
    commentsLoaderButton.classList.add('hidden');
  }

  socialCommentShownCount.textContent = counterCommentShown;
  socialCommentsBlock.innerHTML = '';
  socialCommentsBlock.append(fragmentComment);
};

const loadMoreComments = () => renderComments(currentComments);

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentsShow = 0;
  commentsLoaderButton.classList.remove('hidden');
  commentsLoaderButton.removeEventListener('click', loadMoreComments);
};

const displayBigPicture = ({description, url, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;

  socialCommentsBlock.innerHTML = '';
  currentComments = comments;
  renderComments(comments);

  commentsLoaderButton.removeEventListener('click', loadMoreComments);
  commentsLoaderButton.addEventListener('click', loadMoreComments);

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', (evn) => {
    if(evn.key === 'Escape') {
      closeBigPicture();
    }
  });
};

bigPictureCancel.addEventListener('click', closeBigPicture);

export { displayBigPicture };
