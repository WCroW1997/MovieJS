const API__KEY = 'cd8c616ed6b25eb05fd6fd488ec8ee4e'
const API__URL = 'https://api.themoviedb.org/3'
const popular = document.querySelector('.popular__zone')

const searchZone = document.querySelector('.search__zone')
const searchInput = document.getElementById('search')
const modal = document.querySelector('.modal')

let category = ''

async function loadPopularMovie() {
    const API__POPULAR__URL = `${API__URL}/movie/popular?api_key=${API__KEY}&language=en-US&page=1`
    const resp = await fetch(API__POPULAR__URL, {
        method: 'GET',
    })

    const respResults = await resp.json()
    
    if(resp.ok){
        getPopularMovie(respResults)
    }
}

function getPopularMovie(data) {
    const popularMovies =  data.results
    console.log(popularMovies);
    popularMovies.forEach(element => {
        const movieTitle = element.title
        const movieRate = element.vote_average
        const moviePoster = element.poster_path
        const movieId = element.id

        const template = 
        `
                    <div class="popular__card movieCard" onclick="showModal(${movieId})">
                        <img class="movieImg" src="https://image.tmdb.org/t/p/w500${moviePoster}" alt="">
                        <div class="movieCard__info">
                            <span class="movieCard__rate movieCard__rate_${getClassByRate(movieRate)}">${movieRate}</span>
                            <footer class="movieCard__footer">
                                <h3 class="movieCard__title">${movieTitle}</h3>
                            </footer>
                        </div>
                    </div>
        `

        popular.innerHTML += template
    });
}

loadPopularMovie()

async function loadSearchMovie(searchQuery) {
    const API__POPULAR__URL = `${API__URL}/search/movie?api_key=${API__KEY}&query=${searchQuery}&page=1`
    const resp = await fetch(API__POPULAR__URL, {
        method: 'GET',
    })

    const respResults = await resp.json()
    
    if(resp.ok){
        getSearchMovie(respResults)
    }
}


function getSearchMovie(data) {
    const search =  data.results
    console.log(search);
    search.forEach(element => {
        const movieTitle = element.title
        const movieRate = element.vote_average
        const moviePoster = element.poster_path
        const movieId = element.id
        

        const template = 
        `
                    <div class="popular__card movieCard" onclick="showModal(${movieId})">
                        <img class="movieImg" src="https://image.tmdb.org/t/p/w500${moviePoster}" alt="">
                        <div class="movieCard__info">
                            <span class="movieCard__rate movieCard__rate_${getClassByRate(movieRate)}">${movieRate}</span>
                            <footer class="movieCard__footer">
                                <h3 class="movieCard__title">${movieTitle}</h3>
                            </footer>
                        </div>
                    </div>
        `

        popular.innerHTML = ''
        searchZone.innerHTML += template 
    });
}

searchInput.addEventListener('input', () =>{
    searchZone.innerHTML = ''
    if (searchInput.value) {
        loadSearchMovie(searchInput.value);
    } else {
        loadPopularMovie()
    }
})


const createModal = data =>{
    console.log(data);
    const originTitle = data.original_title
    const overview = data.overview
    const title = data.title
    const moviePoster = data.poster_path
    const genres = data.genres
    console.log(genres)
    modal.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w500${moviePoster}" alt="" class="movie__poster">
                        <div class="modal__info">
                            <h2 class="movie__title">${title}</h2>
                            <div class="movie__ganres">
                                ${genres.map((genre) => `<span class="movie__ganre">${genre.name}</span>`)}
                            </div>
                            <p class="movie__originTitle">${originTitle}</p>
                            <p class="movie__overview">${overview}</p>
                            <button class="btn btn__modal" onclick="closeModal()">Close</button>
                        </div>
                    `
}

const showModal = index =>{
    modal.style.display = 'flex'
    loadDetailsMovie(index)
}

const closeModal = () =>{
    modal.style.display = 'none'
    
}

async function loadDetailsMovie(movieId) {
    const API__DETAILS__URL = `${API__URL}/movie/${movieId}?api_key=${API__KEY}&language=en-US`
    const resp = await fetch(API__DETAILS__URL, {
        method: 'GET',
    })

    const respResults = await resp.json()
    
    if(resp.ok){
        createModal(respResults)
    }
}

function getClassByRate(vote){
    if (vote >= 7) {
      return "green";
    } else if (vote > 5) {
      return "yellow";
    } else
      return "red";
 }