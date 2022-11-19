const path= require('path')
const fs= require('fs')
const serve_end_url= require('../utils/serve_end_url')
const get_streamlink= require('../utils/getStreamlink')

const THUMBNAILS_FOLDER= '/var/www/www.watchmoviesonlin.com/thumbnails/'
const POSTERS_FOLDER='/var/www/www.watchmoviesonlin.com/posters/' 
const STATIC_FOLDER= path.join(__dirname, '..', 'views')


function serve_thumbnails(req, res, next){
	if(req.originalUrl.split('.').pop()=='jpg' && req.originalUrl.includes('thumbnails')){
		var location= THUMBNAILS_FOLDER +req.originalUrl.split('/').pop()
		if(fs.existsSync(location))
			res.sendFile(location)
		else{
			res.status(404).end()
		}
		return
	}
	next()
}


function serve_posters(req,res,next){
	if(req.originalUrl.split('.').pop()=='jpg' && req.originalUrl.includes('posters')){
		var location= POSTERS_FOLDER+req.originalUrl.split('/').pop()
		if(fs.existsSync(location))
			res.sendFile(location)
		else
			res.status(404).end()
		return
	}
	next()

}

function serve_static(req, res,next){
	if(req.originalUrl.startsWith('/static/')){
		var location=path.join(
			STATIC_FOLDER,
			req.originalUrl.replace('/static', '')
		)
		if(fs.existsSync(location))
			res.sendFile(location)
		else{
			res.status(404).end()
		}
		return
	}
    next() 
}

function serve_stream(req, res, next){
	if(req.originalUrl.startsWith('/stream/')){	
		serve_end_url(res,get_streamlink(req.originalUrl))
		return;
	}
	next()
}


module.exports= [
	serve_thumbnails,
	serve_posters,
	serve_static,
	serve_stream
]