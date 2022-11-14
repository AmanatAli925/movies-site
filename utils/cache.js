class Cache{
    constructor(){
        this.checkInterval= 10       // minutes
        setInterval(this.purge.bind(this), this.checkInterval*60*1000) 
        this.cache={} 
    }
    
    search(key){
        let v=this.cache[key];
        if (!v) return false;
        v.uses++;
        return v.value
    }
    add(key, value){
        this.cache[key]={
            value, 
            uses: 0
        }
    }
    
    uses(key){
        let v=this.cache[key];
        if (!v) return -1;
        return v.uses;
    }
    purge(){
	console.log('cache is ', this.cache)
        let uses_sum=0
        let cache_keys=Array.from(Object.keys(this.cache));
        cache_keys.forEach(function(key){
            uses_sum+=this.cache[key].uses
        }.bind(this))
        
        
        let avg_use= uses_sum/cache_keys.length;
        
        cache_keys.forEach(function(key){
            let cache_entity=this.cache[key];

	    if(cache_entity.uses<avg_use)
                delete this.cache[key];
	    else cache_entity.uses -= avg_use;

        }.bind(this)) 
    }
    
    
    display(){
        console.log('cache is ', this.cache)
    }
    
    clear(cleary_only, stream_map={}){
        if(clear_only!='stream')
            return this.cache={}
        Array.from(Object.keys(this.cache)).forEach(function(key){
            if(key in stream_map)
                delete this.cache[key]
        }.bind(this))
	    //this.cache={} 
    }
}

module.exports= Cache;