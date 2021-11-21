import { getImagesByQuery } from './js/pixabay-api';
import { galleryMarkup } from './js/gallery-markup';
import './sass/styles.scss';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputRef = document.querySelector('[name="searchQuery"]');
const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const loadmoreBtnRef = document.querySelector('.gallery-btn');

let pageNumber = 1;
const imgPerPage = 100;
let lightbox = new SimpleLightbox('.gallery a');

let totalHitsNum = 0;
loadmoreBtnRef.classList.add('visually-hidden');
formRef.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  loadmoreBtnRef.classList.add('visually-hidden');
  clearGallery();
  pageNumber = 1;

  event.preventDefault();
  if (inputRef.value === '') {
    return;
  }
  const data = await getImagesByQuery(inputRef.value, pageNumber, imgPerPage);
  totalHitsNum = data.totalHits;
  if (data.hits.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }
  renderGallery(data);
  loadmoreBtnRef.classList.remove('visually-hidden');
  Notify.info(`Hooray! We found ${totalHitsNum} images.`);
}
loadmoreBtnRef.addEventListener('click', onLoadmoreBtnClick);

async function onLoadmoreBtnClick() {
  const totalPageNum = Math.ceil(totalHitsNum / imgPerPage);
  if (totalPageNum === pageNumber) {
    loadmoreBtnRef.classList.add('visually-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }
  pageNumber += 1;
  const data = await getImagesByQuery(inputRef.value, pageNumber, imgPerPage);

  renderGallery(data);
}

function renderGallery(data) {
  galleryRef.insertAdjacentHTML('beforeend', galleryMarkup(data.hits));
  lightbox.refresh();
}

function clearGallery() {
  galleryRef.innerHTML = '';
}
