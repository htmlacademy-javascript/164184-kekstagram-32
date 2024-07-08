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

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function() {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generatePhotoId = createIdGenerator();
const generateCommentsId = createIdGenerator();

const createObjCommentsImage = () => {
  const id = generateCommentsId();
  return {
    id,
    avatar: `img/avatar-${getRandomInteger (1, 6)}.svg`,
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
    likes: getRandomInteger (15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createObjCommentsImage)
  };
};

const generationObjFoto = () => {
  const arrObjImages = Array.from({length: 25}, createObjImage);
  return arrObjImages;
};

generationObjFoto();
