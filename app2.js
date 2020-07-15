// GENERATE SVG
var svgWidth = 1200;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group and shift by left and top margins.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Store our API endpoint inside queryUrl
var queryUrl = "http://localhost:5000/";
// Retrieve data from the CSV file 
d3.json(queryUrl).then(function(data) {
    console.log("data", data);

    // Create scale function

    var xLinearScale = d3.scaleLinear()
      .domain([0, (d3.max(data, d => d.Avg_Home_Value)+1000)])
      .range([0, width]);
    
    var yLinearScale = d3.scaleLinear()
    .domain([-3000, (d3.max(data, d => d.Total_Per_Pupil_Expenditures_Subtotal)+1000)])
    .range([height, 0]);

    // Create axis functions
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    // apoend x axis and text
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    chartGroup.append("text")
    .attr("transform", `translate(${width/2 -20}, ${height + margin.top + 30})`)
    .classed("axisText", true)
    .style("font-size", "20px")
    .text("Average Home Value");

    // apoend y axis and text
    chartGroup.append("g")
    .call(yAxis);

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left +40)
    .attr("x", 0 - (height / 2 +50))
    .attr("dy", "1em")
    .classed("axisText", true)
    .style("font-size", "20px")
    .text("Per Pupil Expenditures");

    // Create Circles
    var circlesGroup = chartGroup.append("g")  
        .attr("class", "nodes")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("g");
    
    // append circle
     circlesGroup.append("circle")
        .attr("cx", d => xLinearScale(d.Avg_Home_Value))
        .attr("cy", d => yLinearScale(d.Total_Per_Pupil_Expenditures_Subtotal))
        .attr("r", "15")
        .attr("fill", "#007bff")
        .attr("opacity", ".5");
    
    
    
    // ToolTip
    var toolTip= d3.tip()
    .attr("class", "tooltip")
    // .offset([80, -60])
    .html(function(data) {
        return ("<strong>"+ data.School_Name + "</strong><hr> Avg Home Value: " 
        + data.Avg_Home_Value + 
        "<hr>PP Expenditures: " + data.Total_Per_Pupil_Expenditures_Subtotal)
    })

    chartGroup.call(toolTip)
    circlesGroup.on("mouseover", function(d) {
    toolTip.show(d, this); 
    })
    circlesGroup.on("mouseout", function(d) {
    toolTip.hide(d);
    })
})





// // READING
// var svg = d3
//   .select("#bubbleReading")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append an SVG group and shift by left and top margins.
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Store our API endpoint inside queryUrl
// var queryUrl = "http://localhost:5000/";
// // Retrieve data from the CSV file 
// d3.json(queryUrl).then(function(data) {
//     console.log(data);

//     // Create scale function

//     var xLinearScale = d3.scaleLinear()
//       .domain([-100, (d3.max(data, d => d.SAT_Math_Average)+100)])
//       .range([0, width]);
    
//     var yLinearScale = d3.scaleLinear()
//     .domain([-1000, (d3.max(data, d => d.Total_Per_Pupil_Expenditures_Subtotal)+1000)])
//     .range([height, 0]);

//     // Create axis functions
//     var xAxis = d3.axisBottom(xLinearScale);
//     var yAxis = d3.axisLeft(yLinearScale);

//     // Append Axes to the chart
//     // apoend x axis and text
//     chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(xAxis);

//     chartGroup.append("text")
//     .attr("transform", `translate(${width/2 -20}, ${height + margin.top + 30})`)
//     .classed("axisText", true)
//     .style("font-size", "20px")
//     .text("SAT Math Scores");

//     // apoend y axis and text
//     chartGroup.append("g")
//     .call(yAxis);

//     chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left +40)
//     .attr("x", 0 - (height / 2 +50))
//     .attr("dy", "1em")
//     .classed("axisText", true)
//     .style("font-size", "20px")
//     .text("Per Pupil Expenditures");

//     // Create Circles
//     var circlesGroup = chartGroup.append("g")  
//         .attr("class", "nodes")
//         .selectAll("circle")
//         .data(data)
//         .enter()
//         .append("g");
    
//     // append circle
//      circlesGroup.append("circle")
//         .attr("cx", d => xLinearScale(d.SAT_Math_Average))
//         .attr("cy", d => yLinearScale(d.Total_Per_Pupil_Expenditures_Subtotal))
//         .attr("r", "15")
//         .attr("fill", "blue")
//         .attr("opacity", ".8");
    
// })