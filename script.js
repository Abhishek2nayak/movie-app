// define constants

const API_KEY = "api_key=8f7a6f44d17491761ecdea75cf4e28ed";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const TOP_MOVIES_URL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&${API_KEY}`;
const genre = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

//access the DOM

let container = document.getElementById("movie-container");
let searchTitle = document.getElementById('category-title')
let hero = document.getElementById("hero");
let searchFrom = document.getElementById('search-form')

//function to get movies

function getMovies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((movies) => showMovies(movies.results))
    .catch((error) => alert(error));
}

//function to get genre Name associated with id as a array

function getGenreName(genre_id) {
  let genreName = [];
  for (let i = 0; i < genre_id.length; i++) {
    for (let j = 0; j < genre.length; j++) {
      if (genre_id[i] == genre[j]["id"]) {
        genreName.push(genre[j]["name"]);
      }
    }
  }
  return genreName;
}

//function to get element of array as list .

function getListofItems(data) {
  let list = "";
  for (let i = 0; i < data.length; i++) {
    list += `<li>${data[i]}</li>`;
  }
  return list;
}

//function to display the movies

function showMovies(movies) {
  
  console.log(movies);
  container.innerHTML = ""; // removing intitial html inside container

  movies.forEach((movie) => {
    const genreName = getGenreName(movie.genre_ids.slice(0, 3));
    let genres = getListofItems(genreName);

    let imgUrl = IMG_URL + movie.poster_path;
    let title  = movie.title;
    if (title.length > 25) {
      title  = title.substring(0,22);
      title+='...';
    }
    container.innerHTML += `  
    <div class="movie-card">
  <div class="overlay center">
    <button><i class="fa-solid fa-play"></i></button>
  </div>
  <div class="movie-img">
    <img src="${imgUrl}" alt="" />
  </div>
  <div class="description">
    <div class="movie-head">
      <h4>${title}</h4>
      <ul class="card-genres">
        ${genres}
      </ul>
    </div>
    <div class="movie-foot">
      <div class="group">
        <span><i class="fa-solid fa-star"></i></span>
        <span>${movie.vote_average}</span>
      </div>
      <div class="group">
        <span><i class="fa-solid fa-clock"></i></span>
        <span>${movie.release_date}</span>
      </div>
    </div>
  </div>
</div>
`;
  });
}



var topMovies = [];

function getTopMovies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((movies) => {
      movies = movies.results;
      topMovies = movies.slice(0, 5);
      console.log(topMovies);
      populateHero(topMovies);
    })
    .catch((error) => alert(error));
}



var idx = 0;


function populateHero(recentLaunch) {
  setInterval(function () {
    console.log(recentLaunch[0]);

    if (idx == 5) idx = 0;

    const genreName = getGenreName(recentLaunch[idx].genre_ids);
    let genres = getListofItems(genreName);
    
    const ImageUrl = `https://image.tmdb.org/t/p/original/${recentLaunch[idx].backdrop_path}`;

    hero.innerHTML = `
  <div class="hero-img">
    <img src="${ImageUrl}" alt="" />
    <div class="hero-details">
      <div class="hero-header">
        <h1>${recentLaunch[idx].title}</h1>
        <div class="rating center">${recentLaunch[idx].vote_average}</div>
      </div>
      <div class="hero-middle">
        <ul class="hero-genre">
          ${genres}
        </ul>
        <p class="hero-description">${recentLaunch[idx].overview}</p>
      </div>
      <div class="hero-bottom">
        <div class="caste"></div>
        <h3>Release Date</h3>
        <p>${recentLaunch[idx].release_date}</p>
        <button>Play</button>
      </div>
    </div>
  </div> `;
    idx++;
  }, 5000);
}


//add event listnter on form submit

searchFrom.addEventListener('submit',(e)=> {
 
 // prevent from default submission of form
 e.preventDefault();
 //get search query
 
 let query = document.getElementById('search').value.trim();
 hero.style.display = 'none';
 searchTitle.innerText = `Search result of ${query}`
 const searchURL =  BASE_URL +`/search/movie?${API_KEY}&query=${query}`;
 getMovies(searchURL)
  
 alert(query)




})




getTopMovies(TOP_MOVIES_URL)
getMovies(API_URL);