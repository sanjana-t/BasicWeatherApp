import React, { useState, useEffect } from 'react'


function SearchWeather() {
     
    const [apiData, setApiData] = useState({});
    const [getState, setGetState] = useState('london');
    const [state, setState] = useState('london');
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=2062ceaad983d4954b156dd8184d1074`;

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setApiData(data));
    }, [apiUrl]);

    const submithandle =(event) =>{
        event.preventDefault();
        setState(getState)
    }
    const kelvinToFarenheit = (k) => {
        return (k - 273.15).toFixed(2);
    };
    const locale = 'en';
    let today = new Date();
    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;
  
    const hour = today.getHours();
    const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;
  
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });
  
    
    let year = today.getFullYear();
    

    let emoji = null;
    if(typeof apiData.main!='undefined'){
        if(apiData.weather[0].main=='Clouds'){
            emoji ='fa-cloud'
        }
        else if(apiData.weather[0].main=='Thunderstorm'){
            emoji ='fa-bolt'
        }
        else if(apiData.weather[0].main=='Drizzle'){
            emoji ='fa-cloud-moon-rain'
        }
        else if(apiData.weather[0].main=='Rain'){
            emoji ='fa-cloud-showers-heavy'
        }
        else if(apiData.weather[0].main=='Snow'){
            emoji ='fa-snowflake'
        }
        else{
            emoji ='fa-smog'
        }
    }else{
        return(
            <div>...Loading</div>
        )
    }


    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div class="card text-white text-center border-8">
                        {/* <img src="https://source.unsplash.com/600x900/?nature,water" class="card-img" alt="..." /> */}
                            <img src={`https://source.unsplash.com/600x900/?${apiData.weather[0].main}`} class="card-img" alt="..." />
                            <div class="card-img-overlay">
                                <form onSubmit={submithandle} >
                                    <div class="input-group mb-4 w-75 mx-auto ">
                                        {/* <input type="search" class="form-control" placeholder="Search City" aria-label="Search City" aria-describedby="basic-addon2" 
                                            value={getState} onChange={inputHandler} required/> */}
                                            <input type="search" class="form-control" placeholder="Search City" aria-label="Search City" aria-describedby="basic-addon2" 
                                            value={getState} onChange={(e) => setGetState(e.target.value)} required/>
                                            <button type="submit" class="input-group-text" id="basic-addon2">
                                            <i className='fas fa-search' ></i>

                                        </button>

                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3">
                                    <h2 class="card-title"><i className='fas fa-search-location'></i> {apiData?.name}</h2>
                                    <p class="card-text lead">
                                        
                                        {date}, {year}
                                    </p>
                                    <hr></hr>
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className='fw-bolder mb-5'> {kelvinToFarenheit(apiData?.main?.temp)}&deg; C</h1>
                                
                                    <i className='wi wi-cloudy-gusts'/><p className='load fw-bolder mb-0'><h5>{apiData.weather[0].main}</h5></p>
                                    <p className='load fw-bolder mb-0'><small> Weather Description : {apiData.weather[0].description}</small></p>
                                    <br></br>
                                    <i className="fas fa-temperature-low fa-1.3x">MinTemp</i>
                                    <h6 className='fw-bolder mb-5'>{kelvinToFarenheit(apiData?.main?.temp_min)}&deg; C</h6>
                                    <i className="fas fa-temperature-high fa-1.3x">MaxTemp</i>
                                    <h6 className='fw-bolder mb-5'>{kelvinToFarenheit(apiData?.main?.temp_max)}&deg; C</h6>
                                    <i className="wi wi-thermometer-internal wi-1.3x"><b> RealFell : {kelvinToFarenheit(apiData?.main?.feels_like)} </b></i>
                                    <br />
                                    <i className="wi wi-humidity wi-1.3x"> <b> Humidity : {apiData?.main?.humidity}</b></i>
                                    <br></br>
                                    <i className="wi wi-barometer wi-1.3x"> <b> Pressure : {apiData?.main?.pressure}</b></i>
                                    <br></br>
                                    <i className="wi wi-day-cloudy-windy wi-1.3x"> <b> Cloud Cover : {apiData?.clouds?.all}</b></i>
                                    <br/>
                                    <i className="wi wi-forecast-io-wind wi-1.3x"> <b> Wind Speed : {apiData?.wind?.speed}</b></i>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchWeather
