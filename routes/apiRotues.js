
const express= require('express')
const getMovies= require('../utils/getMovies')
const refreshData= require('../utils/refreshData')
const {
    yt_map,
    vk_map,
    stream_map,
    stream_map_cache,
    set_maps
}= require('../utils/get_maps')

const get_streamlink= require('../utils/getStreamlink')
const {
    movieslist, 
    movieslist_obj,
    getMovies
}= require('../utils/getMovies')

const router= express.Router()


router.get('/directlink/:token', async function(req, res){
	
	console.log('REQUEST FOR DIRECT LINK OF ', req.params.token)
	var movie_data = 
			movieslist_obj[
				req.params.token
				.trim()
				.toLowerCase()
				.split('.')
				.slice(0,-1)
				.join('.')
			]	
	movie_data= copy(movie_data)    
	
	if(!movie_data && !req.query.print){					    
		return res.redirect(301, "http://127.0.0.1:9999/not-found");
	}

	if(!movie_data && req.query.print){					    
		return res.send("http://127.0.0.1:9999/not-found");
    }
	
    	
	let quality=480
	let yt_directlink=""
	let directlink=""
	if(movie_data.directLinks){
		directlink= movie_data.directLinks.filter( dl=> dl.height==quality);
		if(!directlink.length){
			directlink=[  ]
			directlink.push(movie_data.directLinks[movie_data.directLinks.length-1])
		}
		directlink= directlink[0].directLink;
		//if(!health_check(directlink))
		//	directlink= failover_url(directlink)
	}
    if(movie_data.yt_directLinks && movie_data['yt_valid']){
		yt_directlink= movie_data.yt_directLinks.filter( dl=> dl.height==quality);
		if(!yt_directlink.length){
		yt_directlink=[  ]
			yt_directlink.push(movie_data.yt_directLinks[movie_data.yt_directLinks.length-1])
		}
		yt_directlink= yt_directlink[0].directLink
		
	}
	directlink= directlink.replace('https://', 'http://')
    	
	if(yt_directlink && !req.query.print)
		return res.redirect(yt_directlink)
	if(directlink && !req.query.print)
		return res.redirect(directlink)
	
	if(yt_directlink && req.query.print)
		return res.send(yt_directlink)
	if(directlink && req.query.print)
		return res.send(directlink)  
})


router.get('/streamlink', function(req, res){
	res.redirect(get_streamlink(req.query.uri)) 
})



const fileExists = async path => !!(await fs.promises.stat(path).catch(e => false));

router.get('/vk_streamlink', async function(req, res){
	
	//res.send(JSON.stringify(req.query))
	let uri_arr=req.query.uri.split('/');
	let key= uri_arr[2]
	let file_path=__dirname+'/views/video/'+key+'.m3u8';
	if( await fileExists(file_path)) 
        return res.sendFile(file_path) 
	
	
	
	let extra= req.query.uri.replace('/video/'+key, '')
	let streamlink = stream_map_cache.search(key)
	if(!streamlink) {
		streamlink= stream_map[key];
		stream_map_cache.add(key, streamlink)
	}
	if( !streamlink )
		return res.redirect('http://138.2.85.188/not-found')
	res.setHeader('Cache-Control', 'no-store')	

	if(req.query.base_url) return res.redirect(streamlink);

	if(req.query.uri.endsWith('track.m3u8'))			// if request is for track.m3u8
		streamlink= streamlink.split('/').slice(0, -1).join('/')
	else if( req.query.uri.endsWith('.m3u8') )			// if request is for main m3u8
	 	extra=""
	else if((!req.query.uri.endsWith('.m3u8')) && streamlink.endsWith('.m3u8'))
		streamlink= streamlink.split('/').slice(0, -1).join('/')  
	else if( !key.includes(':::') )								
		streamlink= streamlink.split('/').slice(0, -1).join('/')	// if request is for parts of track.m3u8
	
	streamlink= streamlink.replace('https://', 'http://')
	
	return res.redirect(streamlink+extra) 

})



router.get('/refresh',async function(req, res){
	
	res.setHeader('Cache-Control', 'no-store')	
	
	res.send(await refreshData())
})

router.get('/page_num/:token', function(req, res){	
	res.send(Math.ceil((movieslist.findIndex( m => m['token']== req.params['token'] )/20)).toString())
}) 

module.exports= router