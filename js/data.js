import {getRandomInteger, createIdGenerator} from './util.js';


const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;

const MESSAGECOMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AUTHORSOFCOMMENTS = [
  'Артем', 'Леха', 'Игорь', 'Денис', 'Александр', 'Олег', 'Иван', 'Антон', 'Стас', 'Демид'
];

const DESCRIPTIONIMAGE = [
  'Потрясающий закат над городом.',
  'Утренний кофе и свежие булочки.',
  'Вечерняя прогулка по пляжу.',
  'Смешной котик в шляпе.',
  'Горы и леса на горизонте.',
  'Красочный фейерверк в небе.',
  'Уютный вечер у камина.'
];

const generatePhotoId = createIdGenerator();
const generateCommentsId = createIdGenerator();

const createObjCommentsImage = () => {
  const id = generateCommentsId();
  return {
    id,
    avatar: `img/avatar-${getRandomInteger (1, AVATAR_COUNT)}.svg`,
    message: MESSAGECOMMENTS[getRandomInteger(0, MESSAGECOMMENTS.length - 1)],
    name: AUTHORSOFCOMMENTS[getRandomInteger(0, AUTHORSOFCOMMENTS.length - 1)],
  };
};

const createObjImage = () => {
  const id = generatePhotoId();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONIMAGE[getRandomInteger(0, DESCRIPTIONIMAGE.length - 1)],
    likes: getRandomInteger (LIKE_MIN_COUNT, LIKE_MAX_COUNT),
    comments: Array.from({length: getRandomInteger(0, 30)}, createObjCommentsImage)
  };
};

const generationObjFoto = () => {
  const arrObjImages = Array.from({length: PICTURE_COUNT}, createObjImage);
  return arrObjImages;
};

export {generationObjFoto};

