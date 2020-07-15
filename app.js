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
  d3.selectAll("#selDataset").on("change", something);
  function something () {
    var dropDown = d3.select("#selDataset");
    var selection = dropDown.property("value");
    getdata(selection);
    metadata(selection)
    mapsomething(selection)
  }
  
  function mapsomething (choice) {
    // Get current lat long
    var filteredDataset = data.filter(d => d.School_Name == choice);
    var lat = filteredDataset[0].coordinates[1];
    var long = filteredDataset[0].coordinates[0];
    console.log(lat);
    console.log(long);
    // create tile
    document.getElementById('map-id').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
    mapLayer= new L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
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
      icon: schoolIcon,   //comment this out if don't want to use customized icon
      title: filteredDataset[0].School_Name
    }).addTo(map);
    // bind popup with school info
    marker.bindPopup("<strong>"+filteredDataset[0].School_Name + "</strong><hr> ZIP: " + filteredDataset[0].Zip
                    + "<hr> Average Home value: " + filteredDataset[0].Avg_Home_Value)
  }

  function getdata(choice) {
    var filteredDataset = data.filter(d => d.School_Name == choice);
    var test1 = ["Math"];
    var test2 = ["Reading"];
    var satmath = filteredDataset.map(d=> d.SAT_Math_Average)
    var satreading = filteredDataset.map(d=> d.SAT_Reading_Average)
    //Bar Start
    var trace1 ={
        x:satmath,
        y:test1,
        type: "bar",
        orientation: "h",
        name: "SAT Math Average"
    }
    var trace2 ={
      x:satreading,
      y:test2,
      type: "bar",
      orientation: "h",
      name: "SAT Reading Average"
    }
    var barData = [trace1, trace2];
    var barLayout = {
      title: "Average SAT Scores for Selected School",
      xaxis: {title: "Score Range"},
      yaxis: {title: "Subject"},
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
  .append("p").html("<strong>" + "Avg. Median Home Value (by zip): " + "</strong>" + "$" + filteredsatscores.Avg_Home_Value)
  .append("p").html("<strong>" + "Per Pupil Expenditures (total): " + "</strong>" + "$" + filteredsatscores.Total_Per_Pupil_Expenditures_Subtotal)
  .append("p").html("<strong>" + "SAT Math Score (avg): " + "</strong>" + filteredsatscores.SAT_Math_Average)
  .append("p").html("<strong>" + "SAT Reading Score (avg): " + "</strong>" + filteredsatscores.SAT_Reading_Average)
  // console.log("filtereddata", filteredsatscores)
  // });
  }

  function init() {
    metadata("Evanston Twp High School")
    getdata("Evanston Twp High School")
    mapsomething("Evanston Twp High School")
  };
  init();
});