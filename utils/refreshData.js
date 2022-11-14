function refreshData(){
	return new Promise(function(resolve, reject){
		getMovies().then(function({movieslist, movieslist_obj}){
			
			set_maps()		// refresh maps from file
			set_stream_hosts();
			stream_map_cache.clear('stream')	// make sure to run it after stream_map is set
			resolve(movieslist)
		})	
		
	})
}

module.exports= refreshData;