// TheMovieDB connector
// Documentation: https://developers.themoviedb.org/3

const API_KEY = 'd4a8045464e5c17496ef776ab07cea1a';
const getUrl = (path, query = '') =>
  `https://api.themoviedb.org/3/${path}?api_key=${API_KEY}&${query}`;

export const getMovie = movie => getUrl(`movie/${movie}`);
export const searchMovie = terms => getUrl('search/movie', `query=${terms}`);
export const getImage = (path, size = 'original') => `https://image.tmdb.org/t/p/${size}/${path}`;
export const imageFallback = 'https://popcornsg.s3.amazonaws.com/gallery/1576022757-covers.png';
