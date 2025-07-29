// Imports
const express = require('express');
const cors = require('cors');
const { ethers } = require("ethers");

// configurazione server express
const app = express();
const port = 3001;

// Configurazione Blockchain
 const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
 const contractABI = [{
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_numeroTotalePostazioni",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "idPostazione",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "data",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "utente",
          "type": "address"
        }
      ],
      "name": "PostazionePrenotata",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "idPostazione",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "data",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "utente",
          "type": "address"
        }
      ],
      "name": "PrenotazioneCancellata",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_data",
          "type": "uint256"
        }
      ],
      "name": "abilitaRimborsiPerMaltempo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_idPostazione",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_data",
          "type": "uint256"
        }
      ],
      "name": "cancellaPrenotazione",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_data",
          "type": "uint256"
        }
      ],
      "name": "disabilitaRimborsiPerMaltempo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_idPostazione",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_data",
          "type": "uint256"
        }
      ],
      "name": "getPrenotazioneUtente",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "maltempoAbilitato",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numeroTotalePostazioni",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "postazioniPrenotate",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_idPostazione",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_data",
          "type": "uint256"
        }
      ],
      "name": "prenotaPostazione",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "prezzoPostazione",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "proprietario",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ritiraFondi",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_nuovoNumero",
          "type": "uint256"
        }
      ],
      "name": "setNumeroTotalePostazioni",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_idPostazione",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_data",
          "type": "uint256"
        }
      ],
      "name": "verificaDisponibilita",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }];

 const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
 // Chiave privata del primo account di Hardhat (il proprietario)
 const ownerPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
 const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);
 const stabilimentoContract = new ethers.Contract(contractAddress, contractABI, ownerWallet);

 

app.use(cors());

let simulatedWeather = { temperature: 25, humidity: 60, rain: 0 }; // 0 = no pioggia, 1 = pioggia

// Endpoint che restituisce i dati meteo
app.get('/meteo', (req, res) => res.json(simulatedWeather));

// Endpoint per cambiare il meteo per i test (es. /set-meteo?rain=1)
app.get('/set-meteo', async (req, res) => { // Aggiunto 'async'
    const { temp, humidity, rain } = req.query;
    if (temp) simulatedWeather.temperature = parseFloat(temp);
    if (humidity) simulatedWeather.humidity = parseFloat(humidity);
    if (rain) simulatedWeather.rain = parseInt(rain);

    console.log("Meteo simulato aggiornato:", simulatedWeather);

    //  LOGICA BLOCKCHAIN 
    const conditionsAdverse = simulatedWeather.rain === 1 || simulatedWeather.temperature < 16;
    const oggi = new Date();
    oggi.setUTCHours(0, 0, 0, 0);
    const timestampOggi = Math.floor(oggi.getTime() / 1000);
    
    try {
      if(conditionsAdverse) {
        console.log(`Maltempo rilevato. Abilito rimborsi per oggi (timestamp: ${timestampOggi})...`);
        const tx = await stabilimentoContract.abilitaRimborsiPerMaltempo(timestampOggi);
        await tx.wait();
          console.log("Rimborsi abilitati con successo sulla blockchain!");
        } else {
          console.log("Bel tempo: Disabilito rimborsi...");
          const tx = await stabilimentoContract.disabilitaRimborsiPerMaltempo(timestampOggi);
          await tx.wait();
          console.log("Rimborsi disabilitati con successo sulla blockchain!");
        }
    } catch (error) {
      console.error("Errore durante l'abilitazione dei rimborsi:", error.reason);
    }

    res.send('Meteo simulato aggiornato!');
});


app.listen(port, () => {
    console.log(`--- Server Meteo SIMULATO attivo su http://localhost:${port} ---`);
});