
const defaultOptions = {
  timeout: 5000,
  jsonpCallback: 'callback',
  jsonpCallbackFunction: null,
};

function generateCallbackFunction() {
  return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
}

function clearFunction(functionName) {
  // IE8 throws an exception when you try to delete a property on window
  // http://stackoverflow.com/a/1824228/751089
  try {
    delete window[functionName];
  } catch (e) {
    window[functionName] = undefined;
  }
}

function removeScript(scriptId) {
  const script = document.getElementById(scriptId);
  if (script) {
    document.getElementsByTagName('head')[0].removeChild(script);
  }
}




var token=document.getElementById('token').innerText;
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

/*videojs.Vhs.xhr.beforeRequest=  function(options){
	var req_url= options.uri.split('.com').pop()
	
	var request = new XMLHttpRequest();
	request.open('GET', req_url, false);  // `false` makes the request synchronous
	request.send(null);

	if (request.status === 200) 
  		options.uri=decodeURI(request.responseText);
	
	return options
	
}*/


var player = videojs('video1');
var video_el= document.getElementById('video1');
player.ready(function() {
	player.tech_.off('dblclick');
});
function seek(secs){
	var seekTime= player.currentTime()+secs;
	if( secs<0 ) secs=0;
	player.currentTime(seekTime)
}
function fadeIn(element) {
    return new Promise( function(resolve, reject){
		var op = 0.1;  // initial opacity
		element.style.display = 'flex';
		var timer = setInterval(function () {
			if (op >= 1){
				clearInterval(timer);
				resolve()
			}
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op += op * 0.1;
		}, 10);
	})
}

function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'flex';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function forward(secs){
	var container_el= document.getElementById('bkwrd-frwrd-container');
	container_el.style.display= 'grid';
	var frwrd_el= document.getElementById('frwrd');
	fadeIn(frwrd_el).then(function(){
		fadeOut(frwrd_el)
		container_el.style.display= 'none';
	})
	seek(secs)
}
function backward(secs){
	var container_el= document.getElementById('bkwrd-frwrd-container');
	container_el.style.display= 'grid';
	var bkwrd_el= document.getElementById('bkwrd');
	fadeIn(bkwrd_el).then(function(){
		fadeOut(bkwrd_el)
		container_el.style.display= 'none';
	})
	seek(-30)
}


var vid_el=document.querySelector('#video1 video')



/*setInterval( function(){
	
	
	if(!vid_el.playing && vid_el.readyState==1 && vid_el.buffered.length &&vid_el.buffered.end(0)>=10){
		vid_el.currentTime = vid_el.currentTime+2;
		console.log("Reaching")
	}

}, 5000)*/



player.on('dblclick', function(event){
	event.preventDefault()
	var click_location=event.clientX-video_el.getBoundingClientRect().left
	var half= video_el.offsetWidth/2
	if( click_location> half)
		forward(30)
	if( click_location< half)
		backward(30)
		
})




var mylatesttap;
function isDoubletap() {
   var now = new Date().getTime();
   var timesince = now - mylatesttap;
   mylatesttap = new Date().getTime();
   return (timesince < 600) && (timesince > 0)
}

player.on('touchstart', function(event){
	
	if(isDoubletap()){
		
		var touch = event.touches[0] || event.changedTouches[0];
        var click_location=touch.pageX-video_el.getBoundingClientRect().left
		
		var half= video_el.offsetWidth/2
		if( click_location> half)
			forward(30)
		if( click_location< half)
			backward(30)
	}
})

player.player_._guessVideoType = function(video){
    var videoTypes = {
      'webm' : 'video/webm',
      'mp4' : 'video/mp4',
      'ts' : 'video/mp2t',
      'm3u8' : 'application/x-mpegurl'
    };
    var extension = video.split('.').pop();
    console.log('guessing video type')
    return videoTypes[extension] || '';
  };







