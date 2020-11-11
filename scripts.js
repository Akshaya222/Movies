const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


    var main=document.querySelector("main");
    var form=document.getElementById("form");
    var search=document.getElementById("search");
getMovies(APIURL);
 async function getMovies(url){
     const resp=await fetch(url);
     const respData=await resp.json();
     console.log(respData);
     showSelecteddMovie(respData.results);
 }
 function getColourByrate(vote_average){
    if(vote_average>7){
        return "green";
    }
    else if(vote_average>5){
        return "orange";
    }
    else{
        return "red";
    }
 }

 function showSelecteddMovie(movies){
   main.innerHTML='';
   movies.forEach(element=>{
     const { poster_path, title, vote_average, overview } = element;
        var  movieE=document.createElement('div');
        movieE.classList.add('movie');
        movieE.innerHTML=`
        <img src="${IMGPATH+poster_path}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColourByrate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h4>Overview: </h4>
         ${overview}</div>
        `;
   main.appendChild(movieE);
 });
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchTerm=search.value;
    if(searchTerm){
        getMovies(SEARCHAPI+searchTerm);
    }
    search.value="";
});
