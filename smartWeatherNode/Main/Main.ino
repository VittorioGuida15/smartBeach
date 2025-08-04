#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include "secrets.h"

// --- CONFIGURAZIONE (da modificare) ---
#define DHTPIN 4 // Pin del sensore DHT22
#define RAIN_PIN 34 // Pin analogico del sensore pioggia
// ------------------------------------------

const char* mqtt_server = "broker.hivemq.com";
const char* mqtt_topic = "smartbeach/weather";
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  client.setServer(mqtt_server, 1883);
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect("ESP32_SmartBeach_Client")) {
      Serial.println("MQTT Connesso");
    } else {
      delay(5000);
    }
  }
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();

  // Invia dati ogni 30 secondi
  static unsigned long lastMsg = 0;
  if (millis() - lastMsg > 30000) {
    lastMsg = millis();
    float temp = dht.readTemperature();
    float hum = dht.readHumidity();
    int rain_detected = (analogRead(RAIN_PIN) < 2500) ? 1 : 0; // 1 = piove

    if (isnan(temp)) return;

    StaticJsonDocument<128> doc;
    doc["temperature"] = temp;
    doc["humidity"] = hum;
    doc["rain"] = rain_detected;

    char buffer[128];
    serializeJson(doc, buffer);
    client.publish(mqtt_topic, buffer);
    Serial.print("Pubblicato: "); Serial.println(buffer);
  }
}