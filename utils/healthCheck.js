
function health_check(url){
	let searchParams=false
	if(url.split('?').length>1)
		searchParams=url.split('?')[1].replace('&', '/').replace('=', '/').split('/')
	let last_health_check=0
	if(searchParams)
		last_health_check=Number(searchParams[searchParams.findIndex(s=> s=='last_health_check')+1])
	if(last_health_check && (new Date().getTime()-last_health_check)/1000/60 < 5)
		return url

	if(last_health_check)
		url=url.repace('&last_health_check='+last_health_check, '&last_health_check='+new Date().getTime())
	else
		url+='&last_health_check='+new Date().getTime()
	return new Promise(function(resolve, reject){
		let headers= { 'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Mobile Safari/537.36'}
		let head_request= https.request(url, { method: 'HEAD', headers },  function(response){
			if(response.statusCode!=200)
				resolve(False)

			resolve(True)
				
		})
		head_request.on('error', function(err){
			res.sendStatus(500)
			console.log(err)
			resolve(False)
		})
		head_request.end()
			
	})


}


module.exports= health_check