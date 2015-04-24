/* jshint devel:true */
$(document).ready(onReady);
function onReady(){

var renderwatched = function(movie) {
	for(var i=0; i<movie.length;i++){
		$('.watched').append("<tr>"+movie[i].movie.movie+"</tr>");	
	}
};

var getMovies = function() {
	$.get('https://tiny-pizza-server.herokuapp.com/collections/charlesmoviesb-http', 	
		function(movie) {
			renderwatched(movie);
		},
		'json'
	);
};
getMovies();

var rendertowatch = function(movie) {
	for(var i=0; i<movie.length;i++){
		$('.towatch').append("<tr>"+movie[i].movie.movie+"</tr>");	
	}
};

var getTowatch = function() {
	$.get('https://tiny-pizza-server.herokuapp.com/collections/charlestowatchb-http', 	
		function(movie) {
			rendertowatch(movie);
	  	},
		'json'
	);
};
getTowatch();

$("#clearresults").click(function(){
	$('#table').html("");
	$('.search-box').val("");
});

function movieSearch(query) {
	$('#table').html("");
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

$('#searchbutton').on('click', onSearchButtonClick);

function onResultsReceived(data) {
		
	function makeRow(data){
		return '<tr class="tableRow"><td>' + data.Title + '</td>\
		<td>'+data.Year+'</td>'+'</tr>';
	};
		
	for (var i=0; i<data.Search.length; i++){
		var movieInfo=data.Search[i];
		$('#table').append(makeRow(movieInfo));
	};	

	$("tr").click(function watchlist(){
		$('.towatch').append(this);
		$.post('https://tiny-pizza-server.herokuapp.com/collections/charlestowatchb-http',
			{
				movie: {
					movie: this.innerHTML,
					}
			}, 
				'json'
		);

		//The .off() is here b/c otherwise a duplicate
		//object is created when onClickB() is run.
		$(this).off('click');
		$(this).on('click', onClickB);

		function onClickB(){
			$('.watched').append(this);
			$.post('https://tiny-pizza-server.herokuapp.com/collections/charlesmoviesb-http',
				{
					movie: {
						movie: this.innerHTML,
						}
				}, 
				function(movie){
					renderwatched(movie);
				},
				'json'
			)
			// $.ajax({
			// 	    url: 'http://tiny-pizza-server.herokuapp.com/collections/charlestowatchb-http/'+movie[i]._id,
			// 	    type: 'DELETE',
			// });
		}
	})
}
		

};
// for(var i in this) {
		// console.log('http://tiny-pizza-server.herokuapp.com/collections/charlestowatch-http/'+movie[i].movie._id);
// 	$.ajax({
// 	    url: 'http://tiny-pizza-server.herokuapp.com/collections/charlestowatch-http/'+movie[i]._id,
// 	    type: 'DELETE',
// 	});
// }



