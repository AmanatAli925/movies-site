const express= require('express')

const router= express.Router()
const {
    movieslist, 
    movieslist_obj,
    getMovies
}= require('../utils/getMovies')

router.get('/:token',  handle_movie_page)
router.get('/dev/:token',  handle_movie_page)


function handle_movie_page(req, res) {
	
	var token = req.params.token.toLowerCase();
    
	if(token.includes('_')){
    	token= token.replace(/_/g, '-');
		res.redirect(301, '/'+token);
		return;
    }

    let next= prev= {}
	movie_data= movieslist_obj[token.split('-[')[0]]
	movie_data = JSON.parse(JSON.stringify(movie_data))
	if (
		movie_data.redirect &&
		token != movie_data.redirect.token
	){
		return res.redirect(301, '/'+movie_data.redirect.token)     
	}
    
	if (!movie_data) 
        return res.status(404).send('<h1 style="text-align:center">Sorry, Page not found.</h1>');  
    var referer=req.get("Referrer") || '';
    
    
    
	var render_options={
			...movie_data,
			keywords: movie_data.token.replace(/[_]/g, ','),
			analytics: true,
	}
	res.render(req.query.view || "movie1", render_options)
}

module.exports= router;