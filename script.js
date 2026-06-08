
async function getWeather(){
 const city=document.getElementById('cityInput').value.trim();
 const result=document.getElementById('weatherResult');

 if(!city){
   result.innerHTML='<p>Please enter a city name.</p>';
   return;
 }

 result.innerHTML='<p>Loading...</p>';

 try{
   const geoRes=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
   const geoData=await geoRes.json();

   if(!geoData.results || geoData.results.length===0){
      throw new Error('City not found');
   }

   const place=geoData.results[0];

   const weatherRes=await fetch(
   `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
   );

   const weatherData=await weatherRes.json();

   result.innerHTML=`
   <h2>${place.name}, ${place.country}</h2>

   <div class="stats">
      <div class="stat">
         <h3>🌡 Temperature</h3>
         <p>${weatherData.current.temperature_2m} °C</p>
      </div>

      <div class="stat">
         <h3>💧 Humidity</h3>
         <p>${weatherData.current.relative_humidity_2m}%</p>
      </div>

      <div class="stat">
         <h3>🌬 Wind Speed</h3>
         <p>${weatherData.current.wind_speed_10m} km/h</p>
      </div>
   </div>`;

 }catch(error){
   result.innerHTML=`<p>Error: ${error.message}</p>`;
 }
}
