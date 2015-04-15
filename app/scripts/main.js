/* jshint devel:true */
// $(document).ready(onReady);
// function onReady() {
// }
$(document).ready(function(){
var movie;
var getMessages = function() {
	$.get('https://tiny-pizza-server.herokuapp.com/collections/charlesmovie-http', 	
		function(movie) {
			render(this);
			// console.log(movie);
			// console.log(this);
		},
		'json'
	);

};
getMessages();

var render = function(movie) {
	$('.watched').append(this);
	// console.log(this);
	// console.log(movie);
	};
render();

$('.searchbutton').on('click', onSearchButtonClick);
	
function onSearchButtonClick(){	
	movieSearch($('.search-box').val());	
}

function movieSearch(query) {
	$.get('http://www.omdbapi.com',
		{
		s: query,
		},
		onResultsReceived,
		'json'
		);
};

function onResultsReceived(data) {
		// console.log(data);
		var movieInfo;
	for (var i=0; i<data.Search.length; i++){
		movieInfo=data.Search[i];
		// if(movieInfo.Type=="movie"){
			var newRow = makeRow(movieInfo);
			$('#table').append(newRow);
		// }
	}	
	// console.log(data);
	var movieType;
	$('#All').click(function sortAll(){
		$('#table').html("");
		movieSearch($('.search-box').val());
		console.log(data);
		for (var i=0; i<data.Search.length; i++){
		movieInfo=data.Search[i];	
		$('#table').append(movieInfo);
		}
	});
	//Showing only Movies - the hard way
	$('#Movie').click(function sortMovie(){
		$('#table').html("");
		console.log(data);
		for (var i=0; i<data.Search.length; i++){
		movieInfo=data.Search[i];
		console.log(movieInfo);
		if(movieInfo.Type=="movie"){
			var newRow = makeRow(movieInfo);
			$('#table').append(newRow);
			console.log(movieInfo);
			}
		}
	});
	
	$('#Series').click(function sortSeries(){
		$('#table').html("");
		console.log(data);
		for (var i=0; i<data.Search.length; i++){
			movieInfo=data.Search[i];
			if(movieInfo.Type=="series"){
				var newRow = makeRow(movieInfo);
				$('#table').append(newRow);
				console.log(movieInfo);
			}
		}
	});




	//this creates the table row to be appended into #table
	function makeRow(data){
		return '<tr class="tableRow"><td>' + data.Title + '</td>\
		<td>'+data.Year+'</td></tr>';
		};

	//function that shows by Type when you click drop down #Movie


	//this appends the clicked element into .towatch
	$("tr").click(function watchlist(){
		$('.towatch').append(this);
		console.log(this);
		//The .off() is here b/c otherwise a duplicate
		//object is created when onClickB() is run.
		$(this).off('click');
		$(this).on('click', onClickB);
		//send "this" to storage for later retrieval
		// console.log(this);
		// console.log(this);

		function onClickB(){
		$('.watched').append(this);
	
		//send "this" to storage for later retrieval
		console.log(this);
		$.post('https://tiny-pizza-server.herokuapp.com/collections/charlesmovie-http',
			{
				movie: {
					this: "this",
					}
			}, 
				function(movie){
					render(movie);
				},
				'json'
			);
		//This is the html and data to append to .watched upon page load
		console.log(this);

		}
		
	})	
}
	

});



