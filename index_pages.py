from oauth2client.service_account import ServiceAccountCredentials
import httplib2
import json

import sys
import time


#client= MongoClient('mongodb+srv://amanat:Newpassword1@cluster0.8wfum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
#not_requested=client.myFirstDatabase.movies.find({})

#print(not_requested.count())

trending=[]
trending_movies=[]

api_url="https://api.themoviedb.org/3/discover/movie?api_key=1382c287b03aabb298eaff94d4a55820&with_origin_country=IN&primary_release_year=2022&sort_by=vote_count.desc"
old_api_url="https://api.themoviedb.org/3/trending/all/week?api_key=1382c287b03aabb298eaff94d4a55820"


def remove_symbols(token):
	symbols= """~!@#$%^&*()_+`,./;'\[]\{}:"|?><|="""
	for c in symbols:
		token= token.replace(c, '')
	return token

for page in range(1,11):
	trending=[]
	response, content= httplib2.Http().request(api_url+ '&page=' + str(page))
	trending+=json.loads(content)['results']
	print('page in reponse is ', json.loads(content)['page'])
	
	for movie in trending:
		
		search=""
		if('title' in movie):
			search=movie['title']
		
		if('name' in movie):
			search=movie['name']
		
		if not search:
			continue
		response, content= httplib2.Http().request('https://themovieshouse.com/?search='+remove_symbols(search)+'&array=true')
		found_list=json.loads(content)
		if not found_list:
			continue
		print('search content is ', remove_symbols(search))
		print('len is ', len(found_list))
		trending_movies.append(found_list[0])
	time.sleep(.2)




for each in trending_movies:
	print(each['token'])
	SCOPES = [ "https://www.googleapis.com/auth/indexing" ]
	ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

	# service_account_file.json is the private key that you created for your service account.
	JSON_KEY_FILE = "/home/ubuntu/movies_https_dev_v3/service_account_file.json"

	credentials = ServiceAccountCredentials.from_json_keyfile_name(JSON_KEY_FILE, scopes=SCOPES)

	http = credentials.authorize(httplib2.Http())

	# Define contents here as a JSON string.
	# This example shows a simple update request.
	# Other types of requests are described in the next step.
   

	indexing_url="https://www.themovieshouse.com/"+each['token']
	content = {
		"url": indexing_url,
		"type": "URL_UPDATED"
	}
	content= json.dumps(content)

	response, content = http.request(ENDPOINT, method="POST", body=content,  headers={'cache-control':'no-cache'})
    
	print(response)
	print(content)
	#client.myFirstDatabase.movies.update_one({ '_id': each['_id'] }, {  "$set": {'index_requested': True }})
	if not response['status']=='200':
		break
	time.sleep(.2) 
    
 