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
app.use(require('express').static(__dirname+'/views'));
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


var tags= ["2021 movies", "2022 movies", "2022 movies", "2019 movies", "hindi dubbed movies", "720p movies", "english movies", "punjabi movies"]


let stream_map= JSON.parse(fs.readFileSync('mapfile', 'utf-8'))
let stream_keys= Array.from( Object.keys(stream_map) )
let stream_keys_obj= {}
stream_keys.forEach(function(key){
	stream_keys_obj[key.split('/').slice(-2)[0]]=true;
})


class Cache{
    constructor(){
        this.checkInterval= 10       // minutes
        setInterval(this.purge.bind(this), this.checkInterval*60*1000)
        this.cache={} 
        
    }
    
    search(key){
        let v=this.cache[key];
        if (!v) return false;
        v.uses++;
        return v.value
    }
    add(key, value){
        this.cache[key]={
            value, 
            uses: 0
        }
    }
    
    uses(key){
        let v=this.cache[key];
        if (!v) return -1;
        return v.uses;
    }
    purge(){
        let uses_sum=0
        let cache_keys=Array.from(Object.keys(this.cache));
        cache_keys.forEach(function(key){
            uses_sum+=this.cache[key].uses
        }.bind(this))
        
        
        let avg_use= uses_sum/cache_keys.length;
        
        cache_keys.forEach(function(key){
            let cache_entity=this.cache[key];

	    if(cache_entity.uses<avg_use)
                delete this.cache[key];
	    else cache_entity.uses -= avg_use;

        }.bind(this)) 
    }
    
    
    display(){
        console.log('cache is ', this.cache)
    }
    
    clear(){
	this.cache={}
    }
}
const stream_map_cache= new Cache();
const directlink_cache= new Cache();
//console.log(stream_map)

app.engine('handlebars', express_hbs({
	helpers: {
		tolower: str => str.toLowerCase(),
		inc: n => ++n,
		dec: n => --n, 
		getArg: n => n.split('?')[1],
		ifNot: v=> !v,
		section: function(name, options){
			if(!this.sections) this.sections={}
			this.sections[name]= options.fn(this)
		},
		ifEqual: (v1, v2, options) => v1==v2 ? options.fn(this) : options.inverse(this)
		
		
	}
}));


app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname,"views")))




mongoose.connect('mongodb+srv://amanat:Newpassword1@cluster0.8wfum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

var movieslist=[];
var movieslist_obj={};
conn= mongoose.connection;
mongoose.set('bufferCommands', false) 
conn.once('open', function(){
	console.log("Connected to db")

	//fs.readFile('/etc/nginx/data.txt', {encoding: 'utf-8'},function(err, docs){
    	Movies.find({}).lean().exec(function(err, docs){
		if(err){
        		console.log(err)
        		return;
    		}
		console.log("In callback")
    		//movieslist=JSON.parse(docs)
		//console.log(docs)
		//movieslist= JSON.parse(JSON.stringify(docs))
		movieslist=docs
    		movieslist= movieslist.filter( movie_data=> movie_data.vk && movie_data.vk_video_id && movie_data.directLinks)
    		movieslist.forEach(function(m, i){
			i=movieslist.length-i-1; 
    			var prev= i-1==-1? 0 : i-1;
    			var next= i+1==movieslist.length ? i : i+1;
    			movieslist_obj[m.token.toLowerCase()]= {...m, prev: movieslist[prev].token, next: movieslist[next].token };
    		})

	})


})




function copy(value){
	return JSON.parse(JSON.stringify(value))
}
let mpds_loc= '/home/ubuntu/movies_https_dev_v3/views/videos';
let mpds_exp_time = 5 	// in hours
let mpds_exp_status={}
let mpds_int_time= 5;	// in mins
function set_mpds_statuses(){
	console.log('checking mpds status')
	fs.readdir(mpds_loc, function(err, files){

		if(err) return console.log(err)


		files.forEach(function(file){
			let time_passed = (new Date().getTime() - fs.statSync(mpds_loc+'/'+file).mtimeMs) / 1000
			time_passed= Math.floor(time_passed)
			mpds_exp_status[file] = time_passed > (3600 * mpds_exp_time)
	
		})

	})

}
set_mpds_statuses()
setInterval(set_mpds_statuses, mpds_int_time*60*1000)




app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next){
	if(req.originalUrl.split('.').pop()=='jpg' && req.originalUrl.includes('thumbnails')){
		var location='/var/www/www.watchmoviesonlin.com/thumbnails/'+req.originalUrl.split('/').pop()
		if(fs.existsSync(location))
			res.sendFile(location)
		else{
			res.status(404).end()
			console.log("NOT FOUND ", location) 
		}
		return
	}

	if(req.originalUrl.split('.').pop()=='jpg' && req.originalUrl.includes('posters')){
		var location='/var/www/www.watchmoviesonlin.com/posters/'+req.originalUrl.split('/').pop()
		if(fs.existsSync(location))
			res.sendFile(location)
		else
			res.status(404).end()
		return
	}

	next()
})




app.get('/links', (req, res) => {
	res.sendFile(__dirname+'/links.html');
});



app.get("/",  (req, res) => handle_page_request(req, res))

app.get("/page/last",  (req, res) => handle_page_request(req, res)) 

function handle_page_request(req, res){ 
    //req.query.search=""
    if(!req.query.search)
        req.query.search=""

    req.query.search= req.query.search.trim()
    if( req.query.search && ! (tags.find(v=> v==req.query.search.toLowerCase()) ) ){
    	console.log("putting in search.txt")
	fs.appendFile('searches.txt', req.query.search + '\n', function(err){
		if(err) console.log(err)
    	})
    }
	
    var movies_per_page= 20
    var page= req.query.page;
    var totalpages=Math.ceil(movieslist.length/movies_per_page)	
    
    console.log(req.originalUrl)

    

    console.log("page is ", page)

    if(!req.query.page || req.query.page<=0)
        page=1;

    if(req.query.page> totalpages || req.originalUrl=="/page/last")
	page= totalpages;
    
    
    var end= movies_per_page*page;
    var page_movieslist=[]
	if(!req.query.search) req.query.search="";
	console.log(req.query.search)
	req.query.search=req.query.search.replace(/ /g, "_")
	console.log(req.query.search)
	var relevance=[]
        if(req.query.search)
            search_movieslist= movieslist.filter( function(m){
            	var indexes= m.token
            	indexes = '-'+indexes.toLowerCase()+'-';
            	search= req.query.search.toLowerCase();
	    	var words=search.split("_");
		var arr= search.split('_');


		for(var count=2; count<=arr.length; count++){
 		   	pos= 0
    			while(pos<= (arr.length-count)){
        			words.push(arr.slice(pos, pos+count).join('-'))
        			pos+=1
    			}
    
    			
		}
		
		//console.log("words are ", words)
		
		var weights= words.map(function( w){
			if(!isNaN(w)){				// if number use different method
				if(indexes.includes('-'+w+'-') )	// if complete number matches i.e 09==09
					return 2
				w= Number(w);
				if(indexes.split('-').filter( i => i==w ).length)	// if partial number matches i.e 09==9
					return 1 
				return 0			// if none matched
			}

			
			if(indexes.includes('-'+w+'-'))		// inlcudes complete word i.e "fireman".includes("fireman")
				return 2
			
			if(indexes.includes(w.toLowerCase()))	// includes partial word i.e "fireman".includes("man")
				return 1

			return 0 				// if none matches
			
		}); 
		var overall_weight=0
		weights.forEach( weight=> overall_weight+=weight )

	    	if(overall_weight) {
			relevance.push(overall_weight)
		}
            	return overall_weight
            })
	else
	    search_movieslist= movieslist


	//search_movieslist= copy(search_movieslist)

	//console.log(relevance)
	if(req.query.search)
		search_movieslist= search_movieslist.map( (m,i) => { return {...m, relevance: relevance[i]}})
	
	
	if(req.query.search)
		search_movieslist= search_movieslist.sort( (a,b )=> b.relevance-a.relevance)

	if(req.query['array'])
		return res.json(search_movieslist)
        page_movieslist= search_movieslist.slice(end-movies_per_page, end).map( function(movie){
            var token=movie.token;
            return {
                title: toTitleCase(token),
                imgloc: "/thumnails/"+token+".jpg",
                token,
                index_requested: movie.index_requested
            }
    	})
	
    totalpages=Math.ceil(search_movieslist.length/movies_per_page)	
    
    res.render('home', {
            movieslist: page_movieslist,
            page,
            totalpages,
	    pages_nums: pageArray(page,totalpages),
	    search: req.query.search.replace(/_/g, ' ')
    })
	
}
app.get('/test/:token', function(req, res){
	let token=req.params.token.toLowerCase(); 
	let orig_token = movieslist_obj[token]['token']
	let stream_valid=true
	if(!movieslist_obj[token])
		return res.status(404).send('not found')
	let found=stream_keys.find( k => k.includes(orig_token));
	if(mpds_exp_status[orig_token+'.mpd'] || !found)
		stream_valid=false;	
	res.render('test', { layout: false, token: orig_token , stream_valid})
})



app.get('/all_urls', function(req, res){
	res.setHeader('content-type', 'text/plain')
	Movies.find({vk_video_id: { "$exists": true}}, function(err,docs){
		if(err){
			console.log(err)
			res.send("Error occured")
			return;
		}
		all_tokens=""
		docs= JSON.parse(JSON.stringify(docs))
		docs.forEach(function(movie_data){
			
			if ((movie_data.vk && movie_data.vk_video_id && movie_data.directLinks) ){
				all_tokens+='https://www.watchmoviesonlin.com/'+movie_data.token+'\n'
			}
			else
			   console.log("not adding")
		})
		res.send(all_tokens)
	}) 
})

app.get('/405', function(req,res){
	res.send('not found')
})
app.get('/directlink/:token', function(req, res){
	
	console.log('REQUEST FOR DIRECT LINK OF ', req.params.token)
	let token=req.params.token.trim().toLowerCase().split('.').slice(0,-1).join('.')
	let movie_data=directlink_cache.search(token)
	directlink_cache.display();
	if(!movie_data){
		movie_data = movieslist_obj[req.params.token.trim().toLowerCase().split('.').slice(0,-1).join('.')]
		directlink_cache.add(token, movie_data)
	}
    	if(!movie_data && !req.query.print){					    
		return res.redirect(301, "http://127.0.0.1:9999/405");
    	}

	if(!movie_data && req.query.print){					    
		return res.send("http://127.0.0.1:9999/405");
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
    		
	}
    	if(movie_data.yt_directLinks){
		yt_directlink= movie_data.yt_directLinks.filter( dl=> dl.height==quality);
    		if(!yt_directlink.length){
			yt_directlink=[  ]
    			yt_directlink.push(movie_data.yt_directLinks[movie_data.yt_directLinks.length-1])
    		}
		yt_directlink= yt_directlink[0].directLink 
		
	}
	directlink= directlink.replace('https://', 'http://')
    	directlink= directlink.replace('&ct=0', '')
    	
	yt_directlink= decodeURI(yt_directlink)
	directlink= decodeURI(directlink)

	if(yt_directlink && !req.query.print)
		return res.redirect(301, yt_directlink)
	if(directlink && !req.query.print)
		return res.redirect(301, directlink)
	
	if(yt_directlink && req.query.print)
		return res.send(yt_directlink)
	if(directlink && req.query.print)
		return res.send(directlink)  
})


app.get('/streamlink', function(req, res){
	//res.send(JSON.stringify(req.query))
	let uri_arr=req.query.uri.split('/');
	let key= uri_arr.slice(0, 4).join('/')+'/'
	let extra= req.query.uri.replace(key, '')
	let streamlink = stream_map_cache.search(key)
	if(!streamlink) {
		streamlink= stream_map[key];
		stream_map_cache.add(key, streamlink)
	}
	if( !streamlink )
		return res.redirect('http://138.2.85.188/405')

	return res.redirect(streamlink+extra)

})

app.get('/refresh', function(req, res){
	//fs.readFile('/etc/nginx/data.txt', {encoding: 'utf-8'}, function(err, docs){
    	Movies.find({}).lean().exec(function(err, docs){
		if(err){
        		console.log(err)
        		return;
    		}
		console.log('refreshing content')
    		//movieslist=JSON.parse(docs)
		movieslist= docs
		movieslist= movieslist.filter( movie_data=> movie_data.vk && movie_data.vk_video_id && movie_data.directLinks)
		movieslist_obj={};
		movieslist.forEach(function(m, i){
			i=movieslist.length-i-1;
			
 
		   	var prev= i-1==-1? 0 : i-1;
    			var next= i+1==movieslist.length ? i : i+1;
    			movieslist_obj[m.token.toLowerCase()]= {...m, prev: movieslist[prev].token, next: movieslist[next].token };
    		})
		
		stream_map= JSON.parse(fs.readFileSync('mapfile', 'utf-8'))
		stream_keys= Array.from( Object.keys(stream_map) )
		stream_keys_obj= {}
		stream_keys.forEach(function(key){
			stream_keys_obj[key.split('/').slice(-2)[0]]=true; 
		}) 
		
		stream_map_cache.clear();
		directlink_cache.clear();
		set_mpds_statuses()
		res.send(docs)
	})
		
})

app.get("/request_movie", function(req, res){
	/*fs.appendFile('requested_movies.txt', "\n"+req.query.movie_name, function (err) {
  		if (err) throw err;
  		console.log('Saved!');
	});*/
	res.send("Your request has been record. Requested movie will be uploaded in a day or so.Thanks for visiting.")

})
var v_qualities=[ 'Highest Quality', 'High Quality', 'Normal Quality', 'Lower Quality', 'Lowest Quality']

var tokens={
	amanat: "f4dbec94e0da5337161a467a788c076d5adc72b9efadcac0cf6393f0ecfc1ef9ec8664840b1533507327d",
	ahmad: "cd0177831e4057c9aac9af1f142453d392a8e4932c65d2e702dbeea7a8f6a16a69ded9a7ca53d3aedfda6"
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const agent = new https.Agent({  
  rejectUnauthorized: false
}); 

//process.on('uncaughtException', console.error)
app.get('/page_num/:token', function(req, res){	
	res.send(Math.ceil((movieslist.findIndex( m => m['token']== req.params['token'] )/20)).toString())
})

app.get('/:token', function(req, res, next){
   
    

    var token= req.params.token;
    var ip= req.headers["x-real-ip"] || req.connection.remoteAddress.substring(7);

    if(token.includes('_')){
    	token= token.replace(/_/g, '-');
	res.redirect(301, '/'+token);
	return;
    }

    next() 
    return; 	
},function (req, res) {
    req.params.token=req.params.token.toLowerCase()
    var is_bot = /bot|crawler|google|baidu|bing|msn|teoma|slurp|yandex/i.test(req.get('User-Agent'))
    var token = req.params.token;
    var userAgent= req.get("User-Agent")
    if (!ua_parser(userAgent).browser.name)
            userAgent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4705.0 Mobile Safari/537.36"
    movie_data={}
    let next= prev= {}
    if(!token.includes('-[')){
    	movie_data = movieslist_obj[token]
    	if(!movie_data) movie_data="";
    	movie_data = JSON.parse(JSON.stringify(movie_data))
    	
    }else{
	let movie_index= -1;
	movie_data= movieslist_obj[token.split('-[')[0]]
    	
	if ( token.split('-[')[1] != movie_data.redirect.token.split('-[')[1] ){
		console.log('DATE DID NOT MATCH') 
		        return res.status(404).send('<h1 style="text-align:center">Sorry, Page not found.</h1>');
	}

	if(!movie_data) movie_data="";
    
	movie_data = JSON.parse(JSON.stringify(movie_data))
    	movie_data.redirect=false; 
    }

    
    
    
    if (!movie_data) 
        return res.status(404).send('<h1 style="text-align:center">Sorry, Page not found.</h1>');
        
    next = {
        	token: movie_data.next,
        	title: toTitleCase(movie_data.next)
    	}
    prev = {
        token: movie_data.prev,
       	
	title: toTitleCase(movie_data.prev)
    }

    if (movie_data.redirect)
	return res.redirect(301, '/'+movie_data.redirect.token)    

    

    if (!movie_data.vk || !movie_data.vk_video_id || !movie_data.directLinks ) {
        res.status(404).send("NOT FOUND");
        return;
    }
    var owner="";
    
    var referer=req.get("Referrer") || '';
    
    
    if(!is_bot && referer.includes('google')){
        Movies.updateMany({ token }, { "$inc": { 'views':1}}, function(err){
            console.log(err)
        })
    }
    
    			
	var downloadLinks= JSON.parse(JSON.stringify(movie_data.directLinks));
	
	
	var uploadDate= movie_data.date
	console.log("Upload date is ", movie_data.date)

	if(!uploadDate) uploadDate='2021-10-14T11:24:30.000Z'
	else{
		t=new Date(1970, 0, 1)
		t.setSeconds(uploadDate)
		uploadDate=t.toISOString()
	}
	var duration= movie_data.duration
	if(duration)
        	duration= 'PT' + Math.floor(duration/3600) + 'H' + Math.floor((duration/60) %60) + 'M' + (duration%60) + 'S';


	let orig_token = movie_data['token']
	let stream_valid=true
	
	
	if(mpds_exp_status[orig_token+'.mpd'] || !stream_keys_obj[orig_token])
		stream_valid=false;	
	
	console.log(stream_valid, mpds_exp_status[orig_token+'.mpd'] , stream_keys_obj[orig_token])
	
	var render_options={
                    	token: movie_data.token,
                        prev,
                        next,
                        title: toTitleCase(movie_data.token),
                        keywords: movie_data.token.replace(/[_]/g, ','),
			duration,
			uploadDate,
                        analytics: true,
                        vk_video_id: movie_data.vk_video_id,
			stream_valid
        }

	
	if(downloadLinks){
		render_options.videosLinks=downloadLinks.slice(0, 3)
		render_options.downloadLinks=downloadLinks      
	}
	

	res.render("movie1", render_options)
	console.log("THIS PAGE IS FROM DATABASE")

	
	
})


app.get('/download/:token', function(req, res){
	return res.status(404).send("not found")
	var token = req.params.token;
    	var userAgent= req.get("User-Agent")
    	
    	movie_data = movieslist_obj[token]

    	if(!movie_data) movie_data="";
    	movie_data = JSON.parse(JSON.stringify(movie_data))
    	if (!movie_data) {
        	res.status(404).send('<h1 style="text-align:center">Sorry, Page not found.</h1>');
        	return;
    	}
	qualities= []
	movie_data['directLinks'].forEach(function(dl){
		qualities.push(dl['height'])
	})
	if(qualities.length==1) qualities=[720]
    	var arr=["1080p", "720p", "480p", "360p", "240p", "144p"]
	var movie_name= toTitleCase(token)
	arr.forEach(function(q){
		movie_name=movie_name.replace(q, "")
	})
	
	res.render('download_page', { 
 		qualities,
		token,
		movie_name,
		analytics:  true
	})
})





app.use('*', function(req, res){
  res.status(404).send('<h1 style="text-align:center">Sorry, Page not found.</h1>');
});


const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

function get_movieslist(){
	return new Promise(function(resolve, reject){
		Movies.find({}).sort({views: -1}).lean().exec( function(err, movieslist){
			if(err) reject(err)
			resolve(movieslist)
		})
	})
}


function pageArray(currentpage, totalpages){
	currentpage= parseInt(currentpage)
	totalpages= parseInt(totalpages)
	
	var pages_nums=[]
	var displaypages=5;  // This has be to odd number

	if(displaypages>totalpages) displaypages= totalpages;
	var factor= Math.floor(5/2)
	
	for( var i=0; i<displaypages; ++i)
		pages_nums.push(currentpage+i-factor);
	
	var to_add=1-pages_nums.filter( function(pagenum){ return pagenum < 1 })[0]
	if(to_add)	
		pages_nums= pages_nums.map( function(pagenum ){return pagenum+to_add})
	
	

	var to_subtract=pages_nums.filter( function(pagenum){
		return pagenum > totalpages
	}).length
	if(to_subtract)	
		pages_nums= pages_nums.map( function(pagenum ){
			return pagenum-to_subtract
		})

	
	console.log(currentpage)

	return pages_nums;

}

var options = {
  
  spdy: { plain: true}
}; 

const server = http2.createServer(options, app).listen(8080, function(){
	console.log("listening"); 
});




