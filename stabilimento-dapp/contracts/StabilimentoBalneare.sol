// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StabilimentoBalneare {
    uint public numeroTotalePostazioni;
    address public proprietario;
    uint256 public prezzoPostazione = 0.01 ether;
    mapping(uint => bool) public maltempoAbilitato;

    // Mapping: idPostazione -> data (timestamp Unix) -> indirizzo utente
    // Se l'indirizzo è address(0), la postazione è libera per quella data.
    mapping(uint => mapping(uint => address)) public postazioniPrenotate;

    event PostazionePrenotata(uint indexed idPostazione, uint indexed data, address indexed utente);
    event PrenotazioneCancellata(uint indexed idPostazione, uint indexed data, address indexed utente);

    modifier soloProprietario() {
        require(msg.sender == proprietario, "Azione consentita solo al proprietario del contratto");
        _;
    }

    constructor(uint _numeroTotalePostazioni) {
        require(_numeroTotalePostazioni > 0, "Il numero di postazioni deve essere maggiore di zero");
        numeroTotalePostazioni = _numeroTotalePostazioni;
        proprietario = msg.sender; // Il deployer del contratto è il proprietario
    }

    // Funzione per il proprietario per attivare i rimborsi
    function abilitaRimborsiPerMaltempo(uint _data) public soloProprietario {
    maltempoAbilitato[_data] = true;
    }

    // Funzione per il proprietario per disattivare i rimborsi
    function disabilitaRimborsiPerMaltempo(uint _data) public soloProprietario {
    maltempoAbilitato[_data] = false;
}

    function prenotaPostazione(uint _idPostazione, uint _data) public payable {
    require(msg.value >= prezzoPostazione, "Pagamento insufficiente");
    require(_idPostazione > 0 && _idPostazione <= numeroTotalePostazioni, "ID postazione non valido");
    
    //Arrotonda il timestamp attuale alla mezzanotte di oggi
    uint oggi = (block.timestamp / 86400) * 86400; 
    require(_data >= oggi, "Non puoi prenotare per una data passata");

    require(postazioniPrenotate[_idPostazione][_data] == address(0), "Postazione gia' prenotata per questa data");

    postazioniPrenotate[_idPostazione][_data] = msg.sender;
    emit PostazionePrenotata(_idPostazione, _data, msg.sender);
}

    function cancellaPrenotazione(uint _idPostazione, uint _data) public {
    address utente = postazioniPrenotate[_idPostazione][_data];
    require(utente != address(0), "Nessuna prenotazione trovata");
    require(msg.sender == utente || msg.sender == proprietario, "Azione non autorizzata");

    postazioniPrenotate[_idPostazione][_data] = address(0);
    emit PrenotazioneCancellata(_idPostazione, _data, utente);

    // Logica di rimborso automatica e sicura
    uint oggi = (block.timestamp / 86400) * 86400;
    if (_data == oggi && maltempoAbilitato[_data] == true) {
        payable(utente).transfer(prezzoPostazione);
    }
}

    function verificaDisponibilita(uint _idPostazione, uint _data) public view returns (bool) {
        require(_idPostazione > 0 && _idPostazione <= numeroTotalePostazioni, "ID postazione non valido");
        return postazioniPrenotate[_idPostazione][_data] == address(0);
    }

    // Funzione per ottenere l'utente che ha prenotato una specifica postazione in una specifica data
    function getPrenotazioneUtente(uint _idPostazione, uint _data) public view returns (address) {
        require(_idPostazione > 0 && _idPostazione <= numeroTotalePostazioni, "ID postazione non valido");
        return postazioniPrenotate[_idPostazione][_data];
    }

    // Funzione di utilita' per il proprietario per cambiare il numero totale di postazioni (opzionale)
    function setNumeroTotalePostazioni(uint _nuovoNumero) public soloProprietario {
        require(_nuovoNumero > 0, "Il numero di postazioni deve essere maggiore di zero");
        // Attenzione: ridurre il numero potrebbe rendere inaccessibili le prenotazioni esistenti
        // per postazioni con ID superiore al nuovo numero. Gestire con cautela.
        numeroTotalePostazioni = _nuovoNumero;
    }

    // Funzione per ritirare eventuali fondi inviati erroneamente al contratto (opzionale)
    function ritiraFondi() public soloProprietario {
        payable(proprietario).transfer(address(this).balance);
    }

    

}
