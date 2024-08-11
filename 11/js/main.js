import { generationObjFoto } from './data.js';
import { renderGallery } from './gallery.js';
import './form.js';

const arrFoto = generationObjFoto();
renderGallery(arrFoto);
