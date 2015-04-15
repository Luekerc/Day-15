/* jshint devel:true */
$(document).ready(onReady);
function onReady(){
	var movie;
	var movieInfo;
	var movieType;

// var getMessages = function() {
// 	$.get('https://tiny-pizza-server.herokuapp.com/collections/charlesmovie-http', 	
// 		function(movie) {
// 			render(movie);
// 			// console.log(movie);
// 		},
// 		'json'
// 	);
// };
// getMessages();

// var render = function(movie) {
// 	$('.watched').append(movie);
// 	console.log(movie);
// 	};
// render();

$('#searchbutton').on('click', onSearchButtonClick);
$('#table').html("");
function movieSearch(query) {
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
});

function onResultsReceived(data) {
	
	for (var i=0; i<data.Search.length; i++){
		movieInfo=data.Search[i];
		var newRow = makeRow(movieInfo);
		$('#table').append(newRow);
	}	
	//Show all Types again: movies and series
	$('#All').click(function sortAll(){
		$('#table').html("");
		movieSearch($('.search-box').val());
		console.log(data);
		for (var i=0; i<data.Search.length; i++){
			movieInfo=data.Search[i];	
			$('#table').append(movieInfo);
			console.log(this);
		}
	});

	//Showing only movies - the hard way
	$('#Movie').click(function sortMovie(){
		$("#table").html("");
		movieSearch($('.search-box').val());
		for (var i=0; i<data.Search.length; i++){
			movieInfo=data.Search[i];
			if(movieInfo.Type==="movie"){
				console.log(movieInfo.Type);
				var newRow = makeRow(movieInfo);
				$('#table').append(newRow);
			}
		}
	});
	//Show only series - the hard way
	$('#Series').click(function sortSeries(){
		$("#table").html("");
		movieSearch($('.search-box').val());
		for (var i=0; i<data.Search.length; i++){
			movieInfo=data.Search[i];
			if(movieInfo.Type=="series"){
				console.log(movieInfo.Type);
				var newRow = makeRow(movieInfo);
				$('#table').append(newRow);
			}
		}
	});


	//this creates the table row to be appended into #table
	function makeRow(data){
		return '<tr class="tableRow"><td>' + data.Title + '</td>\
		<td>'+data.Year+'</td></tr>';
		};

	//this appends the clicked element into .towatch
	$("tr").click(function watchlist(){
		$('.towatch').append(this);
		console.log(this);
		//The .off() is here b/c otherwise a duplicate
		//object is created when onClickB() is run.
		$(this).off('click');
		$(this).on('click', onClickB);
		//send "this" to storage for later retrieval



		function onClickB(){
			$('.watched').append(this);
			//send "this" to storage for later retrieval
			console.log(this);
			$.post('https://tiny-pizza-server.herokuapp.com/collections/charlesmovie-http',
			{
				movie: {
	//I've tried various movie: values - movie: "movie", "this", etc...
					movie: this,
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



