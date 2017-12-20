$(document).ready(function() {
  $('select').niceSelect();
});


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