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

// var exampleObject = [
//   {name: "Name1",
//   district: "Carytown",
//   rating: 4.5,
//   numRating: 20
//   },
//   {name: "Name2",
//   district: "Carytown",
//   rating: 4.3,
//   numRating: 22
//   },
//   {name: "Name3",
//   district: "Carytown",
//   rating: 4.1,
//   numRating: 10
//   },
//   {name: "Name4",
//   district: "Carytown",
//   rating: 3,
//   numRating: 11
//   },
//   {name: "Name5",
//   district: "Carytown",
//   rating: 5,
//   numRating: 111
//   },
//   {name: "Name22",
//   district: "Fan District",
//   rating: 4.5,
//   numRating: 20
//   },
//   {name: "Name21",
//   district: "Fan District",
//   rating: 1,
//   numRating: 2
//   },
//   {name: "Name23",
//   district: "Fan District",
//   rating: 4.0,
//   numRating: 55
//   },
//   {name: "Name24",
//   district: "Fan District",
//   rating: 5,
//   numRating: 2
// },
//  {name: "Name25",
//   district: "Fan District",
//   rating: 4.4,
//   numRating: 1111
// },
//  {name: "Name100",
//   district: "Museum District",
//   rating: 1,
//   numRating: 2
//   },
//   {name: "Name101",
//   district: "Museum District",
//   rating: 4,
//   numRating: 6
// },
//  {name: "Name102",
//   district: "Museum District",
//   rating: 5,
//   numRating: 20
// },
//  {name: "Name103",
//   district: "Museum District",
//   rating: 3,
//   numRating: 222
//   },
//   {name: "Name104",
//   district: "Museum District",
//   rating: 3.7,
//   numRating: 54
//   }
//   ]

//nothing in here yet but there will eventually I'm sure
var neightborhoods = [];
var map;
var service;
var infowindow;
var object = []

$(document).on("load", function(){
  displayNeighborhoodInfo();
})

function displayNeighborhoodInfo() {

  //Change this line when transitioning
  var neighborhood = $(this).attr("data-name");

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
        console.log(status);
        var name = results.name;
        var address = results.vicinity;
        var open = results.opening_hours.open_now;
        var priceLevel = results.price_level;
        var rating = results.rating;
        var phone = results.formatted_phone_number;
        var mapsUrl = results.url;
        var website = results.website;
        var objectToPush = {
          name: name,
          address: address,
          open: open,
          priceLevel: priceLevel,
          rating: rating,
          phone: phone,
          mapsUrl: mapsUrl,
          website: website
        }
        object.push(objectToPush);
        console.log(object);
        // console.log(objectToPush);
      });


    // var rating = JSON.stringify(results[i].rating);
    // var priceLevel = JSON.stringify(results[i].price_level);
    // var open = results[i].opening_hours.open_now;
    // var objectToPush = {
    //   name: JSON.stringify(results[i].name),
    //   address: JSON.stringify(results[i].vicinity),
    //   rating: JSON.stringify(results[i].rating),
    //   priceLevel: results[i].price_level,
    //   open: results[i].opening_hours.open_now,
      // details: respondToDetailsRequest()
    }
    // console.log(objectToPush);
    };


 
  // console.log(JSON.stringify(results));
  // console.log(JSON.stringify(results[i].place_id));
}







//this will change to the google ajax return when we actually have one. For now it is 
//using the example object above
$("#selector-button").on("click", function(){
  //google requester will initiate ajax call? I think that's where we are at this point
  // googleRequester();
  console.log("its working")
  //input validation. they can't use "please select district" as their search thingy
  if ($("#selector").val() === "Please Select a District"){
    return
  } else {
  var neighborhoodSelected = $("#selector").val();
  }
  appendStepOne(object, neighborhoodSelected);

})

var appendStepOne = function(googleReturn, neighborhoodSelected){
  var count = 0;
  $("#card-holder").empty();
  var correctNeighborhood = [];
  for (var i = 0; i < googleReturn.length; i++){
    if (googleReturn[i].district === neighborhoodSelected){
      correctNeighborhood.push(googleReturn[i]);
    }
  }
  for (var i = 0; i < correctNeighborhood.length; i++){
    correctNeighborhood[i].displayRating = changeRating(correctNeighborhood, i);
  }
  for (var i = 0; i < correctNeighborhood.length; i++){
    var divToAppend = $("<div class='grid col-lg-4 col-md-6 mb-4' rating='" + results[i].rating + count + "' is-open='" + results[i].opening_hours.open_now + count + "'><div class='element-item card h-100 polaroid'><a href='#'><img class='card-img-top' src='img/toa-heftiba-195458.jpg' alt=''></a><div class='card-body'><h4 class='card-title'><a href='#'>Item Two</a></h4><p class='card-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet.</p></div><div class='card-footer'><small class='text-muted' id='rating-display'" + count + ">&#9733; &#9733; &#9733; &#9733; &#9734;</small></div></div></div>")
   
    $("#card-holder").append(divToAppend)

    $("#rating" + count).attr("data-filter", correctNeighborhood[i].rating);
    $("#rating-display" + count).html(correctNeighborhood[i].displayRating);
    $("#name-display" + count).html(correctNeighborhood[i].name);

    count++
  }
}

var changeRating = function(data, i){
  if (Math.round(data[i].rating) < 1){
    return("&#9733; &#9733; &#9733; &#9733; &#9733;");
  } else if (Math.round(data[i].rating) === 1 ){
    return("&#9734; &#9733; &#9733; &#9733; &#9733;");
  } else if (Math.round(data[i].rating) === 2 ){
    return("&#9734; &#9734; &#9733; &#9733; &#9733;");
  } else if (Math.round(data[i].rating) === 3 ){
    return("&#9734; &#9734; &#9734; &#9733; &#9733;");
  } else if (Math.round(data[i].rating) === 4 ){
   return("&#9734; &#9734; &#9734; &#9734; &#9733;");
  } else if (Math.round(data[i].rating) === 5 ){
    return("&#9734; &#9734; &#9734; &#9734; &#9734;");
  }
  else {
    console.log("you done f***** up");
  }
}


  // var googleRequester = function() {

  //   googleData = requestStuffFromGoogle();
  //   $('#card-holder').append(retrieveHtmlTemplate('./template.html', googleData));

  // }



// var retrieveHtmlTemplate = function(templatePath, data, i) {
//   var html = null;
//   console.log(html);
  
//   $.get(templatePath, function(htmlResult) {
//     console.log("Result: " + htmlResult);
//     html = htmlResult;
//   }, 'html');

//   var templateDomElement = $(html);
//   templateDomElement.set('#rating').html(data[i].displayRating);
//   templateDomElement.set("#name").html((data)[i].name);
//   templateDomElement.set("#rating").attr("data-value", data[i].numRating);

//   return templateDomElement;


// };

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