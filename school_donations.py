# import os
from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os


app = Flask(__name__)

MONGODB_HOST = 'ds033259.mlab.com'
MONGODB_PORT = 33259
DBS_NAME = 'heroku_fqw52m2t'
MONGO_URI = os.getenv('MONGODB_URI')
COLLECTION_NAME = 'projects'
FIELDS = {'primary_focus_area': True, 'funding_status': True, 'school_state': True, 'resource_type': True,
          'poverty_level': True, 'date_posted': True, 'total_donations': True, '_id': False} 
# FIELDS is the constant that defines the record fields that we wish to retrieve and form the basis of the project


@app.route("/")
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("index.html")


@app.route("/donorsUS/projects")
def donor_projects():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """
    connection = MongoClient(MONGO_URI)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=20000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects


if __name__ == "__main__":
    app.run(debug=True)
