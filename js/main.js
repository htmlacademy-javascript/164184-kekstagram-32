import { generationObjFoto } from './data.js';
import { generateThumbnails } from './thumbnail.js';

const arrFoto = generationObjFoto();
generateThumbnails(arrFoto);
