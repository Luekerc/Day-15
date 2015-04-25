/* jshint devel:true */
$(document).ready(onReady);
function onReady(){

var rendertowatch = function(movie) {
	for(var i=0; i<movie.length;i++){
		$('.towatch').append("<tr>"+movie[i].movie.movie+"</tr>");	
	}
};

var getTowatch = function() {
	$.get('https://tiny-pizza-server.herokuapp.com/collections/charlestowatchd-http', 	
		function(movie) {
			rendertowatch(movie);
	  	},
		'json'
	);
};
getTowatch();

var renderwatched = function(movie) {
	for(var i=0; i<movie.length;i++){
		$('.watched').append("<tr>"+movie[i].movie.movie+"</tr>");	
	}
};

var getMovies = function() {
	$.get('https://tiny-pizza-server.herokuapp.com/collections/charlesmoviesd-http', 	
		function(movie) {
			renderwatched(movie);
		},
		'json'
	);
};
getMovies();


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
		// console.log(this);
		console.log(this.innerHTML);
		$.post('https://tiny-pizza-server.herokuapp.com/collections/charlestowatchd-http',
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
			console.log(this.innerHTML);
			$('.watched').append(this);
			$.post('https://tiny-pizza-server.herokuapp.com/collections/charlesmoviesd-http',
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
			// console.log(this.innerHTML);
			var inner=this.innerHTML;
			
			var gitMovies = function() {
				$.get('https://tiny-pizza-server.herokuapp.com/collections/charlesmoviesd-http', 	
					function(john) {
						console.log(john);
						deleteMovie(john);
				},
					'json'
				);
			
		
			function deleteMovie(john){
				console.log(inner);
				console.log(john);
				for(var i=0; i<john.length;i++){
					console.log(john[i].movie.movie);
					if(john[i].movie.movie===inner){
						console.log(john[i].movie._id);	
						// $.ajax({
						// 	    url: 'http://tiny-pizza-server.herokuapp.com/collections/charlestowatchd-http/'+movie.Title,
						// 	    type: 'DELETE',
						// });
					}
				}
			}
			// deleteMovie();
		}
		gitMovies();
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



