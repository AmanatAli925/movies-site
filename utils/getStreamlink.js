const maps=require('./get_maps')

let { 
	yt_map,
	vk_map, 
	stream_map,
	stream_map_cache,
	set_maps
}= maps 

function get_streamlink(uri){
	//res.send(JSON.stringify(req.query))
	let uri_arr=uri.split('/');
	let key= uri_arr.slice(0, 4).join('/')+'/'
	
	let extra= uri.replace(key, '')
	let streamlink = stream_map_cache.search(key)
	//stream_map_cache.display()
	if(!streamlink) {
		streamlink= stream_map[key];
		stream_map_cache.add(key, streamlink)
	}
	if( !streamlink )
		return 'http://138.2.85.188/405'
	return streamlink+extra

}


module.exports= get_streamlink;