import httplib2
import sys
from bs4 import BeautifulSoup, SoupStrainer
from pymongo import MongoClient

PAGES=int(sys.argv[2])
SITE= sys.argv[1]

client= MongoClient('mongodb+srv://amanat:Newpassword1@cluster0.8wfum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
movies_data=client.myFirstDatabase.movies.find({})



FILENAME= './views/sitemap.xml'
if len(SITE.split('.'))>2:
	FILENAME= './views/www.sitemap.xml'
http = httplib2.Http()
sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n'
sitemap+='<url>\n\t<loc>https://'+SITE+'</loc>\n</url>\n'
for movie_data in movies_data:
	condition = 'vk' in movie_data
	condition = condition and movie_data['vk']
	condition = condition and 'vk_video_id' in movie_data
	condition = condition and movie_data['vk_video_id']
	condition = condition and 'directLinks' in movie_data
	condition = condition and movie_data['directLinks']
	if not condition:
		continue
        sitemap+='<url>\n\t<loc>https://'+SITE+'/'+movie_data['token']+'</loc>\n</url>\n'

sitemap+='</urlset>'
file=open(FILENAME, 'w')
file.seek(0)
file.write(sitemap)
print(sitemap)