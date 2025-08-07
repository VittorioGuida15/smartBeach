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
smartBeach/
├── stabilimento-dapp/ → DApp
│ ├── artefact/
│ ├── cache
│ ├── contracts/ → smart contract
│ ├── scripts/
│ ├── frontend/ → HTML + JS + interfaccia utente
│ └── hardhat.config.js
├── smartWeatherNode/ → Server meteo MQTT (ESP32 o simulazione)
│ ├── server.js → Versione reale con sensori
│ ├── serverSimulato.js → Simulatore meteo via HTTP
