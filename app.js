const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
WIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");

let api;
let apiKey = "2ef8265d368ba98d393b33ef213c427e";

inputField.addEventListener("keyup", e => {
    // if user pressed enter btn & i/p value is not empty
    if(e.key == "Enter" && inputField.value != "") {
        // console.log("Hello");
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation) { // if browser support geolocation api 
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else {
        alert("Your browser don't support geolocation api");
    }
});

function onSuccess(position) {
    // console.log(position);
    const {latitude, longitude} = position.coords; // getting lat & lon of the user device from coords obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    fetchData();
}

function onError(error) {
    // console.log(error);
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // infoTxt.innerText = "Getting weather details...";
    // infoTxt.classList.add("pending");

    // // geeting api response & returning it with parsing into js obj & in another then function calling weatherDetails function with passing api result as an argument

    // // fetch(api).then(response => console.log(response.json()));
    // fetch(api).then(response => response.json()).then(result => weatherDetails(result));

    fetchData();
}

function fetchData() {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");

    // geeting api response & returning it with parsing into js obj & in another then function calling weatherDetails function with passing api result as an argument

    // fetch(api).then(response => console.log(response.json()));
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
    // fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
    //     infoTxt.innerText = "Something went wrong";
    //     infoTxt.classList.replace("pending", "error");
    // });
}

/*
function weatherDetails(info) {
    // get required properties value from the info obj
    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, humidity, temp} = info.main;

    // using custom icon according to the id which api returns
    if(id == 800) {
        WIcon.src = "img/clear.svg";
    }
    else if(id >= 200 && id <= 232) {
        WIcon.src = "img/strom.svg";
    }
    else if(id >= 600 && id <= 622) {
        WIcon.src = "img/snow.svg";
    }
    else if(id >= 701 && id <= 781) {
        WIcon.src = "img/haze.svg";
    }
    else if(id >= 801 && id <= 804) {
        WIcon.src = "img/cloud.svg";
    }
    else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
        WIcon.src = "img/rain.svg";
    }

    // pass these values to a particular html element
    wrapper.querySelector(".temp .number").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
    wrapper.querySelector(".temp .number-o").innerText = Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

    if(info.cod == "404") {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }
    else {
        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        // console.log(info);
    }
    // console.log(info);
}
*/

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        if(id == 800){
            WIcon.src = "img/clear.svg";
        }else if(id >= 200 && id <= 232){
            WIcon.src = "img/storm.svg";  
        }else if(id >= 600 && id <= 622){
            WIcon.src = "img/snow.svg";
        }else if(id >= 701 && id <= 781){
            WIcon.src = "img/haze.svg";
        }else if(id >= 801 && id <= 804){
            WIcon.src = "img/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            WIcon.src = "img/rain.svg";
        }
        
        wrapper.querySelector(".temp .number").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .number-o").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});