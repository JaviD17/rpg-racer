const searchContainerEl = document.getElementById("search-form-container");
const searchEl = document.getElementById("search");
const triggerBtn = document.getElementById("modal-search-alert");

async function searchBar(event) {
    event.preventDefault();

}
var getSearch = function(event) {
    // prevent page refresh
    event.preventDefault();

    // get value from input element
    var searchTopic = searchEl.value.trim();

    // console log may be deleted later
    console.log(searchTopic);

    var search = function() {
        window.location.href = "./search-results.html#" + searchTopic; 
    }

    if(searchTopic){
        // clear old content
        search()
        searchEl.value = "";
    }
    else {
        triggerBtn.click();
    }
};

searchContainerEl.addEventListener("submit", getSearch);