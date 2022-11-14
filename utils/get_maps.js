const Cache= require('./cache')
const path= require('path')
const fs= require('fs')
const yt_loc= path.join(__dirname,'..', 'mapfile')
const vk_loc= path.join(__dirname,'..', 'vk_mapfile')


const yt_map=JSON.parse(fs.readFileSync(yt_loc, 'utf-8'))
const vk_map=JSON.parse(fs.readFileSync(vk_loc, 'utf-8'))
const stream_map= {...vk_map, ...yt_map}
const stream_map_cache= new Cache();

function set_maps(){
     for (var key in yt_map)       // have to do it this way
          delete yt_map[key];      // in order perserve reference to these objects
                                   // from other modules
     Object.assign(yt_map,JSON.parse(fs.readFileSync(yt_loc, 'utf-8')))

     for (var key in vk_map) 
          delete vk_map[key];
     Object.assign(vk_map,JSON.parse(fs.readFileSync(vk_loc, 'utf-8')))
     
     for (var key in stream_map) 
          delete stream_map[key];
     Object.assign(stream_map, vk_map, yt_map)
     
}

module.exports={
     yt_map,
     vk_map,
     stream_map,
     stream_map_cache,
     set_maps
}
     
