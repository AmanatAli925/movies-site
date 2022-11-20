const axios = require('axios')
const express= require('express');
const app= express();
const { Readable } = require("stream")
const Movies= require('./models/movie.js')
const mongoose= require('mongoose')
const { exec } = require('child_process')
const fs= require('fs')
const https= require('https')
const cors= require('cors')
const youtubedl = require('youtube-dl-exec')
const express_hbs= require("express-handlebars");
const http= require('http')
const url = require("url")
const path = require("path")
const htmlParser= require('node-html-parser')
const ua_parser= require('ua-parser-js')
const createReadStream = require('fs').createReadStream
const Buffer= require('buffer')
var StringDecoder = require('string_decoder').StringDecoder
const crypto= require('crypto')
const http2= require('spdy')
const httpProxy= require('http-proxy')
var proxy = httpProxy.createProxyServer({ ignorePath: true }) 
const static_middlewares= require('./middlewares/static_middlewares')
let {stream_hosts, set_stream_hosts}= require('./utils/streamHosts')
const Cache= require('./utils/cache')
const get_streamlink= require('./utils/getStreamlink')
const maps= require('./utils/get_maps');
const indexRoutes= require('./routes/indexRoutes')
const refreshData= require('./utils/refreshData')
const moviePageRoutes= require('./routes/moviePageRoutes')
const apiRoutes= require('./routes/apiRotues')
const Handlebars= require('handlebars')


const {
	movieslist,
	movieslist_obj,
	getMovies
}= require('./utils/getMovies')
require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


var tags= ["2021 movies", "2022 movies", "2022 movies", "2019 movies", "hindi dubbed movies", "720p movies", "english movies", "punjabi movies"]

//console.log(stream_map)

let express_helpers= {
	tolower: str => str.toLowerCase(),
	inc: n => ++n,
	dec: n => --n, 
	getArg: n => n.split('?')[1],
	ifNot: v=> !v,
	section: function(name, options){
		if(!this.sections) this.sections={}
		this.sections[name]= options.fn(this)
	},
	ifEqual: (v1, v2, options) => v1==v2 ? options.fn(this) : options.inverse(this),
	
	getMoviePage: function(movie){
		return  moviePageTemplate(movie)
	}
}

Object.keys(express_helpers).forEach(function(key){
	Handlebars.registerHelper(key, express_helpers[key])
})


const moviePageTemplate= Handlebars.compile(
	fs.readFileSync('./views/movie1.handlebars', 'utf-8')
	  .replace("{{#section 'head'}}", "")
	  .replace("{{/section}}", "")
	  .split('<!--DEPENDENCIES-->')[0]
)

const moviePageBody= fs.readFileSync('./views/movie1.handlebars', 'utf-8')


app.engine('handlebars', express_hbs({
	helpers: express_helpers
}));


app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname,"views"))) 




mongoose.connect(process.env.MONGO_URL,{
	useNewUrlParser: true,
	useUnifiedTopology: true
});




let { 
	yt_map,
	vk_map, 
	stream_map,
	stream_map_cache,
	set_maps
}= maps 

conn= mongoose.connection;
//mongoose.set('bufferCommands', false) 
conn.once('open', function(){
	console.log("Connected to db")    
	getMovies().then(function(){
		console.log('returned from getMovies')
		
	}).catch(function(err){
		console.log(err)
	})
}) 


function copy(value){
	return JSON.parse(JSON.stringify(value))
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(static_middlewares)



app.use(indexRoutes)
app.use(apiRoutes)

app.use(moviePageRoutes)
app.get('/all_urls', function(req, res){
	res.setHeader('content-type', 'text/plain')
	all_urls=""
	movieslist.forEach(function(m){		
		all_urls+=req.get('origin')+movie_data.token+'\n'
	})
	res.send(all_urls)
 
})

app.get('/not-found', function(req,res){
	res.status(404).send('not found')
})






let four_hrs= 4*60*60*1000
setInterval(refreshData, four_hrs)


var v_qualities=[ 'Highest Quality', 'High Quality', 'Normal Quality', 'Lower Quality', 'Lowest Quality']

const agent = new https.Agent({  
  rejectUnauthorized: false
}); 

//process.on('uncaughtException', console.error)


app.get('/download/:token', function(req, res){
	return res.status(404).send("not found")
	var token = req.params.token;
	
	let movie_data = movieslist_obj[token]

	if (!movie_data) {
		res.status(404).send('<h1 style="text-align:center">Sorry, Page not found.</h1>');
		return;
	}
	qualities= []
	movie_data['directLinks'].forEach(function(dl){
		qualities.push(dl['height'])
	})
	if(qualities.length==1) qualities=[720]
    var qualities_arr=["1080p", "720p", "480p", "360p", "240p", "144p"]
	
 
	
	res.render('download_page', { 
 		qualities,
		token,
		movie_name: movie_data.title,
		analytics:  true
	})
})



app.post('/add-to-map', function(req, res){
	const url_map  = req.body
	if(!Object.keys(req.body).length)
    		return res.sendStatus(200);
	let keys=Array.from(Object.keys(url_map));
	keys.forEach( k => stream_map[k]= url_map[k] )
	let stream_host=""

	if(keys[0].includes('stream'))
    		stream_host='yt'
	else
    		stream_host='vk'
    
	stream_hosts[keys[0].split('/').slice(-2)[0]]=stream_host
	res.sendStatus(200) 
})


app.use('*', function(req, res){
  res.status(404).send('<h1 style="text-align:center">Sorry, Page not found.</h1>');
});




app.listen(9998, function(){  
	console.log("listening to 9998"); 
});
