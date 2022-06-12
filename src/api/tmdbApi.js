import axiosClient from "./axiosClient";
import PlaceHoderImage from '../assets/images/placeholder.jpg'

// Thể Loại
export const Categories = {
  movie: "movie",
  tv: "tv",
};

// Danh mục phim
export const moviesTypes = {
  'Now Playing': "now_playing",
  'Popular': "popular",
  'Top rate': "top_rated",
};
// Thể loại phim
export const moviesGenres = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

export const tvTypes = {
  'On the Air': "on_the_air",
  'Top Rated': "top_rated",
  Popular:'popular'
};
export const tvGenres = {
  "Action & Adventure": 10759,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Kids: 10762,
  Mystery: 9648,
  News: 10763,
  Reality: 10764,
  "Sci-Fi & Fantasy": 10765,
  Soap: 10766,
  Talk: 10767,
  "War & Politics": 10768,
  Western: 37,
};

// Hàm get data
const tmdbApi = {
  // Lấy phim từ type
  getMoviesByType: (type,category, params) => {
    const url = `${category}/${moviesTypes[type] ?? tvTypes[type]}`;
    return axiosClient.get(url, params);
  },
  //Lấy phim từ genre
  getMoviesByGenre: (category, params) => {
    const url = `/discover/${category}`;
    return axiosClient.get(url, params);
  },
  // Tìm kiếm
  search: (category, params) =>{
    const url = `/search/${category}`;
    return axiosClient.get(url, params);
  },
  getDetail: (category,id,params) =>{
    const url = `/${category}/${id}`;
    return axiosClient.get(url, params);
  },
  getCredit: (category,id,params) =>{
    const url = `/${category}/${id}/credits`;
    return axiosClient.get(url, params);
  },
  getVideos: (category,id,params) =>{
    const url = `/${category}/${id}/videos`;
    return axiosClient.get(url, params);
  },
  getSimilar: (category,id,params) =>{
    const url = `/${category}/${id}/similar`;
    return axiosClient.get(url, params);
  },
  // hàm lấy đường dẫn ảnh
  originalImage: (imgPath) => !(imgPath  === undefined || imgPath === null) ? `https://image.tmdb.org/t/p/original${imgPath}` : PlaceHoderImage,
  w500Image: (imgPath) => !(imgPath  === undefined || imgPath === null) ? `https://image.tmdb.org/t/p/w500${imgPath}` : PlaceHoderImage,
  sortPopularity : (list) => (list.sort((a,b) => b.popularity - a.popularity))
};

export default tmdbApi;
