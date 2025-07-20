const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

let simulatedWeather = { temperature: 25, humidity: 60, rain: 0 }; // 0 = no pioggia, 1 = pioggia

// Endpoint che restituisce i dati meteo
app.get('/meteo', (req, res) => res.json(simulatedWeather));

// Endpoint per cambiare il meteo per i test (es. /set-meteo?rain=1)
app.get('/set-meteo', (req, res) => {
    const { temp, humidity, rain } = req.query;
    if (temp) simulatedWeather.temperature = parseFloat(temp);
    if (humidity) simulatedWeather.humidity = parseFloat(humidity);
    if (rain) simulatedWeather.rain = parseInt(rain);
    console.log("Meteo simulato aggiornato:", simulatedWeather);
    res.send('Meteo simulato aggiornato!');
});


app.listen(port, () => {
    console.log(`--- Server Meteo SIMULATO attivo su http://localhost:${port} ---`);
});