import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?key=24422661-37a7f6139833e92dcfc942398';

export const getImagesByQuery = async (searchQuery, pageNum, imgPerPage) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageNum,
      per_page: imgPerPage,
    },
  });
  return data;
};
