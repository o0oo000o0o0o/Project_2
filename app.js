// // GENERATE SVG
// var svgWidth = 960;
// var svgHeight = 700;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 80,
//   left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append an SVG group and shift by left and top margins.
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Store our API endpoint inside queryUrl
var queryUrl = "http://localhost:5000/";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data
  console.log(data);
  var schname = data.map(d=>d.School_Name)
  console.log(schname)

  schname.forEach(function(d) {
    d3.selectAll("#selDataset").append("option").text(d)
  });

  d3.selectAll("#selDataset").on("change", something);

  function something () {
    var dropDown = d3.select("#selDataset");
    var selection = dropDown.property("value");
    getdata(selection);
    metadata(selection)
  }
  
  function getdata(choice) {
    var filteredDataset = data.filter(d => d.School_Name == choice);
    // console.log(`We are plotting data: ${filteredDataset[0]}`);

    var test = ["Sat Math Average"];
    var testScores = []
    
    var satmath = filteredDataset.map(d=> d.SAT_Math_Average)
    var satreading = filteredDataset.map(d=> d.SAT_Reading_Average)

    //Bar Start
    var trace1 ={
        x:satmath.reverse(),
        y:test.reverse(),
        type: "bar",
        orientation: "h"
    }

    var trace2 ={
      x:satreading.reverse(),
      y:test.reverse(),
      type: "bar",
      orientation: "h"
    }
    var barData = [trace1, trace2];
    var barLayout = {
        title: "SAT Scores",
        xaxis: {title: "Subject"},
        yaxis: {title: "Score Range"},
        height: 800,
        width: 1150,
        margin: {
            l: 100,
            r: 50,
            t: 50,
            b: 150
        }
    }
    Plotly.newPlot("bar", barData, barLayout);
    //Bar End
}
  
  
  function metadata(choice) {
    var satscores= data
    // remove all info in demographic panel if exists
    d3.selectAll(".card-body > h5").remove()
    // filter metadata according to chosen id
    var filteredsatscores= satscores.filter(d => d.School_Name === choice)[0]
    // get key-value pairs and add them to the demographic info panel
    // Object.entries(filteredsatscores).forEach(function([key, value]) {
    //     d3.selectAll(".panel-body").append("h5").html("<strong>" + key + ": " + value + "<strong>");
    // });
    d3.selectAll(".card-body")
        .append("h5").html("<strong>" + "School Name: " + filteredsatscores.School_Name + "<strong>")
        .append("h5").html("<strong>" + "School Type: " + filteredsatscores.School_Type.toLowerCase() + "<strong>")
        .append("h5").html("<strong>" + "Address: " + filteredsatscores.Address + "<strong>")
        .append("h5").html("<strong>" + "City: " + filteredsatscores.City + "<strong>")
        .append("h5").html("<strong>" + "County: " + filteredsatscores.County + "<strong>")
        .append("h5").html("<strong>" + "ZIP: " + filteredsatscores.Zip + "<strong>")
        .append("h5").html("<strong>" + "Per Pupil Expeditures (total): " + filteredsatscores.Total_Per_Pupil_Expenditures_Subtotal + "<strong>")
        .append("h5").html("<strong>" + "SAT Math Score (avg): " + filteredsatscores.SAT_Math_Average + "<strong>")
        .append("h5").html("<strong>" + "SAT Reading Score (avg): " + filteredsatscores.SAT_Reading_Average + "<strong>")
    // console.log("filtereddata", filteredsatscores)
  }

  function init() {
    metadata("Evanston Twp High School")
    getdata("Evanston Twp High School")
  };

  init();

});