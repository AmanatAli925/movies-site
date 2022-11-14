
function pageArray(page, totalPages){
	let pageCount=5
    page= parseInt(page)
	totalPages= parseInt(totalPages)
	
	let pages_arr=Array.from(Array(pageCount).keys()).map(v=>v+1)
    let to_add=page-Math.ceil(pageCount/2)
    if(to_add>0)
        pages_arr= pages_arr.map(v=> v+to_add)
    pages_arr= pages_arr.filter(i=> i+1<=totalPages)
	return pages_arr;
}

module.exports=pageArray;