videojs.options.vhs.overrideNative = true;
videojs.options.html5.nativeAudioTracks = false;
videojs.options.html5.nativeTextTracks = false;
videojs.Vhs.GOAL_BUFFER_LENGTH=300;
videojs.Vhs.MAX_GOAL_BUFFER_LENGTH=300;
var token=document.getElementById('token').innerText;

videojs.Vhs.xhr.beforeRequest=  function(options){
	const req_url= options.uri.split('.com').pop()
	
	var request = new XMLHttpRequest();
	request.open('GET', req_url, false);  // `false` makes the request synchronous
	request.send(null);

	if (request.status === 200) 
  		options.uri=decodeURI(request.responseText);
	
	return options
	
}
var player = videojs('video');
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






player.src({
	src: token+'/'+token+'.m3u8',
	type: 'application/x-mpegURL'
});