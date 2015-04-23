/* jshint devel:true */
$(document).ready(onReady);
function onReady(){
	var movie;
	var movieInfo;
	var movieType;

var getMovies = function() {
	$.get('https://tiny-pizza-server.herokuapp.com/collections/charlesmovies-http', 	
		function(movie) {
			render(movie);
			console.log(movie);
		},
		'json'
	);
	console.log(this);
};
getMovies();

var render = function(movie) {
	for(var i=0; i<movie.length;i++){
		$('.watched').append("<tr>"+movie[i].movie.movie+"</tr>");	
	}
};


var getTowatch = function() {
	$.get('https://tiny-pizza-server.herokuapp.com/collections/charlestowatch-http', 	
		function(movie) {
			setTowatch(movie);
			console.log(movie);
		},
		'json'
	);
	console.log(this);
};
getTowatch();

var setTowatch = function(movie) {
	for(var i=0; i<movie.length;i++){
		$('.towatch').append("<tr>"+movie[i].movie.movie+"</tr>");	
	}
};

$('#searchbutton').on('click', onSearchButtonClick);

function movieSearch(query) {
	$('#table').html("");
	console.log("gotten");
	$.get('http://www.omdbapi.com',
		{
		s: query,
		},
		onResultsReceived,
		'json'
		);
};

function onSearchButtonClick(){	
	movieSearch($('.search-box').val());	
};

$("#clearresults").click(function(){
	$('#table').html("");
	$('.search-box').val("");
});

function onResultsReceived(data) {
	
	for (var i=0; i<data.Search.length; i++){
		movieInfo=data.Search[i];
		var newRow = makeRow(movieInfo);
		$('#table').append(newRow);
	}	
	//Show all Types again: movies and series
	// $('#All').click(function sortAll(){
	// 	$('#table').html("");
	// 	movieSearch($('.search-box').val());
	// 	console.log(data);
	// 	for (var i=0; i<data.Search.length; i++){
	// 		movieInfo=data.Search[i];	
	// 		$('#table').append(movieInfo);
	// 		console.log(this);
	// 	}
	// });

	//Showing only movies - the hard way
	// $('#Movie').click(function sortMovie(){
	// 	$("#table").html("");
	// 	movieSearch($('.search-box').val());
	// 	for (var i=0; i<data.Search.length; i++){
	// 		movieInfo=data.Search[i];
	// 		if(movieInfo.Type==="movie"){
	// 			console.log(movieInfo.Type);
	// 			var newRow = makeRow(movieInfo);
	// 			$("#table").append(newRow);
	// 		}

	// 	}
	// });
	//Show only series - the hard way
	// $('#Series').click(function sortSeries(){
		
	// 	movieSearch($('.search-box').val());
	// 	$("#table").html("");
	// 	for (var i=0; i<data.Search.length; i++){
	// 		movieInfo=data.Search[i];
	// 		if(movieInfo.Type=="series"){
	// 			console.log(movieInfo.Type);
	// 			var newRow = makeRow(movieInfo);
	// 			$("#table").append(newRow);
	// 		}

	// 	}
	// });


	//this creates the table row to be appended into #table
	function makeRow(data){
		return '<tr class="tableRow"><td>' + data.Title + '</td>\
		<td>'+data.Year+'</td></tr>';
		};

	//this appends the clicked element into .towatch
	$("tr").click(function watchlist(){
		$('.towatch').append(this);
		console.log(this);
		$.post('https://tiny-pizza-server.herokuapp.com/collections/charlestowatch-http',
			{
				movie: {
					movie: this.innerHTML,
					}
			}, 
				function(movie){
					setTowatch(movie);
				},
				'json'
			);
		//The .off() is here b/c otherwise a duplicate
		//object is created when onClickB() is run.
		$(this).off('click');
		$(this).on('click', onClickB);


		function onClickB(){
			$('.watched').append(this);
			//send "this" to storage for later retrieval
			console.log(this);
			$.post('https://tiny-pizza-server.herokuapp.com/collections/charlesmovies-http',
			{
				movie: {
	//I've tried various movie: values - movie: "movie", "this", etc...
					movie: this.innerHTML,
					}
			}, 
				function(movie){
					render(movie);
				},
				'json'
			);
		//This should be the html and data to append to .watched upon page load
		console.log(movie);
		}
	})	
}
};



