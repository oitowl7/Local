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

var exampleObject = [
  {name: "Name1",
  district: "Carytown",
  rating: 4.5,
  numRating: 20
  },
  {name: "Name2",
  district: "Carytown",
  rating: 4.3,
  numRating: 22
  },
  {name: "Name3",
  district: "Carytown",
  rating: 4.1,
  numRating: 10
  },
  {name: "Name4",
  district: "Carytown",
  rating: 3,
  numRating: 11
  },
  {name: "Name5",
  district: "Carytown",
  rating: 5,
  numRating: 111
  },
  {name: "Name22",
  district: "Fan District",
  rating: 4.5,
  numRating: 20
  },
  {name: "Name21",
  district: "Fan District",
  rating: 1,
  numRating: 2
  },
  {name: "Name23",
  district: "Fan District",
  rating: 4.0,
  numRating: 55
  },
  {name: "Name24",
  district: "Fan District",
  rating: 5,
  numRating: 2
},
 {name: "Name25",
  district: "Fan District",
  rating: 4.4,
  numRating: 1111
},
 {name: "Name100",
  district: "Museum District",
  rating: 1,
  numRating: 2
  },
  {name: "Name101",
  district: "Museum District",
  rating: 4,
  numRating: 6
},
 {name: "Name102",
  district: "Museum District",
  rating: 5,
  numRating: 20
},
 {name: "Name103",
  district: "Museum District",
  rating: 3,
  numRating: 222
  },
  {name: "Name104",
  district: "Museum District",
  rating: 3.7,
  numRating: 54
  }
  ]

//nothing in here yet but there will eventually I'm sure
$(document).on("load", function(){
// console.log(exampleObject[10].name)
})


//this will change to the google ajax return when we actually have one. For now it is 
//using the example object above
var object = exampleObject;
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
    var divToAppend = $("<div class='card' name='" + correctNeighborhood[i].name + "' rating='" + correctNeighborhood[i].rating + "'><h3 class='card-header' id='card-name" + count + "'>example-</h3><div class='card-block'><h4 class='card-text' id='rating" + count + "' data-value=''></h4><h4 class='card-text' id='address'>2121 Go Away Ave. 22332</h4><button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal'>Open Modal</button><div class='modal fade' id='myModal' role='dialog'><div class='modal-dialog'><div class='modal-content' style='width: 700px;'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title' style='z-index: 1'>map</h4></div><div class='modal-body'><div class='hide-the-top' style='height: 50px; width: 100%; z-index: 999999 !important; background-color: white; position: relative'><h1>This is a modal<br><br>THis is stil a modal</h1></div><div class='area-to-append1'>Area to append</div><div class='area-to-append2'>Area to append 2</div><div class='area-to-append3'>Area to append 3</div></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div></div></div>'")
   
    $("#card-holder").append(divToAppend)

    $("#rating" + count).attr("data-filter", correctNeighborhood[i].rating);
    $("#rating" + count).html(correctNeighborhood[i].displayRating);
    $("#card-name" + count).attr("name", correctNeighborhood[i].name);
    $("#card-name" + count).html(correctNeighborhood[i].name);

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
var $grid = $('.grid').isotope({
  itemSelector: '.element-item',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name',
    rating: '[rating]',
    "is-open": '[is-open]'
  }
});


// bind sort button click
$('#sorts').on( 'click', '.btn', function() {
  console.log("something is happening in #sorts");
  var sortByValue = $(this).attr('data-sort-by');
  $grid.isotope({ sortBy: sortByValue });
});

// change is-checked class on buttons
$('.btn-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});
  
