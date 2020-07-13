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
var myMap = L.map("map-id", {
  center: [45.52, -122.67],
  zoom: 13
});

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
        height: 400,
        width: 700,
        margin: {
            l: 200,
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
  d3.selectAll(".card-body > p").remove()
  //   // filter metadata according to chosen id
  var filteredsatscores= satscores.filter(d => d.School_Name === choice)[0]
  //   // get key-value pairs and add them to the demographic info panel
  // Object.entries(filteredsatscores).forEach(function([key, value]) {
  //       d3.selectAll(".card-body").append("p").html("<strong>" + key + ": " + "</strong>" + value);
  //   });
  // }
  d3.selectAll(".card-body")
        .append("p").html("<strong>" + "School Name: " + "</strong>" + filteredsatscores.School_Name)
        .append("p").html("<strong>" + "School Type: " + "</strong>" + filteredsatscores.School_Type.toLowerCase())
        .append("p").html("<strong>" + "Address: " + "</strong>" + filteredsatscores.Address)
        .append("p").html("<strong>" + "City: " + "</strong>" + filteredsatscores.City)
        .append("p").html("<strong>" + "County: " + "</strong>" + filteredsatscores.County)
        .append("p").html("<strong>" + "ZIP: " + "</strong>" + filteredsatscores.Zip)
        .append("p").html("<strong>" + "Per Pupil Expeditures (total): " + "</strong>" + filteredsatscores.Total_Per_Pupil_Expenditures_Subtotal)
        .append("p").html("<strong>" + "SAT Math Score (avg): " + "</strong>" + filteredsatscores.SAT_Math_Average)
        .append("p").html("<strong>" + "SAT Reading Score (avg): " + "</strong>" + filteredsatscores.SAT_Reading_Average)
    // console.log("filtereddata", filteredsatscores)
      // });
    }

  function init() {
    metadata("Evanston Twp High School")
    getdata("Evanston Twp High School")
  };

  init();

});
