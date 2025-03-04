import { fetchImages } from './js/pixabay-api.js';
import { renderImages, smoothScrollToNewImages } from './js/render-functions.js';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#search-form');
  const input = document.querySelector('#search-input');
  const gallery = document.querySelector('#gallery');
  const loader = document.querySelector('#loader');
  const loadMoreBtn = document.querySelector('#load-more');

  let query = '';
  let page = 1;
  let totalHits = 0;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    query = input.value.trim();
    if (!query) {
      iziToast.error({ title: 'Error', message: 'Search query cannot be empty!' });
      return;
    }

    page = 1;
    loader.style.display = 'block';
    loadMoreBtn.style.display = 'none';

    try {
      const { hits, totalHits: fetchedTotalHits } = await fetchImages(query, page);
      totalHits = fetchedTotalHits;
      renderImages(hits, gallery);
      if (hits.length < totalHits) {
        loadMoreBtn.style.display = 'block';
      }
    } catch (error) {
      iziToast.warning({ title: 'No Results', message: error.message });
      loadMoreBtn.style.display = 'none';
    } finally {
      loader.style.display = 'none';
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    loader.style.display = 'block';
    try {
      const { hits } = await fetchImages(query, page);
      renderImages(hits, gallery, true);
      smoothScrollToNewImages();

      if (page * 15 >= totalHits) {
        loadMoreBtn.style.display = 'none';
        iziToast.info({ title: 'End', message: 'We\'re sorry, but you\'ve reached the end of search results.' });
      }
    } catch (error) {
      iziToast.warning({ title: 'No Results', message: error.message });
      loadMoreBtn.style.display = 'none';
    } finally {
      loader.style.display = 'none';
    }
  });
});