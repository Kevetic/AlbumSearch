let showResults = document.querySelector(".results");
let form = document.querySelector(".search-input");
let spinner = document.getElementById("spinner");
let splitScreen = document.querySelector(".search");
let resultCount = document.querySelector(".result-count");
let addTenResults = document.querySelector(".addTen");
let limit = 200;

function handleFormSubmit(event) {
  event.preventDefault();
  flexScreen();
  getData();
}

function getData() {
  let searchTerm = document.querySelector("#user-input").value;
  fetch(
    `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=${limit}`
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (json) {
      let count = json.resultCount;
      showResults.textContent = "";
      resultCount.innerHTML = `
        <p>Search Result: ${count} for ${searchTerm}</p>
        `;
      for (var i = 0; i < json.results.length; i++) {
        let img = json.results[i].artworkUrl100;
        let songTitle = json.results[i].collectionName;
        let name = json.results[i].artistName;

        let render = `
            <div class = "album-results">
            <img src="${img}" alt="">
            <h3> ${name} </h3>
            <h2> ${songTitle} </h2>
            </div>
            `;
        showResults.insertAdjacentHTML("beforeEnd", render);
      }
    })
    .catch(function (e) {
      console.error(e);
    });
}

function flexScreen() {
  spinner.classList.add("showSpinner");
  setTimeout(() => {
    spinner.classList.remove("showSpinner");
  }, 1000);
  splitScreen.classList.remove("split");
}

function handleAdd10Results() {
  if (limit = 200) {
    limit += 10;
    getData();
  } else {
      return
  }
}

form.addEventListener("submit", handleFormSubmit);
addTenResults.addEventListener("click", handleAdd10Results);
