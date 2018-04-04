$(document).ready(function(){

    var locale = [];


    //check if geolocation is possible
    if (navigator.geolocation) {
      //get geolocation
      navigator.geolocation.watchPosition(function(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        locale.push(lat, lon);

        shareLocation();
      });

      function shareLocation(){
        //alert(locale);
        var localeLat = locale[0];
        var localeLon = locale[1];

        var urlString = "https://fcc-weather-api.glitch.me/api/current?lat=" +
                        localeLat + "&lon="+ localeLon;

        var description = "";
        var celsius = "";
        var fahrenheit = "";
        var wind = "";
        var icon = "";
        var temp = ""

        $.getJSON(urlString, function(result){
          description = result.weather[0].description;
          icon = result.weather[0].icon;
          celsius = result.main.temp;
          fahrenheit = (celsius * 9/5) + 32;
          wind = "wind: " + result.wind.speed;
          humidity = "humidty: " + result.main.humidity;

          console.log(description, celsius, wind, humidity, icon);

          temp = fahrenheit + " &#8457";

          $(".icon").attr("src", icon);
          $(".description").html(description);
          $(".temp").html(temp);
          $(".tempBtn").html("switch to &#8451");
          $(".wind").html(wind);
          $(".humidty").html(humidity);

          var clickCount = 1;

          $(".tempBtn").click(function(){
            clickCount += 1;

            if(clickCount == 1){
              temp = fahrenheit + " &#8457";
              $(".tempBtn").html("switch to &#8451");
            }
            else if(clickCount % 2 == 0){
              temp =  celsius + "&#8451";
              $(".tempBtn").html("switch to &#8457");
            }
            else{
              temp = farhentheit + " &#8457";
              $(".tempBtn").html("switch to &#8451");
            }
            $(".temp").html(temp);


          });

        });

      }
    }
    //warning if browser is unable to get geolocation
    else{
      document.write('Your browser does not support GeoLocation');
    }


});
