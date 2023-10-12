const API_URL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=4bcf9facff0a502716b33545d16c9ef8';
const API_KEY = '4bcf9facff0a502716b33545d16c9ef8'; // Your API Key
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmNmOWZhY2ZmMGE1MDI3MTZiMzM1NDVkMTZjOWVmOCIsInN1YiI6IjY1Mjc3MWQyY2VkYWM0MDBmZjI5YTg1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q3c7OaksWNW5ZX30d37suxLZUjPCpZP1N8Kqr0uSGOY';
const form=document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('main')
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}';
const SEARCH_URL= 'https://api.themoviedb.org/3/search/keyword?query=nun&page=1' ;
// get movies
getMovies(API_URL)
async function getMovies(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    }
  });
  const data = await res.json();
  displayMovies(data.results)
  console.log(data.results);
}


function displayMovies(movies) {
    console.log(movies); // Log the fetched data to the console
    main.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const moviesElement = document.createElement('div');
        moviesElement.classList.add('container-movies');
        moviesElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" />
            <div class='movie-info'>
                <h3>${title}</h3>
                <span class="${getClassesByRating(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(moviesElement);
    });
}


function getClassesByRating(rating){
  if(rating>=8){
    return 'green'
  }else if(rating>=5){
    return 'orange'
  }else{
    return 'red'
  }
}





form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchValue = search.value.trim();

  if (searchValue && searchValue !== '') {
      const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${API_KEY}`;
      try {
          const res = await fetch(SEARCH_URL, {
              headers: {
                  Authorization: `Bearer ${BEARER_TOKEN}`
              }
          });
          const data = await res.json();
          displayMovies(data.results);
      } catch (error) {
          console.error('Error fetching data:', error);
      }

      search.value = ''; // Clear the search input after submission
  } else {
      window.location.reload(); // Reload the page if the search input is empty
  }

  const homeButton = document.getElementById('home-button');

  homeButton.addEventListener('click', () => {
      window.location.reload();
  });
  
  
  
});

document.addEventListener('DOMContentLoaded', () => {
  const homeButton = document.getElementById('home-button');
  const form = document.getElementById('form');
  const search = document.getElementById('search');
  const main = document.getElementById('main');

  homeButton.addEventListener('click', () => {
      window.location.reload();
  });

  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const searchValue = search.value.trim();
      if (searchValue) {
          try {
              const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=4bcf9facff0a502716b33545d16c9ef8`, {
                  headers: {
                      Authorization: `Bearer ${BEARER_TOKEN}`
                  }
              });
              const data = await res.json();
              displayMovies(data.results);
              search.value = ''; // Clear the search input after submission
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      } else {
          
      }
  });

  
});
