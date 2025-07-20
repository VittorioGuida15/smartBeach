# SmartWeatherNode 
SmartWeatherNode è un sistema IoT progettato per monitorare le condizioni meteorologiche, rilevando temperatura, umidità e presenza di pioggia in tempo reale.
# Obiettivo del Progetto
Creare un nodo di monitoraggio ambientale affidabile e sicuro.
Trasmettere i dati raccolti in modo protetto tramite il protocollo MQTT con crittografia TLS, utilizzando:
* ESP32 con sensori per raccogliere dati
* Mosquitto MQTT Broker per la comunicazione sicura
* Node-RED per la gestione dei dati e la creazione di una dashboard
# Prerequisiti
* Hardware
  * ESP32
  * Sensori:
    * DHT22 (Temperatura e Umidità)
    * Sensore pioggia
* Software
  * Openssl
  * Arduino IDE (per programmare ESP32)
  * Mosquitto (Broker MQTT con autenticazione e TLS)
  * Node-RED (Dashboard per visualizzare i dati)
# Generazione Certificato SSL/TLS
Per garantire una comunicazione sicura tra ESP32, Mosquitto e Node-RED, è necessario generare certificati SSL.
1. Genera una chiave privata.
    ```bash
    openssl genpkey -algorithm RSA -out broker.key -aes256
    ```
2. Creazione del certificato autofirmato.
   ```bash
   openssl req -new -x509 -key broker.key -out broker.crt -days 365
   ```
Durante la creazione del certificato, inserire i seguenti dettagli:
  * Paese (Country Name): IT
  * Stato (State or Province Name): State
  * Località (Locality Name): City
  * Organizzazione (Organization Name): MyOrganization
  * Unità Organizzativa (Organizational Unit Name): MyUnit
  * Nome Comune (Common Name): localhost o ip_server
  * Email (Email Address): admin@example.com
3. Verifica del certificato.
    ```bash
    openssl x509 -in broker.crt -text -noout
    ```
    Verranno mostrati i dettagli del certificato, come la data di scadenza, il soggetto e   l'emittente.
# Configurazione del Sistema
Configurare Mosquitto per utilizzare il certificato firmato, aggiungendo le seguenti righe nel file C:\etc\mosquitto\mosquitto.conf
* Configurazione mosquitto.conf:
   ```bash
   listener 8883
  allow_anonymous false
  password_file C:\etc\mosquitto\passwords.txt
  cafile C:\etc\mosquitto\certs\broker.crt
  certfile C:\etc\mosquitto\certs\broker.crt
  keyfile C:\etc\mosquitto\certs\broker.key
  ```
# Autenticazione
Per aggiungere un ulteriore livello di sicurezza, il broker può essere configurato in modo da richiedere l'autenticazione del client tramite un nome utente e una password validi prima di consentire la connessione. Poiché stiamo utilizzando SSL/TLS, il nome utente e la password saranno crittografati durante la trasmissione.
* Creazione utenti MQTT:
     ```bash
    mosquitto_passwd -c passwordfile ESP32-Client
    mosquitto_passwd -b passwordfile node_red <password>
    ```
* Riavvia Mosquitto:
    ```bash
    mosquitto -c "C:\etc\mosquitto\mosquitto.conf" -v
    ```
# Configurazione Node-RED
Node-RED si collega al broker Mosquitto tramite MQTT con TLS.
1. Creare un nuovo nodo MQTT-in per ogni dato raccolto, con i seguenti parametri:
   
![Descrizione dell'immagine](https://github.com/VittorioGuida16/SmartWeatherNode/blob/main/immagini/ConfigurazioneNodoMqttInNR.jpg)

2. Per ogni nodo MQTT-in sarà necessario settare il server in questo modo:
   
![Descrizione dell'immagine](https://github.com/VittorioGuida16/SmartWeatherNode/blob/main/immagini/ConfigurazioneServerNR.jpg)

3. Nel campo Security inserire Username e Password per accedere al broker MQTT.
   
4. Collegare il nodo a un dashboard UI per la visualizzazione dei dati.
   
5. Schema completo:
   
![Descrizione dell'immagine](https://github.com/VittorioGuida16/SmartWeatherNode/blob/main/immagini/SchemaCompletoNR.jpg)

# Controllare se tutto funziona correttamente
Prima di inviare messaggi da ESP32, pubblicare un messaggio di prova al topic settato su nodo MQTT-in di Node Red, con il seguente comando:
   ```bash
 mosquitto_pub -h 192.168.178.71 -p 8883 -t test/topic -m "Messaggio protetto" -u utente -P "password" --cafile "C:\etc\mosquitto\certs\broker.crt" -d
   ```
Se tutto è configurato correttamente, nel nodo debug collegato al nodo MQTT-in sarà possibile vedere il messsaggio appena inviato.
# Configurazione ESP32
Per utilizzare il certificato su una scheda ESP32 sarà necessario estrarlo dal file broker.crt e inserirlo all'interno del codice ESP32.

