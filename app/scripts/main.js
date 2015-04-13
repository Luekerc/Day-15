/* jshint devel:true */
// $(document).ready(onReady);
// function onReady() {
// }
$(document).ready(function(){

var getMessages = function() {
	$.get('https://tiny-pizza-server.herokuapp.com/collections/charlesmovie-http', 	
		function(movie) {
			render(movie);
		},
		'json'
	);
};

var render = function(movie) {
	$('.watched').append(this);

	};

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
}

function onResultsReceived(data) {
		console.log(data);
	for (var i=0; i<data.Search.length; i++){
		var movieInfo=data.Search[i];
		// if(movieInfo.Type=="movie"){
			var newRow = makeRow(movieInfo);
			$('#table').append(newRow);
		// }	
	}	
	function makeRow(data){
		return '<tr class="tableRow"><td>' + data.Title + '</td>\
		<td>'+data.Year+'</td></tr>';
		}

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
		var movie = $('.watched').append(this);
		//send "this" to storage for later retrieval
		console.log(movie);
		$.post('https://tiny-pizza-server.herokuapp.com/collections/charlesmovie-http',
			{
				movie: {
					movie: movie,
					}
			}, 
				function(movie){
					console.log(movie);
					render(movie);
				},
				'json'
			);
	}
		
	})	
}

});
