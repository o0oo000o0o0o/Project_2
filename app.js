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

  // sort dropdown menu in ascending order
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
    var dropDown = d3.select("#selDataset");
    var selection = dropDown.property("value");
    getdata(selection);
    metadata(selection)
    mapsomething(selection)
  }
  
 // *****START AUTOCOMPLETE****
 var schools = [
  { label: schname[0], value: ""}, { label: schname[1], value: ""}, 
  { label: schname[2], value: ""}, { label: schname[3], value: ""}, 
  { label: schname[4], value: ""}, { label: schname[5], value: ""},
  { label: schname[6], value: ""}, { label: schname[7], value: ""},
  { label: schname[8], value: ""}, { label: schname[9], value: ""},
  { label: schname[10], value: ""}, { label: schname[11], value: ""},
  { label: schname[12], value: ""}, { label: schname[13], value: ""},
  { label: schname[14], value: ""}, { label: schname[15], value: ""},
  { label: schname[16], value: ""}, { label: schname[17], value: ""},
  { label: schname[18], value: ""}, { label: schname[19], value: ""},
  { label: schname[20], value: ""}, { label: schname[21], value: ""},
  { label: schname[22], value: ""}, { label: schname[23], value: ""},
  { label: schname[24], value: ""}, { label: schname[25], value: ""},
  { label: schname[26], value: ""}, { label: schname[27], value: ""},
  { label: schname[28], value: ""}, { label: schname[29], value: ""},
  { label: schname[30], value: ""}, { label: schname[31], value: ""},
  { label: schname[32], value: ""}, { label: schname[33], value: ""},
  { label: schname[34], value: ""}, { label: schname[35], value: ""},
  { label: schname[36], value: ""}, { label: schname[37], value: ""},
  { label: schname[38], value: ""}, { label: schname[39], value: ""},
  { label: schname[40], value: ""}, { label: schname[41], value: ""},
  { label: schname[42], value: ""}, { label: schname[43], value: ""},
  { label: schname[44], value: ""}, { label: schname[45], value: ""},
  { label: schname[46], value: ""}, { label: schname[47], value: ""},
  { label: schname[48], value: ""}, { label: schname[49], value: ""}, 
  { label: schname[50], value: ""}, { label: schname[51], value: ""}, 
  { label: schname[52], value: ""}, { label: schname[53], value: ""},
  { label: schname[54], value: ""}, { label: schname[55], value: ""},
  { label: schname[56], value: ""}, { label: schname[57], value: ""},
  { label: schname[58], value: ""}, { label: schname[59], value: ""},
  { label: schname[60], value: ""}, { label: schname[61], value: ""},
  { label: schname[62], value: ""}, { label: schname[63], value: ""},
  { label: schname[64], value: ""}, { label: schname[65], value: ""},
  { label: schname[66], value: ""}, { label: schname[67], value: ""},
  { label: schname[68], value: ""}, { label: schname[69], value: ""},
  { label: schname[70], value: ""}, { label: schname[71], value: ""},
  { label: schname[72], value: ""}, { label: schname[73], value: ""},
  { label: schname[74], value: ""}, { label: schname[75], value: ""},
  { label: schname[76], value: ""}, { label: schname[77], value: ""},
  { label: schname[78], value: ""}, { label: schname[79], value: ""},
  { label: schname[80], value: ""}, { label: schname[81], value: ""},
  { label: schname[82], value: ""}, { label: schname[83], value: ""},
  { label: schname[84], value: ""}, { label: schname[85], value: ""},
  { label: schname[86], value: ""}, { label: schname[87], value: ""},
  { label: schname[88], value: ""}, { label: schname[89], value: ""},
  { label: schname[90], value: ""}, { label: schname[91], value: ""},
  { label: schname[92], value: ""}, { label: schname[93], value: ""},
  { label: schname[94], value: ""}, { label: schname[95], value: ""},
  { label: schname[96], value: ""}, { label: schname[97], value: ""},
  { label: schname[98], value: ""}, { label: schname[99], value: ""},
  { label: schname[100], value: ""}, { label: schname[101], value: ""},
  { label: schname[102], value: ""}, { label: schname[103], value: ""},
  { label: schname[104], value: ""}, { label: schname[105], value: ""},
  { label: schname[106], value: ""}, { label: schname[107], value: ""},
  { label: schname[108], value: ""}, { label: schname[109], value: ""},
  { label: schname[110], value: ""}, { label: schname[111], value: ""},
  { label: schname[112], value: ""}, { label: schname[113], value: ""},
  { label: schname[114], value: ""}, { label: schname[115], value: ""},
  { label: schname[116], value: ""}, { label: schname[117], value: ""},
  { label: schname[118], value: ""}, { label: schname[119], value: ""},
  { label: schname[120], value: ""}, { label: schname[121], value: ""},
  { label: schname[122], value: ""}, { label: schname[123], value: ""},
  { label: schname[124], value: ""}, { label: schname[125], value: ""},
  { label: schname[126], value: ""}, { label: schname[127], value: ""},
  { label: schname[128], value: ""}, { label: schname[129], value: ""},
  { label: schname[130], value: ""}, { label: schname[131], value: ""},
  { label: schname[132], value: ""}, { label: schname[133], value: ""},
  { label: schname[134], value: ""}, { label: schname[135], value: ""},
  { label: schname[136], value: ""}, { label: schname[137], value: ""},
  { label: schname[138], value: ""}, { label: schname[139], value: ""},
  { label: schname[140], value: ""}, { label: schname[141], value: ""},
  { label: schname[142], value: ""}, { label: schname[143], value: ""}
];
var input = document.getElementById("school-input");

autocomplete({
input: input,
fetch: function(text, update) {
    text = text.toLowerCase();
    var suggestions = schools.filter(n => n.label.toLowerCase().startsWith(text))
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
    var trace1 ={
      x:["Math", "Reading"],
      y:[parseInt(satmath), parseInt(satreading)],
      type: "bar",
      // orientation: "h",
      name: "School SAT Scores"
    }
    var trace2 ={
      x:["Math", "Reading"],
      y:[497,497.5],
      type: "bar",
      // orientation: "h",
      name: "State Average SAT Scores"
    }

    var barData = [trace1, trace2];
    var barLayout = {
      barmode: 'group',
      title: "SAT Scores for Selected School compared to State Average",
      xaxis: {title: "SAT"},
      yaxis: {title: "Average Score"},
      height: 400,
      width: 900,
      margin: {
          l: 150,
          r: 50,
          t: 50,
          b: 150

          // var layout = {showlegend: true,
          //   legend: {"orientation": "h"}};

          //   var layout = {
          //     showlegend: true,
          //     legend: {
          //       x: 1,
          //       xanchor: 'right',
          //       y: 1
          //     }
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
    .append("p").html("<strong>" + "Per Pupil Expenditures (total): " + "</strong>" + "$" + filteredsatscores.Total_Per_Pupil_Expenditures_Subtotal)
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