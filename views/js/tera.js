function get_url(tag_name, text){
    pos=text.search('<'+tag_name+'>')
    if(pos==-1)
        pos=text.search('<'+tag_name+' ')
    text= text.slice(pos)
    
    
    text= text.slice(text.search('http'))
    text= text.slice(text.search('http'))
    text= text.slice(0, text.search('</'+tag_name+'>'))
    text=text.trim()
    if(text.endsWith(']]>')){
        text=text.slice(0, -3)
    }
    
    return text
    
}

var vidContainer=document.getElementById('video-container')
var containerHeight= vidContainer.outerHeight
var adEl=document.createElement('video')

adEl.style.position='absolute'
adEl.style.top='0'
adEl.style.left='0'
adEl.style.width='100%' 
adEl.style.height=450
adEl.style.minHeight=450
adEl.setAttribute('class', "video-js vjs-16-9")
adEl.setAttribute('preload', "auto")
adEl.setAttribute('id', "adPlayer")
adEl.setAttribute('controls', "true")


vidContainer.appendChild(adEl)
vidContainer.style.position='relative'

adPlayer=videojs(adEl) 
adPlayer.hide()
adPlayer.hidden=true
let adsInterval= .5 	//minutes

let duration=140

let st= new Date().getTime()


setInterval(function(){
	let time_spent= (new Date().getTime()-st)/1000/60;	// mins
	if(time_spent>=adsInterval){	
		add_ad()
		st= new Date().getTime()

		console.log('more than '+adsInterval+' is spent')
	}
	//console.log(time_spent)
}, 1000)


let playerState= player.paused() ? 'paused' : 'playing';

function toggle_ad(){
	if(adPlayer.hidden){
		player.pause()
		player.hide()
		if(player.isFullscreen()){
			hide_top_els()
			document.querySelector('body').style.position='relative'
			vidContainer.style.position=''

			adEl.setAttribute('height', player.innerHeight)
			adEl.setAttribute('width', window.innerWidth)

		}else{
			adEl.setAttribute('height', player.height_)
			adEl.setAttribute('width', player.width_)
		}
		adPlayer.show()
		
	}else{
		player.show()
		adPlayer.hide()
		if(playerState=='playing')	// if player was previously playing then resume playing otherwise keep pause.
			player.play()
		show_top_els()
		
	}
	console.log('player state is ', playerState)
	adPlayer.hidden= !adPlayer.hidden
}

function hide_top_els(){
	Array.from(document.querySelectorAll('.topEl')).forEach(function(el){
		el.hidden=true
	})
}


function show_top_els(){
	Array.from(document.querySelectorAll('.topEl')).forEach(function(el){
		el.hidden=false
	})
}

function add_ad(){
	fetch('https://www.videosprofitnetwork.com/watch.xml?key=eed90e051ea170a43a701f817d7993a2')
		.then(function(res){ return res.text()}).then(function(res){
		
			var mediaFileUrl = get_url('MediaFile', res)
			var clickThroughUrl = get_url('ClickThrough', res)
			var clickTrackingUrl = get_url('ClickTracking', res)
			var impressionUrl = get_url('Impression', res)
			var errorUrl = get_url('Error', res)
			
			
			playerState= player.paused() ? 'paused' : 'playing';			
			adPlayer.src({
				src: mediaFileUrl,
				type: 'video/mp4'
			})
			
			adPlayer.load()
			
			adPlayer.on('canplaythrough', event => {
  				// I have downloaded enough data to start playing. 
				console.log('video data has been loaded')
				toggle_ad()
				adPlayer.play()
				adPlayer.on('ended', function(){
					console.log('reaching video end event')
					toggle_ad()
				})
				adPlayer.off('canplaythrough')
			}); 
			

		})

}


