const global = {currentPage : window.location.pathname}



async function displayPopularMovies(){
    const {results} = await fetchApiData("movie/popular");
    console.log(results)
    
    results.forEach( movie => {
        const div = document.createElement('div')
    div.classList.add("card")
    div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
    ${
        movie.poster_path ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />` : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">${movie.release_date}</small>
    </p>
  </div>`
  document.querySelector('#popular-movies').appendChild(div)
    }
    );
}

async function fetchApiData(endpoint){
    const API_KEY = "7664905aed05be718462ca36381d0bd8";
    const API_URL = "https://api.themoviedb.org/3/";
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=EN-US`);
    const data = await response.json();
    return data;
}


function highlightActiveLink(){
    const links = document.querySelectorAll('.nav-link')
    links.forEach((link) => {
        if (link.getAttribute('href')===global.currentPage){
            link.classList.add('active');
        }
    }

    )
}

function init(){
    switch(global.currentPage){
        case '/':
            case '/index.html':
            displayPopularMovies();
            break;
        case '/search.html':
            console.log("Search")
            break;
        case '/shows.html':
            console.log("Shows")
            break;
        case '/movie-details.html':
            console.log("Movie Details")
            break;
        case '/tv-details.html':
            console.log("TV Details")
            break;
    }
    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded',init)