from oauth2client.service_account import ServiceAccountCredentials
import httplib2
import json
import sys
import time



links = open('Table.csv', 'r').read().replace(',', '\n').split('\n')

for link in links:
	if not 'http' in link:
		continue
	SCOPES = [ "https://www.googleapis.com/auth/indexing" ]
        ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

        # service_account_file.json is the private key that you created for your service account.
        JSON_KEY_FILE = "service_account_file.json"

        credentials = ServiceAccountCredentials.from_json_keyfile_name(JSON_KEY_FILE, scopes=SCOPES)

        http = credentials.authorize(httplib2.Http())

        # Define contents here as a JSON string.
        # This example shows a simple update request.
        # Other types of requests are described in the next step.
        content = {
          "url": link,
          "type": "URL_UPDATED"
        }
        content= json.dumps(content)
        response, content = http.request(ENDPOINT, method="POST", body=content)

        print(response)
        print(content)
        
        if not response['status']=='200':
            break
        time.sleep(2)