
const API_KEY = 'api_key=8f7a6f44d17491761ecdea75cf4e28ed';
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
let container = document.getElementById("movie-container");


const genre =
  [{ "id": 28, "name": "Action" },
   { "id": 12, "name": "Adventure" },
  { "id": 16, "name": "Animation" },
   { "id": 35, "name": "Comedy" },
  { "id": 80, "name": "Crime" }, 
  { "id": 99, "name": "Documentary" },
  { "id": 18, "name": "Drama" },
   { "id": 10751, "name": "Family" },
  { "id": 14, "name": "Fantasy" },
   { "id": 36, "name": "History" },
  { "id": 27, "name": "Horror" },
   { "id": 10402, "name": "Music" },
  { "id": 9648, "name": "Mystery" }, 
  { "id": 10749, "name": "Romance" },
  { "id": 878, "name": "Science Fiction" }, 
  { "id": 10770, "name": "TV Movie" },
  { "id": 53, "name": "Thriller" }, 
  { "id": 10752, "name": "War" }, 
  { "id": 37, "name": "Western" }];




function getMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(movies => showMovies(movies.results))
    .catch(error => alert(error))

}

function getGenreName(genre_id) {
  let genreName = [];
  for(let i = 0; i < genre_id.length; i++) {
    for(let j = 0; j < genre.length; j++) {
      if(genre_id[i] == genre[j]['id']) {
        genreName.push(genre[j]['name']);
      }
    }
  }
  return genreName;
}



function showMovies(movies) {
  container.innerHTML = '';

  console.log(movies);
  movies.forEach(movie => {
   const genreName = getGenreName( movie.genre_ids)
   let genres = "";
   for(let i =0; i < genreName.length; i++) {
    genres += `<li>${genreName[i]}</li>`;
    if (i == 2) break;
   }
   console.log(genres);

    let imgUrl = IMG_URL + movie.poster_path;
    console.log(imgUrl)
    container.innerHTML += `  <div class="movie-card">
    <div class ='overlay center'> 
   <button><i class="fa-solid fa-play"></i></button>
    </div>
        <div class="movie-img">
      <img src=${imgUrl} alt="">
        </div>
        <div class="description">
          <div class="movie-head">
            <h4>${movie.original_title}</h4>

            <ul class ='card-genres'>
            ${genres}
            </ul>
          </div>
          <div class="movie-foot">
          <div class='group'>
          <span><i class="fa-solid fa-star"></i></span>
          <span>${movie.vote_average}</span>
          </div>
          <div class='group'>
          <span><i class="fa-solid fa-clock"></i></span>
          <span>${movie.release_date}</span>
          </div>
           
          </div>
        </div>
      </div>`;

  });
}

getMovies(API_URL)