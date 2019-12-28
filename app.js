window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
        );
    let temperatureDegree = document.querySelector(
        ".temperature-degree"
        );
    let locationTimezone = document.querySelector(
        ".location-timezone"
        );

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/8fc0a973af29f71e48211d7b7b05b468/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                // Set DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // Set Icon
                setIcons(icon, document.querySelector(".icon"));
            });
        }); 
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon =  icon.replace(/-/g, "_").toUpperCase();
        console.log(currentIcon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});