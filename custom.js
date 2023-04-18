const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const countryName = "Dominican Republic"


form.addEventListener('submit', (e) => {
    const parametro = `https://api.weatherapi.com/v1/e8823593653941d1b12210956231903q=${nameCity},dominican republic$lang=es`
    
    e.preventDefault();

    if (nameCity.value === '') {
        showError('Llenar el campo es obligatorio...');
        return;
    } else if(parametro !==`https://api.weatherapi.com/v1/e8823593653941d1b12210956231903q=${nameCity},dominican republic$lang=es`){
        showError("Esa ciudad no es de la Republica Dominicana")
    }

    callAPI(nameCity.value);
})

function callAPI(city){
    const apiKey = 'e8823593653941d1b12210956231903';
    const baseUrl = 'https://api.weatherapi.com/v1';

    fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${city},dominican republic$lang=es`)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {

            if (dataJSON.error) {
                showError('Ciudad no encontrada...');
            }else if(dataJSON.location.country !== "Dominican Republic" || dataJSON.location.name === "Madrid" ||dataJSON.location.name === "Haiti"){
                showError('Esa ciudad no es de la Republica Dominicana')
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
console.log(data.current.condition.icon)
    const {name, country} = data.location
    const {temp_c, humidity} = data.current
    const icon = data.current.condition.icon
    const {maxtemp_c, mintemp_c, maxwind_kph} = data.forecast.forecastday[0].day

    const degrees = Math.round(temp_c);
    const max = Math.round(maxtemp_c);
    const min = Math.round(mintemp_c);
    

    const content = document.createElement('div');
    if(country === countryName){
        content.innerHTML = `
            <h5>Clima en ${name}, Republica Dominicana</h5>
            <img src="https:${icon}" alt="icon" >
            <h2>${degrees}°C</h2>
            <p>Max: ${max}°C</p>
            <p>Min: ${min}°C</p>
            <p>Viento: ${maxwind_kph} km/h</p>
            <p>Humedad: ${humidity}%</p>
        `;

    }else{
        showError("Esa ciudad no es de la Republica Dominicana")
    }

    result.appendChild(content);
}

function showError(message){
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function clearHTML(){
    result.innerHTML = '';
}
