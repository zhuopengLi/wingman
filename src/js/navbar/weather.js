import data from "../../data/projects.json";

const getWeather = async url => {
    let res = await fetch(url);
    return await res.json();
};

export const setWeather = cityInd => getWeather(
    `https://api.openweathermap.org/data/2.5/weather?id=${data[cityInd].geo}&appid=164d9c87e52c6093c36d1dc348e167d8`
).then((data) => {
    let d = {
        lat: data.coord.lat.toFixed(1),
        lon: data.coord.lon.toFixed(1),
        city: data.name,
        country: data.sys.country,
        weather: data.weather[0].main,
        temp: (data.main.temp - 273.15).toFixed(1),
    };

    let geo = document.querySelector("#geo");
    let weather = document.querySelector("#weather");
    geo.innerHTML = `Location: ${d.lat}N, ${d.lon}E, ${d.city}, ${d.country}`;
    weather.innerHTML = `Weather: ${d.weather}, ${d.temp}°C`;
});