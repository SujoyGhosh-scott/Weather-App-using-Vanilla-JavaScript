window.addEventListener('load', ()=> {
    let long;
    let lat;
    let description = document.querySelector(".description");
    let degree = document.querySelector(".degree");
    let timezone = document.querySelector(".location-timezone");
    let showHumidity = document.querySelector(".humidity");
    let showWindSpeed = document.querySelector(".windSpeed");
    let temperatureSpan = document.querySelector(".degree-selection span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/[YOUR_API_KEY]/${lat},${long}`
        
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon, humidity, windSpeed} = data.currently;
                    
                    //updating front-end
                    degree.textContent = Math.round((temperature - 32) * (5/9));
                    description.textContent = summary;
                    timezone.textContent = data.timezone;
                    showHumidity.textContent = "Humidity " + Math.round(humidity*100) + " %";
                    showWindSpeed.textContent = "WindSpeed " + windSpeed + " m/H";
                
                    //set icon
                    setIcons(icon, document.querySelector(".icon"));
                })
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
	//skycon only takes parameters in uppercase and "_" instead of "-"
	//so i replaced it
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
