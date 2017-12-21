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

$(document).on("load", function(){
  displayNeighborhoodInfo();
})

function displayNeighborhoodInfo() {

  //Change this line when transitioning
  // console.log("something s happnin");
  var neighborhood = $("#selector").val();

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
    var count = 0
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

        var divToAppend = $("<div class='grid col-lg-4 col-md-6 mb-4' rating='" + rating + count + "' is-open='" + open + count + "'><div class='element-item card h-100 polaroid'><a href='#'><img class='card-img-top' src='img/toa-heftiba-195458.jpg' alt=''></a><div class='card-body'><h4 class='card-title'><a href='#' id='name-display" + count + "'>Item Two</a></h4><p class='card-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet.</p></div><div class='card-footer'><small class='text-muted' id='rating-display" + count + "'>&#9733; &#9733; &#9733; &#9733; &#9734;</small></div></div></div>")
       
        $("#card-holder").append(divToAppend)

        $("#rating" + count).attr("data-filter", rating);
        $("#rating-display" + count).html(changeRating(rating));
        $("#name-display" + count).html(name);

        count++

        // console.log(object);
        // console.log(objectToPush);
      });


    }
    };

}

//this will change to the google ajax return when we actually have one. For now it is 
//using the example object above
$("#selector-button").on("click", function(){
  //google requester will initiate ajax call? I think that's where we are at this point
  // googleRequester();
  // console.log("its working")
  //input validation. they can't use "please select district" as their search thingy
  if ($("#selector").val() === "Please Select a District"){
    return;
  } else {
  var neighborhoodSelected = $("#selector").val();
  displayNeighborhoodInfo();
  appendStepOne(object, neighborhoodSelected);
  }

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