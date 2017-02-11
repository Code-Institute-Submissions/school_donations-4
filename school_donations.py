# import os
from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os


app = Flask(__name__)

MONGODB_HOST = 'ds033259.mlab.com'  # This time we won't be using the digits after the colon - eg. ds047305.mlab.com
MONGODB_PORT = 33259  # This is for the port. This where the digits after the colon go.
DBS_NAME = 'heroku_fqw52m2t'  # Where MONGO_DB_NAME is your database name - eg. heroku_1wgm307k
MONGO_URI = os.getenv('MONGODB_URI')
COLLECTION_NAME = 'projects'
FIELDS = {'primary_focus_area': True, 'funding_status': True, 'school_state': True, 'resource_type': True,
          'poverty_level': True, 'date_posted': True, 'total_donations': True, '_id': False}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/donorsUS/projects")
def donor_projects():
    connection = MongoClient(MONGO_URI)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=2000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects


if __name__ == "__main__":
    app.run(debug=True)
