// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAe4Nzf4J64rmVWfyj_U773xVtKV44xqIg",
    authDomain: "local-1513122630796.firebaseapp.com",
    databaseURL: "https://local-1513122630796.firebaseio.com",
    projectId: "local-1513122630796",
    storageBucket: "local-1513122630796.appspot.com",
    messagingSenderId: "549672056981"
  };
  firebase.initializeApp(config);
  // Reference for the database service
  var database = firebase.database();
 
 (function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

})(jQuery); // End of use strict



// external js: isotope.pkgd.js



var map;
var service;
var infowindow;
var object = []

$(document).ready(function(){
  // console.log("this happened on load");
  $("#card-holder").hide();
  $('select').niceSelect();
});
$(window).ready(function(){
})

function displayNeighborhoodInfo() {

  //Change this line when transitioning
  // console.log("something s happnin");
  var neighborhood = $("#selector").val();
  if (neighborhood === "Please Select a District") {
    $("card-holder").hide();
    return
  }

   var richmond = new google.maps.LatLng(37.5407,-77.4360);

   map = new google.maps.Map(document.getElementById('map'), {
    center: richmond,
    zoom: 11
    });

    var request = {
    location: richmond,
    radius: '20000',
    type: ['restaurant'],
    keyword: neighborhood
    };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var count = 0;
    $("#card-holder").empty();
    for (var i = 0; i < results.length; i++) {
      
    var place = results[i];
    // var name = JSON.stringify(results[i].name);
    // var attribution = JSON.stringify(results[i].html_attributions[0]);
    // var style = JSON.stringify(results[i].html_attributions[1]);
    // var imgURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoReference + "&key=AIzaSyDYXCq6EB8O4erxFYFCwODnctP39mYUf24";
    // var address = JSON.stringify(results[i].vicinity);
    var placeId = results[i].place_id;


    service.getDetails({
        placeId: placeId 
      }, function respondToDetailsRequest(results,status) {
        // console.log(status);
        var name = results.name;
        var address = results.vicinity;
        var open = results.opening_hours.open_now;
        var priceLevel = results.price_level;
        var rating = results.rating;
        var phone = results.formatted_phone_number;
        var mapsUrl = results.url;
        var website = results.website;
        var openNow;
        var openSort;
        var ratingSort = 1/rating;
        if (open === false){
          openNow = "Closed";
          openSort = 2;
        } else if (open === true) {
          openNow = "Open";
          openSort = 1;
        }




        var randomNumber = Math.floor(Math.random()  * (7) + 1);
        var divToAppend = $("<div class='col-lg-4 col-md-6 mb-4 element-item data-here"+count+"' rating='" + ratingSort + "' name='"+ name + "' is-open='" + openSort + "'><div class='element-item card h-100 polaroid'><a href='#'><img class='card-img-top' src='img/"+ randomNumber + ".jpg' alt=''></a><div class='card-body'><h4 class='card-title'><a href='" + website + "' target='blank' id='name-display" + count + "'>"+name+"</a></h4><p class='card-text' id='address-display'>Address: " + address + "</p><p class='card-text' id='open-display'>Open or Closed: " + openNow + "</p><a href='" + mapsUrl + "' target='blank' id='map-link-display'>Link to Map</a></div><div class='card-footer'><small class='text-muted' id='rating-display" + count + "'>&#9733; &#9733; &#9733; &#9733; &#9734;</small></div></div></div>")
       
        $("#card-holder").append(divToAppend)

        $("#data-here" + count).attr("rating", ratingSort);
        $("#data-here" + count).attr("is-open", openSort);

        $("#rating-display" + count).html(changeRating(rating));

        count++

        // console.log(object);
        // console.log(objectToPush);
      });


    }
    };

}

var previousNeighborhood;
//this will change to the google ajax return when we actually have one. For now it is 
//using the example object above
$("#selector-button").on("click", function(){


    if ($("#selector").val() === "Please Select a District"){
      return;
    } else {  
      $("#card-holder").show();
      // var timer = setInterval(function(){
      // }, 2000);
      // $("#card-holder").show();
      var neighborhoodSelected = $("#selector").val();
      previousNeighborhood = neighborhoodSelected;
      displayNeighborhoodInfo();
        database.ref().push({
            neighborhood: neighborhoodSelected
        });   
    }
})

$("#submit-comment").on('click', function(){
  var userEmail = $("#user-email").val().trim();
  var userComment = $("#message").val();
  database.ref().push({
    email: userEmail,
    comment: userComment
  })
  $("form").each(function(){
    this.reset();
  })

})



var changeRating = function(data, i){
  if (Math.round(data) < 1){
    return("&#9734; &#9734; &#9734; &#9734; &#9734;");
  } else if (Math.round(data) === 1 ){
   return(" &#9733; &#9734; &#9734; &#9734; &#9734;");
  } else if (Math.round(data) === 2 ){
    return("&#9733; &#9733; &#9734; &#9734; &#9734;");
  } else if (Math.round(data) === 3 ){
    return("&#9733; &#9733; &#9733; &#9734; &#9734;");
  } else if (Math.round(data) === 4 ){
    return("&#9733; &#9733; &#9733; &#9733; &#9734;");
  } else if (Math.round(data) === 5 ){
    return("&#9733; &#9733; &#9733; &#9733; &#9733;");
  }
  else {
    // console.log("you done f***** up");
  }
}

//Weather API

var globalzip = "";
$.getJSON("https://ipinfo.io/geo", function(data) {
  var zip = "";
  var city = "";
  $.each(data, function() {
    zip = data.postal;
    city = data.city;
    globalzip = zip || "23173";
  });
  $("#zip").html(zip);
  $("#city").html(city);
  //get weather api data using location api 
  var api = "https://api.openweathermap.org/data/2.5/weather?zip=";
  var appid = "&appid=427ea7590c5eea027c9993610e99f223"
  var apiCode = api + globalzip + appid;
  $.getJSON(apiCode, function(data) {
    var temp = "";
    var condition = "";
    var icon = "";
    $.each(data, function() {
      temp = data.main.temp;
      condition = data.weather[0].description;
      icon = data.weather[0].icon;
    });
    $("#condition").html(condition);
    var tempF = ((temp * (9 / 5)) - 459.67).toFixed(1);
    var tempC = (temp - (273.15)).toFixed(1);
    $(".temps").html(tempF);
    $(".tempdisplay").click(function() {
      if ($('#degree-letter').is(":contains('F')")) {
        $('.temps').html(tempC);
        $("#degree-letter").html("C");
      } else {
        $('.temps').html(tempF);
        $("#degree-letter").html("F");
      }
    });
    //add icon image to html
    $('.iconPng').prepend('<img id="iconPng" src="http://openweathermap.org/img/w/' + icon + '.png">');
  });
});



// // init Isotope
// var $grid = $('.grid').isotope({
//   itemSelector: '.element-item',
//   layoutMode: 'fitRows',
//   getSortData: {
//     name: '[name]',
//     rating: '[rating]',
//     open: '.is-open',
//   }
// });



// // bind sort button click
// $('#sorts').on('click', '.btn', function() {
//   // console.log($(this).attr('data-sort-by'));
//   var sortByValue = $(this).attr('data-sort-by');
//   console.log(sortByValue)
//   $grid.isotope({ sortBy: sortByValue });
// });

// // change is-checked class on buttons
// $('.button-group').each( function( i, buttonGroup ) {
//   var $buttonGroup = $( buttonGroup );
//   $buttonGroup.on( 'click', 'button', function() {
//     $buttonGroup.find('.is-checked').removeClass('is-checked');
//     $( this ).addClass('is-checked');
//   });
// });
  


// external js: isotope.pkgd.js


// init Isotope
// var $grid = $('.grid').isotope({
//   itemSelector: '.element-item',
//   layoutMode: 'fitRows',
//   getSortData: {
//     name: '.name',
//     rating: '[rating]',
//     "is-open": '[is-open]'
//   }
// });


// // bind sort button click
// $('#sorts').on( 'click', '.btn', function() {
//   console.log("something is happening in #sorts");
//   var sortByValue = $(this).attr('data-sort-by');
//   $grid.isotope({ sortBy: sortByValue });
// });

// // change is-checked class on buttons
// $('.btn-group').each( function( i, buttonGroup ) {
//   var $buttonGroup = $( buttonGroup );
//   $buttonGroup.on( 'click', 'button', function() {
//     $buttonGroup.find('.is-checked').removeClass('is-checked');
//     $( this ).addClass('is-checked');
//   });
// });