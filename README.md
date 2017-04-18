# School Donations Dashboard Flask App

## Overview

### What is this app for?

This was created for my Stream 2 Code Institute project.  It is the interactive visualisation of data from DonorChoose.org, a US based non-profit organisation which allows people to donate money to public school classroom projects.

### What does it do?

This app visually represents datasets from DonorChoose.org in the form of interactive and interconnected bar charts, pie charts, a timeline and a choloropeth chart in the form of a map of the US by State.  The charts dynamically change in response to user interaction.

### How does it work?

This app is built using the Flask micro-framework using a dataset from DonorsChoose.org to build data visualisation that represents school donations broken down by different attributes. It uses a wide range of technologies: MongoDB for storing and querying the data, Python for building a web server that interacts with MongoDB and serving html pages, Javascript libraries d3.js, dc.js and crossfilter.js for building interactive charts

## Features

### Existing Features
- Bar Chart for 'Resources Type':
	- Representing what the donations were spent on by resource
- Bar Chart for 'Poverty Level':
	- Representing what level of school 'poverty' the donations went too
- Choropleth chart for 'Distribution of Donations':
	- A clickable, colour-coded choropleth map of the US by State to explore detail of donations per State or multiple States
- Timeline Line Chart for 'Number of Donations':
	- Represents number of donations per Quarter over a number of Years.  Users can select specific timelines for further detail
- Pie Chart for 'Primary Subject Area':
	- Each segment represents which Primary Subject Areas the schools that received donations are focussed on
- Number of Donations and Total Donations in USD
	- Total summaries reflecting user focus on the other charts

## Tech used

### Some of the tech used includes:
- [Flask](http://flask.pocoo.org/)
	- Python based micro-framework for building a server that interacts with MongoDB and renders the html page that contains the charts
- [Bootstrap](http://getbootstrap.com/)
	- We use **Bootstrap** to give our project a simple, responsive layout
- [MongoDB](https://www.mongodb.com/)
	- MongoDB is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas
- [d3.js](https://d3js.org/)
	- JavaScript library for producing dynamic, interactive data visualisations in web browsers. It makes use of the widely implemented SVG, HTML5, and CSS standards and is used here for controlling the data and building charts
- [dc.js](https://dc-js.github.io/dc.js/)
	- dc.js is a javascript charting library with native crossfilter support, allowing highly efficient exploration on large multi-dimensional datasets. It leverages d3 to render charts in CSS-friendly SVG format. Charts rendered using dc.js are data driven and reactive and therefore provide instant feedback to user interaction
- [crossfilter.js](http://square.github.io/crossfilter/)
	- Crossfilter is a JavaScript library for grouping, filtering, and aggregating large datasets
- [queue.js](https://github.com/d3/d3-queue)
	- An asynchronous helper library for JavaScript.