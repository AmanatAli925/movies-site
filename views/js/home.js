	var currentpage= parseInt(document.getElementById('current-page').value)
	var totalpages= parseInt(document.getElementById('total-pages').value)
	function urlSearchParams(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if (results == null){
		  return null;
		}
		else {
			  return decodeURI(results[1]) || 0;
			};
	}
	
	var search="";
	if(urlSearchParams('search')) search=urlSearchParams('search');
	search=search.replace(/\+/g, ' ')
	document.getElementById('search-field').value=search;
	if(currentpage==totalpages || totalpages==0)
		document.getElementById('next').hidden=true;
	
	if(currentpage==1)
		document.getElementById('prev').hidden=true;

	
	document.getElementById('page'+currentpage.toString()).setAttribute('class', 'active')
	
	/*pages_nums.forEach(function(pagenum){
		var el=document.createElement('DIV')
		el.setAttribute('class', 'non-active');
		
		if(currentpage==pagenum)
			el.setAttribute('class', 'active');
		el.innerHTML='<a href="/?page='+pagenum+'&search='+search+'">'+pagenum+'</a>';
	
		document.getElementById('pages-nums').appendChild(el)
	})*/
	
	document.getElementById('next').addEventListener('click', function(event){		
		var nextpage=++currentpage;
		
		if(nextpage>totalpages)
			nextpage=totalpages
		document.getElementById('current-page').value=nextpage
		document.getElementById('search').value=search;
		document.getElementById('pagination-form').submit();
	})
	
	document.getElementById('prev').addEventListener('click', function(event){		
		var prevpage=--currentpage;
		
		if(prevpage<1)
			prevpage=1
		document.getElementById('current-page').value=prevpage;
		document.getElementById('search').value=search;
		document.getElementById('pagination-form').submit();
	})
