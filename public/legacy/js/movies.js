function getData() {
    var request = new XMLHttpRequest();
    request.open('GET', movie_url, true);
    request.onload = function () { 
        movie_array = JSON.parse(request.responseText); 	
        displayBoxes();
    };

    request.send();
}

function displayBoxes(){
	var table = document.getElementById("moviesTable");
	
	table.innerHTML = "";
	totalMovies = movie_array.length;
	
	for (var count = 0; count < totalMovies; count++) {
		var thumbnail = movie_array[count].thumb;
        var title = movie_array[count].title;
		var story = movie_array[count].story;
		
		var cell = '<button class="accordion">' + title + '</button><div class="panel"><p><img class="card-img-top" src="' + thumbnail + '" alt="Card image cap"></p><p>'+ story +'</p></div>';
		
		table.insertAdjacentHTML('beforeend', cell);
	}
	
    document.getElementById("parent").textContent = "";
	
	setupAccordion();
}

function setupAccordion(){
	// setup accordion
	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	  acc[i].addEventListener("click", function() {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
		  panel.style.maxHeight = null;
		} else {
		  panel.style.maxHeight = panel.scrollHeight + "px";
		} 
	  });
	}
}