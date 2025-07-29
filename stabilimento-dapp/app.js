const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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

let provider, signer, contract;
let selectedSpot = null; // Variabile per memorizzare lo spot cliccato

// Riferimenti agli elementi UI
const connectWalletBtn = document.getElementById('connectWalletBtn');
const walletInfoDiv = document.getElementById('walletInfo');
const dappInterfaceDiv = document.getElementById('dappInterface');
const userAddressEl = document.getElementById('userAddress');
const networkNameEl = document.getElementById('networkName');
const contractOwnerEl = document.getElementById('contractOwner');
const totalSpotsEl = document.getElementById('totalSpots');
const mainDateInput = document.getElementById('mainDateInput');
const displaySpotsBtn = document.getElementById('displaySpotsBtn');
const spotsContainer = document.getElementById('spotsContainer');
const actionsPanel = document.getElementById('actionsPanel');
const spotIdInput = document.getElementById('spotIdInput');
const checkAvailabilityBtn = document.getElementById('checkAvailabilityBtn');
const bookSpotBtn = document.getElementById('bookSpotBtn');
const cancelBookingBtn = document.getElementById('cancelBookingBtn');
const statusMessageEl = document.getElementById('statusMessage');
const loadingMessageEl = document.getElementById('loadingMessage');
const bookingPriceSpan = document.getElementById('bookingPrice');

//Funzione covertitore data Unix
function dateToTimestamp(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString + 'T00:00:00Z');
    return Math.floor(date.getTime() / 1000);
}

// Funzione per aggiornare i messaggi di caricamento/attesa
function showLoadingMessage(message) {
    if(loadingMessageEl) {
        loadingMessageEl.innerText = message;
        loadingMessageEl.classList.remove('hidden');
    }
}

function hideLoadingMessage() {
    if(loadingMessageEl) {
        loadingMessageEl.innerText = '';
        loadingMessageEl.classList.add('hidden');
    }
}

// Funzione per aggiornare i messaggi di stato delle operazioni
function showStatusMessage(message, isError = false) {
    if(statusMessageEl) {
        statusMessageEl.innerText = message;
        statusMessageEl.style.color = isError ? 'red' : 'green';
    }
}


// Inizializzazione e connessione al Wallet
async function connectWallet() {
    showLoadingMessage("Connessione a MetaMask in corso...");
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Richiedi accesso all'account
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentUserAddress = accounts[0];
            if(userAddressEl) userAddressEl.innerText = currentUserAddress;

            // Inizializza Ethers.js
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            // Valida l'indirizzo del contratto prima di creare l'istanza
            if (!ethers.utils.isAddress(contractAddress)) {
                throw new Error("L'indirizzo del contratto fornito non e' valido.");
            }
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Ottieni informazioni sulla rete
            const network = await provider.getNetwork();
            if(networkNameEl) networkNameEl.innerText = network.name;

            // Mostra l'interfaccia della DApp e nascondi il pulsante di connessione
            if(connectWalletBtn) connectWalletBtn.classList.add('hidden');
            if(walletInfoDiv) walletInfoDiv.classList.remove('hidden');
            if(weatherWidget) weatherWidget.classList.remove('hidden');
            if(dappInterfaceDiv) dappInterfaceDiv.classList.remove('hidden');

            showStatusMessage("Wallet connesso con successo!", false);
            
            // Carica dati iniziali dal contratto
            await loadInitialContractData(); 
            await fetchWeather(); // Chiamata iniziale
            setInterval(fetchWeather, 60000); // Aggiorna il meteo ogni minuto
            
        } catch (error) {
            console.error("Errore durante la connessione al wallet:", error);
            showStatusMessage(`Errore connessione: ${error.message || 'Vedi console per dettagli.'}`, true);
            // Ri-mostra il pulsante di connessione se qualcosa va storto prima che l'UI principale sia visibile
            if(connectWalletBtn) connectWalletBtn.classList.remove('hidden');
            if(walletInfoDiv) walletInfoDiv.classList.add('hidden');
            if(dappInterfaceDiv) dappInterfaceDiv.classList.add('hidden');
            if(mainSeparator) mainSeparator.classList.add('hidden');
        } finally {
            hideLoadingMessage();
        }
    } else {
        showStatusMessage("MetaMask non rilevato. Per favore installa MetaMask.", true);
        hideLoadingMessage();
    }
}

//carica dati contratto
async function loadInitialContractData() {
    showLoadingMessage("Caricamento dati iniziali...");
    try {
        if (!contract) return;
        const owner = await contract.proprietario();
        if (contractOwnerEl) contractOwnerEl.innerText = owner;
        const numPostazioni = await contract.numeroTotalePostazioni();
        if (totalSpotsEl) totalSpotsEl.innerText = numPostazioni.toString();
        const prezzoInWei = await contract.prezzoPostazione();
        const prezzoInEth = ethers.utils.formatEther(prezzoInWei);
        if (bookingPriceSpan) bookingPriceSpan.textContent = prezzoInEth;
		const oggi = new Date();
        if (mainDateInput) mainDateInput.value = oggi.toISOString().split('T')[0];
        await handleDisplaySpots();
        showStatusMessage("Dati iniziali caricati.", false);
    } catch (error) {
        console.error("Errore caricamento dati:", error);
    } finally {
        hideLoadingMessage();
    }
}

//mappa
async function handleDisplaySpots() {
    const dateString = mainDateInput.value;
    const date = dateToTimestamp(dateString);
    if (!date) return;

    // Resetta il pannello delle azioni a uno stato iniziale
    if (spotIdInput) spotIdInput.value = '';
    if (bookSpotBtn) bookSpotBtn.disabled = true;
    if (cancelBookingBtn) cancelBookingBtn.disabled = true;
    if (checkAvailabilityBtn) checkAvailabilityBtn.disabled = true;
    showStatusMessage('Seleziona una postazione dalla griglia.', false);
    selectedSpot = null;
    spotsContainer.innerHTML = 'Caricamento...';
    
    const totalSpots = await contract.numeroTotalePostazioni();
    spotsContainer.innerHTML = '';

    for (let i = 1; i <= totalSpots; i++) {
        const isAvailable = await contract.verificaDisponibilita(i, date);
        const spotDiv = document.createElement('div');
        spotDiv.className = `spot ${isAvailable ? 'free' : 'booked'}`;
        spotDiv.textContent = `P. ${i}`;
        spotDiv.dataset.id = i;
        spotDiv.addEventListener('click', () => onSpotClick(i, date, isAvailable));
        spotsContainer.appendChild(spotDiv);
    }
}

//azioni prenotazione dinamici
function onSpotClick(id, date, isAvailable) {
    selectedSpot = { id, date, available: isAvailable };
    if (spotIdInput) spotIdInput.value = id;
  
    if (checkAvailabilityBtn) checkAvailabilityBtn.disabled = false;
    if (bookSpotBtn) bookSpotBtn.disabled = false;
    if (cancelBookingBtn) cancelBookingBtn.disabled = false;
    document.querySelectorAll('.spot.selected').forEach(el => el.classList.remove('selected'));
    document.querySelector(`.spot[data-id='${id}']`).classList.add('selected');
    showStatusMessage('Postazione selezionata.', false);
}

//verifica disponibilità
async function handleCheckAvailability() {
    if (!selectedSpot) return showStatusMessage("Seleziona prima una postazione.", true);
    
    const { id, date } = selectedSpot;
    showStatusMessage(`Verifica per postazione ${id}...`, false);

    try {
        const isAvailable = await contract.verificaDisponibilita(id, date);
        if (isAvailable) {
            showStatusMessage(`Postazione ${id} è LIBERA.`, false);
        } else {
            const user = await contract.getPrenotazioneUtente(id, date);
            showStatusMessage(`Postazione ${id} è OCCUPATA da ${user.substring(0, 6)}...`, true);
        }
    } catch (e) { showStatusMessage("Errore durante la verifica.", true); }
}

//prenota
async function handleBookSpot() {
    if (!selectedSpot) return alert("Seleziona una postazione.");
    
    const canBook = await fetchWeather();
    if (!canBook) {
        return showStatusMessage("Prenotazioni sospese per meteo avverso.", true);
    }

    const { id, date } = selectedSpot;
    try {
        // ottieni il prezzo
        const prezzoInWei = await contract.prezzoPostazione();
        
        showStatusMessage("Invio prenotazione e pagamento...", false);

        // invia la transazione CON IL PAGAMENTO
        const tx = await contract.prenotaPostazione(id, date, { value: prezzoInWei }); // <-- MODIFICA CHIAVE QUI

        await tx.wait();
        showStatusMessage("Prenotazione effettuata!", false);
        await handleDisplaySpots();
    } catch (error) {
        console.error("Errore prenotazione:", error);
        showStatusMessage(`Errore: ${error.reason || "Transazione fallita."}`, true);
    }
}
async function handleCancelBooking() {
    if (!selectedSpot) return alert("Seleziona una postazione.");

    if (selectedSpot.available) {
        showStatusMessage("Questa postazione è libera.", true);
        return;
    }

    const { id, date } = selectedSpot;

    try {
        // rimbori attivi?
        const isTodaySelected = mainDateInput.value === new Date().toISOString().split('T')[0];
        const rimborsiAbilitati = isTodaySelected ? await contract.maltempoAbilitato(date) : false;
        
        let userConfirmation = false;

        // popup da mostrare
        if (rimborsiAbilitati) {
            userConfirmation = confirm("Meteo avverso! Vuoi cancellare e ricevere un rimborso?");
        } else {
            userConfirmation = confirm("Sei sicuro di voler cancellare? L'importo NON verrà rimborsato.");
        }

        // Se l'utente clicca "OK"
        if (userConfirmation) {
            showStatusMessage("Invio cancellazione...", false);
            const tx = await contract.cancellaPrenotazione(id, date);
            await tx.wait();
            showStatusMessage("Cancellazione effettuata!", false);
            await handleDisplaySpots();
        }

    } catch (error) {
        showStatusMessage(`Errore: ${error.reason || "Transazione fallita."}`, true);
    }
}

//meteo
async function fetchWeather() {
    let canBookToday = true;
    try {
        const response = await fetch('http://localhost:3001/meteo');
        const weatherData = await response.json();

        document.getElementById('temp').textContent = weatherData.temperature;
        document.getElementById('humidity').textContent = weatherData.humidity;

        const isRaining = weatherData.rain === 1;
        const isCold = weatherData.temperature < 16;
        const conditionsAdverse = isRaining || isCold;
        const isToday = mainDateInput.value === new Date().toISOString().split('T')[0];

        if (conditionsAdverse) {
            document.getElementById('weatherIcon').textContent = isRaining ? '🌧️' : '🥶';
            document.getElementById('weather-warning').textContent = "Meteo avverso: Prenotazioni per oggi sospese.";
            if(isToday) canBookToday = false;
        } else {
            document.getElementById('weatherIcon').textContent = '☀️';
            document.getElementById('weather-warning').textContent = "";
        }
    } catch (error) {
        document.getElementById('weather-warning').textContent = "Servizio meteo non disponibile.";
    }
    return canBookToday;
}


//event listener
document.addEventListener('DOMContentLoaded', () => {
    connectWalletBtn.addEventListener('click', connectWallet);
    displaySpotsBtn.addEventListener('click', handleDisplaySpots);
    checkAvailabilityBtn.addEventListener('click', handleCheckAvailability);
    bookSpotBtn.addEventListener('click', handleBookSpot);
    cancelBookingBtn.addEventListener('click', handleCancelBooking);
    mainDateInput.addEventListener('change', handleDisplaySpots); // Aggiorna la griglia al cambio data

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', () => window.location.reload());
        window.ethereum.on('chainChanged', () => window.location.reload());
    }
});