// Store our API endpoint inside queryUrl
var queryUrl = "http://localhost:5000/";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {

  // Once we get a response, send the data
  console.log(data);
  
  // get school names and append to dropdown menu
  var schname = data.map(d=>d.School_Name)
  console.log(schname)
  schname.forEach(function(d) {
    d3.selectAll("#selDataset").append("option").text(d)
  });

  // // sort dropdown menu in ascending order
  $(function() {
    // choose target dropdown
    var select = $('#selDataset');
    select.html(select.find('option').sort(function(x, y) {
      // to change to descending order switch "<" for ">"
      return $(x).text() > $(y).text() ? 1 : -1;
    }));
    // select default item after sorting (first item)
    // $('select').get(0).selectedIndex = 0;
  });

  // event for dropdown menu

  d3.selectAll("#selDataset").on("change", something);
  function something () {
    d3.event.preventDefault();
    var dropDown = d3.select("#selDataset");
    var selection = dropDown.property("value");
    d3.select("#school-input").property("value", selection);
    getdata(selection);
    metadata(selection);
    mapsomething(selection);
  }

  d3.selectAll("#submit").on("click", something2);
  function something2 () {
    d3.event.preventDefault();
    var searchBox = d3.select("#school-input").property("value");
    d3.select("#selDataset").property("value", searchBox);
    getdata(searchBox);
    metadata(searchBox);
    mapsomething(searchBox);
  }
  
 // *****START AUTOCOMPLETE****
 var school = []
 for (var i=0; i<schname.length; i++) {
   school.push({label: schname[i], value: ""})
 }
 console.log(school)
 
var input = document.getElementById("school-input");

autocomplete({
input: input,
fetch: function(text, update) {
    text = text.toLowerCase();
    var suggestions = school.filter(n => n.label.toLowerCase().startsWith(text))
    update(suggestions);
},
onSelect: function(item) {
    input.value = item.label;
}
});
// ****END AUTOCOMPLETE

  // Function to map
  function mapsomething (choice) {
    // Get current lat long
    var filteredDataset = data.filter(d => d.School_Name == choice);
    var lat = filteredDataset[0].coordinates[1];
    var long = filteredDataset[0].coordinates[0];
    console.log(lat);
    console.log(long);

    // create map div and tileLayer
    var myMap= document.getElementById('map-id').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
    var mapLayer= L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
      {attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZW1tYXN6YyIsImEiOiJja2J2Z2NieGMwMWRpMnFtdnozdDc2eW1tIn0.p7H1a96QFcxA6W_sZpImiA' 
    })
    // create map
    var map = new L.Map('map', {zoom: 14});
    map.setView(new L.LatLng(lat,long));
    map.addLayer(mapLayer)

    // create markers and icon
    var schoolIcon = L.icon({
      iconUrl: './Resources/Images/school_icon3.png',
      iconSize:     [40,40],
    });    
    var marker= L.marker([lat, long], {
      draggable: true,
      // icon: schoolIcon,   //comment this out if don't want to use customized icon
      title: filteredDataset[0].School_Name
    }).addTo(map);

    // bind popup with school info
    marker.bindPopup("<strong>"+filteredDataset[0].School_Name + "</strong><hr> Per Pupil Expenditures: $" + filteredDataset[0].Total_Per_Pupil_Expenditures_Subtotal
                    + "<hr> Average Home value: $" + filteredDataset[0].Avg_Home_Value)
  
    // Heatmap
    var heatArray = [];
    for (var i = 0; i < data.length; i++) {
      var homeValue = data[i].Avg_Home_Value;

      if (homeValue) {
        // collect coordinates and home value to use for the heatmap
        heatArray.push([data[i].coordinates[1],data[i].coordinates[0], data[i].Avg_Home_Value]);
      }
    }
    console.log("heatmap", heatArray)
    // add heatmap layer to map
    var heat = L.heatLayer(heatArray, {
      radius: 60,
      blur: 65
    }).addTo(map);
  }

  // Function to generate bargraph
  function getdata(choice) {
    var filteredDataset = data.filter(d => d.School_Name == choice);
    var test1 = ["Math"];
    var test2 = ["Reading"];
    var satmath = filteredDataset.map(d=> d.SAT_Math_Average)
    var satreading = filteredDataset.map(d=> d.SAT_Reading_Average)
    //Bar Start
    // var trace1 ={
    //   x:["Math", "Reading"],
    //   y:[parseInt(satmath), parseInt(satreading)],
    //   type: "bar",
    //   // orientation: "h",
    //   name: "School SAT Scores"
    // }
    // var trace2 ={
    //   x:["Math", "Reading"],
    //   y:[497,497.5],
    //   type: "bar",
    //   // orientation: "h",
    //   name: "State Average SAT Scores"
    // }

    // var barData = [trace1, trace2];
    // var barLayout = {
    //   barmode: 'group',
    //   title: "SAT Scores for Selected School compared to State Average",
    //   xaxis: {title: "SAT"},
    //   yaxis: {title: "Average Score"},
    //   height: 400,
    //   width: 900,
    //   margin: {
    //       l: 150,
    //       r: 50,
    //       t: 50,
    //       b: 150

    var trace1 ={
      x:["Math", "Reading"],
      y:[parseInt(satmath), parseInt(satreading)],
      marker:{
        color: '#007bff',
        opacity: 0.7,
      },
      type: "bar",
      // orientation: "h",
      name: "School SAT Scores"
    }
    var trace2 ={
      x:["Math", "Reading"],
      y:[497,497.5],
      marker:{
        color: ['blue, blue'],
        opacity: 0.7,
      },
      type: "bar",
      // orientation: "h",
      name: "State Average SAT Scores"
    }
    var barData = [trace1, trace2];
    var barLayout = {
      barmode: 'group',
      title: "SAT Scores for Selected School compared to IL State Averages",
      xaxis: {title: "SAT"},
      yaxis: {title: "Average Score"},
      height: 400,
      width: 900,
      margin: {
          l: 150,
          r: 50,
          t: 50,
          b: 150    
      }
    }
    Plotly.newPlot("bar", barData, barLayout);
    //Bar End
  }

  // Function to generate demographic panel
  function metadata(choice) {
    var satscores= data
    // remove all info in demographic panel if exists
    d3.selectAll(".card-body > p").remove()
    // filter metadata according to chosen id
    var filteredsatscores= satscores.filter(d => d.School_Name === choice)[0]

    //   // get values and add them to the demographic info panel
    d3.selectAll(".card-body")
    .append("p").html("<strong>" + "School Name: " + "</strong>" + filteredsatscores.School_Name)
    .append("p").html("<strong>" + "School Type: " + "</strong>" + filteredsatscores.School_Type.toLowerCase())
    .append("p").html("<strong>" + "Address: " + "</strong>" + filteredsatscores.Address)
    .append("p").html("<strong>" + "City: " + "</strong>" + filteredsatscores.City)
    .append("p").html("<strong>" + "County: " + "</strong>" + filteredsatscores.County)
    .append("p").html("<strong>" + "ZIP: " + "</strong>" + filteredsatscores.Zip)
    .append("p").html("<strong>" + "Avg. Median Home Value (by zip): " + "</strong>" + "$" + filteredsatscores.Avg_Home_Value)
    .append("p").html("<strong>" + "Per Pupil Expenditures (total): " + "</strong>" + "$" + filteredsatscores.Total_Per_Pupil_Expenditures_Subtotal.toFixed(2))
    .append("p").html("<strong>" + "SAT Math Score (avg): " + "</strong>" + filteredsatscores.SAT_Math_Average)
    .append("p").html("<strong>" + "SAT Reading Score (avg): " + "</strong>" + filteredsatscores.SAT_Reading_Average)
    // console.log("filtereddata", filteredsatscores)
    // });
  }

  // Function to initialize
  function init() {
    metadata("Evanston Twp High School")
    getdata("Evanston Twp High School")
    mapsomething("Evanston Twp High School")
  };
  init();
});