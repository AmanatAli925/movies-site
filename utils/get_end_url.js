
function get_end_url(originalUrl){
	return new Promise(function(resolve, reject){
		function follow_redirects(url){
			
			let head_request= https.request(url, { method: 'HEAD' },  function(response){
				if(response.statusCode==302 || response.statusCode==301 || response.statusCode==307){
					return follow_redirects(response.headers['Location'] || response.headers['location'])
				}

				resolve(url)
				
			}).end()
			head_request.on('error', function(err){
				res.sendStatus(500)
				console.log(err)
				reject(err)
			})
			
		}
		follow_redirects(originalUrl)
	})
	
}

module.exports= get_end_url