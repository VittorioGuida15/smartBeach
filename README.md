# 🌴 SmartBeach – dApp per Prenotazione Balneare su Blockchain

**SmartBeach** è una dApp decentralizzata per prenotare postazioni in stabilimenti balneari. Utilizzando la blockchain **Ethereum**, il progetto offre un sistema di prenotazione trasparente e sicuro. La caratteristica distintiva di SmartBeach è il suo sistema di rimborso in caso di maltempo, garantendo agli utenti la sicurezza di non perdere denaro per una giornata di spiaggia rovinata dalla pioggia.

## 🚀 Funzionalità principali

- Prenotazione postazioni tramite wallet MetaMask
- Pagamento in ETH (Ethereum)
- Mappa postazioni in tempo reale
- Rimborso automatico in caso di maltempo (rilevato da ESP32)
- Annullamento manuale senza rimborso se non piove
- Smart contract gestito tramite Hardhat
- Server meteo con ESP32 + MQTT + Node.js
- Interfaccia frontend con HTML/JavaScript

## 📁 Struttura del progetto
```
smartBeach/
├── .gitignore                  → Per ignorare file e cartelle nel progetto
├── README.md                   → Documentazione del progetto
│
│
├── stabilimento-dapp/          → Contiene la DApp, lo smart contract e il server frontend
│   ├── contracts/              
│   │   └── SmartBeach.sol      → Smart contract
│   │
│   ├── ignition/modules/       → Moduli di deployment di Hardhat
│   │
│   ├── scripts/                
│   │   └── deploy.js           → Script per il deployment del contratto
│   │
│   ├── test/                   → Script di test per lo smart contract
│   │
│   ├── app.js                  → Server Node.js che gestisce e serve la DApp frontend
│   ├── hardhat.config.js       → File di configurazione di Hardhat
│   ├── index.html              → Pagina HTML principale della DApp (frontend)
│   ├── package.json            → Dipendenze del progetto (Hardhat, Node.js)
│   └── package-lock.json       → File di lock delle dipendenze (assicura la coerenza delle dipendenze)
│  
│   
└── smartWeatherNode/           → Server Node.js per la gestione dei dati meteo
    ├── main/ 
    │     ├── main.ino          → Codice dell'ESP32
    │     └── secret.exemple.h  → File esempio per configurazione Wi-Fi ESP32 
    │ 
    ├── package-lock.json       → File di lock delle dipendenze
    ├── package.json            → Dipendenze del server meteo (Express, MQTT)
    ├── server.js               → Server che riceve i dati meteo reali da ESP32 (via MQTT)
    └── serverSimulato.js       → Server che simula i dati meteo
```
