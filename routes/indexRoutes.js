const express= require('express')
const pageArray= require('../utils/paginationArr')
const {
    movieslist, 
    movieslist_obj,
    getMovies
}= require('../utils/getMovies')
let {stream_hosts, set_stream_hosts}= require('../utils/streamHosts')
const router= express.Router()



router.get("/dev",  (req, res) => handle_page_request(req, res))
router.get("/",  (req, res) => handle_page_request(req, res))
router.get("/page/last",  (req, res) => handle_page_request(req, res)) 



function copy(value){
	return JSON.parse(JSON.stringify(value))
}
function handle_page_request(req, res){ 
    
    console.log('in handle_page_request')
    console.log(req.originalUrl) 
    //req.query.search=""
    if(!req.query.search)
        req.query.search=""

    req.query.search= req.query.search.trim()
    if( req.query.search 
		&& !(tags.find(
			t=> t==req.query.search.trim().toLowerCase()
		)) 
	){
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
	req.query.search=req.query.search.replace(/ /g, "_")
	var relevance=[]
	if(req.query.search)
		search_movieslist= movieslist.filter( function(m){
			var indexes= m.token
			indexes = '-'+indexes.toLowerCase()+'-';
			search= req.query.search.toLowerCase();
			var words=search.split("_");
			var arr= search.split('_');

			// creating combinations of search query 
			// "this is query" will was words
			// ["this", "is", "query", "this-is", "is-query", "this-is-query"]
			// those matching more same sequeces will rank higher.
			for(var count=2; count<=arr.length; count++){
				pos= 0
				while(pos<= (arr.length-count)){
					words.push(arr.slice(pos, pos+count).join('-'))
					pos+=1
				}				
			}
	
	
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

			// any movie with weight 1 or more should be included
			return overall_weight		
		})
	else
	    search_movieslist= movieslist

	// copying values to not add relevances to original array
	search_movieslist= copy(search_movieslist)

	if(req.query.search)
		search_movieslist= search_movieslist.map( (m,i) => { return {...m, relevance: relevance[i]}})
	
	
	if(req.query.search)
		search_movieslist= search_movieslist.sort( (a,b )=> b.relevance-a.relevance)

	page_movieslist= search_movieslist
						.slice(end-movies_per_page, end)
	
	
	if(req.query['array'])
		return res.json(page_movieslist)
	
    totalpages=Math.ceil(search_movieslist.length/movies_per_page)	
    
    res.render(req.query.view || 'home', {
            movieslist: page_movieslist,
            page,
            totalpages,
	    	pages_nums: pageArray(page,totalpages),
	    	search: req.query.search.replace(/_/g, ' ')
    })
	
}





module.exports= router;