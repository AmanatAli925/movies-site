const maps= require('./get_maps')
let {vk_map, yt_map}= maps

let stream_hosts={}

function set_stream_hosts(){
	Array.from( Object.keys(vk_map)).forEach(function(key){
		stream_hosts[key]= 'vk';
	})
	Array.from( Object.keys(yt_map)).forEach(function(key){
		stream_hosts[key.split('/').slice(-2)[0]]= 'yt';
	})  
}

set_stream_hosts() 

module.exports= {
	stream_hosts,
	set_stream_hosts
}
