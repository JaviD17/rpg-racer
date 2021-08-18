const searchContainerEl = document.getElementById("search-form-container");
const getSearch = function(event) {
    // prevent page refresh
    event.preventDefault();

    
    const searchEl = document.getElementById("search");
    const triggerBtn = document.getElementById("modal-search-alert");


    // get value from input element
    const searchTopic = searchEl.value.trim();

    // console log may be deleted later
    console.log(searchTopic);

    const search = function() {
        window.location.href = "./search-results/" + searchTopic; 
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