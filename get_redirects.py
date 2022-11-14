import requests
import json
from requests.packages.urllib3.exceptions import InsecureRequestWarning
import urllib
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)



urls_map= json.loads(open('mapfile').read())
s= requests.Session()
status_codes=[]
for k, url in urls_map.items()[:1000]:
	#url=urllib.unquote(url)
	#print(url)
	res=s.head(url, verify=False, allow_redirects=False,  headers= { 'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'})
	if not res.status_code in status_codes:
		status_codes.append(res.status_code) 
	if res.status_code==302 and not 'Location' in res.headers:
		print('NO LOCATION FOR THIS 302 ', res.headers)

	if res.status_code==302 and 'location' in res.headers:
		#res.headers['Location']= urllib.unquote(res.headers['Location'])
		locations=[res.headers['Location']]
		#print(res.headers)
		while res.status_code!=200:
			#print(res)
			#print(res.headers)
			res= s.head(res.headers['location'], verify=False,  allow_redirects=False, headers= { 'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'})
			if 'Location' in res.headers:
				locations.append(res.headers['Location'])
		locations_domains=[]
		for location in locations:
			if not location.split('/')[2] in locations_domains:
				locations_domains.append(location.split('/')[2])


		if len(locations)>1:
			#print(url)
		
			#print(locations,len(locations))
			for location in locations:
				if not 'http' in location:
					print(location)
			print(locations_domains)
			print('\n\n\n\n\n')
		

print(status_codes)