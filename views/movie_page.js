(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['movie1'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	\n	    	<meta itemprop=\"uploadDate\" content=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"uploadDate") || (depth0 != null ? lookupProperty(depth0,"uploadDate") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"uploadDate","hash":{},"data":data,"loc":{"start":{"line":18,"column":43},"end":{"line":18,"column":57}}}) : helper)))
    + "\" />\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<meta itemprop=\"duration\" content=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"duration") || (depth0 != null ? lookupProperty(depth0,"duration") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"duration","hash":{},"data":data,"loc":{"start":{"line":21,"column":37},"end":{"line":21,"column":49}}}) : helper)))
    + "\"/>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"stream_host") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.program(11, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":25,"column":2},"end":{"line":35,"column":9}}})) != null ? stack1 : "")
    + "		 \n	\n		\n		\n		\n		<video  height=\"450\" class=\"video-js vjs-big-play-centered vjs-16-9\" id=\"video1\" data-setup='{ \"autoplay\": false}' controls=\"controls\" preload=\"none\" poster=\"/posters/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"token") || (depth0 != null ? lookupProperty(depth0,"token") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"token","hash":{},"data":data,"loc":{"start":{"line":41,"column":169},"end":{"line":41,"column":178}}}) : helper)))
    + ".jpg\">\n		</video>\n		\n	    \n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"ifEqual")||(depth0 && lookupProperty(depth0,"ifEqual"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"stream_host") : depth0),"yt",{"name":"ifEqual","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.program(9, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":26,"column":3},"end":{"line":31,"column":15}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<meta itemprop=\"contentURL\" content=\"/static/videos/"
    + container.escapeExpression(container.lambda((depths[1] != null ? lookupProperty(depths[1],"token") : depths[1]), depth0))
    + ".mpd\" />\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<meta itemprop=\"contentURL\" content=\"/static/video/"
    + container.escapeExpression(container.lambda((depths[1] != null ? lookupProperty(depths[1],"token") : depths[1]), depth0))
    + ".m3u8\" />\n			\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<meta itemprop=\"contentURL\" content=\"/download-movie/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"token") || (depth0 != null ? lookupProperty(depth0,"token") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"token","hash":{},"data":data,"loc":{"start":{"line":33,"column":56},"end":{"line":33,"column":65}}}) : helper)))
    + ".mp4\" />\n			\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<h2>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":51,"column":5},"end":{"line":51,"column":14}}}) : helper)))
    + " Movie Download Link</h2>\n	\n	<a href=\"/download-movie/"
    + alias4(((helper = (helper = lookupProperty(helpers,"token") || (depth0 != null ? lookupProperty(depth0,"token") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"token","hash":{},"data":data,"loc":{"start":{"line":53,"column":26},"end":{"line":53,"column":35}}}) : helper)))
    + ".mp4\" id=\"download-btn\" target=_blank class=\"download_btn\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":53,"column":94},"end":{"line":53,"column":103}}}) : helper)))
    + " Download </a>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<div class=\"movie-card\">\n			<a href=\"/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"prev") : depth0)) != null ? lookupProperty(stack1,"token") : stack1), depth0))
    + "\"  >\n				<img alt=\"Movie cover image\"   width=\"200\" height=\"200\"  src=\"/thumbnails/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"prev") : depth0)) != null ? lookupProperty(stack1,"token") : stack1), depth0))
    + ".jpg\" width=\"250\" class=\"thumbnail\"/>\n			</a>\n			<p class=\"title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"prev") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</p>\n		</div>\n\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<div class=\"movie-card\">\n			<a href=\"/movie/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"next") : depth0)) != null ? lookupProperty(stack1,"token") : stack1), depth0))
    + "\"  >\n				<img alt=\"Movie cover image\"   width=\"200\" height=\"200\"  src=\"/thumbnails/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"next") : depth0)) != null ? lookupProperty(stack1,"token") : stack1), depth0))
    + ".jpg\" width=\"250\" class=\"thumbnail\"/>\n			</a>\n			<p class=\"title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"next") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</p>\n		</div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <link href=\"/static/css/video-js.min.css\" rel=\"stylesheet\"/>\n    <script type=\"text/javascript\">\n\n\n	function _0x19fd(){var _0x22ac72=['#ad-1\\x20a','replaceState','12114756WPIJSK','click','1ZOLsiq','1247190WEIaxk','log','3555270UBGCaO','DOMContentLoaded','85682arMTOb','querySelector','7vkPDOB','5009512YDhfhQ','/movie/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"token") || (depth0 != null ? lookupProperty(depth0,"token") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"token","hash":{},"data":data,"loc":{"start":{"line":85,"column":219},"end":{"line":85,"column":228}}}) : helper)))
    + "','getElementById','6811464ybnhvx','3096484jSPQrY'];_0x19fd=function(){return _0x22ac72;};return _0x19fd();}function _0x2ac4(_0x3b3bf5,_0x2d993f){var _0x19fdf9=_0x19fd();return _0x2ac4=function(_0x2ac46d,_0x3c78c0){_0x2ac46d=_0x2ac46d-0x167;var _0x5b5637=_0x19fdf9[_0x2ac46d];return _0x5b5637;},_0x2ac4(_0x3b3bf5,_0x2d993f);}var _0x4b5b8a=_0x2ac4;(function(_0x306eb7,_0x40a6e6){var _0x575610=_0x2ac4,_0x19de79=_0x306eb7();while(!![]){try{var _0x4b0f74=-parseInt(_0x575610(0x175))/0x1*(parseInt(_0x575610(0x169))/0x2)+-parseInt(_0x575610(0x176))/0x3+parseInt(_0x575610(0x170))/0x4+parseInt(_0x575610(0x167))/0x5+-parseInt(_0x575610(0x16f))/0x6+-parseInt(_0x575610(0x16b))/0x7*(parseInt(_0x575610(0x16c))/0x8)+parseInt(_0x575610(0x173))/0x9;if(_0x4b0f74===_0x40a6e6)break;else _0x19de79['push'](_0x19de79['shift']());}catch(_0xed184f){_0x19de79['push'](_0x19de79['shift']());}}}(_0x19fd,0x953b7),history[_0x4b5b8a(0x172)]({},null,_0x4b5b8a(0x16d)),document[_0x4b5b8a(0x16e)]('download-btn')['addEventListener'](_0x4b5b8a(0x174),function(){return![];}),window['addEventListener'](_0x4b5b8a(0x168),function(){setTimeout(function(){var _0x30b9ab=_0x2ac4;console[_0x30b9ab(0x177)](document[_0x30b9ab(0x16a)](_0x30b9ab(0x171)));},0xfa0);}));\n	\n   </script>\n\n    \n   \n    \n    <style>\n	.video-js .vjs-time-control{display:block;}\n    	.video-js .vjs-remaining-time{display: none;}\n	.video-js .vjs-seek-to-live-control{display: none;}\n	\n	form.search-form input{\n		width: 20rem;\n		padding: .3rem;\n	}\n	form.search-form button{\n		padding: .3rem;\n	}\n	body{\n		margin: 0;\n	}\n\n	div.video-js{\n		width: 100%;\n		margin-bottom: 3rem;\n		\n	}\n	div.video-container{\n		position: relative ;\n	}\n	div.bkwrd-frwrd-container{\n		\n		position:absolute;\n		left: 0;\n		top: 0;\n		width: 100%;\n		height: 100%;	\n		display: none;\n		grid-template-columns: 1fr 1fr;\n		justify-content: center;\n		align-items: center;\n		display:none;\n		opacity: 1;\n  		transition: opacity 1s;\n		\n	}\n		\n	.fade {\n		opacity: 0;\n	}	\n	div.bkwrd, div.frwrd{\n		\n		width: 100%;\n		height: 60px;\n		display:flex;\n		opacity: 0;\n	}\n	\n	div.bkwrd{\n		justify-content: flex-start\n	}\n	div.frwrd{\n		justify-content: flex-end\n	}\n	div.triangle-right, div.triangle-left{\n		width: 0;\n		height: 0;\n		margin: 0;\n	}\n	div.triangle-right {\n		border-top: 25px solid transparent;\n		border-left: 50px solid #555;\n		border-bottom: 25px solid transparent;\n	}\n	div.triangle-left {\n		border-top: 25px solid transparent;\n		border-right: 50px solid #555;\n		border-bottom: 25px solid transparent;\n	}\n	video{\n		width:100%;\n		\n	}\n	div.prev-next-container{\n		display: grid;\n		grid-template-columns: 1fr 1fr;\n		justify-content: space-around;\n		margin: 4rem 0;\n	}\n	div.movie-card{\n		border-radius: 1px;\n		border: 1px solid black;\n		cursor: pointer;\n		margin: 1rem 8rem;\n\n	}\n\n	div.movie-card img.thumbnail{\n		width: 100% !important;\n	}\n\n	div.movie-card p.title{\n		text-transform: capitalize;\n\n	}\n	a.download_btn{\n		display: inline-block;\n		margin: 1rem 0;\n		padding: 1rem;\n		background-color: #ADD8E6;\n	}\n\n	iframe.video2{\n		width: 100%;\n		height: 500px;\n		margin-bottom: 5rem;\n	}\n\n	@media (max-width: 480px){\n		div.prev-next-container{\n			display: grid;\n			grid-template-columns:  1fr !important;\n\n		}\n\n		div.movie-card{\n\n			margin: 1rem 0;\n\n		}\n		iframe.video2{\n			height: 200px;\n		}\n\n	}\n   </style>\n";
},"21":function(container,depth0,helpers,partials,data) {
    return "<script src=\"/static/js/videojs-contrib-quality-levels.min.js\" type=\"text/javascript\"></script>\n<script src=\"/static/js/videojs-http-source-selector.min.js\" type=\"text/javascript\"></script>\n";
},"23":function(container,depth0,helpers,partials,data) {
    return "			var options = \n			{\n    				plugins: {\n      					httpSourceSelector:\n      						{\n        						default: 'auto'\n      						}\n    				} \n  			};\n		\n		\n  			var player = videojs('video1', options);\n  		\n			player.httpSourceSelector(); \n";
},"25":function(container,depth0,helpers,partials,data) {
    return "			var player = videojs('video1')\n";
},"27":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				let stream_info={}\n"
    + ((stack1 = (lookupProperty(helpers,"ifEqual")||(depth0 && lookupProperty(depth0,"ifEqual"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"stream_host") : depth0),"yt",{"name":"ifEqual","hash":{},"fn":container.program(28, data, 0, blockParams, depths),"inverse":container.program(30, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":295,"column":4},"end":{"line":306,"column":16}}})) != null ? stack1 : "")
    + "  				player.src([\n					stream_info,\n					{\n    						src: '/download-movie/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"token") || (depth0 != null ? lookupProperty(depth0,"token") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"token","hash":{},"data":data,"loc":{"start":{"line":310,"column":32},"end":{"line":310,"column":41}}}) : helper)))
    + ".mp4',\n    						type: 'video/mp4'\n  					}\n				]);\n";
},"28":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					stream_info={\n    						src: '/static/videos/"
    + container.escapeExpression(container.lambda((depths[1] != null ? lookupProperty(depths[1],"token") : depths[1]), depth0))
    + ".mpd',\n    						type: 'application/dash+xml'\n  					}					\n";
},"30":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					\n					stream_info={\n    						src: '/static/video/"
    + container.escapeExpression(container.lambda((depths[1] != null ? lookupProperty(depths[1],"token") : depths[1]), depth0))
    + ".m3u8',\n    						type: 'application/x-mpegURL'\n  					} \n";
},"32":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				player.src({\n    					src: '/download-movie/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"token") || (depth0 != null ? lookupProperty(depth0,"token") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"token","hash":{},"data":data,"loc":{"start":{"line":316,"column":31},"end":{"line":316,"column":40}}}) : helper)))
    + ".mp4',\n    					type: 'video/mp4' \n  				})\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n\n\n<div itemscope itemtype=\"https://schema.org/VideoObject\"> \n            \n            \n            \n\n            <h2><span itemprop=\"name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":9,"column":38},"end":{"line":9,"column":47}}}) : helper)))
    + "</span></h2>\n            <p><span itemprop=\"description\">Watch <cite>"
    + alias4((lookupProperty(helpers,"tolower")||(depth0 && lookupProperty(depth0,"tolower"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"title") : depth0),{"name":"tolower","hash":{},"data":data,"loc":{"start":{"line":10,"column":56},"end":{"line":10,"column":73}}}))
    + "</cite> movie online. Fast video stream and simple interface.</span></p>\n            \n	    \n	    \n\n    \n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"uploadDate") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":12},"end":{"line":19,"column":12}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"duration") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":5},"end":{"line":22,"column":19}}})) != null ? stack1 : "")
    + "	    <meta itemprop=\"thumbnailUrl\" content=\"/thumbnails/"
    + alias4(((helper = (helper = lookupProperty(helpers,"token") || (depth0 != null ? lookupProperty(depth0,"token") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"token","hash":{},"data":data,"loc":{"start":{"line":23,"column":56},"end":{"line":23,"column":65}}}) : helper)))
    + ".jpg\" />\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"downloadLinks") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":6},"end":{"line":45,"column":19}}})) != null ? stack1 : "")
    + "</div>\n\n\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"downloadLinks") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":0},"end":{"line":54,"column":7}}})) != null ? stack1 : "")
    + "\n\n<div class='prev-next-container'>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"prev") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":58,"column":1},"end":{"line":66,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"next") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":1},"end":{"line":74,"column":8}}})) != null ? stack1 : "")
    + "\n</div> \n\n\n<span id=\"token\" hidden=\"true\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"token") || (depth0 != null ? lookupProperty(depth0,"token") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"token","hash":{},"data":data,"loc":{"start":{"line":79,"column":31},"end":{"line":79,"column":44}}}) : helper))) != null ? stack1 : "")
    + "</span>\n"
    + ((stack1 = (lookupProperty(helpers,"section")||(depth0 && lookupProperty(depth0,"section"))||alias2).call(alias1,"head",{"name":"section","hash":{},"fn":container.program(19, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":80,"column":0},"end":{"line":222,"column":13}}})) != null ? stack1 : "")
    + "\n<script src=\"/static/js/video.min.js\" type=\"text/javascript\"></script>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"stream_host") : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":226,"column":0},"end":{"line":229,"column":7}}})) != null ? stack1 : "")
    + "<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/videojs-seek-buttons/dist/videojs-seek-buttons.css\">\n<link rel=\"stylesheet\" href=\"/static/css/home.css\">\n\n<script src=\"https://cdn.jsdelivr.net/npm/videojs-seek-buttons/dist/videojs-seek-buttons.min.js\"></script>\n\n\n<script> 	\n	 \n		\n		function setCookie(name,value,days) {\n    			var expires = \"\";\n    			if (days) {\n        			var date = new Date();\n        			date.setTime(date.getTime() + (days*24*60*60*1000));\n        			expires = \"; expires=\" + date.toUTCString();\n    			}\n    			document.cookie = name + \"=\" + (value || \"\")  + expires + \"; path=/\";\n		}\n		function getCookie(name) {\n    			var nameEQ = name + \"=\";\n    			var ca = document.cookie.split(';');\n    			for(var i=0;i < ca.length;i++) {\n        			var c = ca[i];\n        			while (c.charAt(0)==' ') c = c.substring(1,c.length);\n        			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);\n    			}\n    			return null;\n		}\n		function eraseCookie(name) {   \n    			document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';\n		}\n		\n		\n\n		videojs.Vhs.GOAL_BUFFER_LENGTH = 1200;\n		videojs.Vhs.MAX_GOAL_BUFFER_LENGTH = 1200; \n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"stream_host") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0, blockParams, depths),"inverse":container.program(25, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":267,"column":2},"end":{"line":284,"column":10}}})) != null ? stack1 : "")
    + "		player.seekButtons({\n    			forward: 30,\n   			back: 10\n  		});\n		\n\n\n		player.ready(function() {\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"stream_host") : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0, blockParams, depths),"inverse":container.program(32, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":293,"column":3},"end":{"line":319,"column":10}}})) != null ? stack1 : "")
    + "\n			let leftOffTime=getCookie('"
    + alias4(((helper = (helper = lookupProperty(helpers,"token") || (depth0 != null ? lookupProperty(depth0,"token") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"token","hash":{},"data":data,"loc":{"start":{"line":321,"column":30},"end":{"line":321,"column":39}}}) : helper)))
    + "-[left-off-time]');\n			if(leftOffTime){\n				player.currentTime(leftOffTime)\n			}\n		})\n\n		setInterval(function(){\n			setCookie('"
    + alias4(((helper = (helper = lookupProperty(helpers,"token") || (depth0 != null ? lookupProperty(depth0,"token") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"token","hash":{},"data":data,"loc":{"start":{"line":328,"column":14},"end":{"line":328,"column":23}}}) : helper)))
    + "-[left-off-time]', player.currentTime(), 150);\n		}, 1000)\n\n</script>\n\n";
},"useData":true,"useDepths":true});
})();