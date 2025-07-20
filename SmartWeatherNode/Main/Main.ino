#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <DHT.h>

// Dati WiFi
const char* ssid = "wifi network";
const char* password = "password";

// Dati MQTT
const char* mqtt_server = "ip_server";  
const int mqtt_port = 8883;
const char* mqtt_user = "user"; 
const char* mqtt_pass = "password"; 

// Certificato del broker
const char* broker_cert = R"EOF(
-----BEGIN CERTIFICATE-----

-----END CERTIFICATE-----
)EOF";

// WiFi & MQTT Client
WiFiClientSecure espClient;
PubSubClient client(espClient);

// DHT22
#define DHTPIN 13  // Pin del DHT22
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// Sensore di pioggia
#define RAIN_DIGITAL_PIN 14 // Pin digitale del sensore di pioggia
#define RAIN_ANALOG_PIN 36  // Pin analogico del sensore di pioggia

void setup() {
    Serial.begin(115200);
    delay(100);

    // Inizializzazione il sensore DHT
    dht.begin();

    // Connessione al WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\n✅ WiFi connesso!");

    // Configurazione SSL/TLS
    espClient.setCACert(broker_cert);

    // Configurazione MQTT
    client.setServer(mqtt_server, mqtt_port);

    // Connessione MQTT
    connectMQTT();
}

void connectMQTT() {
    while (!client.connected()) {
        Serial.print("🔌 Tentativo di connessione a MQTT...");
        if (client.connect("ESP32Client", mqtt_user, mqtt_pass)) {
            Serial.println("✅ Connesso!");
        } else {
            Serial.print("❌ Fallito, rc=");
            Serial.print(client.state());
            Serial.println(" Ritento tra 5 secondi...");
            delay(5000);
        }
    }
}

// Pubblicazione dei dati dei sensori
void publishSensorData() {
    //dati del DHT22
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    //sensore di pioggia digitale
    int rainDigital = digitalRead(RAIN_DIGITAL_PIN);

    //sensore di pioggia analogico
    int rainAnalog = analogRead(RAIN_ANALOG_PIN);

    //Pubblicazione i dati MQTT
    client.publish("sensor/temperature", String(temperature).c_str());
    client.publish("sensor/humidity", String(humidity).c_str());
    client.publish("sensor/rain_digital", String(rainDigital).c_str());
    client.publish("sensor/rain_analog", String(rainAnalog).c_str());

    Serial.print("📊 Dati inviati: ");
    Serial.print("Temp: "); Serial.print(temperature); Serial.print("°C ");
    Serial.print("Hum: "); Serial.print(humidity); Serial.print("% ");
    Serial.print("Rain Digital: "); Serial.print(rainDigital); Serial.print(" ");
    Serial.print("Rain Analog: "); Serial.println(rainAnalog);
}

void loop() {
    if (!client.connected()) {
        connectMQTT();
    }
    client.loop();

    // Pubblicazione dei dati ogni 10 secondi
    publishSensorData();
    delay(10000);
}
