# 🌴 SmartBeach – dApp per Prenotazione Balneare su Blockchain

**SmartBeach** è una dApp decentralizzata per prenotare postazioni in stabilimenti balneari. Utilizzando la blockchain **Ethereum**, il progetto offre un sistema di prenotazione trasparente e sicuro. La caratteristica distintiva di SmartBeach è il suo sistema di rimborso in caso di maltempo, garantendo agli utenti la sicurezza di non perdere denaro per una giornata di spiaggia rovinata dalla pioggia.

## 🧩 Funzionalità principali

- Prenotazione postazioni tramite wallet MetaMask
- Pagamento in ETH (Ethereum)
- Mappa postazioni in tempo reale
- Rimborso automatico in caso di maltempo rilevato da un ESP32 con sensori DHT22 (temperatura e umidità) e sensore di pioggia.
- Annullamento manuale senza rimborso se non piove
- Smart contract gestito tramite Hardhat
- Meteo in tempo reale con ESP32 + MQTT + Node.js
- Interfaccia frontend con HTML/JavaScript
- Hosting del frontend e intallazione dipendenze con Node.js

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
│   ├── package.json            → Dipendenze del progetto (hardhat e serve)
│   └── package-lock.json       → File di lock delle dipendenze (assicura la coerenza delle dipendenze)
│  
│   
└── smartWeatherNode/           → Server Node.js per la gestione dei dati meteo
    ├── main/ 
    │     ├── main.ino          → Codice dell'ESP32
    │     └── secret.exemple.h  → File esempio per configurazione Wi-Fi ESP32 
    │ 
    ├── package-lock.json       → File di lock delle dipendenze
    ├── package.json            → Dipendenze del server meteo (cors, ethers, express e mqtt)
    ├── server.js               → Server che riceve i dati meteo reali da ESP32 (via MQTT)
    └── serverSimulato.js       → Server che simula i dati meteo
```

## 🛠️ Requisiti hardware: 
- ESP32 
- Sensore DHT22 (temperatura e umidità)
- Sensore di pioggia.

*Possibilità di simulare il meteo senza i sensori*.

## ⚙️ Setup del progetto
Assicurati di avere installato:
- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/)

## 🔧 Installazione dipendenze
Apri un terminale e installa le dipendenze per la DApp.
```
cd smartBeach/stabilimento-dapp
npm install
```
Installa le dipendenze per il server meteo.
```
cd smartBeach/smartWeatherNode
npm install
```

## 🚀 Avvio del progetto
Per avviare il progetto, avrai bisogno di tre terminali separati.

**💻 Terminale 1: Avvio della Rete Blockchain Locale**

Questo terminale avvierà la blockchain locale di Ethereum.
```
cd smartBeach/stabilimento-dapp
npx hardhat node
```
La rete locale Hardhad va aggiunta a MetaMask.

Inoltre saranno mostrati 20 account con 10000 ETH e relativa *Private Key* da poter aggiungere a MetaMask per testare la dApp.

- **Per aggiungere la rete Hardhat a MetaMask:**

  *Select a network* > *Add a custom network*

  Inserire i seguenti dati:
    - Nome Rete: Hardhat
    - Default RPC URL: http://127.0.0.1:8545/
    - Chain ID: 31337
    - Simbolo moneta: ETH

- **Per aggiungere gli account a MetaMask:**

  *Account* > *Add account or hardware wallet* > *Private Key*
    - Incollare la *Private Key* di uno degli account ottenuti precedentemente sul terminele.
    - L'account #0 è il proprietario del contratto.

**💻 Terminale 2: Deploy e Frontend della DApp**

Questo terminale esegue il deploy dello smart contract e lanciando l'interfaccia utente.
```
cd smartBeach/stabilimento-dapp
npx hardhat run scripts/deploy.js --network localhost
npx serve
```
La DApp sarà ora disponibile all'indirizzo http://localhost:3000.

**💻 Terminale 3: Server Meteo**

Questo terminale, avvia il server meteo, scegliendo una delle due opzioni disponibili:
- Opzione 1: Meteo Reale 

  **Requisiti hardware:** ESP32 con sensore DHT22 (temperatura e umidità) e sensore di pioggia.
    ```
    cd smartBeach/smartWeatherNode
    node server.js
    ```
- Opzione 2: Simulazione del Meteo

  Senza il ESP32, avvia il server di simulazione.
    ```
    cd smartBeach/smartWeatherNode
    node serverSimulato.js
    ```
    In modalità di simulazione, puoi modificare le condizioni meteo visitando questi URL nel tuo browser:
    - Pioggia: http://localhost:3001/set-meteo?rain=1
    - Temperatura: http://localhost:3001/set-meteo?temperature=22
    - Umidità: http://localhost:3001/set-meteo?humidity=75

## 🧠 Flusso di esecuzione
- **Connessione e Visualizzazione**: L'utente accede alla DApp tramite MetaMask. Dopo aver scelto una data, la DApp interroga lo smart contract tramite la funzione *verificaDisponibilita()* per mostrare le postazioni libere e occupate.
  
- **Prenotazione**: L'utente seleziona una postazione e avvia la transazione per la prenotazione tramite la funzione *prenotaPostazione()*. Il pagamento avviene in ETH e l'utente conferma l'operazione con MetaMask.
  
- **Sistema Meteo e Rimborso**: La DApp interroga regolarmente l'endpoint del server meteo (http://localhost:3001/meteo). Il server meteo riceve i dati dall'ESP32 via MQTT e in caso di maltempo (pioggia o temperatura avversa) agisce per conto del proprietario del contratto (Account #0), per eseguire la funzione *abilitaRimborsiPerMaltempo()* sullo smart contract. Questo attiva la possibilità di rimborso per quel giorno.
  
- **Cancellazione della Prenotazione**: L'utente può decidere di cancellare la sua prenotazione, tramite la funzione *cancellaPostazione()*:
    - Se piove: ottiene un rimborso (meno le gas fee).
    - Se non piove: la cancellazione non comporta rimborso.
      
- **Gestione del Proprietario**: Il proprietario del contratto può cancellare qualsiasi prenotazione.
