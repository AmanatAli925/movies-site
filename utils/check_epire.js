
function check_expire(link, arg_name, unit, threshold){
	let expire=-1;
	
	let searchParams= link.split('?')[1]
	if(searchParams)
		searchParams=searchParams.split('&').map( function(v) { 
		    let obj={}
		    obj[v.split('=')[0]]=v.split('=')[1]
		    return obj;
		    
		})
	else{
		params= link.split('/').slice(3)
		searchParams=[]
		params.forEach(function(p, i){
			if( i%2==1) return false;
			let obj={}
			obj[params[i]]= params[i+1]
			searchParams.push(obj)
		})
	}
	
	let expires=searchParams.find( v => v[arg_name] )[arg_name]
	expires= Number(expires)
	let currentMs=new Date().getTime();
	let currentS= currentMs/1000;
	unit=unit.toLowerCase()
	if(unit=='s')
	    return currentS > expires-threshold
	else if(unit=='ms')
        return currentMs > expires-threshold
		
}

module.exports= check_expire