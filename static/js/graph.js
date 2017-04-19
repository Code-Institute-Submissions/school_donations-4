/**
 * Created by Philip on 24/01/2017.
 */
queue()
// function which utilizes the queue library for asynchronous loading
   .defer(d3.json, "/donorsUS/projects")
   .defer(d3.json, "static/geojson/us-states.json")
   .await(makeGraphs);

function makeGraphs(error, projectsJson, statesJson) {

   //Clean projectsJson data
   var donorsUSProjects = projectsJson;
   var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
   donorsUSProjects.forEach(function (d) {
       d["date_posted"] = dateFormat.parse(d["date_posted"]);
       d["date_posted"].setDate(1);
       d["total_donations"] = +d["total_donations"];
   });


   //Create a Crossfilter instance
   var ndx = crossfilter(donorsUSProjects);

   //Define Dimensions
   var dateDim = ndx.dimension(function (d) {
       return d["date_posted"];
   });
   var resourceTypeDim = ndx.dimension(function (d) {
       return d["resource_type"];
   });
   var povertyLevelDim = ndx.dimension(function (d) {
       return d["poverty_level"];
   });
   var stateDim = ndx.dimension(function (d) {
       return d["school_state"];
   });
   var totalDonationsDim = ndx.dimension(function (d) {
       return d["total_donations"];
   });

   var fundingStatus = ndx.dimension(function (d) {
       return d["funding_status"];
   });
   var primarySubject = ndx.dimension(function (d) {
       return d["primary_focus_area"];
   });


   //Calculate metrics
   var numProjectsByDate = dateDim.group();
   var numProjectsByResourceType = resourceTypeDim.group();
   var numProjectsByPovertyLevel = povertyLevelDim.group();
   var numProjectsByFundingStatus = fundingStatus.group();
   var numProjectsByPrimaryFocusArea = primarySubject.group();
   var totalDonationsByState = stateDim.group().reduceSum(function (d) {
       return d["total_donations"];
   });
   var stateGroup = stateDim.group();


   var all = ndx.groupAll();
   var totalDonations = ndx.groupAll().reduceSum(function (d) {
       return d["total_donations"];
   });

   var max_state = totalDonationsByState.top(1)[0].value;

   //Define values (to be used in charts)
   var minDate = dateDim.bottom(1)[0]["date_posted"];
   var maxDate = dateDim.top(1)[0]["date_posted"];

   //Charts defined using dc.js library
   var timeChart = dc.barChart("#time-chart");
   var resourceTypeChart = dc.rowChart("#resource-type-row-chart");
   var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
   var usChart = dc.geoChoroplethChart("#us-chart");
   var numberProjectsND = dc.numberDisplay("#number-projects-nd");
   var totalDonationsND = dc.numberDisplay("#total-donations-nd");
   var fundingStatusChart = dc.pieChart("#funding-chart");
   var primaryAreaChart = dc.pieChart("#subject-chart");


   selectField = dc.selectMenu('#menu-select')
       .dimension(stateDim)
       .group(stateGroup);


   numberProjectsND
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(all);

   totalDonationsND
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalDonations)
       .formatNumber(d3.format(".3s"));

   timeChart
       .width(750)
       .height(225)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(dateDim)
       .group(numProjectsByDate)
       .transitionDuration(500)
       .x(d3.time.scale().domain([minDate, maxDate]))
       .elasticY(true)
       .xAxisLabel("Year")
       .yAxis().ticks(4);

   resourceTypeChart
       .width(300)
       .height(300)
       .dimension(resourceTypeDim)
       .group(numProjectsByResourceType)
       .xAxis().ticks(4);

   povertyLevelChart
       .width(300)
       .height(300)
       .dimension(povertyLevelDim)
       .group(numProjectsByPovertyLevel)
       .xAxis().ticks(4);

   usChart
       .width(750)
       .height(300)
       .dimension(stateDim)
       .group(totalDonationsByState)
       .colors(["#ffff8f",
           "#d3c600",
           "#e29d00",
           "#e25c15",
           "#fd0b00"])
       .colorDomain([0, max_state])
       .overlayGeoJson(statesJson["features"], "state", function (d) {
           return d.properties.name;
    })
        .projection(d3.geo.albersUsa()
                    .scale(600)
                    .translate([340, 150]))
        .title(function (p) {
        return "State: " + p["key"]
                + "\n"
                + "Total Donations: " + Math.round(p["value"]) + " $";});

   fundingStatusChart
       .height(180)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(fundingStatus)
       .group(numProjectsByFundingStatus);

   primaryAreaChart
       .height(225)
       .radius(110)
       .innerRadius(20)
       .transitionDuration(1500)
       .dimension(primarySubject)
       .group(numProjectsByPrimaryFocusArea);


   dc.renderAll();
}
