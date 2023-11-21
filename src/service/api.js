import axios from 'axios';

const API_KEY = '40083915-617302bde326bce23573f4f7f';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  orientation: 'horizontal',
  per_page: 12,
  key: API_KEY,
  image_type: 'photo',
};

export async function getImages(query, page) {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
}
