/* jshint devel:true */
$(document).ready(onReady);
function onReady(){

var rendertowatch = function(movie) {
	for(var i=0; i<movie.length;i++){
		$('.towatch').append("<tr>"+movie[i].movie.movie+"</tr>");	
	}
};

var getTowatch = function() {
	$.get('https://tiny-pizza-server.herokuapp.com/collections/charlestowatchf-http', 	
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
	$.get('https://tiny-pizza-server.herokuapp.com/collections/charlesmoviesf-http', 	
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
		// console.log(this.innerHTML);
		$.post('https://tiny-pizza-server.herokuapp.com/collections/charlestowatchf-http',
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
			// console.log(this.innerHTML);
			// console.log(this);
			
			$('.watched').append(this);
			$.post('https://tiny-pizza-server.herokuapp.com/collections/charlesmoviesf-http',
				{
					movie: {
						movie: this.innerHTML,
						}
				}, 
				function(movie){
					renderwatched(movie);
					console.log(movie._id);
				},
				'json'
			)			
			
			var inner=this.innerHTML;
			
			var gitMovies = function() {
				$.get('https://tiny-pizza-server.herokuapp.com/collections/charlestowatchf-http', 	
					function(john) {
						for(var i=0; i<john.length;i++){
							
							if(john[i].movie.movie===inner){
								console.log("They matched");	
								console.log(inner);
								console.log(john[i].movie.movie);
								console.log(john[i]._id);
								console.log('http://tiny-pizza-server.herokuapp.com/collections/charlestowatchf-http/'+john[i]._id);
									$.ajax({
								    url: 'http://tiny-pizza-server.herokuapp.com/collections/charlestowatchf-http/'+john[i]._id,
								    type: 'DELETE',
									});
							}
						}
					},
					'json'
				);	
			}
			gitMovies();
		}
	})
}
		

};
// for(var i in this) {
		// console.log('http://tiny-pizza-server.herokuapp.com/collections/charlestowatche-http/'+movie[i].movie._id);
// 	$.ajax({
// 	    url: 'http://tiny-pizza-server.herokuapp.com/collections/charlestowatche-http/'+movie[i]._id,
// 	    type: 'DELETE',
// 	});
// }



