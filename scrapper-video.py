import httplib2
import sys
from bs4 import BeautifulSoup, SoupStrainer
from pymongo import MongoClient
import json

SITE= sys.argv[1]

client= MongoClient('mongodb+srv://amanat:Newpassword1@cluster0.8wfum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
movies_data=client.myFirstDatabase.movies.find({})



FILENAME= './views/sitemap-video.xml'
if len(SITE.split('.'))>2:
	FILENAME= './views/www.sitemap-video.xml'
http = httplib2.Http()
sitemap='<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'


for movie_data in movies_data:
	condition = 'vk' in movie_data
	condition = condition and movie_data['vk']
	condition = condition and 'vk_video_id' in movie_data
	condition = condition and movie_data['vk_video_id']
	condition = condition and 'directLinks' in movie_data
	condition = condition and movie_data['directLinks']
	

	
	if not condition:
		continue
	
		
	
	dood_data={}
	if 'dood_data' in movie_data:
		dood_data= json.loads( movie_data['dood_data'])
		dood_data['status']=400
		if dood_data['status']==200:
			video_location='<video:player_loc>https://dood.so/e/'+dood_data['result'][0]['filecode']+'</video:player_loc>'
	
	if not 'dood_data' in movie_data or  dood_data['status']!=200:
		video_location='<video:content_loc>https://www.watchmoviesonlin.com/download-movie/'+movie_data['token']+'.mp4</video:content_loc>'
	
	
        sitemap+="""<url>
			<loc>https://{sitename}/{token}</loc>
     			<video:video>
      				<video:thumbnail_loc>https://{sitename}/thumbnails/{token}.jpg</video:thumbnail_loc>
       				<video:title>{title}</video:title>
       				<video:description>Watch {title} movie oline or download for watching offline.</video:description>
       				{video_location}
			</video:video>
		
		     </url>""".format(
				title=movie_data['token'].replace('-', ' ').title(), 
				sitename=SITE,
				token=movie_data['token'],
				video_location= video_location
				)
	
	continue
	if not 'streamLinks' in movie_data or not len(movie_data['streamLinks']):
		print("Reaching")	
		continue

	sitemap+="""<url>

			<loc>https://{sitename}/watch-movies-online-or-download/{token}</loc>
     			<video:video>
      				<video:thumbnail_loc>https://{sitename}/thumbnails/{token}.jpg</video:thumbnail_loc>
       				<video:title>{title}</video:title>
       				<video:description>Watch {title} movie oline or download for watching offline.</video:description>
       				<video:content_loc>https://{sitename}/watch-movie-online/{token}/{token}.m3u8</video:content_loc>
			</video:video>
			
		     </url>


		  """.format(title=movie_data['token'].replace('-', ' ').title(), sitename=SITE, token=movie_data['token'])
sitemap+='</urlset>'
file=open(FILENAME, 'w')
file.seek(0)
file.write(sitemap)
print(sitemap)