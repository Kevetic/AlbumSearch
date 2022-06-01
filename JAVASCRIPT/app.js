let showResults = document.querySelector(".results");
let form = document.querySelector(".search-input");
let spinner = document.getElementById("spinner");
let splitScreen = document.querySelector(".search");
let resultCount = document.querySelector(".result-count");
let addTenResults = document.querySelector(".addTen");
let albumnDetails = document.querySelector('.albumn-details')
addTenResults.classList.add('hidden')
let limit = 10;
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

    let render = `
        <div class = "album-results">
        <img src="${img}" alt="">
        <h3> ${name} </h3>
        <h2> ${songTitle} </h2>
        </div>
        `;
    showResults.insertAdjacentHTML("beforeEnd", render);
    showResults.lastElementChild.addEventListener('click', function(){
        albumnDetails.innerHTML = `
        <img src="${img}" alt="">
        <p>${name}</p>
        <p>${songTitle}</p>
        `
    }) 
  }
}

function getData() {
  results = [];
  limit = 10;
  searchTerm = document.querySelector("#user-input").value;
  fetch(
    `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=200`
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (json) {
      results = json.results;
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
