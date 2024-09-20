#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "cebelimestan";
const char* password = "f7c44Q4cbj";

// Firebase Realtime Database URL'nizi burada belirtin. "/status.json" sonuna eklenmiş olmalı.
const char* firebaseUrl = "https://iotcontrol-eb731-default-rtdb.firebaseio.com/status.json";

// LED pinleri ve isimleri
const int ledPins[] = {D1, D2, D3, D4};
const char* ledNames[] = {"led-one", "led-two", "led-three", "led-four"};
int lastValues[] = {-1, -1, -1, -1}; // LED durumlarının son bilinen değerleri

unsigned long requestInterval = 10; // 10 saniyede bir istek göndermek için
unsigned long lastRequestTime = 0;

void setup() {
  Serial.begin(115200);

  // LED pinlerini çıkış olarak ayarlayın ve başlangıçta kapalı duruma getirin
  for (int i = 0; i < 4; i++) {
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], LOW);
  }

  // WiFi bağlantısını başlatın
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  // Zaman aralığını kontrol edin
  if (millis() - lastRequestTime >= requestInterval) {
    lastRequestTime = millis();

    // Firebase'den LED durumlarını almak için HTTP istemcisi oluşturun
    HTTPClient http;
    WiFiClientSecure client;
    client.setInsecure(); // Güvenlik sertifikası doğrulamasını devre dışı bırakın
    http.begin(client, firebaseUrl);

    int httpCode = http.GET();
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println("Received payload:");
      Serial.println(payload);

      // JSON verilerini ayrıştırın
      DynamicJsonDocument doc(1024);
      DeserializationError error = deserializeJson(doc, payload);

      if (error) {
        Serial.print("JSON parse failed: ");
        Serial.println(error.c_str());
      } else {
        // Her LED'in durumunu kontrol edin ve güncelleyin
        for (int i = 0; i < 4; i++) {
          int value = doc[ledNames[i]];
          Serial.print(ledNames[i]);
          Serial.print(": ");
          Serial.println(value);

          if (value != lastValues[i]) {
            digitalWrite(ledPins[i], value == 1 ? HIGH : LOW);
            lastValues[i] = value;
            Serial.print(ledNames[i]);
            Serial.println(" state updated.");
          } else {
            Serial.print(ledNames[i]);
            Serial.println(" value did not change.");
          }
        }
      }
    } else {
      Serial.println("Error in HTTP request");
    }

    http.end(); // HTTP istemcisini sonlandırın
  }
}
