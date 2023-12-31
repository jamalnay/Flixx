const global = {
  currentPage : window.location.pathname,
  search: {
    term:'',
    type:'',
    page:1,
    totalPages:1
  },
  api:{
    key:"7664905aed05be718462ca36381d0bd8",
    url:"https://api.themoviedb.org/3/"
  }
}

function init(){
  switch(global.currentPage){
      case '/':
          case '/index.html':
              displayMoviesSlider();
              displayPopularMovies();
          break;
      case '/search.html':
          search();
          break;
      case '/shows.html':
          displayPopularShows()
          break;
      case '/movie-details.html':
          displayMovieDetails();
          break;
      case '/tv-details.html':
          displayShowDetails()
          break;
  }
  highlightActiveLink();
}

async function fetchApiData(endpoint){
  showSpinner();
  const API_KEY = global.api.key;
  const API_URL = global.api.url;
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=EN-US`);
  const data = await response.json();
  hideSpinner();
  return data;
}


async function displayPopularMovies(){
    const {results} = await fetchApiData("movie/popular");
    
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


async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1]
    const movie = await fetchApiData(`movie/${movieId}`);

    addBackgroundImage('movie',movie.backdrop_path);

    const div = document.createElement('div')
    div.innerHTML = `
    <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date} </p>
            <p>
            ${movie.overview} 
            </p>
            <h5>Genres</h5>
            ${movie.genres.map((genre)=>`<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $ ${movie.budget}</li>
            <li><span class="text-secondary">Revenue:</span> $ ${movie.revenue}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies.map((company)=>`<span>${company.name}</span>`).join(', ')}
          </div>
        </div>
    `;
    document.querySelector('#movie-details').appendChild(div)
}


async function displayPopularShows(){
    const {results} = await fetchApiData("tv/popular");
    
    results.forEach( show => {
        const div = document.createElement('div')
    div.classList.add("card")
    div.innerHTML = `<a href="tv-details.html?id=${show.id}">
    ${
        show.poster_path ? `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
      />` : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${show.name}</h5>
    <p class="card-text">
      <small class="text-muted">Air Date: ${show.first_air_date}</small>
    </p>
  </div>`
  document.querySelector('#popular-shows').appendChild(div)
    }
    );
}

async function displayShowDetails(){
    const showId = window.location.search.split('=')[1]
    const show = await fetchApiData(`tv/${showId}`);

    addBackgroundImage('show',show.backdrop_path);

    const div = document.createElement('div')
    div.innerHTML = `
    <div class="details-top">
          <div>
          ${
            show.poster_path ? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />` : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
        }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date} </p>
            <p>
            ${show.overview} 
            </p>
            <h5>Genres</h5>
            ${show.genres.map((genre)=>`<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes: </span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air: </span>${show.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status: </span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${show.production_companies.map((company)=>`<span>${company.name}</span>`).join(', ')}
          </div>
        </div>
    `;
    document.querySelector('#show-details').appendChild(div)
}

async function search(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');
  if (global.search.term != '' && global.search.term != null){
    const {page, results, total_pages,total_results} = await searchApi();
    if (results.length === 0){
      showAlert('No results found')
      return;
    }
    global.search.page = page;
    global.search.totalPages = total_pages;
    console.log(results)
    document.querySelector('#search-results-heading').innerHTML=`
    <h2>${results.length} results for ${total_results}</h2>
    `
    displaySearchResults(results);
    document.querySelector('#search-term').value='';
  }else {
    showAlert('Search query can\'t be empty','error')
  }
}

async function searchApi(){
  showSpinner();
  const API_KEY = global.api.key;
  const API_URL = global.api.url
  const response = await fetch(`${API_URL}search/${global.search.type}?query=${global.search.term}&api_key=${API_KEY}&language=EN-US&page=${global.search.page}`);
  const data = await response.json();
  hideSpinner();
  return data;
}

function displaySearchResults(results){

  document.querySelector('#search-results').innerHTML =``
  document.querySelector('#search-results-heading').innerHTML =``
  document.querySelector('#pagination').innerHTML =``

  const type = global.search.type;

  results.forEach( result => {
    let name = ""
    let date = ""
    if (type=="movie")
    {
      name = result.title;
      date= "Release Date: "+result.release_date;
    } else{
      name = result.name
      date = "Air Date: "+result.first_air_date
    }

    const div = document.createElement('div')
    div.classList.add("card")
    div.innerHTML = `
    <a href="${type}-details.html?id=${result.id}">
    ${
        result.poster_path ? `<img
        src="https://image.tmdb.org/t/p/w500${result.poster_path}"
        class="card-img-top"
        alt="${name}"
      />` : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${name}"
    />`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">
      <small class="text-muted">${date}</small>
    </p>
  </div>
  `
  document.querySelector('#search-results').appendChild(div)
    }
    );

  displayPagination();
}

function displayPagination(){
  const div = document.createElement('div');
  div.classList.add('pagination')
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `
  document.querySelector('#pagination').appendChild(div)


  if (global.search.page === 1){
    document.querySelector("#prev").disabled = true
  }
  if (global.search.page === global.search.totalPages){
    document.querySelector("#next").disabled = true
  }

  // Display next Page
  document.querySelector('#next').addEventListener('click', async () => {
  global.search.page++;
  const {results} = await searchApi();
  displaySearchResults(results);
  })
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const {results} = await searchApi();
    displaySearchResults(results);
    })
}

function addBackgroundImage(type,path){
    const div = document.createElement('div');
    div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`
    div.style.backgroundPosition = 'center' 
    div.style.backgroundSize = 'cover'
    div.style.backgroundRepeat = 'no-repeat'
    div.style.height = '100vh'
    div.style.width = '100vw'
    div.style.position = 'absolute'
    div.style.top = '0'
    div.style.left = '0'
    div.style.zIndex = '-1'
    div.style.opacity = '0.2'

    if (type === 'movie'){
        document.querySelector("#movie-details").appendChild(div);
    } else {
        document.querySelector("#show-details").appendChild(div);
    } 
}

async function displayMoviesSlider(){
    const {results} = await fetchApiData('movie/now_playing');
    results.forEach((movie) => {
        const div = document.createElement('div')
        div.classList.add('swiper-slide')
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
        `
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();

        console.log(-4+3+"8");
        

    })
    
}

function initSwiper(){
    const swiper = new Swiper('.swiper',
    {
        slidesPerView:1,
        spaceBetween:30,
        freeMode:true,
        loop:true,
        autoplay:{
            delay:4000,
            disableOnInteraction:false
        },
        breakpoints:{
            500:{slidesPerView:2},
            700:{slidesPerView:3},
            1200:{slidesPerView:5}
        }
    });
}



function showSpinner(){
    document.querySelector('.spinner').classList.add('show')
}
function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show')
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

function showAlert(message, className ){
  const alertBox = document.createElement('div');
  alertBox.classList.add('alert',className);
  alertBox.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertBox);
  setTimeout(() => alertBox.remove(),3000)
}

document.addEventListener('DOMContentLoaded',init)