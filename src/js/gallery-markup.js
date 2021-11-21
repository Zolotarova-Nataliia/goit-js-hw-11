export const galleryMarkup = images => {
  return images
    .map(
      ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
       <a class="gallery__item" href="${largeImageURL}">
  <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes </b>
      <span class="info-item__value"> ${likes}</span>
    </p>
    <p class="info-item">
      <b>Views </b>
      <span class="info-item__value"> ${views}</span>
    </p>
    <p class="info-item">
      <b>Comments </b>
      <span class="info-item__value">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads </b>
      <span class="info-item__value">${downloads}</span>
    </p>
  </div>
  </a>
</div>`,
    )
    .join('');
};
