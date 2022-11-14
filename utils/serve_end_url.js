const https= require('https')

function serve_end_url(res, url){
    https.get(url, function(response){
        // if redirect follow redirect
        if(response.statusCode==302 || response.statusCode==301 || response.statusCode==307){
            return serve_end_url(res, response.headers['Location'] || response.headers['location'])
        }

        // send response if its not redirecting.
        response.pipe(res)
        
    }).on('error', function(err){
        res.sendStatus(500)
        return console.log(err)
    })
}


module.exports= serve_end_url