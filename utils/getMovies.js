const Movies= require('../models/movie')
const {stream_hosts}= require('./streamHosts.js')
const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

let movieslist=[]
let movieslist_obj={}

function getMovies(){
    return new Promise(function(resolve, reject){

        Movies.find({}).lean().exec(function(err, all_movies){

            if(err){
                console.log(err)
                reject(err) 
                return;
            }
            console.log("Got all movies")
            movieslist.splice(0, movieslist.length)
            Object.assign(movieslist, all_movies)
            let filtered=movieslist.filter( 
                m=> m.vk && 
                m.vk_video_id && 
                m.directLinks && 
                m.directLinks.length
            )
            Object.assign(
                movieslist,
                filtered,
                {
                    length: filtered.length
                }
            )
                
            movieslist.forEach(function(m, i){
                m.prev= movieslist.slice(-i)[0].token;
                m.next= movieslist.slice(-(i+1))[0].token;
                
                m.next = {
                    token: m.next,
                    title: toTitleCase(m.next)
                }
                m.prev = {
                    token: m.prev,
                    title: toTitleCase(m.prev)
                }

                m.title= toTitleCase(m.token)
	
                if(!m.date) 
                    m.date='2021-10-14T11:24:30.000Z'	// dummy date
                else{
                    let t=new Date(1970, 0, 1)
                    t.setSeconds(m.date)
                    m.date=t.toISOString()
                }
                
                if(m.duration)
                        m.duration= 
                            'PT' + Math.floor(m.duration/3600) + 
                            'H' + Math.floor((m.duration/60) %60) + 
                            'M' + (m.duration%60) + 'S';

                m.stream_host= stream_hosts[m.token.toLowerCase()]
            
                if(m.directLinks)
                    m.videosLinks=m.directLinks.slice(0, 3)      
                
                
                movieslist_obj[m.token.toLowerCase()]= m
            })

            resolve({
                movieslist,
                movieslist_obj
            })

        })
    })
}



module.exports= {
    movieslist,
    movieslist_obj,
    getMovies
}
