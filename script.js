var citySavedList = document.querySelector("#city-saved-list");
var citySearchList = document.querySelector("#city-search-list")
var mainPage = document.querySelector("#main-page");
var cityList = [];
var weatherStats = ["Temperature:","Humidity:","Wind Speed:","UV Index:"]
var searchBtn = document.querySelector("#searchBtn");
var cityInput = document.querySelector("#input-text");
var newCity;
var SideDiv;
var SideUl;
var SideLi;
var SideH5;
var mainDiv;
var MainH1;
var MainUl;
var MainLi;
var MainH3;
var currentDate = moment().format('L');
var fiveDay1 = moment().add(1,'day').format('L')
var fiveDay2 = moment().add(2,'day').format('L')
var fiveDay3 = moment().add(3,'day').format('L')
var fiveDay4 = moment().add(4,'day').format('L')
var fiveDay5 = moment().add(5,'day').format('L')
var fiveDayId1 = document.querySelector("#five-day1");
var fiveDayId2 = document.querySelector("#five-day2");
var fiveDayId3 = document.querySelector("#five-day3");
var fiveDayId4 = document.querySelector("#five-day4");
var fiveDayId5 = document.querySelector("#five-day5");
var fiveDayRow = document.querySelector("#five-day-forecast");
var fiveDayT1 = document.querySelector("#five-day1t");
var fiveDayH1 = document.querySelector("#five-day1h");
var fiveDayT2 = document.querySelector("#five-day2t");
var fiveDayH2 = document.querySelector("#five-day2h");
var fiveDayT3 = document.querySelector("#five-day3t");
var fiveDayH3 = document.querySelector("#five-day3h");
var fiveDayT4 = document.querySelector("#five-day4t");
var fiveDayH4 = document.querySelector("#five-day4h");
var fiveDayT5 = document.querySelector("#five-day5t");
var fiveDayH5 = document.querySelector("#five-day5h");
var Img1 = document.querySelector("#day1");
var Img2 = document.querySelector("#day2");
var Img3 = document.querySelector("#day3");
var Img4 = document.querySelector("#day4");
var Img5 = document.querySelector("#day5");
var newLine;
var currentTempK;
var currentTempF;
var currentHumidity;
var currentWindSpeed;
var currentUV;
var latitude;
var longitude;
var responseValue;
var RcurWeathIcon;
var Rday1Date;
var RtempDay1;
var TempDay1;
var RhumidDay1;
var RiconDay1;
var IconDay1;
var Rday2Date;
var TempDay2;
var RtempDay2;
var RhumidDay2;
var RiconDay2;
var IconDay2;
var Rday3Date;
var TempDay3;
var RtempDay3;
var RhumidDay3;
var RiconDay3;
var IconDay3;
var Rday4Date;
var TempDay4;
var RtempDay4;
var RhumidDay4;
var RiconDay4;
var IconDay4;
var Rday5Date;
var TempDay5;
var RtempDay5;
var RhumidDay5;
var RiconDay5;
var IconDay5;
var IconUrl;
var storedCity;
var a;
var b;




var token = '901580ef13143976913351a805ff6a5d';

init();

function init(){

    fiveDayRow.style.visibility = "hidden";
   
   storedCity= localStorage.getItem("city", newCity);
   
   if (storedCity !== null){
       
        cityInput.value = localStorage.getItem("city", newCity);
        SideDiv = document.createElement('div');
        SideUl = document.createElement('ul');
        SideUl.setAttribute("class", "list-group");
        
   setUpSearch(); 
    } else{
        SideDiv = document.createElement('div');
        SideUl = document.createElement('ul');
        SideUl.setAttribute("class", "list-group");

    };  
};
    
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    setUpSearch()
        
});

//  b.addEventListener('click', function(event){
//     event.preventDefault()
//    console.log("did I click");


//  })
    


function setUpSearch(){

    fiveDayRow.style.visibility = "visible";


    if (cityInput.value !== '' ){

        SideLi = document.createElement('li');
        SideH5 = document.createElement('h5');    
        newCity = cityInput.value;
        SideH5.innerText = newCity
        cityList.push(newCity);
        SideLi.appendChild(SideH5);
        SideLi.setAttribute("class","no-bullets list-group-item");
        SideLi.setAttribute("data-index",newCity);
        SideUl.prepend(SideLi);
        SideDiv.appendChild(SideUl);
        citySavedList.appendChild(SideDiv);
        localStorage.setItem("city", newCity);
        cityInput.value = "";
        getInfo();
    }


}


function getInfo(){
    var queryURL1 = "http://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=" + token;
    
  // first ajax call to retrieve the Lat and Long coordinates of city entered.  
    $.ajax({
        url: queryURL1,
        method: "GET",
        success: firstResponse,

    });
     
      function firstResponse(response1){

        longitude = response1.coord.lon;
        latitude = response1.coord.lat;
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + '&lon=' + longitude + "&%20exclude=hourly,daily&appid=" + token;
   
  // second ajax call to retrieve the conditions based on Lat and Long coordinates from the first AJAX call.

        $.ajax({
            url: queryURL2,
            method: "GET",
            success: secondResponse,

        }); 

        function secondResponse(response2){

            currentTempK = response2.current.temp;
            currentHumidity = response2.current.humidity;
            currentWindSpeed = response2.current.wind_speed;

            currentUV = response2.current.uvi;
            RcurWeathIcon = response2.current.weather[0].icon;

            Rday1Date = response2.daily[1].dt;
            RtempDay1 = response2.daily[1].temp.max;
            RhumidDay1 = response2.daily[1].humidity
            RiconDay1 = response2.daily[1].weather[0].icon;


            Rday2Date = response2.daily[2].dt;
            RtempDay2 = response2.daily[2].temp.max;
            RhumidDay2 = response2.daily[2].humidity
            RiconDay2 = response2.daily[2].weather[0].icon;

            Rday3Date = response2.daily[3].dt;
            RtempDay3 = response2.daily[3].temp.max;
            RhumidDay3 = response2.daily[3].humidity
            RiconDay3 = response2.daily[3].weather[0].icon;
        
            Rday4Date = response2.daily[4].dt;
            RtempDay4 = response2.daily[4].temp.max;
            RhumidDay4 = response2.daily[4].humidity
            RiconDay4 = response2.daily[4].weather[0].icon;

            Rday5Date = response2.daily[5].dt;
            RtempDay5 = response2.daily[5].temp.max;
            RhumidDay5 = response2.daily[5].humidity
            RiconDay5 = response2.daily[5].weather[0].icon;
       

// Math forumulas and getting the weather condition icons.

    currentTempF = Math.round((currentTempK -273.15) * 9/5 + 32);
    currentWindSpeedR = Math.round(currentWindSpeed);
    IconUrl = "https://openweathermap.org/img/w/"
    curWeathIcon = IconUrl + RcurWeathIcon + ".png";
    IconDay1 = IconUrl + RiconDay1 + ".png";
    IconDay2 = IconUrl + RiconDay2 + ".png";
    IconDay3 = IconUrl + RiconDay3 + ".png";
    IconDay4 = IconUrl + RiconDay4 + ".png";
    IconDay5 = IconUrl + RiconDay5 + ".png";
   
                   
    if(cityList.length === 1){
        MainH1 = document.createElement('h1');
        MainH1.innerHTML = newCity + " (" + currentDate + ")" + "<img src=" + curWeathIcon + ">"; 
        mainPage.appendChild(MainH1);
        MainUl = document.createElement('ul')
   
        for(var j = 0; j<weatherStats.length; j++){
            MainLi = document.createElement('li');
            MainH3 = document.createElement('h3');
            if (j===0) { responseValue = currentTempF;
            } else if (j === 1){
                responseValue = currentHumidity;
            } else if (j === 2){
                responseValue = currentWindSpeedR;
            } else if (j === 3){
                responseValue = currentUV;
            };

            MainH3.innerText = weatherStats[j] + "  " + responseValue;
            MainLi.setAttribute("class","no-bullets");
            if (j===3){
                if (currentUV < 3){
                    MainH3.style.color = "green";
                };

                if (currentUV >=3 && currentUV <5){
                    MainH3.style.color = "yellow";
                };

                if(currentUV >=5 && currentUV < 8){
                    MainH3.style.color = "orange";
                }

                if(currentUV >=8 && currentUV < 11){
                    MainH3.style.color = "red";
                }

                if (currentUV >=11){
                    MainH3.style.color = "purple";
                };
            }
            MainLi.appendChild(MainH3);
            MainUl.appendChild(MainLi);
        }
            mainPage.appendChild(MainUl);
    }  
    else {
      
       MainH1.innerHTML = newCity + " (" + currentDate + ")" + "<img src=" + curWeathIcon + ">"; 

       for(var k = 0; k<weatherStats.length; k++){
        if (k===0) { responseValue = currentTempF;
        } else if (k === 1){
            responseValue = currentHumidity;
        } else if (k === 2){
            responseValue = currentWindSpeedR;
        } else if (k === 3){
            responseValue = currentUV;
        };

        
        MainH3.innerText = weatherStats[k] + "  " + responseValue;
        MainLi.setAttribute("class","no-bullets");
        if (k===3){
            if (currentUV < 3){
                MainH3.style.color = "green";
            };

            if (currentUV >=3 && currentUV <5){
                MainH3.style.color = "yellow";
            };

            if(currentUV >=5 && currentUV < 8){
                MainH3.style.color = "orange";
            };

            if(currentUV >=8 && currentUV < 11){
                MainH3.style.color = "red";
            };

            if (currentUV >=11){
                MainH3.style.color = "purple";
            };
        }

        
    };

    
};



// Setting the 5 day forecast informaton 
   
TempDay1 = Math.round((RtempDay1 -273.15) * 9/5 + 32);
TempDay2 = Math.round((RtempDay2 -273.15) * 9/5 + 32);
TempDay3 = Math.round((RtempDay3 -273.15) * 9/5 + 32);
TempDay4 = Math.round((RtempDay4 -273.15) * 9/5 + 32);
TempDay5 = Math.round((RtempDay5 -273.15) * 9/5 + 32);

 fiveDayId1.innerText = fiveDay1;
 Img1.src = IconDay1;
 fiveDayT1.innerText = "Temp:  "+TempDay1
 fiveDayH1.innerText = "Humidity:  "+RhumidDay1;
 fiveDayId2.innerText = fiveDay2;
 Img2.src = IconDay2;
 fiveDayT2.innerText = "Temp:  "+TempDay2
 fiveDayH2.innerText = "Humidity:  "+RhumidDay2;

 fiveDayId3.innerText = fiveDay3;
 Img3.src = IconDay3;
 fiveDayT3.innerText = "Temp:  "+TempDay3
 fiveDayH3.innerText = "Humidity:  "+RhumidDay3;

 fiveDayId4.innerText = fiveDay4;
 Img4.src = IconDay4;
 fiveDayT4.innerText = "Temp:  "+TempDay4
 fiveDayH4.innerText = "Humidity:  "+RhumidDay4;

 fiveDayId5.innerText = fiveDay5;
 Img5.src = IconDay5;
 fiveDayT5.innerText = "Temp:  "+TempDay5
 fiveDayH5.innerText = "Humidity:  "+RhumidDay5;


};
}};
