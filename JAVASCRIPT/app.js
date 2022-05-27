let showResults = document.querySelector(".results")
let form = document.querySelector(".search-input")
let input = document.querySelector(".user-input")
let button = document.querySelector(".search-btn")
let spinner = document.getElementById("spinner");
let splitScreen = document.querySelector(".search")


// window.onload = emptyInput()
form.addEventListener("submit", function(event) {
    flexScreen()
    loadSpinner()
    // console.log(input.value)
    event.preventDefault()
    let ARTIST_NAME = document.querySelector("#user-input").value
    fetch(`https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200`)
    .then (function (data){
        return data.json()
    })
    .then (function(json) {
        console.log(json)  
        
        for (var i = 0; i < json.results.length; i++) {
            let img = json.results[i].artworkUrl100
            let songTitle = json.results[i].collectionName
            let name = json.results[i].artistName
            
            let render = `
            <div class = "album-results">
            <img src="${img}" alt="">
            <h3> ${name} </h3>
            <h2> ${songTitle} </h2>
            </div>
            `
            showResults.insertAdjacentHTML("beforeEnd", render)
        }
    })
})
showResults.addEventListener("click", function (click) {
    if ( click.target && click.target.nodeName === "IMG")
    console.log("40")
})

function flexScreen(){
    splitScreen.classList.remove('split')
}

function loadSpinner() {
    spinner.className = "showSpinner";
    setTimeout(() => {
    spinner.className = spinner.className.replace("showSpinner", "");
  }, 1000);
}
