let showResults = document.querySelector(".results");
let form = document.querySelector(".search-input");
let spinner = document.getElementById("spinner");
let splitScreen = document.querySelector(".search");
let resultCount = document.querySelector(".result-count");
let addTenResults = document.querySelector(".addTen");
let albumnDetails = document.querySelector('.albumn-details')
let searchHeight = document.getElementById('search-side')
addTenResults.classList.add('hidden')
searchHeight.classList.remove('searchheight')
let limit = 20;
let searchTerm = "";
let results = [];


function handleFormSubmit(event) {
  event.preventDefault();
  flexScreen();
  getData();
}

function displayResults() {
  const count = Math.min(limit, results.length);
  showResults.textContent = "";
  resultCount.innerHTML = `
    <p>Search Result: ${count} for ${searchTerm}</p>
    `;
  for (var i = 0; i < count; i++) {
    let img = results[i].artworkUrl100;
    let songTitle = results[i].collectionName;
    let name = results[i].artistName;
    let data = results[i]

    let render = `
        <div class = "album-results">
        <img src="${img}" alt="">
        <h3> ${name} </h3>
        <h2> ${songTitle} </h2>
        </div>
        `;
    showResults.insertAdjacentHTML("beforeEnd", render);
    showResults.lastElementChild.addEventListener('click', function(){
        searchHeight.classList.add('searchHeight')
        albumnDetails.innerHTML = `
        <img src="${img}" alt="">
        <p>${name}</p>
        <p>${songTitle}</p>
        <p>Explicit: ${data.collectionExplicitness}</p>
        <p>Country: ${data.country}</p>
        <p>Genre: ${data.primaryGenreName}</p>
        <p>Track Count: ${data.trackCount}</p>
        <p>Cost: $${data.collectionPrice}</p>
        `
    }) 
  }
}

function getData() {
  results = [];
  limit = 20;
  searchTerm = document.querySelector("#user-input").value;
  fetch(
    `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=200`
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (json) {
      results = json.results;
      console.log(results)
      displayResults();
    })
    .catch(function (e) {
      console.error(e);
    });
}

function flexScreen() {
  spinner.classList.add("showSpinner");
  addTenResults.classList.remove('hidden')
  setTimeout(() => {
    spinner.classList.remove("showSpinner");
  }, 1000);
  splitScreen.classList.remove("split");
}

function handleAdd10Results() {
  limit += 10;
  displayResults();
}

form.addEventListener("submit", handleFormSubmit);
addTenResults.addEventListener("click", handleAdd10Results);
