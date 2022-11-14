var token= document.getElementById('token').innerText.trim()
var stream_host= document.getElementById('stream_host').innerText.trim()
console.log(stream_host)
 
var firstAdTime= 30*1000	// 30 seconds
var succesiveAdInterval= 30*60*1000	// 30 minutes
//var firstAdTimeout=setTimeout(add_ad, firstAdTime)
//var adsInterval=setInterval(add_ad, succesiveAdInterval)



var manifestUri =""

if(stream_host=='vk')
    	manifestUri='/video/'+token+'/master.m3u8';
else if(stream_host=='yt')
    	manifestUri='/videos/'+token+'.mpd'
if(!stream_host)
    	add_mp4_player()
else{
	
	// Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.
	document.addEventListener('shaka-ui-loaded', init);
	// Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
	// to load (e.g. due to lack of browser support).
	document.addEventListener('shaka-ui-load-failed', initFailed);

}
async function init() {
  // When using the UI, the player is made automatically by the UI object.
  const video = document.getElementById('video');
  const ui = video['ui'];
  const controls = ui.getControls();
  const player = controls.getPlayer();
  player.configure({
	streaming: {
    		bufferingGoal: 300
	} 
  })
  // Attach player and ui to the window to make it easy to access in the JS console.
  window.player = player;
  window.ui = ui;

  // Listen for error events.
  player.addEventListener('error', onPlayerErrorEvent);
  controls.addEventListener('error', onUIErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
    	await player.load(manifestUri);
    // This runs if the asynchronous load is successful.
    
    console.log('The video has now been loaded!');
  } catch (error) {
    	onPlayerError(error);
	player.destroy() 
	add_mp4_player(); 
  }
}


function add_mp4_player(){
	var videoEl= document.createElement('VIDEO') 
	videoEl.style.width="100%"
	videoEl.style.height="100%"
	videoEl.setAttribute('src' ,"/download-movie/"+token+".mp4")
	videoEl.setAttribute('controls', 'true')
	videoEl.setAttribute('poster' , "/posters/"+token+".jpg")
	
	
	document.getElementById('video-container').innerHTML=""
	document.getElementById('video-container').appendChild(videoEl)
  	//clearTimeout(firstAdTimeout)
	//clearInterval(adsInterval)
}
function onPlayerErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(event.detail);
}

function onPlayerError(error) {
  // Handle player error
  //console.error('Error code', error.code, 'object', error);
}

function onUIErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(event.detail);
}

function initFailed(errorEvent) {
  // Handle the failure to load; errorEvent.detail.reasonCode has a
  // shaka.ui.FailReasonCode describing why.
  console.error('Unable to load the UI library!');
}

function add_ad(){
	console.log('add_ad is called')
	const adManager = player.getAdManager();
	const video = document.getElementById('video');
	const ui = video['ui'];
	// If you're using a non-UI build, this is the div you'll need to create
	// for your layout.  The ad manager will clear this div, when it unloads, so
	// don't pass in a div that contains non-ad elements.
	const container = video.ui.getControls().getClientSideAdContainer(); 
	adManager.initClientSide(container, video);
	
	const adsRequest = new google.ima.AdsRequest();
	// Your ad tag url should go here. We are using a sample ad tag from the
	// IMA HTML5 SDK implementation guide for this tutorial.
	adsRequest.adTagUrl = 'https://www.videosprofitnetwork.com/watch.xml?key=eed90e051ea170a43a701f817d7993a2';
	adManager.requestClientSideAds(adsRequest);
}
