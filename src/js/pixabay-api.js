import axios from 'axios';

const API_KEY = '49152661-7859b232d7a733d1d995afa08';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      per_page: 15,
      page: page,
    },
  });


  if (response.data.hits.length === 0) {
    throw new Error('Sorry, there are no images matching your search query. Please, try again!');
  }

  return { hits: response.data.hits, totalHits: response.data.totalHits };
}