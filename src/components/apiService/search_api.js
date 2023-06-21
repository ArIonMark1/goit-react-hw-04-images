import axios from 'axios';

const API_KEY = '35924349-e744a5a24a3ba0b665be73a1d';
const URL = 'https://pixabay.com/api/';

const handleSearchHits = async (request, page, per_page) => {
  const result = await axios.get(URL, {
    params: {
      key: API_KEY,
      q: request,
      page,
      per_page,
    },
  });
  if (result.status === 200) {
    return result.data;
  }
  return Promise.reject(
    new Error(`${request} Wrong request!! Nothing was found on your request. `)
  );
};

export default handleSearchHits;
